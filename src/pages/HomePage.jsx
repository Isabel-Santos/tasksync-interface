// import React from "react";
// import "../styles/homepage.css"; // CSS da homepage

// const HomePage = () => {
//   return (
//     <div className="home-page-container">
//       <header className="home-header">
//         <h1>Bem-vindo ao TaskSync!</h1>
//         <p>Gerencie suas tarefas de forma fácil e eficiente.</p>
//       </header>
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

// Componente para a seção de Perguntas Frequentes (FAQ)
const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b-2 border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 px-6 text-xl md:text-2xl hover:bg-gray-700 transition-colors"
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8"><path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-6 bg-gray-800">
          <p className="text-lg md:text-xl">{children}</p>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="bg-black text-white">
      {/* Seção Principal (Hero) */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Overlay escuro para dar contraste */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Conteúdo da Seção */}
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Organize o seu trabalho. <br /> Libere a sua mente.
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            TaskSync é a sua central de produtividade. Planeie, execute e conclua as suas tarefas sem esforço.
          </p>
          <div className="mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg md:text-xl px-8 py-4 rounded-md transition-transform duration-200 hover:scale-105"
            >
              Comece Agora <FiChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Seção de Perguntas Frequentes (FAQ) */}
      <div className="py-16 md:py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="space-y-2">
            <FaqItem question="O que é o TaskSync?">
              TaskSync é uma ferramenta de gestão de tarefas desenhada para ajudar indivíduos e equipas a organizar, priorizar e acompanhar o seu trabalho de forma visual e intuitiva, usando um quadro Kanban.
            </FaqItem>
            <FaqItem question="O TaskSync é gratuito?">
              Sim, o TaskSync oferece um plano gratuito completo com todas as funcionalidades essenciais para a gestão de tarefas pessoais e de pequenas equipas.
            </FaqItem>
            <FaqItem question="Como posso usar o quadro Kanban?">
              O nosso quadro Kanban é dividido em colunas (ex: "A fazer", "Em andamento", "Concluído"). Você pode criar cartões para cada tarefa e arrastá-los entre as colunas à medida que o trabalho progride, dando uma visão clara do seu fluxo de trabalho.
            </FaqItem>
             <FaqItem question="Posso usar em qualquer dispositivo?">
              Sim! O TaskSync é totalmente responsivo e foi desenhado para funcionar perfeitamente no seu computador, tablet ou smartphone, mantendo-o sincronizado onde quer que esteja.
            </FaqItem>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="py-12 bg-black border-t-8 border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400">
          <p>Dúvidas? Fale conosco.</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <a href="#!" className="hover:underline">FAQ</a>
            <a href="#!" className="hover:underline">Central de Ajuda</a>
            <a href="#!" className="hover:underline">Termos de Uso</a>
            <a href="#!" className="hover:underline">Privacidade</a>
          </div>
          <p className="mt-8 text-sm text-center">Copyright © 2025 - TaskSync</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
