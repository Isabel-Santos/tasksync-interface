// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/forms.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post(
        `https://localhost:5000/auth/reset-password?token=${token}`,
        { new_password: newPassword }
      );
      setSuccess("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Erro ao redefinir senha. Link inválido ou expirado.");
    }
  };

  if (!token) {
    return (
      <div className="form-container">
        <p className="error-message">Link inválido ou expirado.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Nova senha</h2>
      <form onSubmit={handleSubmit}>
        <label>Nova senha</label>
        <input
          type="password"
          placeholder="Digite sua nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>Confirmar senha</label>
        <input
          type="password"
          placeholder="Confirme sua nova senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Redefinir senha</button>
      </form>
    </div>
  );
};

export default ResetPassword;
