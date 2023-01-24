import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventModalSelector } from "../../../../store/selectors/ui.selector";
import { addEvent } from "../../../../store/slices/calendar.slice";
import { toggleModal } from "../../../../store/slices/ui.slice";

export const EventModal = () => {
	const dispatch = useDispatch();

	const { open, data } = useSelector(eventModalSelector);

	const [title, setTitle] = useState("");
	const [color, setColor] = useState("");

	const handleClose = () => {
		dispatch(toggleModal({ modal: "eventModal", data: null }));
		setTitle("");
		setColor("");
	};

	const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
		setColor(event.target.value);
	};

	const handleSave = () => {
		if (!data?.date) return;

		const { date } = data;
		dispatch(addEvent({ title, color, date }));
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle textAlign='center'>Create event</DialogTitle>
			<DialogContent>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
					<TextField label='Title' value={title} onChange={handleTitleChange} />
					<TextField
						label='Color'
						type='color'
						InputLabelProps={{ shrink: true }}
						value={color}
						onChange={handleColorChange}
					/>
				</Box>
			</DialogContent>
			<DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button onClick={handleSave}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};
