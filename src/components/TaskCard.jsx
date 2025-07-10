// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { FiMoreVertical, FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

// // // const TaskCard = ({ task, onDelete }) => {
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // //   // --- NOVO ESTADO PARA CONTROLAR O HOVER DO BOTÃO ---
// // //   const [isButtonHovered, setIsButtonHovered] = useState(false);
// // //   const menuRef = useRef(null);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// // //         setIsMenuOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   const getPriorityIndicator = (priority) => {
// // //     switch (priority) {
// // //       case 'Alta': return 'bg-red-500';
// // //       case 'Média': return 'bg-yellow-500';
// // //       case 'Baixa': return 'bg-green-500';
// // //       default: return 'bg-gray-300';
// // //     }
// // //   };

// // //   // Funções de exemplo
// // //   const handleEdit = () => console.log(`Editar tarefa: ${task.id}`);
// // //   const handleDeleteClick = () => onDelete(task.id);
// // //   const handleChangeStatus = () => console.log(`Mudar status da tarefa: ${task.id}`);

// // //   return (
// // //     <div className="bg-white p-4 rounded-lg shadow-md space-y-3 border border-gray-100">
      
// // //       <div className="flex items-center gap-3">
// // //         <span className={`w-3 h-3 rounded-full ${getPriorityIndicator(task.priority)}`}></span>
// // //         <p className="flex-1 font-semibold text-gray-800 truncate">{task.title}</p>
        
// // //         <div className="relative" ref={menuRef}>
// // //           {/* --- BOTÃO COM ESTILO CONTROLADO POR JS --- */}
// // //           <button 
// // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // //             // Eventos para controlar o estado de hover
// // //             onMouseEnter={() => setIsButtonHovered(true)}
// // //             onMouseLeave={() => setIsButtonHovered(false)}
// // //             // A classe do fundo agora é condicional
// // //             className={`flex-shrink-0 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 ${
// // //               isButtonHovered ? 'bg-gray-100 text-gray-900' : 'bg-transparent text-gray-500'
// // //             }`}
// // //           >
// // //             <FiMoreVertical size={20} />
// // //           </button>

// // //           {isMenuOpen && (
// // //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
// // //               <button onClick={handleEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// // //                 <FiEdit className="mr-3" size={16} /> Editar
// // //               </button>
// // //               <button onClick={handleChangeStatus} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// // //                 <FiCheckSquare className="mr-3" size={16} /> Mudar Status
// // //               </button>
// // //               <div className="my-1 h-px bg-gray-100"></div>
// // //               <button onClick={handleDelete} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
// // //                 <FiTrash2 className="mr-3" size={16} /> Excluir
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <div className="flex justify-end items-center">
// // //         <div className="flex -space-x-2">
// // //             <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=1" alt="User 1"/>
// // //             <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=2" alt="User 2"/>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TaskCard;

// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { FiMoreVertical, FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

// // // // const TaskCard = ({ task, onDelete }) => {
// // // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // // //   const menuRef = useRef(null);

// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// // // //         setIsMenuOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   const getPriorityIndicator = (priority) => {
// // // //     switch (priority) {
// // // //       case 'Alta': return 'bg-red-500';
// // // //       case 'Média': return 'bg-yellow-500';
// // // //       case 'Baixa': return 'bg-green-500';
// // // //       default: return 'bg-gray-300';
// // // //     }
// // // //   };

// // // //   const handleEdit = () => {
// // // //     console.log(`Editar tarefa: ${task.id}`);
// // // //     setIsMenuOpen(false);
// // // //   };
// // // //   const handleChangeStatus = () => {
// // // //     console.log(`Mudar status da tarefa: ${task.id}`);
// // // //     setIsMenuOpen(false);
// // // //   };
// // // //   const handleDeleteClick = () => {
// // // //     onDelete(task.id); // Chama a função passada pelo Dashboard
// // // //     setIsMenuOpen(false);
// // // //   };

