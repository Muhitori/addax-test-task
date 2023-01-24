import { Menu, MenuItem } from "@mui/material";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { setCurrentDate } from "../../../../store/slices/calendar.slice";
import { toggleModal } from "../../../../store/slices/ui.slice";
import { Day } from "../../../../types";

interface Props {
	anchorEl: HTMLElement | null;
	open: boolean;
	handleClose: () => void;
	day: Day;
}

export const ContextMenu: FC<Props> = ({
	day,
	anchorEl,
	open,
	handleClose,
}) => {
	const dispatch = useDispatch();

	const handleDaySelect = () => {
		dispatch(setCurrentDate(day.date));
		handleClose();
	};

	const handleAddEvent = () => {
		dispatch(toggleModal({ modal: "eventModal", data: { date: day.date } }));
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
			<MenuItem onClick={handleAddEvent}>Add event</MenuItem>
			<MenuItem onClick={handleDaySelect}>Select day</MenuItem>
		</Menu>
	);
};
