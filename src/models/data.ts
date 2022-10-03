export interface ITodo {
	id: number;
	title: string;
	complete: boolean;
}

export interface ITodoItem extends ITodo {
	toggleComplete: (id: number) => void;
	removeTodo: (id: number) => void;
	updateTodo: (id: number, title: string) => void;
}

export interface ITodoList {
	items: ITodo[];
	toggleComplete: (id: number) => void;
	removeTodo: (id: number) => void;
	updateTodo: (id: number, title: string) => void;
}
