import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
	text: string;
	onClick?: () => void;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
	type?: 'button' | 'reset' | 'submit';
	variant?: 'default' | 'primary';
}

export const Button = ({
	text,
	onClick,
	disabled,
	loading,
	className,
	type = 'button',
	variant = 'default',
}: ButtonProps) => {
	const disabledClass = disabled ? styles.disabled : '';
	const variantClass = variant === 'primary' ? styles.primary : '';

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(disabledClass, styles.button, variantClass, className)}
		>
			{loading ? (
				<div
					className={styles.spinner}
					aria-label='loading'
				/>
			) : (
				<p>{text}</p>
			)}
		</button>
	);
};
