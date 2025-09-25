'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalStore } from '@/entities/modal/store';
import { jsonplaceholderApi } from '@/shared/api';
import { formSchema, FormData } from './schemas';

export const useFormModal = () => {
	const { closeModal } = useModalStore();
	const [submitResult, setSubmitResult] = useState<string | null>(null);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			file: undefined,
		},
	});

	const {
		handleSubmit,
		reset,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = form;
	const watchedFile = watch('file');

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

	const handleFileChange = (file: File | undefined) => {
		setValue('file', file);
	};

	return {
		form,
		errors,
		isSubmitting,
		submitResult,
		watchedFile,
		onSubmit: handleSubmit(onSubmit),
		onClose: handleClose,
		onFileChange: handleFileChange,
	};
};
