'use client';

import { useModalStore } from '@/entities/modal/store';
import { FormModal } from '@/entities/form-modal';
import { Button } from '@/shared/ui';
import styles from './HomePage.module.scss';

export const HomePage = () => {
	const { openModal } = useModalStore();

	const handleOpenFormModal = () => {
		openModal(<FormModal />);
	};

	return (
		<div className={styles.section}>
			<h1>Демонстрация работы с API</h1>
			<p>Нажмите кнопку ниже, чтобы открыть модальное окно с формой для создания поста:</p>
			<Button
				text='Создать новый пост'
				onClick={handleOpenFormModal}
				className={styles.demoButton}
			/>
		</div>
	);
};
