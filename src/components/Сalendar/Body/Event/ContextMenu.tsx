import { Menu, MenuItem } from "@mui/material";
import { FC } from "react";
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
	const handleAddTag = () => {
		handleClose();
	};

	const handleRemoveEvent = () => {
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
