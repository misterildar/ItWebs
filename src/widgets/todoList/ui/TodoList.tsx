'use client';

import { TodoItem } from '@/shared/ui';
import { useFilteredTodos, useTodoActions, useSearchQuery } from '@/entities/todo';
import styles from './TodoList.module.scss';

export const TodoList = () => {
	const todos = useFilteredTodos();
	const searchQuery = useSearchQuery();
	const { toggleTodo, removeTodo } = useTodoActions();

	if (todos.length === 0) {
		if (searchQuery.trim().length > 0) {
			return (
				<div className={styles.emptyState}>
					<p className={styles.emptyStateText}>
						По запросу &quot;{searchQuery}&quot; ничего не найдено
					</p>
				</div>
			);
		}
		return (
			<div className={styles.emptyState}>
				<p className={styles.emptyStateText}>Нет задач</p>
			</div>
		);
	}

	return (
		<div className={styles.todoListContainer}>
			{searchQuery.trim().length > 0 && (
				<div className={styles.searchResults}>
					<p className={styles.searchResultsText}>Найдено задач: {todos.length}</p>
				</div>
			)}
			<div className={styles.todoList}>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={toggleTodo}
						onRemove={removeTodo}
						searchQuery={searchQuery}
					/>
				))}
			</div>
		</div>
	);
};
