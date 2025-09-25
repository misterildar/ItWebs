'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { Button } from '@/shared/ui';
import { useTodoStats, useTodoFilter, useTodoActions } from '@/entities/todo';

import styles from './TodoStats.module.scss';

export const TodoStats: FC = () => {
	const stats = useTodoStats();

	const currentFilter = useTodoFilter();

	const { setFilter, clearCompleted } = useTodoActions();

	const filters = [
		{ key: 'all' as const, label: 'Все', count: stats.total },
		{ key: 'active' as const, label: 'Активные', count: stats.active },
		{ key: 'completed' as const, label: 'Завершенные', count: stats.completed },
	];

	return (
		<div className={styles.todoStats}>
			<span className={styles.counter}>{stats.active} задач осталось</span>
			<div className={styles.filters}>
				{filters.map((filter) => (
					<Button
						key={filter.key}
						onClick={() => setFilter(filter.key)}
						text={filter.label}
						className={clsx(styles.filterButton, {
							[styles.active]: currentFilter === filter.key,
						})}
					/>
				))}
			</div>
			<div className={styles.actions}>
				<Button
					onClick={clearCompleted}
					text='Очистить завершенные'
					disabled={stats.completed === 0}
					className={clsx(styles.actionsButton, {
						[styles.active]: stats.completed > 0,
					})}
				/>
			</div>
		</div>
	);
};
