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
	};

	const removeTodo = (id: number): void => {
		setTodos(todos.filter(todo => todo.id !== id));
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
	};

	useEffect(() => {
		inputRef.current?.focus();
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
