import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Day } from "../../../types/Day";
import { WEEKDAYS } from "../constants";
import { DayComponent } from "./Day";
import { getRenderedDays } from "./utils";

interface Props {
	date: Date;

	dayChange: (day: Day) => void;
}

export const Body: FC<Props> = ({ date, dayChange }) => {
	return (
		<Box width='100%'>
			<Box display='flex' justifyContent='space-between' px='6%'>
				{WEEKDAYS.map((weekday) => (
					<Typography sx={{ width: "calc(100%/8)" }} key={weekday}>
						{weekday}
					</Typography>
				))}
			</Box>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
				}}>
				{getRenderedDays(date).map((day) => {
					return (
						<DayComponent
							key={`${day.month}-${day.number}`}
							day={day}
							dayChange={dayChange}
						/>
					);
				})}
			</Box>
		</Box>
	);
};
