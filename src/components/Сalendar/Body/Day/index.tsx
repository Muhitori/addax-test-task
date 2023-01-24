import { Box, Typography } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";
import { FC, useMemo, useState } from "react";
import { Day } from "../../../../types";
import { EventComponent } from "../Event";
import { ContextMenu } from "./ContextMenu";

interface Props {
	day: Day;
	eventSearchValue: string;
	tagSearchValue: string[];
}

const SELECTED_COLOR = "#3498db";
const CURRENT_MONTH_COLOR = "black";
const NOT_CURRENT_MONTH_COLOR = "#95a5a6";

export const DayComponent: FC<Props> = ({
	day,
	eventSearchValue,
	tagSearchValue,
}) => {
	const renderedEvents = day.events?.filter((event) => {
		const titleMatched = event.title.includes(eventSearchValue);
		const tagIncluded = event.tags?.some(({ title }) =>
			tagSearchValue.includes(title)
		);

		if (!tagSearchValue.length) {
			return titleMatched;
		}

		return titleMatched && tagIncluded;
	});

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const backgroundColor = useMemo(
		() => (day.selected ? SELECTED_COLOR : undefined),
		[day]
	);

	const color = useMemo(
		() => (day.isCurrentMonth ? CURRENT_MONTH_COLOR : NOT_CURRENT_MONTH_COLOR),
		[day]
	);

	return (
		<Droppable droppableId={day.date.toISOString()}>
			{(provided, snapshot) => (
				<div
					style={{
						width: "calc(100%/7)",
						height: "80px",
					}}
					{...provided.droppableProps}
					ref={provided.innerRef}>
					<Box
						sx={{
							height: "100%",
							overflowY: "auto",
							backgroundColor,
							color,
						}}
						border='1px solid black'
						display='flex'
						flexDirection='column'
						onContextMenu={handleRightClick}>
						<Typography fontSize={18} variant='body2'>
							{day.dayNumber}
						</Typography>

						{renderedEvents?.map((event, index) => (
							<EventComponent key={event.id} event={event} index={index} />
						))}
					</Box>
					<ContextMenu
						anchorEl={anchorEl}
						open={open}
						handleClose={handleClose}
						day={day}
					/>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};
