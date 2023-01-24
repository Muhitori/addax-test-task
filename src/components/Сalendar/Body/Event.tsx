import { Box } from "@mui/system";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Event } from "../../../types";
import { TagComponent } from "./Tag";

interface Props {
	event: Event;
	index: number;
}

export const EventComponent: FC<Props> = ({ event, index }) => {
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
						mb={1}>
						{event.title}

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
				</div>
			)}
		</Draggable>
	);
};
