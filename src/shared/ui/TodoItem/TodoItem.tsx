'use client';

import clsx from 'clsx';

import { HighlightedText } from '@/shared/ui';
import type { TodoItemProps } from '@/entities/todo/model/types';

import styles from './TodoItem.module.scss';

export const TodoItem = ({ todo, onToggle, onRemove, searchQuery }: TodoItemProps) => {
	const handleToggle = () => {
		onToggle(todo.id);
	};

	const handleRemove = () => {
		onRemove(todo.id);
	};

	return (
		<div
			className={clsx(styles.todoItem, {
				[styles.completed]: todo.completed,
			})}
		>
			<div className={styles.content}>
				<button
					className={clsx(styles.checkbox, {
						[styles.checked]: todo.completed,
					})}
					onClick={handleToggle}
					aria-label={todo.completed ? 'Отметить как незавершенное' : 'Отметить как завершенное'}
				>
					{todo.completed && (
						<svg
							width='12'
							height='12'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='3'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<polyline points='20,6 9,17 4,12' />
						</svg>
					)}
				</button>
				<span className={styles.text}>
					<HighlightedText
						text={todo.text}
						highlight={searchQuery}
						className={styles.todoText}
					/>
				</span>
			</div>
			<button
				onClick={handleRemove}
				aria-label='Удалить задачу'
				className={styles.removeButton}
			>
				✕
			</button>
		</div>
	);
};
