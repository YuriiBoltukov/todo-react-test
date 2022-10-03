import React, { useState } from 'react';
import pencilIcon from '../assets/icons/pencil.svg';
import trashIcon from '../assets/icons/trash.svg';
import { ITodoItem } from '../models/data';
import Modal from './Modal';

const TodoItem: React.FC<ITodoItem> = (props: ITodoItem) => {
	const {
		id,
		title,
		complete,
		toggleComplete,
		removeTodo,
		updateTodo,
	}: ITodoItem = props;

	/**
	 * modal window state
	 */
	const [modalActive, setModalActive] = useState(false);

	/**
	 * for updating todo
	 * @param {string} value
	 */
	const updateTask = (value: string): void => {
		updateTodo(id, value);
	};

	/**
	 * for opening modal window
	 */
	const openModal = (): void => {
		setModalActive(true);
	};

	return (
		<div className='todo-item'>
			<div>
				<label htmlFor='checkbox'></label>
				<input
					className='checkbox'
					type='checkbox'
					checked={complete}
					onChange={() => toggleComplete(id)}
				/>
			</div>
			<p className={complete ? 'title completed-task' : 'title'}>{title}</p>
			<div className='btn-wrapper'>
				<div className='edit-btn'>
					<button className='btn ripple' onClick={openModal}>
						<img className='edit' src={pencilIcon} alt='To edit' />
					</button>
				</div>

				<button className='btn ripple' onClick={() => removeTodo(id)}>
					<img src={trashIcon} alt='To trash' />
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
	);
};

export { TodoItem };
