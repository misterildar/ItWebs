import { USER_DATA } from '../../model/constants';
import styles from './UserCard.module.scss';

export const UserCard = () => {
	const { name, position, experience, description, contacts, github } = USER_DATA;

	return (
		<div className={styles.card}>
			<h1 className={styles.name}>{name}</h1>
			<h3 className={styles.position}>{position}</h3>
			<div className={styles.info}>
				<p className={styles.experience}>
					<strong>Опыт:</strong> {experience}
				</p>
				<p className={styles.description}>
					<strong>О себе:</strong> {description}
				</p>
			</div>
			<div className={styles.contacts}>
				<a
					href={`mailto:${contacts.email}`}
					className={styles.contact}
				>
					{contacts.email}
				</a>
				<span className={styles.separator}>·</span>
				<a
					href={`tel:${contacts.phone}`}
					className={styles.contact}
				>
					{contacts.phone}
				</a>
				<span className={styles.separator}>·</span>
				<a
					href={`tg://resolve?domain=${contacts.telegram}`}
					target='_blank'
					rel='noopener noreferrer'
					className={styles.contact}
				>
					Telegram
				</a>
			</div>
			<a
				href={github}
				target='_blank'
				rel='noopener noreferrer'
				className={styles.githubButton}
			>
				Мой GitHub
			</a>
		</div>
	);
};
