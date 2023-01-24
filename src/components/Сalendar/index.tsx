import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../../store/slices/calendar.slice";
import { Body } from "./Body";
import { Header } from "./Header";

export const Calendar = () => {
	const dispatch = useDispatch();

	const [eventSearchValue, setEventSearchValue] = useState("");

	useEffect(() => {
		dispatch(setCurrentDate(new Date()));
	}, [dispatch]);

	const handleEventSearchValueChange = (value: string) => {
		setEventSearchValue(value);
	};

	return (
		<Box width='100%' p={3}>
			<Header
				eventSearchValue={eventSearchValue}
				onEventSearchValueChange={handleEventSearchValueChange}
			/>
			<Body eventSearchValue={eventSearchValue} />
		</Box>
	);
};
