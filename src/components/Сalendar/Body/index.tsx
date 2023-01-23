import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { currentDateSelector } from "../../../store/selectors/calendar.selector";
import { getRenderedDays } from "../../../utils/date";
import { WEEKDAYS } from "../constants";
import { DayComponent } from "./Day";

export const Body: FC = () => {
	const date = useSelector(currentDateSelector);

	return (
		<Box width='100%'>
			<Box display='flex' justifyContent='space-between'>
				{WEEKDAYS.map((weekday) => (
					<Typography sx={{ width: "calc(100%/7)" }} key={weekday}>
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
						<DayComponent key={`${day.month}-${day.dayNumber}`} day={day} />
					);
				})}
			</Box>
		</Box>
	);
};
