import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Event } from "../../../../types";
import { ContextMenu } from "./ContextMenu";
import { TagComponent } from "./Tag";

interface Props {
	event: Event;
	index: number;
}

export const EventComponent: FC<Props> = ({ event, index }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Draggable draggableId={event.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<Box
						sx={{ backgroundColor: event.color }}
						position='relative'
						fontSize={12}
						borderRadius={5}
						px={2}
						mb={1}
						onContextMenu={handleRightClick}>
						<Typography fontSize={12} noWrap>
							{event.title}
						</Typography>

						<Box
							sx={{
								position: "absolute",
								left: "30%",
								bottom: -4,
								display: "flex",
								gap: 0.3,
							}}>
							{event.tags?.map((tag) => (
								<TagComponent key={tag.id} tag={tag} />
							))}
						</Box>
					</Box>
					<ContextMenu
						anchorEl={anchorEl}
						open={open}
						handleClose={handleClose}
						event={event}
					/>
				</div>
			)}
		</Draggable>
	);
};
