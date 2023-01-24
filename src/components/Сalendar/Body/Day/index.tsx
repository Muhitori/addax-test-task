import { Box, Typography } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FC, useMemo, useState } from "react";
import { Day, Event } from "../../../../types";
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

const applyFilters = (
	event: Event,
	eventSearchValue: string,
	tagSearchValue: string[]
) => {
	const titleMatched = event.title.includes(eventSearchValue);
	const tagIncluded = event.tags?.some(({ title }) =>
		tagSearchValue.includes(title)
	);

	if (!tagSearchValue.length) {
		return titleMatched;
	}

	return titleMatched && tagIncluded;
};

export const DayComponent: FC<Props> = ({
	day,
	eventSearchValue,
	tagSearchValue,
}) => {
	const renderedEvents = day.events?.filter((event) =>
		applyFilters(event, eventSearchValue, tagSearchValue)
	);

	const renderedHolidays = day.holidays?.filter((event) =>
		applyFilters(event, eventSearchValue, tagSearchValue)
	);

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
		<Box
			width='calc(100%/7)'
			height='80px'
			sx={{
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

			{renderedHolidays?.map((holiday) => (
				<EventComponent key={holiday.id} event={holiday} />
			))}

			<Droppable droppableId={day.date.toISOString()}>
				{(provided, snapshot) => (
					<div
						style={{
							width: "100%",
							height: "100%",
						}}
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{renderedEvents?.map((event, index) => (
							<Draggable key={event.id} draggableId={event.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}>
										<EventComponent event={event} />
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<ContextMenu
				anchorEl={anchorEl}
				open={open}
				handleClose={handleClose}
				day={day}
			/>
		</Box>
	);
};
