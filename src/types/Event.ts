export interface Tag {
	id: string;

	title: string;
	color: string;
}

export interface Event {
	id: string;
	title: string;
	color: string;
	date: Date;

	tags?: Tag[];
}

export interface EventDto {
	title: string;
	color: string;
	date: Date;
}

export interface TagDto {
	eventId: string;
	title: string;
	color: string;
	date: Date;
}
