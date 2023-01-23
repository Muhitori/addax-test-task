import { Box } from "@mui/system";
import { FC } from "react";
import { Event } from "../../../types";
import { TagComponent } from "./Tag";

interface Props {
	event: Event;
}

export const EventComponent: FC<Props> = ({ event }) => {
	return (
		<div draggable>
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
	);
};
