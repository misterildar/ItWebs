import { ReactNode } from 'react';
import { useModalStore } from '@/entities/modal/store';

export const useModal = () => {
	const { openModal, closeModal, isOpen } = useModalStore();

	const showModal = (content: ReactNode) => {
		openModal(content);
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
