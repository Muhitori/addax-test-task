import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../../store/slices/calendar.slice";
import { Body } from "./Body";
import { Header } from "./Header";

export const Calendar = () => {
	const appDispatch = useDispatch();

	useEffect(() => {
		appDispatch(setCurrentDate(new Date()));
	}, [appDispatch]);

	return (
		<Box width='100%'>
			<Header />
			<Body />
		</Box>
	);
};
