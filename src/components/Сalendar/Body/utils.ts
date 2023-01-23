import { Day } from "../../../types/Day";

const RENDER_DAYS_COUNT = 42;

export const getRenderedDays = (date: Date) => {
	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
	const weekdayOfFirstDay = firstDayOfMonth.getDay();
	const currentDays: Day[] = [];

	for (let i = 0; i < RENDER_DAYS_COUNT; i++) {
		if (i === 0 && weekdayOfFirstDay === 0) {
			firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
		} else if (i === 0) {
			firstDayOfMonth.setDate(
				firstDayOfMonth.getDate() + (i - weekdayOfFirstDay)
			);
		} else {
			firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
		}

		const calendarDay: Day = {
			isCurrentMonth: firstDayOfMonth.getMonth() === date.getMonth(),
			date: new Date(firstDayOfMonth),
			month: firstDayOfMonth.getMonth(),
			number: firstDayOfMonth.getDate(),
			selected: firstDayOfMonth.toDateString() === date.toDateString(),
			year: firstDayOfMonth.getFullYear(),
		};

		currentDays.push(calendarDay);
	}

	return currentDays;
};
