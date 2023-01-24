import { Box, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { Tag } from "../../../../types";

interface Props {
	tag: Tag;
}

export const TagComponent: FC<Props> = ({ tag: { id, title, color } }) => {
	return (
		<Tooltip title={title}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "32px",
					height: "8px",
					backgroundColor: color,
					borderRadius: "5px",
					cursor: "pointer",
				}}>
				<Typography noWrap fontSize={8} variant='caption'>
					{title}
				</Typography>
			</Box>
		</Tooltip>
	);
};
