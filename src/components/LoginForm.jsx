// // import React, { useState, useEffect } from "react";

// // import { useNavigate, Link } from "react-router-dom";

// // import axios from "axios";

// // import { storeAccessToken } from "../utils/auth";

// // import "../styles/forms.css"



// // const LoginForm = ({onLoginSuccess}) => {

// //   const [email, setEmail] = useState("");

// //   const [password, setPassword] = useState("");

// //   const [errorMessage, setErrorMessage] = useState("");

// //   const navigate = useNavigate();



// // const validateEmail = (email) => {

// //   const regex = /\S+@\S+\.\S+/;

// //   return regex.test(email);

// // }



// //   const handleSubmit = async (e) => {

// //     e.preventDefault();



// //     if (!email || !password) {

// //       setErrorMessage("Por favor, preencha todos os campos.");

// //       return;

// //     }



// //     if (!validateEmail(email)) {

// //       setErrorMessage("Digite um email válido.");

// //       return;

// //     }



// //     try {

// //       const response = await axios.post("https://localhost:5000/auth/login", {

// //         email, password

// //       });



// //       // const data = await response.json();



// //       if (response.data.access_token) {

// //         storeAccessToken(response.data.access_token);

// //         if (onLoginSuccess) onLoginSuccess(); // avisa o App

// //         navigate("/dashboard");

// //         } else {

// //           setErrorMessage("Credenciais inválidas!");

// //         }

// //     } catch (error) {

// //       if (!error.response) {

// //         setErrorMessage("Servidor não  responde.");

// //       } else if (error.response.status === 401) {

// //         setErrorMessage("Credenciais inválidas!");

// //       } else if (error.response.status === 400) {

// //         setErrorMessage("Sessão expirada ou token inválido!");

// //       } else if (error.response.status === 429) {

// //         setErrorMessage("Muitas tentativas de login. Tente novamente em 1 minuto.");

// //       } else if (error.reponse.status === 500) {

// //         setErrorMessage("Erro no servidor. Tente mais tarde.")

// //       } else {

// //         setErrorMessage("Erro desconhecido. Tente novamente.")

// //       }

// //       console.error("Erro de login:", error);

// //     }

// //   };



// //   return (

// //     <div className="form-container">

// //       <h2>Login</h2>

// //       {errorMessage && <p className="error-message">{errorMessage}</p>}

//      

// //       <form onSubmit={handleSubmit}>

// //           {/* <label>Email</label> */}

// //           <input

// //             type="email"

// //             placeholder="Digite seu email"

// //             autoComplete="email"

// //             value={email}

// //             onChange={(e) => setEmail(e.target.value)}

// //             required

// //           />



// //           {/* <label>Senha</label> */}

// //           <input

// //             type="password"

// //             placeholder="Digite sua senha"

// //             autoComplete="current-password"

// //             value={password}

// //             onChange={(e) => setPassword(e.target.value)}

// //             required

// //           />



// //         <button type="submit">Entrar</button>

// //       </form>



// //         <div className="forgot-password-link">

// //           <Link to="/forgot-password">Esqueceu a senha?</Link>

// //         </div>

//        

// //       <p style={{ marginTop: "1rem"}}>

// //         Não tem uma conta? <Link to="/signup">Cadastre-se</Link>

// //       </p>

// //     </div>

// //   );

// // };



// // export default LoginForm;



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { saveAccessToken, saveRefreshToken } from "../utils/auth";
// import { login, verify2FA } from "../api/api"; // Supondo que você moverá a lógica para api.js
// // import "../styles/forms.css"; // Mantendo seu CSS original

// const LoginForm = ({ onLoginSuccess }) => {
//  // Estado para controlar a etapa do formulário ('credentials' ou 'tfa')
//  const [step, setStep] = useState('credentials');
//  const [code, setCode] = useState(""); // Guarda o código 2FA
//  const [successMessage, setSuccessMessage] = useState("");


//  // Estado para os campos dos formulários
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

// // Estado para feedback ao usuário
// const [errorMessage, setErrorMessage] = useState("");
// const [isLoading, setIsLoading] = useState(false);

// const navigate = useNavigate();

//   // Etapa 1: Enviar email e senha
//   const handleCredentialSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setErrorMessage("Por favor, preencha todos os campos.");
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

// //     try {
// //       const response = await fetch("https://localhost:5000/auth/login", {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       });
//     try {
//       const response = await login(email, password);
//       // Se deu certo, mostra mensagem de sucesso e avança para a próxima etapa
//       setSuccessMessage(response.data.message);
//       setStep('tfa');
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Credenciais inválidas.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

// //       const data = await response.json();

// //       if (response.ok) {
// //         setSuccessMessage(data.message);
// //         setStep('tfa');
// //       } else {
// //         setErrorMessage(data.message || "Credenciais inválidas!");
// //       }

