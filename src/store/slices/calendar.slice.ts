import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Day, Event, EventDto, TagDto } from "../../types";
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

interface RemoveEventPayload {
	eventId: string;
	date: Date;
}

interface State {
	currentDate: Date;
	events: Event[];
	days: Day[];
}

const initialState: State = {
	currentDate: new Date(),
	days: [],
	events: [],
};

export const calendarSlice = createSlice({
	name: "calendar",
	initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<EventDto>) => {
			const { date } = action.payload;
			const event = { id: crypto.randomUUID(), ...action.payload };

			state.days = state.days.map((day) => {
				if (day.date === date) {
					const dayEvents = day.events || [];
					return {
						...day,
						events: [...dayEvents, event],
					};
				}

				return day;
			});
		},
		addTag: (state, action: PayloadAction<TagDto>) => {
			const { date, eventId } = action.payload;
			const tag = { id: crypto.randomUUID(), ...action.payload };

			state.days = state.days.map((day) => {
				if (day.date === date) {
					const events = day.events?.map((event) => {
						if (event.id === eventId) {
							const eventTags = event.tags || [];
							return { ...event, tags: [...eventTags, tag] };
						}

						return event;
					});

					return {
						...day,
						events,
					};
				}

				return day;
			});
		},
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
		removeEvent: (state, action: PayloadAction<RemoveEventPayload>) => {
			const { eventId, date } = action.payload;

			state.events = state.events.filter((event) => event.id !== eventId);

			state.days = state.days.map((day) => {
				if (day.date === date) {
					return {
						...day,
						events: day.events?.filter((event) => event.id !== eventId),
					};
				}

				return day;
			});
		},
	},
});

export const {
	addEvent,
	addTag,
	setCurrentDate,
	moveEvent,
	reorderEvents,
	removeEvent,
} = calendarSlice.actions;

export default calendarSlice.reducer;
