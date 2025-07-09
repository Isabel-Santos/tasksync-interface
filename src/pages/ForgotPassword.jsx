// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/forms.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // sucesso ou erro
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      await axios.post("https://localhost:5000/auth/forgot-password", { email });
      setStatus("success");
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* <h2>Esqueci minha senha</h2> */}
      {status === "success" ? (
        <p className="success-message">
          Se o e-mail estiver cadastrado, enviamos um link para redefinir sua senha.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {status === "error" && (
            <p className="error-message">
              Houve um erro ao enviar o link. Tente novamente.
            </p>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar link"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
