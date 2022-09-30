export interface ITodo {
	id: number;
	title: string;
	complete: boolean;
}

export interface ITodoItem extends ITodo {}

export interface ITodoList {
	items: ITodo[];
}
