import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Day, Event } from "../../types";
import { dayToEventComporator, getRenderedDays } from "../../utils/date";

interface MoveEventPayload {
	eventId: string;
	oldDate: string;
	newDate: string;
}

interface ReorderEventPayload {
	date: string;
	startIndex: number;
	endIndex: number;
}

export interface State {
	currentDate: Date;
	events: Event[];
	days: Day[];
}

const initialState: State = {
	currentDate: new Date(),
	days: [],
	events: [
		{
			id: crypto.randomUUID(),
			title: "test",
			color: "red",
			date: new Date(),
			tags: [
				{ id: crypto.randomUUID(), title: "tag1", color: "green" },
				{ id: crypto.randomUUID(), title: "tag2", color: "yellow" },
			],
		},
		{
			id: crypto.randomUUID(),
			title: "test2",
			color: "yellow",
			date: new Date(),
			tags: [{ id: crypto.randomUUID(), title: "tag3", color: "brown" }],
		},
	],
};

export const calendarSlice = createSlice({
	name: "calendar",
	initialState,
	reducers: {
		setCurrentDate: (state, action: PayloadAction<Date>) => {
			const date = action.payload;

			state.currentDate = date;
			const days = getRenderedDays(date);

			state.days = days.map((day) => {
				const dayEvents = state.events.filter((event) =>
					dayToEventComporator(day, event)
				);

				if (dayEvents.length) {
					return { ...day, events: dayEvents };
				}

				return day;
			});
		},
		moveEvent: (state, action: PayloadAction<MoveEventPayload>) => {
			const { eventId, oldDate, newDate } = action.payload;

			state.events = state.events.map((event) => {
				if (event.id === eventId) {
					return { ...event, date: new Date(newDate) };
				}

				return event;
			});

			state.days = state.days.map((day) => {
				//delete from old
				if (day.date.toISOString() === oldDate) {
					return {
						...day,
						events: day.events?.filter((event) => event.id !== eventId),
					};
				}

				//add event to new day
				if (day.date.toISOString() === newDate) {
					const dayEvents = day.events || [];
					return {
						...day,
						events: [
							...dayEvents,
							state.events.find((event) => event.id === eventId)!,
						],
					};
				}

				return day;
			});
		},
		reorderEvents: (state, action: PayloadAction<ReorderEventPayload>) => {
			const { date, startIndex, endIndex } = action.payload;
			const day = state.days.find((day) => day.date.toISOString() === date);

			if (!day || !day.events) return state;

			const [removed] = day.events.splice(startIndex, 1);
			day.events.splice(endIndex, 0, removed);
		},
	},
});

export const { setCurrentDate, moveEvent, reorderEvents } =
	calendarSlice.actions;

export default calendarSlice.reducer;
