import { Day } from "../../types";
import { parseDate } from "../../utils/date";
import { RootState } from "../store";

export const currentDateSelector = (state: RootState) =>
	state.calendar.currentDate;
export const eventsSelector = (state: RootState) => state.calendar.events;

export const dayEventsSelector = (day: Day) => (state: RootState) =>
	state.calendar.events.filter((event) => {
		const {
			day: eventDay,
			month: eventMonth,
			year: eventYear,
		} = parseDate(event.date);
		const { dayNumber, month, year } = day;

		return eventDay === dayNumber && eventMonth === month && eventYear === year;
	});
