import React from 'react';
import { TodoItem } from './TodoItem';
import { ITodoList } from '../models/data';

const TodoList: React.FC<ITodoList> = props => {
	const { items, toggleTodo, removeTodo } = props;
	return (
		<div className='item-wrapper'>
			{items.map(todo => (
				<TodoItem
					key={todo.id}
					toggleTodo={toggleTodo}
					removeTodo={removeTodo}
					{...todo}
				/>
			))}
		</div>
	);
};

export { TodoList };
