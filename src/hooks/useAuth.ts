import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services'
import type { LoginRequest, RegisterRequest } from '../services'

interface UseAuthReturn {
	isLoading: boolean
	error: string | null
	success: boolean
	login: (data: LoginRequest) => Promise<void>
	register: (data: RegisterRequest) => Promise<void>
	clearError: () => void
	clearSuccess: () => void
}

export function useAuth(): UseAuthReturn {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const clearError = () => {
		setError(null)
	}

	const clearSuccess = () => {
		setSuccess(false)
	}

	const login = async (data: LoginRequest): Promise<void> => {
		setIsLoading(true)
		setError(null)

		try {
			await authService.login(data)
			navigate('/')
		} catch (err: unknown) {
			if (err && typeof err === 'object' && 'response' in err) {
				const axiosError = err as {
					response?: { data?: { detail?: string; title?: string } }
				}
				const errorDetail =
					axiosError.response?.data?.detail ||
					axiosError.response?.data?.title
				setError(
					errorDetail ||
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
					response?: { data?: { detail?: string; title?: string } }
				}
				const errorDetail =
					axiosError.response?.data?.detail ||
					axiosError.response?.data?.title
				setError(errorDetail || 'Erro ao criar conta. Tente novamente.')
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
		login,
		register,
		clearError,
		clearSuccess,
	}
}

