export interface FileUploadProps {
	file: File | undefined;
	onFileChange: (file: File | undefined) => void;
	error?: string;
}

export interface FormActionsProps {
	onClose: () => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	submitResult: string | null;
}
