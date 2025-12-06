import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "./Alert";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { isLoading, error, login, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    await login(data);
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="
            w-full px-3 py-2 rounded-lg border 
            border-gray-300
            bg-white
            text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          {...register("password")}
          type="password"
          className="
            w-full px-3 py-2 rounded-lg border 
            border-gray-300
            bg-white
            text-gray-800
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full bg-blue-600 hover:bg-blue-700 
          disabled:bg-blue-400 disabled:cursor-not-allowed
          text-white font-semibold py-2 rounded-lg 
          transition-all duration-200 cursor-pointer
        "
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
