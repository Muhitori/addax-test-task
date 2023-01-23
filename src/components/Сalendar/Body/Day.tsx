import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Day, Event } from "../../../types";
import { EventComponent } from "./Event";
import { parseDate } from "./utils";

interface Props {
	day: Day;
	dayChange: (day: Day) => void;
	events: Event[];
}

export const DayComponent: FC<Props> = ({ day, dayChange, events }) => {
	const dayEvents = events.filter((event) => {
		const {
			day: eventDay,
			month: eventMonth,
			year: eventYear,
		} = parseDate(event.date);
		const { dayNumber, month, year } = day;

		return eventDay === dayNumber && eventMonth === month && eventYear === year;
	});

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
			onClick={() => dayChange(day)}>
			<Typography fontSize={18} variant='body2'>
				{day.dayNumber}
			</Typography>

			{dayEvents?.map((event) => (
				<EventComponent event={event} />
			))}
		</Box>
	);
};
