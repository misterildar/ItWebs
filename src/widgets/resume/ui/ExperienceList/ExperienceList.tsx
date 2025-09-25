import { EXPERIENCE_DATA } from '../../model/constants';
import styles from './ExperienceList.module.scss';

export const ExperienceList = () => {
	return (
		<ul className={styles.list}>
			{EXPERIENCE_DATA.map((experience, index) => (
				<li
					key={index}
					className={styles.item}
				>
					<div className={styles.header}>
						<strong className={styles.company}>{experience.company}</strong>
						<span className={styles.period}>{experience.period}</span>
					</div>
					<p className={styles.description}>{experience.description}</p>
				</li>
			))}
		</ul>
	);
};
