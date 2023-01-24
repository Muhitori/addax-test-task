import {
	Autocomplete,
	Box,
	Button,
	TextField,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux/es/exports";
import {
	currentDateSelector,
	daysSelector,
	tagsSelector,
} from "../../store/selectors/calendar.selector";
import { toPng } from "html-to-image";
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
	const days = useSelector(daysSelector);
	const tags = useSelector(tagsSelector);

	const handleJSONDownload = () => {
		const a = document.createElement("a");
		a.href = URL.createObjectURL(
			new Blob([JSON.stringify(days, null, 2)], {
				type: "application/json",
			})
		);

		a.setAttribute("download", "calendar.json");
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	const handleImageDownload = () => {
		toPng(document.getElementById("root") as HTMLElement).then(function (
			dataUrl
		) {
			const a = document.createElement("a");
			a.href = dataUrl;
			a.setAttribute("download", "calendar.png");
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
	};

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
			<Box display='flex' gap={2}>
				<Button onClick={handleJSONDownload} variant='contained'>
					Export as JSON
				</Button>
				<Button onClick={handleImageDownload} variant='contained'>
					Export as Image
				</Button>
			</Box>
		</Box>
	);
};
