import AuthLayout from "../components/Layouts/AuthLayout";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <AuthLayout title="Criar Conta">
      <RegisterForm />

      <p className="text-center text-sm text-gray-600 mt-4">
        Já possui conta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Faça login
        </Link>
      </p>
    </AuthLayout>
  );
}
