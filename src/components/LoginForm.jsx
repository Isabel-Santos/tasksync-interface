import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, verify2FA } from "../api/api";
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi'; // Importa o ícone de alerta

// Constantes para a lógica de bloqueio
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_SECONDS = 60;

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
  
  // --- NOVOS ESTADOS PARA CONTROLO DE TENTATIVAS ---
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  
  const navigate = useNavigate();

  // Efeito para o cronómetro de bloqueio do formulário
  useEffect(() => {
    let timer;
    if (isLocked && lockoutTime > 0) {
      timer = setInterval(() => {
        setLockoutTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (lockoutTime === 0 && isLocked) {
      setIsLocked(false);
      setLoginAttempts(0); // Zera as tentativas após o bloqueio
      setErrorMessage(""); // Limpa a mensagem de bloqueio
    }
    return () => clearInterval(timer);
  }, [isLocked, lockoutTime]);


  // Efeito para o cronómetro de reenvio do 2FA
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
      setLoginAttempts(0); // Zera as tentativas em caso de sucesso
      setSuccessMessage(response.data.message || "Código de verificação enviado!");
      setStep('tfa');
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      // --- LÓGICA DE BLOQUEIO APLICADA AQUI ---
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        setIsLocked(true);
        setLockoutTime(LOCKOUT_DURATION_SECONDS);
        setErrorMessage(`Muitas tentativas de login. Por segurança, o acesso foi bloqueado temporariamente.`);
      } else {
        setErrorMessage(error.response?.data?.message || `Credenciais inválidas. Tentativa ${newAttempts} de ${MAX_LOGIN_ATTEMPTS}.`);
      }
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
              <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
              <p className="mt-1 text-sm text-gray-500">Você precisa logar para acessar o conteúdo.</p>
            </div>

            {/* Mensagem de Erro ou Bloqueio */}
            {errorMessage && (
              <div className={`p-3 rounded-md text-sm text-center ${isLocked ? 'bg-yellow-100 text-yellow-800' : 'bg-red-50 text-red-600'}`}>
                {isLocked && <FiAlertTriangle className="inline-block mr-2 mb-1" />}
                {errorMessage}
                {isLocked && <p className="font-semibold mt-1">Por favor, tente novamente em {lockoutTime} segundos.</p>}
              </div>
            )}
            
            <form onSubmit={handleCredentialSubmit} className="space-y-3">
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                <input id="email" type="email" value={email} placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} required autoComplete="email" disabled={isLocked} className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-200 disabled:cursor-not-allowed" />
              </div>
              <div>
                <label htmlFor="password"className="text-sm font-semibold text-gray-700 block mb-1">Senha</label>
                <input id="password" type="password" value={password} placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" disabled={isLocked} className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-200 disabled:cursor-not-allowed" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" disabled={isLocked} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Lembre-me</label>
                </div>
                <Link to="/forgot-password" className={`text-sm font-medium text-indigo-600 hover:text-indigo-500 ${isLocked ? 'pointer-events-none text-gray-400' : ''}`}>Esqueceu a senha?</Link>
              </div>
              <button type="submit" disabled={isLoading || isLocked} className="w-full px-4 py-3 mt-2 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-300">
                {isLocked ? `Bloqueado (${lockoutTime}s)` : (isLoading ? 'Aguarde...' : 'Login')}
              </button>
            </form>
          </>
        ) : (
          // A etapa de 2FA continua a mesma
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
                <input id="code-2fa" type="text" placeholder="_ _ _ _ _ _" value={code} onChange={(e) => setCode(e.target.value)} maxLength="6" required autoComplete="one-time-code" className="w-full px-4 py-2 text-center tracking-widest text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <button type="submit" disabled={isLoading || resendLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
                {isLoading ? 'Verificando...' : 'Verificar e Entrar'}
              </button>
            </form>
            <div className="text-center text-sm text-gray-500 pt-2">
              {canResend ? (
                <button onClick={handleResendCode} disabled={resendLoading} className="w-full px-4 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
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
          <p>Copyright &copy; 2025 - <span translate="no">TaskSync</span></p>
        </div>
    </div>
  );
};

export default LoginForm;
