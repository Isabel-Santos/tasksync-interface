// import React, {useState} from "react";
// import { Link } from "react-router-dom";
// import LoginForm from "../components/LoginForm";
// import { login } from "../api/api"; // ou onde estiver seu serviço de login
// import { saveAccessToken, saveRefreshToken } from "../utils/auth";
// import axios from "axios"; // Importando o axios

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // Mantendo o estado para erros
//   const navigate = useNavigate(); // Hook para navegação

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("Enviando dados para o login:", { email, password });

//     if (!email || !password) {
//       setErrorMessage("Por favor, preencha todos os campos.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/auth/login",
//         { email, password },
//         {
//           headers: {
//             "Content-Type": "application/json", // Garantir que o Content-Type seja o correto
//           }
//         }
//       );

//       console.log("Resposta do servidor:", response);

//       if (response.data.token) {
//         // Se o login for bem-sucedido
//         localStorage.setItem("token", response.data.token); // Armazenando o token
//         console.log("Token armazenado:", localStorage.getItem("token"));
//         alert("Login bem-sucedido!");
//         navigate("/dashboard"); // Redirecionamento após o login
//       } else {
//         // Se a resposta não contiver um token
//         setErrorMessage("Credenciais inválidas!");
//       }
//     } catch (error) {
//       console.error("Erro ao fazer login:", error.response || error);

//       if (!error.response) {
//         // Erro de conexão (quando o servidor não responde)
//         setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão.");
//       } else if (error.response.status === 401) {
//         // Erro de credenciais inválidas
//         setErrorMessage("Credenciais inválidas! Verifique seu e-mail e senha.");
//       } else if (error.response.status === 400) {
//         // Caso o servidor retorne erro 400 (bad request)
//         setErrorMessage("Sessão expirada ou token inválido. Faça login novamente.");
//       } else if (error.response.status === 500) {
//         // Erro interno no servidor
//         setErrorMessage("Erro interno do servidor. Tente novamente mais tarde.");
//       } else {
//         // Outros erros de resposta do servidor
//         setErrorMessage("Erro desconhecido. Tente novamente.");
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//             setErrorMessage("");  // Limpar mensagem de erro ao digitar
//           }}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Senha"
//           value={password}
//           onChange={(e) => {
//             setPassword(e.target.value);
//             setErrorMessage("");  // Limpar mensagem de erro ao digitar
//           }}
//           required
//         />
//         <button type="submit">Entrar</button>
//       </form>
//       {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibindo a mensagem de erro */}
//       <p>
//         Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

// const Login = () => {
//   return (
//     <div>
//       <LoginForm />
//       {/* <p style={{ textAlign: "center", marginTop: "10px" }}>
//         Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
//       </p> */}
//     </div>
//   );
// };

// export default Login;


// const Login = ({ onLoginSuccess }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(email, password);
//       // Salva os tokens
//       saveAccessToken(response.access_token);
//       saveRefreshToken(response.refresh_token);
//       // Notifica o App que login foi bem sucedido
//       if (onLoginSuccess) onLoginSuccess();
//     } catch (error) {
//       setErrorMsg("Email ou senha inválidos");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Senha"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Entrar</button>
//     </form>
//   );
// };

// export default Login;

import React from "react";

import LoginForm from "../components/LoginForm"; // ou o caminho correto



const Login = ({ onLoginSuccess }) => {

  return (

    <div>

      <LoginForm onLoginSuccess={onLoginSuccess} />

    </div>

  );

};



export default Login;
