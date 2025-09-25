import { EDUCATION_DATA } from '../../model/constants';
import styles from './EducationList.module.scss';

export const EducationList = () => {
	return (
		<ul className={styles.list}>
			{EDUCATION_DATA.map((education, index) => (
				<li
					key={index}
					className={styles.item}
				>
					<div className={styles.header}>
						<strong className={styles.place}>{education.place}</strong>
						<span className={styles.degree}>{education.degree}</span>
					</div>
				</li>
			))}
		</ul>
	);
};
