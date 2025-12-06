import { apiClient } from './config/api.config'
import type { AuthResponse, LoginRequest, RegisterRequest, ProblemDetails } from './types/auth.types'

export const authService = {
	async login(data: LoginRequest): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>('/api/Auth/login', data)
		return response.data
	},

	async register(data: RegisterRequest): Promise<AuthResponse> {
		const response = await apiClient.post<AuthResponse>('/api/Auth/register', data)
		return response.data
	},

	async verify(): Promise<boolean> {
		try {
			await apiClient.get('/api/Auth/verify')
			return true;
		} catch (error) {
			return false;
		}
	},
}

export type { AuthResponse, LoginRequest, RegisterRequest, ProblemDetails }

