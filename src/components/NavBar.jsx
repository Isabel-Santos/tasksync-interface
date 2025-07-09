import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // CSS da navbar

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Início</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/signup" className="navbar-link">Cadastro</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;