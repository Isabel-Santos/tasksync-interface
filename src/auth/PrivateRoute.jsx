import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // A lógica de autenticação é simples: checar se o token existe.
  const isAuthenticated = !!localStorage.getItem('access_token');

  // Se estiver autenticado, renderiza o conteúdo da rota (usando <Outlet />).
  // Se não, redireciona para a página de login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;