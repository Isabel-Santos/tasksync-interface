// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { register } from "../api/api";
// import SignUpForm from "../components/SignUpForm";

// const SignUp = () => {
//   // const [username, setUsername] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

//   const handleRegister = async ({ username, email, password, confirmPassword }) => {
//     // e.preventDefault();
//     if (!validateEmail(email)) {
//       setErrorMessage("Email inválido!");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setErrorMessage("As senhas não coincidem!");
//       return;
//     }

//     const userData = { username, email, password };

//     setLoading(true);
//     try {
//       const response = await register(userData);

//       if (response.success !== false) {
//         alert("Cadastro realizado com sucesso!");
//         navigate("/login");
//       } else {
//         setErrorMessage(response.message || "Erro ao cadastrar.");
//       }
//     } catch (err) {
//       setErrorMessage("Erro ao tentar se cadastrar. Tente novamente.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // return (
//     // <div className="form-container">
//     //   <h2>Cadastro</h2>
//     //   <form onSubmit={handleSignUp}>
//     //     <input
//     //       type="text"
//     //       placeholder="Nome de usuário"
//     //       value={username}
//     //       onChange={(e) => setUsername(e.target.value)}
//     //       required
//     //     />
//     //     <input
//     //       type="email"
//     //       placeholder="Email"
//     //       value={email}
//     //       onChange={(e) => setEmail(e.target.value)}
//     //       required
//     //     />
//     //     <input
//     //       type="password"
//     //       placeholder="Senha"
//     //       value={password}
//     //       onChange={(e) => setPassword(e.target.value)}
//     //       required
//     //     />
//     //     <input
//     //       type="password"
//     //       placeholder="Confirmar Senha"
//     //       value={confirmPassword}
//     //       onChange={(e) => setConfirmPassword(e.target.value)}
//     //       required
//     //     />
//     //     <button type="submit" disabled={loading}>
//     //       {loading ? "Carregando..." : "Cadastrar"}
//     //     </button>
//     //   </form>

//     //   {errorMessage && <p className="error-message">{errorMessage}</p>}
//     //   <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
//     // </div>
// //   );
// // };
//   return (
//     <>
//       <SignUpForm
//         onSubmit={handleRegister}
//         errorMessage={errorMessage}
//         loading={loading}
//       />
//       <p style={{ textAlign: "center"}}>
//         Já tem uma conta? <Link to="/login">Faça login</Link>
//       </p>
//     </>
//   );
// };
// export default SignUp;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  
  // --- NOVA FUNÇÃO DE VALIDAÇÃO ---
  const validateUsername = (username) => {
    // Esta expressão regular verifica se a string contém apenas letras (a-z, A-Z) e números (0-9).
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(username);
  };

  const handleRegister = async ({ username, email, password, confirmPassword }) => {
    setErrorMessage(""); 

    // --- VALIDAÇÕES DO FRONTEND ---
    if (!validateUsername(username)) {
      setErrorMessage("Nome de usuário deve conter apenas letras e números, sem espaços ou acentos.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Formato de e-mail inválido!");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    const userData = { username, email, password };

    setLoading(true);
    try {
      await register(userData);
      alert("Cadastro realizado com sucesso! Faça o login para continuar.");
      navigate("/login");
    } catch (err) {
      // Captura erros do backend (ex: email já existe)
      setErrorMessage(err.response?.data?.message || "Erro ao tentar se cadastrar. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpForm
      onSubmit={handleRegister}
      errorMessage={errorMessage}
      loading={loading}
    />
  );
};

export default SignUp;
