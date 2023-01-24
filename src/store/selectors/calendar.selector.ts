import { RootState } from "../store";

export const currentDateSelector = (state: RootState) =>
	state.calendar.currentDate;
export const eventsSelector = (state: RootState) => state.calendar.events;

export const daysSelector = (state: RootState) => state.calendar.days;
