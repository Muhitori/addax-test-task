import { Tag } from "../../types";
import { RootState } from "../store";

export const currentDateSelector = (state: RootState) =>
	state.calendar.currentDate;

export const daysSelector = (state: RootState) => state.calendar.days;

export const tagsSelector = (state: RootState) => {
	const { events, holidays } = state.calendar;

	const tags = [...events, ...holidays].reduce((acc, event) => {
		const tags: Tag[] = event.tags || [];
		return [...acc, ...tags];
	}, [] as Tag[]);

	const uniqueTags = tags.filter(
		({ title }, index, array) =>
			array.findIndex((tag) => tag.title === title) === index
	);

	return uniqueTags;
};
