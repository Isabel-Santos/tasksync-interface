import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { storeToken } from "../utils/auth";
import "../styles/forms.css";

const SignUpForm = ({ onSubmit, errorMessage, loading }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail]     = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError]     = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     onSubmit({ username, email, password, confirmPassword });
//     try {
//       const response = await fetch("http://localhost:5000/auth/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         storeToken(data.token);
//         navigate("/home"); // ou "/dashboard", conforme sua estrutura
//       } else {
//         setError(data.message || "Erro ao cadastrar usuário.");
//       }
//     } catch (err) {
//       console.error("Erro de cadastro:", err);
//       setError("Erro ao se registrar. Tente novamente.");
//     }
//    };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ username, email, password, confirmPassword });
//   };

//   return (
//     <div className="form-container">
//       <h2>Cadastro</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nome de Usuário</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             minLength={3}
//           />
//         </div>
//         <div>
//           <label>E-mail</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Senha</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={8}
//           />
//         </div>
//         <button type="submit">Registrar</button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password, confirmPassword });
  };


return (
    <div className="form-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar"}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SignUpForm;