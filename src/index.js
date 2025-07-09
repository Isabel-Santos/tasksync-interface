// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter as Router } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <Router> {/* O Router deve envolver toda a aplicação */}
//     <App />
//   </Router>
// );

// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Importe o BrowserRouter
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Envolva o App com o BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);