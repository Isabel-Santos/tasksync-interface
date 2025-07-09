import React from "react";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import Login from "./pages/Login";

import SignUp from "./pages/SignUp";

import Dashboard from "./pages/Dashboard";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

import Layout from "./components/Layout";

import PrivateRoute from "./auth/PrivateRoute"; // 1. Importe a rota privada



const App = () => {

  return (

    <Layout>

      <Routes>

        {/* --- Rotas Públicas --- */}

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

       

        {/* --- Rotas Privadas --- */}

        {/* 2. Envolvemos as rotas que queremos proteger com o PrivateRoute */}

        <Route element={<PrivateRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

          {/* Se você tiver outras rotas privadas no futuro, adicione-as aqui */}

          {/* <Route path="/profile" element={<ProfilePage />} /> */}

        </Route>

      </Routes>

    </Layout>

  );

};



export default App;