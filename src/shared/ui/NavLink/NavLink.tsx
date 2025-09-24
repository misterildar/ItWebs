'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavLink.module.scss';

type NavLinkProps = {
	href: string;
	title: string;
};

export const NavLink = ({ href, title }: NavLinkProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={isActive ? styles.link_active : styles.link}
		>
			{title}
		</Link>
	);
};
