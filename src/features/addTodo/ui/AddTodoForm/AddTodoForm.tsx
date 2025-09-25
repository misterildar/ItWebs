'use client';

import { useState, type FC, type FormEvent, type KeyboardEvent } from 'react';

import { Input } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { useTodoActions } from '@/entities/todo';

import styles from './AddTodoForm.module.scss';

export const AddTodoForm: FC = () => {
	const [text, setText] = useState('');

	const { addTodo } = useTodoActions();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (text.trim()) {
			addTodo(text);
			setText('');
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && text.trim()) {
			handleSubmit(event);
		}
	};

	const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
		setText(event.currentTarget.value);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}
		>
			<Input
				value={text}
				onChange={handleInputChange}
				placeholder='Что нужно сделать?'
				onKeyDown={handleKeyDown}
				variant='light'
				autoFocus
			/>
			<Button
				type='submit'
				variant='primary'
				disabled={!text.trim()}
				text='Добавить'
			/>
		</form>
	);
};
