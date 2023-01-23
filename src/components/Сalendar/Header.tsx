import { Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux/es/exports";
import { currentDateSelector } from "../../store/selectors/calendar.selector";
import { MONTHS } from "./constants";

export const Header: FC = () => {
	const date = useSelector(currentDateSelector);

	return (
		<Typography variant='h3' pl='6%'>
			{`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
		</Typography>
	);
};
