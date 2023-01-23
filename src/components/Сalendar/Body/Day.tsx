import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Day } from "../../../types/Day";

interface Props {
	day: Day;
	dayChange: (day: Day) => void;
}

export const DayComponent: FC<Props> = ({ day, dayChange }) => {
	return (
		<Box
			sx={{
				backgroundColor: day.selected ? "#3498db" : undefined,
				color: day.isCurrentMonth ? "black" : "#95a5a6",
			}}
			width='calc(100%/8)'
			height='80px'
			border='1px solid black'
			onClick={() => dayChange(day)}>
			<Typography fontSize={18} variant='body2'>
				{day.number}
			</Typography>
		</Box>
	);
};
