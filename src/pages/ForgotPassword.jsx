// // src/pages/ForgotPassword.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/forms.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState(""); // sucesso ou erro
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("");
//     setLoading(true);

//     try {
//       await axios.post("https://localhost:5000/auth/forgot-password", { email });
//       setStatus("success");
//     } catch (error) {
//       setStatus("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-container">
//       {/* <h2>Esqueci minha senha</h2> */}
//       {status === "success" ? (
//         <p className="success-message">
//           Se o e-mail estiver cadastrado, enviamos um link para redefinir sua senha.
//         </p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Digite seu email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           {status === "error" && (
//             <p className="error-message">
//               Houve um erro ao enviar o link. Tente novamente.
//             </p>
//           )}
//           <button type="submit" disabled={loading}>
//             {loading ? "Enviando..." : "Enviar link"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/api";
import { FiArrowLeft } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await forgotPassword(email);
      setMessage("Se o e-mail estiver cadastrado, um link para redefinir sua senha foi enviado.");
    } catch (err) {
      setError("Ocorreu um erro ao tentar enviar o e-mail. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/login" className="text-gray-700 hover:text-black transition-colors duration-300 flex items-center gap-2 text-sm">
          <FiArrowLeft />
          <span>Voltar para o Login</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Esqueceu sua senha?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sem problemas! Digite seu e-mail abaixo e enviaremos um link para você criar uma nova.
          </p>
        </div>

        {message && <p className="text-sm text-center text-green-700 bg-green-50 p-3 rounded-md">{message}</p>}
        {error && <p className="text-sm text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
        
        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button type="submit" disabled={loading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
              {loading ? "Enviando..." : "Enviar Link de Recuperação"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