// //     } catch (error) {
// //       setErrorMessage("Erro de conexão. O servidor está online?");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // Etapa 2: Enviar o código 2FA
// //   const handleTfaSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!code) {
// //       setErrorMessage("Por favor, insira o código de verificação.");
// //       return;
// //     }

// //     setIsLoading(true);
// //     setErrorMessage("");

// //     try {
// //       const response = await fetch("https://localhost:5000/auth/verify-2fa", {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, code }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         saveAccessToken(data.access_token);
// //         saveRefreshToken(data.refresh_token);

// //         if (data.user) {
// //           localStorage.setItem('user', JSON.stringify(data.user));
// //         }

// //         if (onLoginSuccess) onLoginSuccess();
// //         navigate("/dashboard");
// //       } else {
// //         setErrorMessage(data.message || "Código inválido.");
// //       }
// //     } catch (error) {
// //       setErrorMessage("Erro de conexão. O servidor está online?");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// // Função para a segunda etapa (código 2FA)
//   const handleTfaSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setIsLoading(true);
    
//     try {
//       await verify2FA(email, code); // A função já salva os tokens
//       if (onLoginSuccess) onLoginSuccess();
//       navigate("/dashboard");
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || "Código inválido.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Renderização condicional: mostra um formulário ou outro
//   if (step === 'tfa') {
//     return (
//       <div className="form-container">
//         <h2>Verificação de Duas Etapas</h2>
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <form onSubmit={handleTfaSubmit}>
//           <input
//             type="text"
//             placeholder="Digite o código do seu e-mail"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             maxLength="6"
//             required
//           />
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
//           </button>
//         </form>
//       </div>
//     );
//   }

//   // Formulário original de login (para a primeira etapa)
//   return (
//     // Container principal que centraliza o formulário na tela
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       {/* Card do formulário com dimensões ajustadas */}
//       <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-lg">
//         {/* Renderização condicional baseada na etapa */}
//         {step === 'credentials' ? (
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Login</h2>
//             {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
//             <form onSubmit={handleCredentialSubmit} className="space-y-4">
//               <div>
//                 <input
//                   type="email"
//                   placeholder="Digite seu email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   // Padding ajustado para py-3 (12px)
//                   className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Digite sua senha"
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="text-right text-sm">
//                 <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</Link>
//               </div>
//               <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
//                 {isLoading ? 'Aguarde...' : 'Entrar'}
//               </button>
//             </form>
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold text-center text-gray-800">Verificação 2FA</h2>
//             {successMessage && <p className="text-sm text-center text-green-600 py-2">{successMessage}</p>}
//             {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
//             <form onSubmit={handleTfaSubmit} className="space-y-4">
//               <div>
//                 <inpu
//                   type="text"
//                   placeholder="Digite o código de 6 dígitos"
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   maxLength="6"
//                   required
//                   className="w-full px-4 py-3 text-center tracking-widest text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
//                 {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
//               </button>
//             </form>
//           </>
//         )}
//         <p className="text-sm text-center text-gray-600 pt-4">
//           Não tem uma conta? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { requestLogin, verify2FA } from "../api/api";

// // const LoginForm = ({ onLoginSuccess }) => {
// //   const [step, setStep] = useState('credentials');
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [code, setCode] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const handleCredentialSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setErrorMessage("");
// //     try {
// //       const response = await requestLogin(email, password);
// //       setSuccessMessage(response.data.message);
// //       setStep('tfa');
// //     } catch (error) {
// //       setErrorMessage(error.response?.data?.message || "Credenciais inválidas ou erro no servidor.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleTfaSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setErrorMessage("");
// //     try {
// //       await verify2FA(email, code);
// //       if (onLoginSuccess) onLoginSuccess();
// //       navigate("/dashboard");
// //     } catch (error) {
// //       setErrorMessage(error.response?.data?.message || "Código inválido ou erro no servidor.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
// //       <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-lg">
// //         {step === 'credentials' ? (
// //           <>
// //             <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Login</h2>
// //             {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
// //             <form onSubmit={handleCredentialSubmit} className="space-y-4">
// //               <div>
// //                 <input
// //                   type="email"
// //                   placeholder="Digite seu email"
// //                   autoComplete="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   required
// //                   className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 />
// //               </div>
// //               <div>
// //                 <input
// //                   type="password"
// //                   placeholder="Digite sua senha"
// //                   autoComplete="current-password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   required
// //                   className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 />
// //               </div>
// //               <div className="text-right text-sm">
// //                 <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</Link>
// //               </div>
// //               <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
// //                 {isLoading ? 'Aguarde...' : 'Entrar'}
// //               </button>
// //             </form>
// //           </>
// //         ) : (
// //           <>
// //             <h2 className="text-2xl font-bold text-center text-gray-800">Verificação 2FA</h2>
// //             {successMessage && <p className="text-sm text-center text-green-600 py-2">{successMessage}</p>}
// //             {errorMessage && <p className="text-sm text-center text-red-500">{errorMessage}</p>}
// //             <form onSubmit={handleTfaSubmit} className="space-y-4">
// //               <div>
// //                 <input
// //                   type="text"
// //                   placeholder="Digite o código de 6 dígitos"
// //                   value={code}
// //                   onChange={(e) => setCode(e.target.value)}
// //                   maxLength="6"
// //                   required
// //                   className="w-full px-4 py-3 text-center tracking-widest text-lg text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 />
// //               </div>
// //               <button type="submit" disabled={isLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
// //                 {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
// //               </button>
// //             </form>
// //           </>
// //         )}
// //         <p className="text-sm text-center text-gray-600 pt-4">
// //           Não tem uma conta? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Cadastre-se</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;
import React, { useState, useEffect } from "react";
// --- CORREÇÃO 1: Importar o useNavigate ---
import { useNavigate, Link } from "react-router-dom";
import { login, verify2FA } from "../api/api";
import { FiArrowLeft } from 'react-icons/fi';

