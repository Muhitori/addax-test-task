import { Box, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux/es/exports";
import { currentDateSelector } from "../../store/selectors/calendar.selector";
import { MONTHS } from "./constants";

interface Props {
	eventSearchValue: string;
	onEventSearchValueChange: (value: string) => void;
}

export const Header: FC<Props> = ({
	eventSearchValue,
	onEventSearchValueChange,
}) => {
	const date = useSelector(currentDateSelector);

	return (
		<Box display='flex' justifyContent='space-between' px={10}>
			<Typography variant='h3'>
				{`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
			</Typography>
			<TextField
				label='Events search'
				value={eventSearchValue}
				onChange={(e) => onEventSearchValueChange(e.target.value)}
			/>
		</Box>
	);
};
