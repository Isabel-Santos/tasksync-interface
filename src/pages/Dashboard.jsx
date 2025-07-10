// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import TaskList from '../components/TaskList';
// import TaskFormModal from '../components/TaskFormModal'; // Importa o novo modal
// import { createTask, updateTask, getTasks } from '../api/api'; // Importa as funções da API
// import { FiHome, FiSettings, FiLogOut, FiPlus, FiSearch, FiUser } from 'react-icons/fi';

// // Componente do menu de perfil (sem alterações)
// const ProfileMenu = ({ onLogout, user }) => {
//   // ... (código do ProfileMenu continua o mesmo)
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = React.useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const defaultAvatar = "/avatar-padrao.png";

//   return (
//     <div className="relative" ref={menuRef}>
//       <button onClick={() => setIsOpen(!isOpen)} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" title="Menu de Perfil">
//         <img className="w-10 h-10 rounded-full object-cover" src={user?.avatar_url || defaultAvatar} alt="Avatar do usuário" />
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
//           <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiUser className="mr-3" /> Ver Perfil</a>
//           <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiLogOut className="mr-3" /> Sair</button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Componente principal do Dashboard
// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
  
//   // --- NOVOS ESTADOS PARA O MODAL E TAREFAS ---
//   const [tasks, setTasks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);

//   // Função para carregar as tarefas da API
//   const fetchTasks = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await getTasks();
//       setTasks(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Erro ao carregar tarefas:", error);
//       setTasks([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       navigate("/login");
//     } else {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//       fetchTasks(); // Carrega as tarefas ao montar o componente
//     }
//   }, [navigate, fetchTasks]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   // --- FUNÇÕES PARA CONTROLAR O MODAL ---
//   const handleOpenCreateModal = () => {
//     setEditingTask(null); // Garante que não há tarefa em edição
//     setIsModalOpen(true);
//   };

//   const handleOpenEditModal = (task) => {
//     setEditingTask(task); // Define a tarefa a ser editada
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingTask(null);
//   };

//   // Função para lidar com a submissão do formulário (criar ou editar)
//   const handleTaskSubmit = async (taskData) => {
//     try {
//       if (editingTask) {
//         // Atualiza a tarefa existente
//         await updateTask(editingTask.id, { ...editingTask, ...taskData });
//       } else {
//         // Cria uma nova tarefa
//         await createTask(taskData);
//       }
//       fetchTasks(); // Recarrega as tarefas da API
//       handleCloseModal(); // Fecha o modal
//     } catch (error) {
//       console.error("Erro ao salvar tarefa:", error);
//       // Opcional: mostrar um erro para o usuário no modal
//     }
//   };

//   if (!user) return null; // Ou um spinner de carregamento

//   return (
//     <div className="flex h-screen bg-gray-50 text-gray-800">
//       <aside className="hidden lg:flex w-64 bg-white shadow-md flex-col flex-shrink-0">
//         <div className="p-6 text-2xl font-bold text-indigo-600 border-b">TaskSync</div>
//         <nav className="flex-1 p-4 space-y-2">
//           <a href="#" className="flex items-center p-3 bg-indigo-100 text-indigo-600 rounded-lg font-semibold"><FiHome className="mr-3" /> Dashboard</a>
//           <a href="#" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg"><FiSettings className="mr-3" /> Configurações</a>
//         </nav>
//         <div className="p-4 border-t">
//           <button onClick={handleLogout} className="w-full flex items-center p-3 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"><FiLogOut className="mr-3" /> Sair</button>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col p-4 sm:p-8 overflow-y-auto">
//         <header className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Olá, {user?.username || 'Usuário'}!</h1>
//             <p className="text-gray-500 mt-1 text-sm sm:text-base">Bem-vindo(a) de volta!</p>
//           </div>
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <div className="relative hidden sm:block">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input type="text" placeholder="Buscar..." className="pl-10 pr-2 py-2 rounded-lg border w-32 sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
//             </div>
//             {/* Botão "Nova Tarefa" agora abre o modal */}
//             <button onClick={handleOpenCreateModal} className="flex items-center bg-indigo-600 text-white px-3 py-2 sm:px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
//               <FiPlus className="mr-0 sm:mr-2" />
//               <span className="hidden sm:inline">Nova Tarefa</span>
//             </button>
//             <ProfileMenu onLogout={handleLogout} user={user} />
//           </div>
//         </header>
        
//         {/* Passando as tarefas e as funções para o TaskList */}
//         <TaskList 
//           tasks={tasks} 
//           isLoading={isLoading}
//           onEditTask={handleOpenEditModal} 
//           onDeleteTask={fetchTasks} // Passa fetchTasks para recarregar após deletar
//           onUpdateTask={fetchTasks} // Passa fetchTasks para recarregar após mudar status
//         />
//       </main>

//       {/* Renderiza o modal */}
//       <TaskFormModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={handleTaskSubmit}
//         task={editingTask}
//       />
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { createTask, updateTask, getTasks } from '../api/api';
import { FiHome, FiSettings, FiLogOut, FiPlus, FiSearch, FiUser } from 'react-icons/fi';

const ProfileMenu = ({ onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const defaultAvatar = "/avatar-padrao.png";
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" title="Menu de Perfil">
        <img className="w-10 h-10 rounded-full object-cover" src={user?.avatar_url || defaultAvatar} alt="Avatar do usuário" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
          <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiUser className="mr-3" /> Ver Perfil</a>
          <button onClick={onLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><FiLogOut className="mr-3" /> Sair</button>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getTasks();
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
      fetchTasks();
    }
  }, [navigate, fetchTasks]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, { ...editingTask, ...taskData });
      } else {
        await createTask(taskData);
      }
      await fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Não foi possível salvar a tarefa. Tente novamente.");
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <aside className="hidden lg:flex w-64 bg-white shadow-md flex-col flex-shrink-0">
        <div className="p-6 text-2xl font-bold text-indigo-600 border-b">TaskSync</div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#!" className="flex items-center p-3 bg-indigo-100 text-indigo-600 rounded-lg font-semibold"><FiHome className="mr-3" /> Dashboard</a>
          <a href="#!" className="flex items-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg"><FiSettings className="mr-3" /> Configurações</a>
        </nav>
        <div className="p-4 border-t">
          <button onClick={handleLogout} className="w-full flex items-center p-3 text-gray-600 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"><FiLogOut className="mr-3" /> Sair</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col p-4 sm:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Olá, {user?.username || 'Usuário'}!</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Bem-vindo(a) de volta!</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden sm:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Buscar..." className="pl-10 pr-2 py-2 rounded-lg border w-32 sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <button onClick={handleOpenCreateModal} className="flex items-center bg-indigo-600 text-white px-3 py-2 sm:px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
              <FiPlus className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Nova Tarefa</span>
            </button>
            <ProfileMenu onLogout={handleLogout} user={user} />
          </div>
        </header>
        
        <TaskList 
          tasks={tasks} 
          isLoading={isLoading}
          onEditTask={handleOpenEditModal} 
          refreshTasks={fetchTasks}
        />
      </main>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleTaskSubmit}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
