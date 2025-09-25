import axios, { AxiosInstance } from 'axios';

const createApiClient = (baseURL: string): AxiosInstance => {
	const client = axios.create({
		baseURL,
		headers: { 'Content-Type': 'application/json' },
		timeout: 10000,
	});

	client.interceptors.request.use(
		(config) => {
			console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
			return config;
		},
		(error) => {
			console.error('API Request Error:', error);
			return Promise.reject(error);
		}
	);

	client.interceptors.response.use(
		(response) => {
			console.log(`API Response: ${response.status} ${response.config.url}`);
			return response;
		},
		(error) => {
			console.error('API Response Error:', error);
			return Promise.reject(error);
		}
	);

	return client;
};

const getApiBaseUrl = () => {
	if (typeof window !== 'undefined') {
		return '/api/proxy';
	}
	return 'http://o-complex.com:1337';
};

export const storeApi = createApiClient(getApiBaseUrl());
export const jsonplaceholderApi = createApiClient('https://jsonplaceholder.typicode.com');
