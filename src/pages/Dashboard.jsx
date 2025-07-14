import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { createTask, updateTask, getTasks, getTaskById } from '../api/api';
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

  const handleOpenEditModal = async (task) => {
    try {
      const response = await getTaskById(task.id);
      setEditingTask(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes da tarefa:", error);
      alert("Não foi possível carregar os detalhes da tarefa para edição.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSubmit = async (taskData) => {
    // --- CORREÇÃO APLICADA AQUI ---
    // Monta um 'payload' limpo, garantindo que apenas os campos que o backend espera sejam enviados.
    // O campo 'priority' é ignorado, pois o seu backend não o manipula.
    const payload = {
      title: taskData.title,
      description: taskData.description || '', // Garante que a descrição seja sempre uma string
      status: taskData.status,
    };

    try {
      if (editingTask) {
        await updateTask(editingTask.id, payload);
      } else {
        await createTask(payload);
      }
      await fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert(error.response?.data?.message || "Não foi possível salvar a tarefa.");
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <aside className="hidden lg:flex w-64 bg-white shadow-md flex-col flex-shrink-0">
        <div className="p-6 text-2xl font-bold text-indigo-600 border-b" translate="no">TaskSync</div>
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
