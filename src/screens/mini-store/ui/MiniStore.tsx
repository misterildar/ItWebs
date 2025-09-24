'use client';

import { Cards } from '@/widgets/cards';
import { Basket } from '@/entities/basket';
import { Reviews } from '@/widgets/reviews';
import { ScrollToTopButton } from '@/shared/ui';

import styles from './MiniStore.module.scss';

export const MiniStore = () => {
	return (
		<div className={styles.section}>
			<Reviews />
			<Basket />
			<Cards />
			<ScrollToTopButton />
		</div>
	);
};
