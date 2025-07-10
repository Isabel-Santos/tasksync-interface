import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const location = useLocation();

  // Rotas onde a NavBar principal NÃO deve aparecer
  const noNavRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/dashboard'
  ];

  const shouldShowNav = !noNavRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {shouldShowNav && <NavBar />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
