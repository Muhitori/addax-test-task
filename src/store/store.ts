import { configureStore } from "@reduxjs/toolkit";
import CalendarReducer from "./slices/calendar.slice";

export const store = configureStore({
	reducer: {
		calendar: CalendarReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
