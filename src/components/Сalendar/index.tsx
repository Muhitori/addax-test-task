import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../../store/slices/calendar.slice";
import { Body } from "./Body";
import { Header } from "./Header";

export const Calendar = () => {
	const dispatch = useDispatch();

	const [eventSearchValue, setEventSearchValue] = useState("");
	const [tagSearchValue, setTagSearchValue] = useState<string[]>([]);

	useEffect(() => {
		dispatch(setCurrentDate(new Date()));
	}, [dispatch]);

	const handleEventSearchValueChange = (value: string) => {
		setEventSearchValue(value);
	};

	const handleTagSearchValueChange = (value: string[]) => {
		setTagSearchValue(value);
	};

	return (
		<Box width='100%' p={3}>
			<Header
				eventSearchValue={eventSearchValue}
				tagSearchValue={tagSearchValue}
				onEventSearchValueChange={handleEventSearchValueChange}
				onTagSearchValueChange={handleTagSearchValueChange}
			/>
			<Body
				eventSearchValue={eventSearchValue}
				tagSearchValue={tagSearchValue}
			/>
		</Box>
	);
};
