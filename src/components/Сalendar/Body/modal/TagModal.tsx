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
import { tagModalSelector } from "../../../../store/selectors/ui.selector";
import { addTag } from "../../../../store/slices/calendar.slice";
import { toggleModal } from "../../../../store/slices/ui.slice";

export const TagModal = () => {
	const dispatch = useDispatch();

	const { open, data } = useSelector(tagModalSelector);

	const [title, setTitle] = useState("");
	const [color, setColor] = useState("");

	const handleClose = () => {
		dispatch(toggleModal({ modal: "tagModal", data: null }));
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
		if (!data?.eventId || !data.date) return;

		const { eventId, date } = data;
		dispatch(addTag({ eventId, date, title, color }));
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle textAlign='center'>Create tag</DialogTitle>
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
