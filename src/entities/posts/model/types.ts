export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export interface CreatePostRequest {
	title: string;
	body: string;
	userId: number;
}

export interface PostFilters {
	userId?: number;
	title?: string;
}

export interface PostPagination {
	page: number;
	limit: number;
}