// // // //   return (
// // // //     <div className="bg-white p-4 rounded-lg shadow-md space-y-3 border border-gray-100">
// // // //       <div className="flex items-center gap-3">
// // // //         <span className={`w-3 h-3 rounded-full ${getPriorityIndicator(task.priority)}`}></span>
// // // //         <p className="flex-1 font-semibold text-gray-800 truncate">{task.title}</p>
// // // //         <div className="relative" ref={menuRef}>
// // // //           <button 
// // // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // // //             className="flex-shrink-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
// // // //           >
// // // //             <FiMoreVertical size={20} />
// // // //           </button>
// // // //           {isMenuOpen && (
// // // //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
// // // //               <button onClick={handleEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// // // //                 <FiEdit className="mr-3" size={16} /> Editar
// // // //               </button>
// // // //               <button onClick={handleChangeStatus} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// // // //                 <FiCheckSquare className="mr-3" size={16} /> Mudar Status
// // // //               </button>
// // // //               <div className="my-1 h-px bg-gray-100"></div>
// // // //               <button onClick={handleDeleteClick} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
// // // //                 <FiTrash2 className="mr-3" size={16} /> Excluir
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //       <div className="flex justify-end items-center">
// // // //         <div className="flex -space-x-2">
// // // //             <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=1" alt="User 1"/>
// // // //             <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=2" alt="User 2"/>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TaskCard;




// // import React, { useState, useEffect, useRef } from 'react';
// // import { FiMoreVertical, FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

