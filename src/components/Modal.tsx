import React, { useState } from 'react';

export default function Modal(props: any) {
	const { active, setActive } = props;
	const [form, setForm] = useState(props.value);
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setForm(e.target.value);
	};
	return (
		<div
			className={active ? 'modal active' : 'active'}
			onClick={() => setActive(false)}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<h3>Edit Task</h3>
				<input type='text' value={form} onChange={e => handleChange(e)} />
				<button onClick={() => props.updateTask(form)}>confirm</button>
			</div>
		</div>
	);
}
