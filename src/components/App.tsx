import React, { useState, useEffect, useRef } from 'react';
import { ITodo } from '../types/data';
import { TodoList } from './TodoList';

const App: React.FC = () => {
	const [value, setValue] = useState('');
	const [todos, setTodos] = useState<ITodo[]>([]);

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
	return (
		<div className='App'>
			<div>
				<input value={value} onChange={ev => setValue(ev.target.value)} />
				<button onClick={addTodo}>Add</button>
			</div>
			<TodoList items={todos} />
		</div>
	);
};

export default App;
