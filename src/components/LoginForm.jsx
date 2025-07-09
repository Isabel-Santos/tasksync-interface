// import React, { useState, useEffect } from "react";

// import { useNavigate, Link } from "react-router-dom";

// import axios from "axios";

// import { storeAccessToken } from "../utils/auth";

// import "../styles/forms.css"



// const LoginForm = ({onLoginSuccess}) => {

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();



// const validateEmail = (email) => {

//   const regex = /\S+@\S+\.\S+/;

//   return regex.test(email);

// }



//   const handleSubmit = async (e) => {

//     e.preventDefault();



//     if (!email || !password) {

//       setErrorMessage("Por favor, preencha todos os campos.");

//       return;

//     }



//     if (!validateEmail(email)) {

//       setErrorMessage("Digite um email válido.");

//       return;

//     }



//     try {

//       const response = await axios.post("https://localhost:5000/auth/login", {

//         email, password

//       });



//       // const data = await response.json();



//       if (response.data.access_token) {

//         storeAccessToken(response.data.access_token);

//         if (onLoginSuccess) onLoginSuccess(); // avisa o App

//         navigate("/dashboard");

//         } else {

//           setErrorMessage("Credenciais inválidas!");

//         }

//     } catch (error) {

//       if (!error.response) {

//         setErrorMessage("Servidor não  responde.");

//       } else if (error.response.status === 401) {

//         setErrorMessage("Credenciais inválidas!");

//       } else if (error.response.status === 400) {

//         setErrorMessage("Sessão expirada ou token inválido!");

//       } else if (error.response.status === 429) {

//         setErrorMessage("Muitas tentativas de login. Tente novamente em 1 minuto.");

//       } else if (error.reponse.status === 500) {

//         setErrorMessage("Erro no servidor. Tente mais tarde.")

//       } else {

//         setErrorMessage("Erro desconhecido. Tente novamente.")

//       }

//       console.error("Erro de login:", error);

//     }

//   };



//   return (

//     <div className="form-container">

//       <h2>Login</h2>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

     

//       <form onSubmit={handleSubmit}>

//           {/* <label>Email</label> */}

//           <input

//             type="email"

//             placeholder="Digite seu email"

//             autoComplete="email"

//             value={email}

//             onChange={(e) => setEmail(e.target.value)}

//             required

//           />



//           {/* <label>Senha</label> */}

//           <input

//             type="password"

//             placeholder="Digite sua senha"

//             autoComplete="current-password"

//             value={password}

//             onChange={(e) => setPassword(e.target.value)}

//             required

//           />



//         <button type="submit">Entrar</button>

//       </form>



//         <div className="forgot-password-link">

//           <Link to="/forgot-password">Esqueceu a senha?</Link>

//         </div>

       

//       <p style={{ marginTop: "1rem"}}>

//         Não tem uma conta? <Link to="/signup">Cadastre-se</Link>

//       </p>

//     </div>

//   );

// };



// export default LoginForm;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveAccessToken, saveRefreshToken } from "../utils/auth";
import { login, verify2FA } from "../api/api"; // Supondo que você moverá a lógica para api.js
// import "../styles/forms.css"; // Mantendo seu CSS original

const LoginForm = ({ onLoginSuccess }) => {
 // Estado para controlar a etapa do formulário ('credentials' ou 'tfa')
 const [step, setStep] = useState('credentials');
 const [code, setCode] = useState(""); // Guarda o código 2FA
 const [successMessage, setSuccessMessage] = useState("");


 // Estado para os campos dos formulários
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

// Estado para feedback ao usuário
const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);

const navigate = useNavigate();

  // Etapa 1: Enviar email e senha
  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

//     try {
//       const response = await fetch("https://localhost:5000/auth/login", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
    try {
      const response = await login(email, password);
      // Se deu certo, mostra mensagem de sucesso e avança para a próxima etapa
      setSuccessMessage(response.data.message);
      setStep('tfa');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  };

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage(data.message);
//         setStep('tfa');
//       } else {
//         setErrorMessage(data.message || "Credenciais inválidas!");
//       }

