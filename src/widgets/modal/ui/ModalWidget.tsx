'use client';

import { useModalStore } from '@/entities/modal/store';
import { Modal } from '@/shared/ui/';

export const ModalWidget = () => {
	const { isOpen, content, closeModal, showCloseButton } = useModalStore();

	if (!isOpen || !content) {
		return null;
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={closeModal}
			showCloseButton={showCloseButton}
		>
			{content}
		</Modal>
	);
};
