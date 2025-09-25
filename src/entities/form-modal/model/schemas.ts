import { z } from 'zod';

export const formSchema = z.object({
	title: z
		.string()
		.min(1, 'Заголовок обязателен')
		.min(3, 'Заголовок должен содержать минимум 3 символа')
		.max(100, 'Заголовок не должен превышать 100 символов'),
	file: z
		.any()
		.optional()
		.refine(
			(file) => {
				if (!file) return true;
				return file instanceof File;
			},
			{
				message: 'Пожалуйста, выберите файл',
			}
		)
		.refine(
			(file) => {
				if (!file) return true;
				const maxSize = 5 * 1024 * 1024;
				return file.size <= maxSize;
			},
			{
				message: 'Размер файла не должен превышать 5MB',
			}
		)
		.refine(
			(file) => {
				if (!file) return true;
				const allowedTypes = [
					'image/jpeg',
					'image/jpg',
					'image/png',
					'image/gif',
					'image/webp',
					'image/svg+xml',
					'image/bmp',
					'image/tiff',
					'application/pdf',
					'text/plain',
					'text/csv',
					'application/msword',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					'application/vnd.ms-excel',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					'application/vnd.ms-powerpoint',
					'application/vnd.openxmlformats-officedocument.presentationml.presentation',
					'application/zip',
					'application/x-rar-compressed',
					'application/x-7z-compressed',
					'application/x-tar',
					'application/gzip',
					'audio/mpeg',
					'audio/wav',
					'audio/ogg',
					'audio/mp4',
					'audio/aac',
					'video/mp4',
					'video/avi',
					'video/mov',
					'video/wmv',
					'video/webm',
					'video/quicktime',
					'application/json',
					'application/xml',
					'text/html',
					'text/css',
					'text/javascript',
					'application/javascript',
				];
				return allowedTypes.includes(file.type);
			},
			{
				message:
					'Поддерживаются популярные форматы: изображения (JPEG, PNG, GIF, WebP, SVG), документы (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX), архивы (ZIP, RAR, 7Z), аудио (MP3, WAV, OGG), видео (MP4, AVI, MOV), код (JSON, XML, HTML, CSS, JS)',
			}
		),
});

export type FormData = z.infer<typeof formSchema>;
