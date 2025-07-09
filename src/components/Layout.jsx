import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar'; // Sua barra de navegação para a homepage

const Layout = ({ children }) => {
  const location = useLocation();

  // Rotas onde a NavBar principal NÃO deve aparecer
  const noNavRoutes = ['/dashboard'];

  // Verifica se a rota atual começa com algum dos caminhos em noNavRoutes
  const shouldShowNav = !noNavRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {shouldShowNav && <NavBar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;