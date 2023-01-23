import { Typography } from "@mui/material";
import { FC } from "react";
import { MONTHS } from "./constants";

interface Props {
	date: Date;
}

export const Header: FC<Props> = ({ date }) => {
	return (
		<Typography variant='h3' pl='6%'>
			{`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
		</Typography>
	);
};
