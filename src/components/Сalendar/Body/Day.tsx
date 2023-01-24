import { Box, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../../../store/slices/calendar.slice";
import { Day } from "../../../types";
import { EventComponent } from "./Event";

interface Props {
	day: Day;
}

const SELECTED_COLOR = "#3498db";
const CURRENT_MONTH_COLOR = "black";
const NOT_CURRENT_MONTH_COLOR = "#95a5a6";

export const DayComponent: FC<Props> = ({ day }) => {
	const appDispatch = useDispatch();

	const backgroundColor = useMemo(
		() => (day.selected ? SELECTED_COLOR : undefined),
		[day]
	);

	const color = useMemo(
		() => (day.isCurrentMonth ? CURRENT_MONTH_COLOR : NOT_CURRENT_MONTH_COLOR),
		[day]
	);

	const handleClick = () => appDispatch(setCurrentDate(day.date));

	return (
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
						flexDirection='column'>
						<Typography fontSize={18} variant='body2'>
							{day.dayNumber}
						</Typography>

						{day.events?.map((event, index) => (
							<EventComponent key={event.id} event={event} index={index} />
						))}
					</Box>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};
