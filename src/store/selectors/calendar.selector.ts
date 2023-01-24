import { Tag } from "../../types";
import { RootState } from "../store";

export const currentDateSelector = (state: RootState) =>
	state.calendar.currentDate;

export const daysSelector = (state: RootState) => state.calendar.days;

export const tagsSelector = (state: RootState) =>
	state.calendar.events.reduce((acc, event) => {
		const tags: Tag[] = event.tags || [];
		return [...acc, ...tags];
	}, [] as Tag[]);
