import { Box } from "@mui/system";
import { FC } from "react";
import { Event } from "../../../types";

interface Props {
	event: Event;
}

export const EventComponent: FC<Props> = ({ event }) => {
	return (
		<Box
			sx={{ backgroundColor: event.color }}
			fontSize={12}
			borderRadius={5}
			px={2}
			mb={1}>
			{event.title}
		</Box>
	);
};
