import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Day, Event } from "../../types";

export interface State {
	currentDate: Date;
	events: Event[];
}

const initialState: State = {
	currentDate: new Date(),
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
		setCurrentDate: (state, action: PayloadAction<Day>) => {
			const { date } = action.payload;
			if (!date) return;

			state.currentDate = date;
		},
	},
});

export const { setCurrentDate } = calendarSlice.actions;

export default calendarSlice.reducer;
