'use client';

import { TodoList } from '@/widgets/todoList';
import { AddTodoForm } from '@/features/addTodo';
import { TodoStats } from '@/widgets/todoStats';
import { SearchInput } from '@/features/search';

import styles from './TodoPage.module.scss';

export const TodoPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.todoapp}>
				<AddTodoForm />
				<SearchInput />
				<TodoList />
				<TodoStats />
			</div>
		</div>
	);
};