// // const TaskCard = ({ task, onDelete }) => { // onDelete é recebido aqui
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (menuRef.current && !menuRef.current.contains(event.target)) {
// //         setIsMenuOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const getPriorityIndicator = (priority) => {
// //     switch (priority) {
// //       case 'Alta': return 'bg-red-500';
// //       case 'Média': return 'bg-yellow-500';
// //       case 'Baixa': return 'bg-green-500';
// //       default: return 'bg-gray-300';
// //     }
// //   };

// //   const handleEdit = () => console.log(`Editar tarefa: ${task.id}`);
// //   const handleChangeStatus = () => console.log(`Mudar status da tarefa: ${task.id}`);
  
// //   // --- CORREÇÃO APLICADA AQUI ---
// //   // Esta função agora chama a prop onDelete passada pelo TaskList
// //   const handleDelete = () => {
// //     if (onDelete) {
// //       onDelete(task.id);
// //     }
// //     setIsMenuOpen(false);
// //   };

// //   return (
// //     <div className="bg-white p-4 rounded-lg shadow-md space-y-3 border border-gray-100">
// //       <div className="flex items-center gap-3">
// //         <span className={`w-3 h-3 rounded-full ${getPriorityIndicator(task.priority)}`}></span>
// //         <p className="flex-1 font-semibold text-gray-800 truncate">{task.title}</p>
// //         <div className="relative" ref={menuRef}>
// //           <button 
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// //             className="flex-shrink-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
// //           >
// //             <FiMoreVertical size={20} />
// //           </button>
// //           {isMenuOpen && (
// //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
// //               <button onClick={handleEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// //                 <FiEdit className="mr-3" size={16} /> Editar
// //               </button>
// //               <button onClick={handleChangeStatus} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
// //                 <FiCheckSquare className="mr-3" size={16} /> Mudar Status
// //               </button>
// //               <div className="my-1 h-px bg-gray-100"></div>
// //               {/* O botão de exclusão agora chama a função handleDelete correta */}
// //               <button onClick={handleDelete} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
// //                 <FiTrash2 className="mr-3" size={16} /> Excluir
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <div className="flex justify-end items-center">
// //         <div className="flex -space-x-2">
// //             <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=1" alt="User 1"/>
// //             <img className="w-7 h-7 rounded-full border-2 border-white" src="https://i.pravatar.cc/150?img=2" alt="User 2"/>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TaskCard;

// import React, { useState, useEffect, useRef } from 'react';
// import { FiMoreVertical, FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

// const TaskCard = ({ task, onEditTask, onDeleteTask, onStatusChange }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const getPriorityIndicator = (priority) => {
//     switch (priority) {
//       case 'Alta': return 'bg-red-500';
//       case 'Média': return 'bg-yellow-500';
//       case 'Baixa': return 'bg-green-500';
//       default: return 'bg-gray-300';
//     }
//   };
  
//   const handleEdit = () => onEditTask(task);
//   const handleDelete = () => onDeleteTask(task.id);
//   const handleChangeStatus = (newStatus) => {
//     onStatusChange(task, newStatus);
//     setIsMenuOpen(false); // Fecha o menu após a ação
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md space-y-3 border border-gray-100">
//       <div className="flex items-center gap-3">
//         <span className={`w-3 h-3 rounded-full ${getPriorityIndicator(task.priority)}`}></span>
//         <p className="flex-1 font-semibold text-gray-800 truncate">{task.title}</p>
//         <div className="relative" ref={menuRef}>
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex-shrink-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
//             <FiMoreVertical size={20} />
//           </button>
//           {isMenuOpen && (
//             <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
//               <button onClick={handleEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiEdit className="mr-3" size={16} /> Editar Tarefa</button>
//               <div className="my-1 h-px bg-gray-100"></div>
//               <p className="px-4 pt-2 pb-1 text-xs text-gray-400">Mover para...</p>
//               <button onClick={() => handleChangeStatus('Pendente')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-red-500" size={16} /> Pendente</button>
//               <button onClick={() => handleChangeStatus('A fazer')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-blue-500" size={16} /> A fazer</button>
//               <button onClick={() => handleChangeStatus('Em andamento')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-yellow-500" size={16} /> Em andamento</button>
//               <button onClick={() => handleChangeStatus('Concluído')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-green-500" size={16} /> Concluído</button>
//               <div className="my-1 h-px bg-gray-100"></div>
//               <button onClick={handleDelete} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"><FiTrash2 className="mr-3" size={16} /> Excluir</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

import React, { useState, useEffect, useRef } from 'react';
import { FiMoreVertical, FiEdit, FiTrash2, FiCheckSquare } from 'react-icons/fi';

// Recebe as funções onEditTask, onDeleteTask, e onStatusChange do componente pai (TaskColumn)
const TaskCard = ({ task, onEditTask, onDeleteTask, onStatusChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case 'Alta': return 'bg-red-500';
      case 'Média': return 'bg-yellow-500';
      case 'Baixa': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };
  
  // Funções que chamam as props recebidas do pai
  const handleEdit = () => onEditTask(task);
  const handleDelete = () => onDeleteTask(task.id);
  const handleChangeStatus = (newStatus) => {
    onStatusChange(task, newStatus);
    setIsMenuOpen(false); // Fecha o menu após a ação
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-3 border border-gray-100">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${getPriorityIndicator(task.priority)}`}></span>
        <p className="flex-1 font-semibold text-gray-800 truncate">{task.title}</p>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex-shrink-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
            <FiMoreVertical size={20} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
              <button onClick={handleEdit} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiEdit className="mr-3" size={16} /> Editar Tarefa</button>
              <div className="my-1 h-px bg-gray-100"></div>
              <p className="px-4 pt-2 pb-1 text-xs text-gray-400">Mover para...</p>
              <button onClick={() => handleChangeStatus('Pendente')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-red-500" size={16} /> Pendente</button>
              <button onClick={() => handleChangeStatus('A fazer')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-blue-500" size={16} /> A fazer</button>
              <button onClick={() => handleChangeStatus('Em andamento')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-yellow-500" size={16} /> Em andamento</button>
              <button onClick={() => handleChangeStatus('Concluído')} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiCheckSquare className="mr-3 text-green-500" size={16} /> Concluído</button>
              <div className="my-1 h-px bg-gray-100"></div>
              <button onClick={handleDelete} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"><FiTrash2 className="mr-3" size={16} /> Excluir</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
