import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
// --- CORREÇÃO APLICADA AQUI ---
// Os nomes dos componentes foram atualizados para corresponder aos nomes exportados
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import Layout from "./components/Layout";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
  return (
    <Layout>
      <Routes>
        {/* --- Rotas Públicas --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* As rotas agora usam os componentes corretos */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* --- Rotas Privadas --- */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
