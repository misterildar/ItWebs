import { ReactNode } from 'react';
import { create } from 'zustand';

interface OpenModalOptions {
	showCloseButton?: boolean;
}

interface ModalState {
	isOpen: boolean;
	content: ReactNode | null;
	showCloseButton: boolean;
	openModal: (content: ReactNode, options?: OpenModalOptions) => void;
	closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	content: null,
	showCloseButton: true,
	openModal: (content, options = {}) => {
		const { showCloseButton = true } = options;
		set({ isOpen: true, content, showCloseButton });
	},
	closeModal: () =>
		set({
			isOpen: false,
			content: null,
			showCloseButton: true,
		}),
}));
