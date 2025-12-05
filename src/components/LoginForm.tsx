import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

const VALID_EMAIL = "admin@admin.com";
const VALID_PASSWORD = "teste123";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    if (data.email === VALID_EMAIL && data.password === VALID_PASSWORD) {
      navigate("/");
    } else {
      setShowError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {showError && (
        <Alert
          message="As credenciais falharam"
          onClose={() => setShowError(false)}
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
        className="
          w-full bg-blue-600 hover:bg-blue-700 
          text-white font-semibold py-2 rounded-lg 
          transition-all duration-200 cursor-pointer
        "
      >
        Entrar
      </button>
    </form>
  );
}
