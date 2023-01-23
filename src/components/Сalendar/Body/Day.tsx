import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dayEventsSelector } from "../../../store/selectors/calendar.selector";
import { setCurrentDate } from "../../../store/slices/calendar.slice";
import { Day } from "../../../types";
import { EventComponent } from "./Event";

interface Props {
	day: Day;
}

export const DayComponent: FC<Props> = ({ day }) => {
	const dispatch = useDispatch();

	const dayEvents = useSelector(dayEventsSelector(day));

	return (
		<Box
			sx={{
				backgroundColor: day.selected ? "#3498db" : undefined,
				color: day.isCurrentMonth ? "black" : "#95a5a6",
				overflowY: "auto",
			}}
			width='calc(100%/8)'
			height='80px'
			border='1px solid black'
			display='flex'
			flexDirection='column'
			onClick={() => dispatch(setCurrentDate(day))}>
			<Typography fontSize={18} variant='body2'>
				{day.dayNumber}
			</Typography>

			{dayEvents?.map((event) => (
				<EventComponent key={event.id} event={event} />
			))}
		</Box>
	);
};
