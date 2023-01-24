import { Event } from "./Event";

export interface Day {
	isCurrentMonth: boolean;
	date: Date;
	month: number;
	dayNumber: number;
	selected: boolean;
	year: number;
	events?: Event[];
}
