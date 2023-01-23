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
				{ title: "tag1", color: "green" },
				{ title: "tag2", color: "yellow" },
			],
		},
	],
};

export const calendarSlice = createSlice({
	name: "calendar",
	initialState,
	reducers: {
		setCurrentDate: (state, action: PayloadAction<Day>) => {
			if (!action.payload.date) return;

			state.currentDate = action.payload.date;
		},
	},
});

export const { setCurrentDate } = calendarSlice.actions;

export default calendarSlice.reducer;
