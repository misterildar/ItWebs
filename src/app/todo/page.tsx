import { AddTodoForm } from '@/features/addTodo';
import { TodoList } from '@/widgets/todoList';
import { TodoStats } from '@/widgets/todoStats';
import { SearchInput } from '@/features/search';

import styles from './page.module.scss';

export default function ToDoPage() {
	return (
		<div className={styles.container}>
			<div className={styles.todoapp}>
				<h1 className={styles.title}>Задачи</h1>
				<AddTodoForm />
				<SearchInput />
				<TodoList />
				<TodoStats />
			</div>
		</div>
	);
}
