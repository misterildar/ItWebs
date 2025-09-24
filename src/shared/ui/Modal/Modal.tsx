import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './Modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
	showCloseButton?: boolean;
}

export const Modal = ({
	isOpen,
	onClose,
	children,
	className,
	showCloseButton = true,
}: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('body-no-scroll');
		} else {
			document.body.classList.remove('body-no-scroll');
		}

		return () => {
			document.body.classList.remove('body-no-scroll');
		};
	}, [isOpen]);

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
			onCancel={onClose}
			onClick={handleBackdropClick}
		>
			{showCloseButton && (
				<button
					type='button'
					className={styles.close}
					onClick={onClose}
					aria-label='Закрыть модальное окно'
				>
					&times;
				</button>
			)}
			{children}
		</dialog>
	);
};
