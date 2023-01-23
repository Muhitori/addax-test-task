import { Box, Typography } from "@mui/material";
import {
	Droppable,
	Draggable,
	DragDropContext,
	DropResult,
	ResponderProvided,
} from "react-beautiful-dnd";
import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dayEventsSelector } from "../../../store/selectors/calendar.selector";
import { setCurrentDate } from "../../../store/slices/calendar.slice";
import { Day } from "../../../types";
import { Event } from "../../../types";
import { EventComponent } from "./Event";

interface Props {
	day: Day;
}

const reorder = (list: Event[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

const SELECTED_COLOR = "#3498db";
const CURRENT_MONTH_COLOR = "black";
const NOT_CURRENT_MONTH_COLOR = "#95a5a6";

export const DayComponent: FC<Props> = ({ day }) => {
	const dispatch = useDispatch();

	const dayEvents = useSelector(dayEventsSelector(day));

	const [items, setItems] = useState<Event[]>([]);

	const renderItems = items.length ? items : dayEvents;

	const backgroundColor = useMemo(
		() => (day.selected ? SELECTED_COLOR : undefined),
		[day]
	);

	const color = useMemo(
		() => (day.isCurrentMonth ? CURRENT_MONTH_COLOR : NOT_CURRENT_MONTH_COLOR),
		[day]
	);

	const handleClick = () => dispatch(setCurrentDate(day));

	const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
		if (!result.destination) {
			return;
		}

		const items = reorder(
			renderItems,
			result.source.index,
			result.destination.index
		);

		setItems(items);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId={day.date.toISOString()}>
				{(provided, snapshot) => (
					<div
						style={{
							width: "calc(100%/7)",
							height: "80px",
						}}
						{...provided.droppableProps}
						ref={provided.innerRef}>
						<Box
							sx={{
								height: "100%",
								overflowY: "auto",
								backgroundColor,
								color,
							}}
							border='1px solid black'
							display='flex'
							flexDirection='column'
							onClick={handleClick}>
							<Typography fontSize={18} variant='body2'>
								{day.dayNumber}
							</Typography>

							{renderItems?.map((event, index) => (
								<Draggable key={event.id} draggableId={event.id} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}>
											<EventComponent event={event} />
										</div>
									)}
								</Draggable>
							))}
						</Box>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
