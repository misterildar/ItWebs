'use client';

import { NavLink } from '@/shared/ui';
import { NAVIGATION_ITEMS } from './model/constants';
import styles from './Header.module.scss';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<nav className={styles.navigation}>
					{NAVIGATION_ITEMS.map((item, index) => (
						<NavLink
							key={index}
							href={item.href}
							title={item.name}
						/>
					))}
				</nav>
			</div>
		</header>
	);
};
