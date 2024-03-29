import { Box, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import {
	DragDropContext,
	DropResult,
	ResponderProvided,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
	currentDateSelector,
	daysSelector,
} from "../../../store/selectors/calendar.selector";
import {
	getHolidaysAsync,
	moveEvent,
	reorderEvents,
} from "../../../store/slices/calendar.slice";
import { AppDispatch } from "../../../store/store";
import { WEEKDAYS } from "../../../utils/constants";
import { DayComponent } from "./Day";
import { EventModal } from "./modal/EventModal";
import { TagModal } from "./modal/TagModal";

interface Props {
	eventSearchValue: string;
	tagSearchValue: string[];
}

export const Body: FC<Props> = ({ eventSearchValue, tagSearchValue }) => {
	const dispatch = useDispatch<AppDispatch>();

	const days = useSelector(daysSelector);
	const currentDate = useSelector(currentDateSelector);

	useEffect(() => {
		if (currentDate?.getFullYear()) {
			dispatch(getHolidaysAsync(currentDate.getFullYear()));
		}
	}, [currentDate, dispatch]);

	const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
		if (!result.destination) {
			return;
		}

		const { draggableId, source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			dispatch(
				moveEvent({
					eventId: draggableId,
					oldDate: source.droppableId,
					newDate: destination.droppableId,
				})
			);

			return;
		}

		dispatch(
			reorderEvents({
				date: destination.droppableId,
				startIndex: source.index,
				endIndex: destination.index,
			})
		);
	};

	return (
		<Box width='100%'>
			<Box display='flex' justifyContent='space-between'>
				{WEEKDAYS.map((weekday) => (
					<Typography sx={{ width: "calc(100%/7)" }} key={weekday}>
						{weekday}
					</Typography>
				))}
			</Box>
			<DragDropContext
				onDragEnd={(result, provided) => handleDragEnd(result, provided)}>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
					}}>
					{days.map((day) => {
						return (
							<DayComponent
								key={`${day.month}-${day.dayNumber}`}
								day={day}
								eventSearchValue={eventSearchValue}
								tagSearchValue={tagSearchValue}
							/>
						);
					})}
				</Box>
			</DragDropContext>

			<EventModal />
			<TagModal />
		</Box>
	);
};
