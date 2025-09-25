'use client';

import { useState, ChangeEvent, DragEvent } from 'react';
import { Input } from '@/shared/ui';
import { FileUploadProps } from '../../model/types';

import styles from './FileUpload.module.scss';

export const FileUpload = ({ file, onFileChange, error }: FileUploadProps) => {
	const [isDragOver, setIsDragOver] = useState(false);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || undefined;
		onFileChange(selectedFile);
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (event: DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		setIsDragOver(false);
		const droppedFile = event.dataTransfer.files[0];
		if (droppedFile) {
			onFileChange(droppedFile);
		}
	};

	const handleRemoveFile = () => {
		onFileChange(undefined);
	};

	return (
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
					<div className={styles.uploadIcon}>{file ? '✅' : '📁'}</div>
					<div className={styles.uploadText}>
						<span className={styles.uploadMainText}>
							{file ? 'Файл выбран' : 'Перетащите файл сюда или'}
						</span>
						<label
							htmlFor='file'
							className={styles.uploadButton}
						>
							выберите файл
						</label>
					</div>
					<div className={styles.uploadHint}>Поддерживаются: изображения, документы, архивы</div>
				</div>
				<Input
					id='file'
					type='file'
					onChange={handleFileChange}
					className={styles.hiddenInput}
				/>
			</div>
			{file && (
				<div className={styles.fileInfo}>
					<div className={styles.fileDetails}>
						<span className={styles.fileName}>{file.name}</span>
						<span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
					</div>
					<button
						type='button'
						className={styles.removeFile}
						onClick={handleRemoveFile}
					>
						✕
					</button>
				</div>
			)}
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
};
