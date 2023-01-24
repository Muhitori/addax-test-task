import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Day, Event, EventDto, TagDto } from "../../types";
import { dayToEventComporator, getRenderedDays } from "../../utils/date";
import { HolidayService } from "../../services/HolidayService";
import { HOLIDAY_COLOR, HOLIDAY_TAG_COLOR } from "../../utils/constants";

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
	currentDate: Date | null;
	events: Event[];
	holidays: Event[];
	days: Day[];
}

export const getHolidaysAsync = createAsyncThunk(
	"get/holidays",
	async (year: number) => {
		const holidays = await HolidayService.getHolidays(year);

		return holidays;
	}
);

const initialState: State = {
	currentDate: null,
	days: [],
	events: [],
	holidays: [],
};

export const calendarSlice = createSlice({
	name: "calendar",
	initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<EventDto>) => {
			const { date } = action.payload;
			const event = { id: crypto.randomUUID(), ...action.payload };

			state.events = [...state.events, event];

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

			state.events = state.events.map((event) => {
				if (event.id === eventId) {
					const eventTags = event.tags || [];
					return { ...event, tags: [...eventTags, tag] };
				}

				return event;
			});

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
					const oldEvents = day.events || [];
					return { ...day, events: [...oldEvents, ...dayEvents] };
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

			if (day && day?.events) {
				const [removed] = day?.events?.splice(startIndex, 1);
				day?.events?.splice(endIndex, 0, removed);
			}
		},
		removeEvent: (state, action: PayloadAction<RemoveEventPayload>) => {
			const { eventId, date } = action.payload;

			state.events = state.events.filter((event) => event.id !== eventId);

			state.days = state.days.map((day) => {
				if (day.date.toISOString() === date.toISOString()) {
					return {
						...day,
						events: day.events?.filter((event) => event.id !== eventId),
					};
				}

				return day;
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getHolidaysAsync.fulfilled, (state, action) => {
			const holidays = action.payload;

			const events: Event[] = holidays.map(({ name, date }) => ({
				id: crypto.randomUUID(),
				title: name,
				date: new Date(date),
				color: HOLIDAY_COLOR,
				tags: [
					{
						id: crypto.randomUUID(),
						title: "Holiday",
						color: HOLIDAY_TAG_COLOR,
					},
				],
			}));

			state.holidays = events;

			state.days = state.days.map((day) => {
				const holidays = state.holidays.filter((event) =>
					dayToEventComporator(day, event)
				);

				if (holidays.length) {
					return { ...day, holidays };
				}

				return day;
			});
		});
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
