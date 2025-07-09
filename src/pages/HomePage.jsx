import React from "react";
import "../styles/homepage.css"; // CSS da homepage

const HomePage = () => {
  return (
    <div className="home-page-container">
      <header className="home-header">
        <h1>Bem-vindo ao TaskSync!</h1>
        <p>Gerencie suas tarefas de forma fácil e eficiente.</p>
      </header>
    </div>
  );
};

export default HomePage;