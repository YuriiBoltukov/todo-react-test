import React from 'react';
import { TodoItem } from './TodoItem';
import { ITodoList } from '../types/data';

const TodoList: React.FC<ITodoList> = props => {
	return (
		<div>
			{props.items.map(el => (
				<TodoItem key={el.id} />
			))}
		</div>
	);
};

export { TodoList };
