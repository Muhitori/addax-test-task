export interface Tag {
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
