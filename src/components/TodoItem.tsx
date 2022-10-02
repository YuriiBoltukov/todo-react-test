import React, { useState } from 'react';
import pencil from './pencil.svg';
import trash from './trash.svg';
import { ITodoItem } from '../models/data';
import Modal from './Modal';

const TodoItem: React.FC<ITodoItem> = props => {
	const { id, title, complete, toggleTodo, removeTodo } = props;
	const [modalActive, setModalActive] = useState(false);
	const [value, setValue] = useState(title);

	const updateTask = (value: string) => {
		setValue(value);
		setModalActive(false);
	};

	const openModal = () => {
		setModalActive(true);
	};

	const defineTitleStyle = (complete: boolean) => {
		let titleStyle = 'title';
		if (complete === true) {
			titleStyle += ' completed-task';
		}
		return titleStyle;
	};

	return (
		<>
			<div className='todo-item'>
				<div>
					<label htmlFor='checkbox'></label>
					<input
						className='checkbox'
						type='checkbox'
						checked={complete}
						onChange={() => toggleTodo(id)}
					/>
				</div>
				<p className={defineTitleStyle(complete)}>{value} </p>
				<div className='btn-wrapper'>
					<div className='edit-btn'>
						<button className='btn ripple' onClick={openModal}>
							<img className='edit' src={pencil} alt='edit' />
						</button>
					</div>

					<button className='btn ripple' onClick={() => removeTodo(id)}>
						<img src={trash} alt='trash' />
					</button>
				</div>
				{modalActive && (
					<Modal
						updateTask={updateTask}
						active={modalActive}
						setActive={setModalActive}
						value={title}
					/>
				)}
			</div>
		</>
	);
};

export { TodoItem };
