import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../api/api";
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (newPassword.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setSuccess("Senha redefinida com sucesso! Você será redirecionado para o login.");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      setError("Link inválido ou expirado. Por favor, solicite um novo link de recuperação.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
       <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center">
            <FiXCircle className="mx-auto text-red-500 h-12 w-12 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Link Inválido</h2>
            <p className="text-gray-600 mt-2">O link de redefinição de senha não foi encontrado ou é inválido.</p>
            <Link to="/forgot-password" className="mt-4 inline-block text-indigo-600 hover:underline">Solicitar um novo link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Crie uma nova senha</h2>
          <p className="mt-2 text-sm text-gray-600">Sua nova senha deve ser diferente da anterior.</p>
        </div>

        {success && (
            <div className="text-center space-y-4">
                <FiCheckCircle className="mx-auto text-green-500 h-12 w-12" />
                <p className="text-green-700">{success}</p>
            </div>
        )}

        {error && <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
        
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password"className="text-sm font-semibold text-gray-700 block mb-1">Nova Senha</label>
              <input
                id="new-password"
                type="password"
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
             <div>
              <label htmlFor="confirm-password"className="text-sm font-semibold text-gray-700 block mb-1">Confirmar Senha</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
              {loading ? "Salvando..." : "Redefinir Senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
