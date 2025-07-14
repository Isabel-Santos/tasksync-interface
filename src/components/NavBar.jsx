// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/navbar.css"; // CSS da navbar

// const NavBar = () => {
//   return (
//     <nav className="navbar">
//       <ul className="navbar-links">
//         <li className="navbar-item">
//           <Link to="/" className="navbar-link">Início</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/login" className="navbar-link">Login</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/signup" className="navbar-link">Cadastro</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    // O header agora é posicionado sobre a imagem de fundo
    <header className="absolute top-0 left-0 right-0 z-20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl lg:text-3xl font-bold text-white">
          <span translate="no">TaskSync</span>
        </Link>
        
        {/* Links de Navegação */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/login" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors"
          >
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