const LoginForm = ({ onLoginSuccess }) => {
  const [step, setStep] = useState('credentials');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // --- CORREÇÃO 2: Inicializar o hook useNavigate ---
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (step === 'tfa' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
      if (timer) clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await login(email, password);
      setSuccessMessage(response.data.message || "Código de verificação enviado!");
      setStep('tfa');
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Credenciais inválidas ou erro no servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTfaSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      await verify2FA(email, code);
      if (onLoginSuccess) onLoginSuccess();
      // Agora a função navigate existe e vai funcionar
      navigate("/dashboard"); 
    } catch (error) {
      setErrorMessage(error.message || "Código inválido ou erro no servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setResendLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await login(email, password);
      setSuccessMessage(response.data.message || "Um novo código foi enviado!");
      setCountdown(60);
      setCanResend(false);
      setCode("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Não foi possível reenviar o código.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link to="/" className="text-gray-700 hover:text-black transition-colors duration-300 flex items-center gap-2 text-sm">
          <FiArrowLeft />
          <span>Voltar para Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-4">
        {step === 'credentials' ? (
          <>
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <p className="mt-1 text-sm text-gray-500">Você precisa logar para acessar o conteúdo.</p>
            </div>
            {errorMessage && <p className="text-sm text-center text-red-600 bg-red-50 p-2 rounded-md">{errorMessage}</p>}
            <form onSubmit={handleCredentialSubmit} className="space-y-3">
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                <input id="email" type="email" value={email} placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
              </div>
              <div>
                <label htmlFor="password"className="text-sm font-semibold text-gray-700 block mb-1">Senha</label>
                <input id="password" type="password" value={password} placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
              </div>
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Lembre-me</label>
              </div>
              <button type="submit" disabled={isLoading} className="w-full px-4 py-3 mt-2 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors duration-300">
                {isLoading ? 'Aguarde...' : 'Login'}
              </button>
              <div className="text-right text-xs pt-1">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">Esqueceu a senha?</Link>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Verificação 2FA</h2>
                <p className="mt-1 text-sm text-gray-600">Enviamos um código para o seu e-mail.</p>
            </div>
            {successMessage && <p className="text-sm text-center text-green-700 bg-green-50 p-2 rounded-md">{successMessage}</p>}
            {errorMessage && <p className="text-sm text-center text-red-600 bg-red-50 p-2 rounded-md">{errorMessage}</p>}
            <form onSubmit={handleTfaSubmit} className="space-y-4">
              <div>
                <label htmlFor="code-2fa" className="text-sm font-semibold text-gray-700 block mb-1">Código de 6 dígitos</label>
                <input id="code-2fa" type="text" placeholder="_ _ _ _ _ _" value={code} onChange={(e) => setCode(e.target.value)} maxLength="6" required autoComplete="one-time-code" className="w-full px-4 py-2 text-center tracking-widest text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
              </div>
              <button type="submit" disabled={isLoading || resendLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors duration-300">
                {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
              </button>
            </form>
            <div className="text-center text-sm text-gray-500 pt-2">
              {canResend ? (
                <button onClick={handleResendCode} disabled={resendLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors duration-300">
                  {resendLoading ? 'Reenviando...' : 'Reenviar código'}
                </button>
              ) : (
                <span>
                  Reenviar código em <strong>00:{countdown.toString().padStart(2, '0')}</strong>
                </span>
              )}
            </div>
          </>
        )}
        <div className="text-sm text-center text-gray-600 pt-3 border-t border-gray-200">
          <span>Não tem uma conta? </span>
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Crie uma agora</Link>
        </div>
      </div>
      <div className="absolute bottom-6 text-center w-full text-gray-600 text-xs">
          <p>Copyright &copy; 2025 - TaskSync</p>
       </div>
    </div>
  );
};

export default LoginForm;
