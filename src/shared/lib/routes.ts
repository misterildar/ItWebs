export const ROUTES = {
	ITWEBS: '/',
	MINI_STORE: '/mini-store',
	TODO: '/todo',
	RESUME: '/resume',
} as const;

export const NAVIGATION_ROUTES = [
	{ name: 'ITWEBS', href: ROUTES.ITWEBS },
	{ name: 'Mini Store', href: ROUTES.MINI_STORE },
	{ name: 'To-Do', href: ROUTES.TODO },
	{ name: 'Resume', href: ROUTES.RESUME },
] as const;
