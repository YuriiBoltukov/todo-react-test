import { title } from 'process';
import React, { useState, useEffect, useRef } from 'react';
import { ITodo } from '../models/data';
import { TodoList } from './TodoList';

const App: React.FC = () => {
	const [value, setValue] = useState('');
	const [todos, setTodos] = useState<ITodo[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = ev => {
		setValue(ev.target.value);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ev => {
		if (ev.key === 'Enter') {
			addTodo();
		}
	};

	const addTodo = () => {
		if (value) {
			setTodos([
				...todos,
				{
					id: Date.now(),
					title: value,
					complete: false,
				},
			]);
		}
		setValue('');
		localStorage.setItem('tasks', JSON.stringify(todos));
	};

	const removeTodo = (id: number): void => {
		setTodos(todos.filter(todo => todo.id !== id));
		if (todos.length >= 0) {
			localStorage.setItem('tasks', JSON.stringify(todos));
		} else {
			localStorage.clear();
		}
	};

	const toggleTodo = (id: number): void => {
		setTodos(
			todos.map(todo => {
				if (todo.id !== id) return todo;
				return {
					...todo,
					complete: !todo.complete,
				};
			})
		);
		localStorage.setItem('tasks', JSON.stringify(todos));
	};
	let storageTask = localStorage.getItem('tasks');
	useEffect(() => {
		inputRef.current?.focus();
		if (storageTask) {
			setTodos(JSON.parse(storageTask));
		}
	}, []);
	return (
		<div className='container'>
			<header className='header'>
				<h1>To Do List</h1>
			</header>
			<section className='section'>
				<input
					className='input'
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					ref={inputRef}
				/>
				<button className='add-btn' onClick={addTodo}>
					<span>Add</span>
				</button>
			</section>
			<section className='section'>
				<TodoList
					items={todos}
					removeTodo={removeTodo}
					toggleTodo={toggleTodo}
				/>
			</section>
		</div>
	);
};

export default App;
