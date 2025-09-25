import { UserCard } from './UserCard/UserCard';
import { ExperienceList } from './ExperienceList/ExperienceList';
import { EducationList } from './EducationList/EducationList';
import styles from './ResumeWidget.module.scss';

export const ResumeWidget = () => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<UserCard />
				<div className={styles.wrapper}>
					<h2 className={styles.sectionTitle}>Опыт работы</h2>
					<ExperienceList />
				</div>
				<section className={styles.wrapper}>
					<h2 className={styles.sectionTitle}>Образование</h2>
					<EducationList />
				</section>
			</div>
		</section>
	);
};
