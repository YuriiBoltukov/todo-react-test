import React, { useState, useEffect, useRef } from 'react';
import { ITodo } from '../models/data';
import { TodoList } from './TodoList';

const App: React.FC = () => {
	/**
	 * form state
	 */
	const [form, setForm] = useState<{
		title: string;
	}>({ title: '' });

	/**
	 * todos state
	 */
	let [todos, setTodos] = useState<ITodo[]>([]);

	/**
	 * instance of HTMLInputElement
	 */
	const inputRef = useRef<HTMLInputElement>(null);

	/**
	 * for input event handling
	 * @param {React.ChangeEvent<HTMLInputElement>} {target}
	 */
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ title: target.value });
	};

	/**
	 * for handle enter keyboard event on HTMLInputElement
	 * @param {React.KeyboardEvent} {key}
	 */
	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ({
		key,
	}: React.KeyboardEvent): void => {
		if (key === 'Enter') {
			addTodo();
		}
	};

	/**
	 * for creating todo item and writing data to localStorage
	 * @returns {undefined}
	 */
	const addTodo = (): void => {
		if (!form.title) return;

		const task: ITodo = {
			id: Date.now(),
			title: form.title,
			complete: false,
		};

		todos = [task, ...todos];

		setTodos(todos);
		setForm({ title: '' });

		saveToLocalStorage<ITodo[]>('tasks', todos);
	};

	/**
	 * for saving data to localStorage
	 * @param {string} key
	 * @param {T} value
	 * @returns {undefined | Error}
	 */
	const saveToLocalStorage = <T,>(key: string, value: T): void => {
		if (!value) throw Error('Value should be defined');

		const stringValue =
			typeof value === 'string' ? value : JSON.stringify(todos);

		localStorage.setItem(key, stringValue);
	};

	/**
	 * for removing todo from todos array and writing todos to localStorage
	 * @param {number} id
	 */
	const removeTodo = (id: number): void => {
		todos = todos.filter(todo => todo.id !== id);

		setTodos([...todos]);

		if (todos.length) {
			saveToLocalStorage<ITodo[]>('tasks', todos);
		} else {
			localStorage.clear();
		}
	};

	/**
	 * to change complete state of task and write data to localStorage
	 * @param {number} id
	 */
	const toggleComplete = (id: number): void => {
		todos.forEach((todo: ITodo) => {
			if (todo.id === id) {
				todo.complete = !todo.complete;
			}
		});

		setTodos([...todos]);

		saveToLocalStorage<ITodo[]>('tasks', todos);
	};

	/**
	 * for updating todo and writing data to local storage
	 * @param {number} id
	 * @param {string} title
	 */
	const updateTodo = (id: number, title: string): void => {
		todos.forEach((todo: ITodo) => {
			if (todo.id === id) {
				todo.title = title;
			}
		});

		setTodos([...todos]);

		saveToLocalStorage<ITodo[]>('tasks', todos);
	};

	/**
	 * to check for data in local storage and if there is data, write it to the todos array
	 */
	useEffect((): void => {
		if ('tasks' in localStorage) {
			todos = JSON.parse(localStorage.getItem('tasks') || '[]');

			setTodos(todos);
		}
	}, []);

	/**
	 * to set focus to input after every todos change
	 */
	useEffect((): void => {
		inputRef.current?.focus();
	}, [todos]);

	return (
		<div className='container'>
			<header className='header'>
				<h1 className='header-title'>To Do List</h1>
				<form className='form'>
					<input
						className='input'
						value={form.title}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						ref={inputRef}
					/>
					<button className='add-btn' onClick={addTodo}>
						<span>Add</span>
					</button>
				</form>
			</header>

			<section className='section'>
				<TodoList
					items={todos}
					removeTodo={removeTodo}
					toggleComplete={toggleComplete}
					updateTodo={updateTodo}
				/>
			</section>
		</div>
	);
};

export default App;
