// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout } from '../utils/auth';

// const NavBarDashboard = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     if (onLogout) onLogout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar-dashboard">
//       <div className="navbar-dashboard-content">
//         <ul className="navbar-links">
//           <li><Link to="/dashboard" className="navbar-item">Dashboard</Link></li>
//           <li><Link to="/tasks" className="navbar-item">Tarefas</Link></li>
//           <li><Link to="/profile" className="navbar-item">Perfil</Link></li>
//         </ul>
//         <div className="navbar-logout">
//           <button className="logout-btn" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBarDashboard;

import React from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import ProfileMenu from './ProfileMenu';

const DashboardHeader = ({ user, onLogout }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Olá, {user?.username || 'Usuário'}!</h1>
        <p className="text-gray-500 mt-1">Bem-vindo(a) de volta! Organize seu dia.</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar tarefas..." className="pl-10 pr-4 py-2 rounded-lg border w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
          <FiPlus className="mr-2" /> Nova Tarefa
        </button>
        <ProfileMenu onLogout={onLogout} user={user} />
      </div>
    </header>
  );
};

export default DashboardHeader;