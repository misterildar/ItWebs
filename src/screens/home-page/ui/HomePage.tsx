'use client';

import { Button } from '@/shared/ui';
import { FormModal } from '@/entities/form-modal';
import { useModalStore } from '@/entities/modal/store';

import styles from './HomePage.module.scss';

export const HomePage = () => {
	const { openModal } = useModalStore();

	const handleOpenFormModal = () => {
		openModal(<FormModal />);
	};

	return (
		<section className={styles.section}>
			<h1 className={styles.text}>Демонстрация работы с API</h1>
			<p className={styles.text}>
				Нажмите кнопку ниже, чтобы открыть модальное окно с формой для создания поста:
			</p>
			<Button
				text='Создать новый пост'
				onClick={handleOpenFormModal}
				variant='primary'
			/>
		</section>
	);
};
