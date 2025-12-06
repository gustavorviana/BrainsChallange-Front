import { Link } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import AuthLayout from "@/components/Layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout title="Login">
      <LoginForm />

      <p className="text-center text-sm text-gray-600 mt-4">
        Não tem conta? <Link to="/register" className="text-blue-600 hover:underline font-medium">Registrar-se</Link>
      </p>
    </AuthLayout>
  );
}
