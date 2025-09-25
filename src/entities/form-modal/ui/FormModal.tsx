'use client';

import { Input } from '@/shared/ui';
import { useFormModal } from '../model/useFormModal';
import { FileUpload } from './FileUpload/FileUpload';
import { FormActions } from './FormActions/FormActions';

import styles from './FormModal.module.scss';

export const FormModal = () => {
	const {
		form: { register },
		errors,
		isSubmitting,
		submitResult,
		watchedFile,
		onSubmit,
		onClose,
		onFileChange,
	} = useFormModal();

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Создать новый пост</h2>
			<form
				onSubmit={onSubmit}
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

				<FileUpload
					file={watchedFile}
					onFileChange={onFileChange}
					error={errors.file?.message ? String(errors.file.message) : undefined}
				/>

				<FormActions
					onClose={onClose}
					onSubmit={onSubmit}
					isSubmitting={isSubmitting}
					submitResult={submitResult}
				/>
			</form>
		</div>
	);
};
