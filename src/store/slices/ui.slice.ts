import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventDto, TagDto } from "../../types";

interface ToggleModalPayload {
	modal: keyof State;
	data?: Partial<EventDto> | Partial<TagDto> | null;
}

interface State {
	eventModal: {
		open: boolean;
		data: Partial<EventDto> | null;
	};
	tagModal: {
		open: boolean;
		data: Partial<TagDto> | null;
	};
}

const initialState: State = {
	eventModal: { open: false, data: null },
	tagModal: { open: false, data: null },
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleModal: (state, action: PayloadAction<ToggleModalPayload>) => {
			const { modal, data } = action.payload;

			if (modal === "eventModal") {
				state.eventModal.open = !state.eventModal.open;
				state.eventModal.data = data as EventDto | null;
			}

			if (modal === "tagModal") {
				state.tagModal.open = !state.tagModal.open;
				state.tagModal.data = data as TagDto | null;
			}
		},
	},
});

export const { toggleModal } = uiSlice.actions;

export default uiSlice.reducer;
