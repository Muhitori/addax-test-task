import { configureStore } from "@reduxjs/toolkit";
import CalendarReducer from "./slices/calendar.slice";
import UiReducer from "./slices/ui.slice";

export const store = configureStore({
	reducer: {
		calendar: CalendarReducer,
		ui: UiReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
