import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Bem-vindo!</h1>
        <p className="text-gray-600 mb-6">Esta é a tela principal da aplicação.</p>
        
        <div className="flex flex-col gap-3">
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Fazer Login
          </Link>
          <Link 
            to="/register" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </div>
  );
}
