import React from 'react';
import { FiHome, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = ({ onLogout }) => {
  // MUDANÇA: Adicionamos 'hidden lg:flex' para controlar a visibilidade.
  return (
    <aside className="hidden lg:flex w-64 bg-white shadow-md flex-col flex-shrink-0">
      <div className="p-6 text-2xl font-bold text-indigo-600 border-b">
        TaskSync
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center p-3 bg-indigo-100 text-indigo-600 rounded-lg font-semibold">
          <FiHome className="mr-3" /> Dashboard
        </a>
        <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FiSettings className="mr-3" /> Configurações
        </a>
      </nav>
      <div className="p-4 border-t">
        <button onClick={onLogout} className="w-full flex items-center p-3 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200">
          <FiLogOut className="mr-3" /> Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;