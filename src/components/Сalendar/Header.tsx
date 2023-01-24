import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux/es/exports";
import {
	currentDateSelector,
	tagsSelector,
} from "../../store/selectors/calendar.selector";
import { MONTHS } from "./constants";

interface Props {
	eventSearchValue: string;
	tagSearchValue: string[];
	onEventSearchValueChange: (value: string) => void;
	onTagSearchValueChange: (value: string[]) => void;
}

export const Header: FC<Props> = ({
	eventSearchValue,
	tagSearchValue,
	onEventSearchValueChange,
	onTagSearchValueChange,
}) => {
	const date = useSelector(currentDateSelector);
	const tags = useSelector(tagsSelector);

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
			<Autocomplete
				multiple
				filterSelectedOptions
				value={tagSearchValue}
				onChange={(_, tags) => onTagSearchValueChange(tags)}
				options={tags.map((tag) => tag.title)}
				renderInput={(params) => <TextField {...params} label='Tags' />}
			/>
		</Box>
	);
};
