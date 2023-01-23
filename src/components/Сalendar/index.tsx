import { Box } from "@mui/material";
import { useState } from "react";
import { Day } from "../../types/Day";
import { Body } from "./Body";
import { Header } from "./Header";

export const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());

	const handleChange = (day: Day) => {
		console.log(day.date);
		setCurrentDate(day.date);
	};

	return (
		<Box width='100%'>
			<Header date={currentDate} />
			<Body date={currentDate} dayChange={handleChange} />
		</Box>
	);
};
