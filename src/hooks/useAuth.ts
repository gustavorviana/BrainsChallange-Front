import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services';
import type { LoginRequest, RegisterRequest } from '@/services';
import { parseMessageFromAxiosError } from '@/services/config/api.config';

interface UseAuthReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  authStatus: AuthStatus;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

export type AuthStatus = "Loading" | "Authenticated" | "Unauthenticated";

export function useAuth(): UseAuthReturn {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("Loading");

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(false);
  };

  const checkAuth = useCallback(async () => {
    try {
      const status = await authService.verify();
      setAuthStatus(status ? "Authenticated" : "Unauthenticated");
    } catch (error) {
      setAuthStatus("Unauthenticated");
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (data: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.login(data);
      setAuthStatus("Authenticated");

      // Redireciona para a rota original ou para home
      const from =
        (location.state as { from?: { pathname: string } })?.from?.pathname ||
        "/";
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setError(parseMessageFromAxiosError(err, "Erro ao fazer login. Tente novamente mais tarde."))
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authService.register(data);
      setAuthStatus("Authenticated");
      setSuccess(true);
      setTimeout(() => {
        const from =
          (location.state as { from?: { pathname: string } })?.from?.pathname ||
          "/";
        navigate(from, { replace: true });
      }, 1500);
    } catch (err: unknown) {
      setError(parseMessageFromAxiosError(err, "Erro ao fazer login. Tente novamente mais tarde."))
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Se houver um endpoint de logout, chame aqui
      // await authService.logout()
      setAuthStatus("Unauthenticated");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return {
    isLoading,
    error,
    success,
    authStatus,
    login,
    register,
    logout,
    clearError,
    clearSuccess,
  };
}
