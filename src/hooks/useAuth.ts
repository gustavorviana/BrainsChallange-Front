import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services'
import type { LoginRequest, RegisterRequest } from '../services'

interface UseAuthReturn {
	isLoading: boolean
	error: string | null
	success: boolean
	authStatus: AuthStatus
	login: (data: LoginRequest) => Promise<void>
	register: (data: RegisterRequest) => Promise<void>
	clearError: () => void
	clearSuccess: () => void
}

export type AuthStatus = 'Loading' | 'Authenticated' | 'Unauthenticated';

export function useAuth(): UseAuthReturn {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const [authStatus, setAuthStatus] = useState<AuthStatus>('Loading');

	const clearError = () => {
		setError(null)
	}

	const clearSuccess = () => {
		setSuccess(false)
	}

	const checkAuth = async () => {
		const status = await authService.verify();
		setAuthStatus(status ? 'Authenticated' : 'Unauthenticated');
	}

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	const login = async (data: LoginRequest): Promise<void> => {
		setIsLoading(true)
		setError(null)

		try {
			await authService.login(data)
			navigate('/')
		} catch (err: unknown) {
			if (err && typeof err === 'object' && 'response' in err) {
				const axiosError = err as {
					response?: { data?: { message?: string; detail?: string; title?: string } }
				}
				const errorMessage =
					axiosError.response?.data?.message ||
					axiosError.response?.data?.detail ||
					axiosError.response?.data?.title
				setError(
					errorMessage ||
					'As credenciais falharam. Verifique seu email e senha.'
				)
			} else {
				setError('Erro ao fazer login. Tente novamente.')
			}
			throw err
		} finally {
			setIsLoading(false)
		}
	}

	const register = async (data: RegisterRequest): Promise<void> => {
		setIsLoading(true)
		setError(null)
		setSuccess(false)

		try {
			await authService.register(data)
			setSuccess(true)
			setTimeout(() => {
				navigate('/')
			}, 1500)
		} catch (err: unknown) {
			if (err && typeof err === 'object' && 'response' in err) {
				const axiosError = err as {
					response?: { data?: { message?: string; detail?: string; title?: string } }
				}
				const errorMessage =
					axiosError.response?.data?.message ||
					axiosError.response?.data?.detail ||
					axiosError.response?.data?.title
				setError(errorMessage || 'Erro ao criar conta. Tente novamente.')
			} else {
				setError('Erro ao criar conta. Tente novamente.')
			}
			throw err
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		success,
		authStatus,
		login,
		register,
		clearError,
		clearSuccess,
	}
}

