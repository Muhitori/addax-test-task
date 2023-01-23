import { Box } from "@mui/material";
import { useState } from "react";
import { Day, Event } from "../../types";
import { Body } from "./Body";
import { Header } from "./Header";

export const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState<Event[]>([
		{ title: "test", color: "red", date: new Date() },
	]);

	const handleChange = (day: Day) => {
		setCurrentDate(day.date);
	};

	return (
		<Box width='100%'>
			<Header date={currentDate} />
			<Body date={currentDate} events={events} dayChange={handleChange} />
		</Box>
	);
};