//     } catch (error) {
//       setErrorMessage("Erro de conexão. O servidor está online?");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Etapa 2: Enviar o código 2FA
//   const handleTfaSubmit = async (e) => {
//     e.preventDefault();
//     if (!code) {
//       setErrorMessage("Por favor, insira o código de verificação.");
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const response = await fetch("https://localhost:5000/auth/verify-2fa", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, code }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         saveAccessToken(data.access_token);
//         saveRefreshToken(data.refresh_token);

//         if (data.user) {
//           localStorage.setItem('user', JSON.stringify(data.user));
//         }

//         if (onLoginSuccess) onLoginSuccess();
//         navigate("/dashboard");
//       } else {
//         setErrorMessage(data.message || "Código inválido.");
//       }
//     } catch (error) {
//       setErrorMessage("Erro de conexão. O servidor está online?");
//     } finally {
//       setIsLoading(false);
//     }
//   };

// Função para a segunda etapa (código 2FA)
  const handleTfaSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    try {
      await verify2FA(email, code); // A função já salva os tokens
      if (onLoginSuccess) onLoginSuccess();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Código inválido.");
    } finally {
      setIsLoading(false);
    }
  };

  // Renderização condicional: mostra um formulário ou outro
  if (step === 'tfa') {
    return (
      <div className="form-container">
        <h2>Verificação de Duas Etapas</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleTfaSubmit}>
          <input
            type="text"
            placeholder="Digite o código do seu e-mail"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength="6"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
          </button>
        </form>
      </div>
    );
  }

  // Formulário original de login (para a primeira etapa)
  return (
    // Container principal que centraliza o formulário na tela
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Card do formulário com dimensões ajustadas */}
      <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-lg">
        {/* Renderização condicional baseada na etapa */}
        {step === 'credentials' ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Login</h2>
            {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
            <form onSubmit={handleCredentialSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  // Padding ajustado para py-3 (12px)
                  className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="text-right text-sm">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</Link>
              </div>
              <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                {isLoading ? 'Aguarde...' : 'Entrar'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">Verificação 2FA</h2>
            {successMessage && <p className="text-sm text-center text-green-600 py-2">{successMessage}</p>}
            {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
            <form onSubmit={handleTfaSubmit} className="space-y-4">
              <div>
                <inpu
                  type="text"
                  placeholder="Digite o código de 6 dígitos"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength="6"
                  required
                  className="w-full px-4 py-3 text-center tracking-widest text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
              </button>
            </form>
          </>
        )}
        <p className="text-sm text-center text-gray-600 pt-4">
          Não tem uma conta? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { requestLogin, verify2FA } from "../api/api";

// const LoginForm = ({ onLoginSuccess }) => {
//   const [step, setStep] = useState('credentials');
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [code, setCode] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleCredentialSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");
//     try {
//       const response = await requestLogin(email, password);
//       setSuccessMessage(response.data.message);
//       setStep('tfa');
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Credenciais inválidas ou erro no servidor.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleTfaSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage("");
//     try {
//       await verify2FA(email, code);
//       if (onLoginSuccess) onLoginSuccess();
//       navigate("/dashboard");
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Código inválido ou erro no servidor.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-lg">
//         {step === 'credentials' ? (
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Login</h2>
//             {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
//             <form onSubmit={handleCredentialSubmit} className="space-y-4">
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Digite seu email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Digite sua senha"
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="text-right text-sm">
//                 <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</Link>
//               </div>
//               <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
//                 {isLoading ? 'Aguarde...' : 'Entrar'}
//               </button>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800">Verificação 2FA</h2>
//             {successMessage && <p className="text-sm text-center text-green-600 py-2">{successMessage}</p>}
//             {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
//             <form onSubmit={handleTfaSubmit} className="space-y-4">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Digite o código de 6 dígitos"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   maxLength="6"
//                   required
//                   className="w-full px-4 py-3 text-center tracking-widest text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
//                 {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
//               </button>
//             </form>
//           </>
//         )}
//         <p className="text-sm text-center text-gray-600 pt-4">
//           Não tem uma conta? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
