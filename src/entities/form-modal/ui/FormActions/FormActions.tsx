'use client';

import { Button } from '@/shared/ui';
import { FormActionsProps } from '../../model/types';

import styles from './FormActions.module.scss';

export const FormActions = ({
	onClose,
	onSubmit,
	isSubmitting,
	submitResult,
}: FormActionsProps) => {
	return (
		<div className={styles.actions}>
			<Button
				text='Отмена'
				type='button'
				onClick={onClose}
			/>
			<Button
				text={isSubmitting ? 'Отправка...' : 'Создать пост'}
				type='submit'
				variant='primary'
				disabled={isSubmitting}
				onClick={onSubmit}
			/>
			{submitResult && <div className={styles.result}>{submitResult}</div>}
		</div>
	);
};
