import { RootState } from "../store";

export const currentDateSelector = (state: RootState) =>
	state.calendar.currentDate;

export const daysSelector = (state: RootState) => state.calendar.days;
