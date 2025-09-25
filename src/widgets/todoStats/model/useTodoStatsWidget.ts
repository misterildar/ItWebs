import { useTodoStats, useTodoFilter, useTodoActions } from '@/entities/todo';

export const useTodoStatsWidget = () => {
	const stats = useTodoStats();
	const currentFilter = useTodoFilter();
	const { setFilter, clearCompleted } = useTodoActions();

	const filters = [
		{ key: 'all' as const, label: 'Все', count: stats.total },
		{ key: 'active' as const, label: 'Активные', count: stats.active },
		{ key: 'completed' as const, label: 'Завершенные', count: stats.completed },
	];

	return {
		stats,
		currentFilter,
		filters,
		setFilter,
		clearCompleted,
	};
};
