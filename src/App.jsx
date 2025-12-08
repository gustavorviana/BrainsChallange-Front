import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import StudentEvents from "./pages/StudentEvents";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

export default function App() {
  return (
    <Routes>
      {/* Rotas públicas - redirecionam para home se autenticado */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Rotas privadas - redirecionam para login se não autenticado */}
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/students/:studentId/events" 
        element={
          <PrivateRoute>
            <StudentEvents />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}