'use client';

import { type FC } from 'react';
import clsx from 'clsx';

import { Button } from '@/shared/ui';
import { useTodoStatsWidget } from '../model/useTodoStatsWidget';

import styles from './TodoStats.module.scss';

export const TodoStats: FC = () => {
	const { stats, currentFilter, filters, setFilter, clearCompleted } = useTodoStatsWidget();

	return (
		<div className={styles.todoStats}>
			<span className={styles.counter}>{stats.active} задач осталось</span>
			<div className={styles.filters}>
				{filters.map((filter) => (
					<Button
						key={filter.key}
						onClick={() => setFilter(filter.key)}
						text={filter.label}
						size='small'
						className={clsx(styles.filterButton, {
							[styles.active]: currentFilter === filter.key,
						})}
					/>
				))}
			</div>
			<div className={styles.actions}>
				<Button
					size='small'
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
