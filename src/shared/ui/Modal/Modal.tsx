'use client';

import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './Modal.module.scss';

interface ModalProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

export const Modal = ({ children, isOpen, onClose, className }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isOpen) {
			dialog.showModal();
		} else {
			if (dialog.open) {
				dialog.close();
			}
		}
	}, [isOpen]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		const handleClose = () => {
			if (isOpen) {
				onClose();
			}
		};
		dialog.addEventListener('close', handleClose);
		return () => {
			dialog.removeEventListener('close', handleClose);
		};
	}, [isOpen, onClose]);

	const modalClasses = clsx(styles.modal, className);

	const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
		if (event.target === dialogRef.current) {
			onClose();
		}
	};

	return (
		<dialog
			ref={dialogRef}
			className={modalClasses}
			onClick={handleBackdropClick}
		>
			<button
				type='button'
				className={styles.close}
				onClick={onClose}
				aria-label='Закрыть модальное окно'
			>
				&times;
			</button>

			{children}
		</dialog>
	);
};
