import { ReactNode } from 'react';
import { useModalStore } from '@/entities/modal/store';

interface OpenModalOptions {
	showCloseButton?: boolean;
}

export const useModal = () => {
	const { openModal, closeModal, isOpen } = useModalStore();

	const showModal = (content: ReactNode, options?: OpenModalOptions) => {
		openModal(content, options);
	};

	const hideModal = () => {
		closeModal();
	};

	return {
		showModal,
		hideModal,
		isOpen,
	};
};
