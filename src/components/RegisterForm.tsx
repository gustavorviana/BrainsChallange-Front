import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "./Alert";
import { useAuth } from "@/hooks/useAuth";

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { isLoading, error, success, register: registerUser, clearError, clearSuccess } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
    } catch {
      // Erro já é tratado pelo hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert
          message={error}
          onClose={clearError}
          type="error"
        />
      )}
      {success && (
        <Alert
          message="Conta criada com sucesso! Redirecionando..."
          onClose={clearSuccess}
          type="success"
        />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="email@exemplo.com"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          {...register("password")}
          type="password"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="********"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all duration-200 cursor-pointer"
      >
        {isLoading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
}
