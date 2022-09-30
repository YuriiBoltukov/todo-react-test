import React from 'react';
import { ITodoItem } from '../models/data';

const TodoItem: React.FC<ITodoItem> = props => {
	const { id, title, complete, toggleTodo, removeTodo } = props;

	const defineTitleStyle = (complete: boolean) => {
		let titleStyle = 'title';
		if (complete === true) {
			titleStyle += ' completed-task';
		}
		return titleStyle;
	};

	return (
		<div className='todo-item'>
			<div>
				<input
					className='checkbox'
					type='checkbox'
					checked={complete}
					onChange={() => toggleTodo(id)}
				/>
			</div>
			<p className={defineTitleStyle(complete)}>{title}</p>
			<div>
				<button className='delete-btn' onClick={() => removeTodo(id)}>
					X
				</button>
			</div>
		</div>
	);
};

export { TodoItem };
