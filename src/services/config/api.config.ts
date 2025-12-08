import axios, { AxiosError, AxiosInstance } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			const isVerifyEndpoint = error.config?.url?.includes('/api/Auth/verify')
			if (!isVerifyEndpoint) {
				window.location.href = '/login'
			}
		}
		return Promise.reject(error)
	}
)

export function parseMessageFromAxiosError(err: unknown, defaultMessage: string) {
	if (!isAxiosError(err))
		return defaultMessage;

	var data = err.response?.data as { message?: string; }
	return data?.message ?? defaultMessage;
}

export function isAxiosError(err: unknown): err is AxiosError {
	return !!err && typeof err === 'object' && 'response' in err;
}