'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/entities/modal/store';
import { Input, Button } from '@/shared/ui';
import { jsonplaceholderApi } from '@/shared/api';
import { formSchema, FormData } from '../model/schemas';

import styles from './FormModal.module.scss';

export const FormModal = () => {
	const { closeModal } = useModalStore();
	const [submitResult, setSubmitResult] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
		setValue,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			file: undefined,
		},
	});

	const watchedFile = watch('file');

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || undefined;
		setValue('file', file);
	};

	const onSubmit = async (data: FormData) => {
		setSubmitResult(null);

		try {
			const postData = {
				title: data.title,
				body: data.file ? `Прикреплен файл: ${data.file.name}` : 'Без файла',
				userId: 1,
			};

			console.log('Отправляем данные:', postData);
			const response = await jsonplaceholderApi.post('/posts', postData);
			console.log('Ответ сервера:', response.data);

			setSubmitResult(`Пост успешно создан! ID: ${response.data.id}`);

			reset();
		} catch (error) {
			console.error('Ошибка при отправке формы:', error);
			setSubmitResult(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
		}
	};

	const handleClose = () => {
		reset();
		setSubmitResult(null);
		closeModal();
	};

	return (
		<div className={styles.formModal}>
			<h2 className={styles.title}>Создать новый пост</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
			>
				<div className={styles.field}>
					<label
						htmlFor='title'
						className={styles.label}
					>
						Заголовок поста:
					</label>
					<Input
						id='title'
						type='text'
						placeholder='Введите заголовок поста'
						className={styles.input}
						{...register('title')}
					/>
					{errors.title && <span className={styles.error}>{String(errors.title.message)}</span>}
				</div>

				<div className={styles.field}>
					<label
						htmlFor='file'
						className={styles.label}
					>
						Прикрепить файл:
					</label>
					<Input
						id='file'
						type='file'
						className={styles.input}
						onChange={handleFileChange}
					/>
					{watchedFile && (
						<p className={styles.fileInfo}>
							Выбран файл: {watchedFile.name} ({(watchedFile.size / 1024).toFixed(1)} KB)
						</p>
					)}
					{errors.file && <span className={styles.error}>{String(errors.file.message)}</span>}
				</div>

				{submitResult && <div className={styles.result}>{submitResult}</div>}

				<div className={styles.actions}>
					<Button
						text='Отмена'
						type='button'
						onClick={handleClose}
						className={styles.cancelButton}
					/>
					<Button
						text={isSubmitting ? 'Отправка...' : 'Создать пост'}
						type='submit'
						disabled={isSubmitting}
						className={styles.submitButton}
					/>
				</div>
			</form>
		</div>
	);
};
