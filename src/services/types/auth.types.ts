export interface LoginRequest {
	email: string
	password: string
}

export interface RegisterRequest {
	email: string
	password: string
}

export interface AuthResponse {
	token: string | null
	email: string | null
}

export interface ProblemDetails {
	type?: string | null
	title?: string | null
	status?: number | null
	detail?: string | null
	instance?: string | null
	[key: string]: unknown
}

