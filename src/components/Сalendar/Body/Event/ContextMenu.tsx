import { Menu, MenuItem } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../../../store/slices/calendar.slice";
import { toggleModal } from "../../../../store/slices/ui.slice";
import { Event } from "../../../../types";

interface Props {
	anchorEl: HTMLElement | null;
	open: boolean;
	handleClose: () => void;
	event: Event;
}

export const ContextMenu: FC<Props> = ({
	event,
	anchorEl,
	open,
	handleClose,
}) => {
	const dispatch = useDispatch();

	const handleAddTag = () => {
		dispatch(
			toggleModal({
				modal: "tagModal",
				data: { eventId: event.id, date: event.date },
			})
		);
		handleClose();
	};

	const handleRemoveEvent = () => {
		dispatch(removeEvent({ date: event.date, eventId: event.id }));
		handleClose();
	};

	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			onContextMenu={(e) => {
				e.preventDefault();
				handleClose();
			}}
			anchorOrigin={{
				vertical: "center",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "left",
			}}>
			<MenuItem onClick={handleAddTag}>Add tag</MenuItem>
			<MenuItem onClick={handleRemoveEvent}>Remove event</MenuItem>
		</Menu>
	);
};
