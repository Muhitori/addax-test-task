import { RootState } from "../store";

export const tagModalSelector = (state: RootState) => state.ui.tagModal;
export const eventModalSelector = (state: RootState) => state.ui.eventModal;
