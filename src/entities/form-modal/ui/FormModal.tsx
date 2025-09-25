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

	const [isDragOver, setIsDragOver] = useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || undefined;
		setValue('file', file);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		const file = e.dataTransfer.files[0];
		if (file) {
			setValue('file', file);
		}
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
		<div className={styles.container}>
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
					<div
						className={`${styles.fileUploadArea} ${isDragOver ? styles.dragOver : ''}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<div className={styles.fileUploadContent}>
							<div className={styles.uploadIcon}>{watchedFile ? '✅' : '📁'}</div>
							<div className={styles.uploadText}>
								<span className={styles.uploadMainText}>
									{watchedFile ? 'Файл выбран' : 'Перетащите файл сюда или'}
								</span>
								<label
									htmlFor='file'
									className={styles.uploadButton}
								>
									выберите файл
								</label>
							</div>
							<div className={styles.uploadHint}>
								Поддерживаются: изображения, документы, архивы
							</div>
						</div>
						<Input
							id='file'
							type='file'
							onChange={handleFileChange}
							className={styles.hiddenInput}
						/>
					</div>
					{watchedFile && (
						<div className={styles.fileInfo}>
							<div className={styles.fileDetails}>
								<span className={styles.fileName}>{watchedFile.name}</span>
								<span className={styles.fileSize}>{(watchedFile.size / 1024).toFixed(1)} KB</span>
							</div>
							<button
								type='button'
								className={styles.removeFile}
								onClick={() => setValue('file', undefined)}
							>
								✕
							</button>
						</div>
					)}
					{errors.file && <span className={styles.error}>{String(errors.file.message)}</span>}
				</div>

				<div className={styles.actions}>
					<Button
						text='Отмена'
						type='button'
						onClick={handleClose}
					/>
					<Button
						text={isSubmitting ? 'Отправка...' : 'Создать пост'}
						type='submit'
						variant='primary'
						disabled={isSubmitting}
					/>
					{submitResult && <div className={styles.result}>{submitResult}</div>}
				</div>
			</form>
		</div>
	);
};
