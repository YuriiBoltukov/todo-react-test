import React, { useEffect, useRef, useState } from 'react';
import closeIcon from '../assets/icons/close.svg';

export default function Modal(props: any) {
	/**
	 * active state for modal window
	 */
	const { isActive, setActive } = props;

	/**
	 * form data
	 */
	const [form, setForm] = useState<{
		[key: string]: string | number;
	}>({
		title: props.value,
	});

	/**
	 * instance of HTMLInputElement
	 */
	const inputRef: React.RefObject<HTMLInputElement> =
		useRef<HTMLInputElement>(null);

	/**
	 * to handle input changes
	 * @param {React.ChangeEvent<HTMLInputElement>} target
	 */
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ title: target.value });
	};

	/**
	 * to set focus on input
	 */
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div
			className={` ${isActive ? 'modal active' : 'active'}`} // TODO fix
			onClick={() => setActive(false)}>
			<div
				className='modal-content'
				onClick={(event: React.MouseEvent) => event.stopPropagation()}>
				<div className='modal-header'>
					<h3 className='modal-title'>Edit Task</h3>
					<button className='btn' onClick={() => setActive(false)}>
						<img src={closeIcon} alt='To close' />
					</button>
				</div>
				<div className='modal-main'>
					<input
						className='modal-input'
						type='text'
						value={form.title}
						ref={inputRef}
						onChange={handleChange}
					/>
				</div>
				<div className='modal-footer'>
					<button
						className='modal-btn ripple'
						onClick={() => props.updateTask(form.title)}>
						{' '}
						{/*  TODO it shoudn't be close after click */}
						Confirm Change
					</button>
				</div>
				{/* TODO add close button! */}
			</div>
		</div>
	);
}
