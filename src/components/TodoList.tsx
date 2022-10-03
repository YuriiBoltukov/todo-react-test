import React from 'react';
import { TodoItem } from './TodoItem';
import { ITodo, ITodoList } from '../models/data';

const TodoList: React.FC<ITodoList> = (props: ITodoList) => {
	const { items, toggleComplete, removeTodo, updateTodo }: ITodoList = props;

	return (
		<div className='item-wrapper'>
			{items.map((todo: ITodo) => (
				<TodoItem
					key={todo.id}
					toggleComplete={toggleComplete}
					removeTodo={removeTodo}
					updateTodo={updateTodo}
					{...todo}
				/>
			))}
		</div>
	);
};

export { TodoList };
