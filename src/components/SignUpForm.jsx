import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

const SignUpForm = ({ onSubmit, errorMessage, loading }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, email, password, confirmPassword });
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
                <div className="text-left">
                    <h2 className="text-2xl font-bold text-center text-gray-900">Criar Conta</h2>
                    <p className="mt-1 text-sm text-center text-gray-500">Comece a organizar as suas tarefas hoje mesmo.</p>
                </div>

                {errorMessage && <p className="text-sm text-center text-red-600 bg-red-50 p-2 rounded-md">{errorMessage}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="username" className="text-sm font-semibold text-gray-700 block mb-1">Nome de usuário</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Como devemos chamá-lo?"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="text-sm font-semibold text-gray-700 block mb-1">Senha</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Crie uma senha forte (mín. 8 caracteres)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password"className="text-sm font-semibold text-gray-700 block mb-1">Confirmar Senha</label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirme a sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                            className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>
                    
                    <button type="submit" disabled={loading} className="w-full px-4 py-3 mt-2 text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-colors duration-300">
                        {loading ? "A criar conta..." : "Cadastrar"}
                    </button>
                </form>
                
                <div className="text-sm text-center text-gray-600 pt-3 border-t border-gray-200">
                    <span>Já tem uma conta? </span>
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Faça o login</Link>
                </div>
            </div>

            <div className="absolute bottom-6 text-center w-full text-gray-600 text-xs">
                <p>Copyright &copy; 2025 - <span translate="no">TaskSync</span></p>
            </div>
        </div>
    );
};

export default SignUpForm;
