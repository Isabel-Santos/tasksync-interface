import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/api';
import { getAccessToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom'

const useTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]); // Estado para armazenar tarefas
  const [loading, setLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(''); // Estado para controlar os erros
  const [newTask, setNewTask] = useState(""); // Estado para título da nova tarefa
  const [taskDescription, setTaskDescription] = useState(""); // Estado para descrição da tarefa

  // Função para carregar as tarefas
  const loadTasks = async () => {
    const token = getAccessToken();

    if (!token) {
      navigate("/login"); // Redireciona para o login se o token não existir
      return;
    }
    // const userId = JSON.parse(atob(token.split('.')[1])).sub;
    try {
      setLoading(true);
      const tasksData = await getTasks();
      setTasks(tasksData);
      setError('');
    } catch (err) {
      console.error('Erro ao carregar tarefas: ', err);
      setError('Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  // Função para adicionar uma nova tarefa
  const handleAddTask = async () => {
    if (!newTask.trim()) {
      console.log("O título da tarefa não pode estar vazio!");
      return;
    }

    try {
      // const token = getAccessToken();
      // const userId = JSON.parse(atob(token.split('.')[1])).sub;
      
      const newTaskData = { 
        title: newTask, 
        description: taskDescription, 
        status: "in_progress", 
        // userId: userId, // Passa o userId para associar a tarefa ao usuário
      };

      const response = await createTask(newTaskData);
      setTasks((prev) => [...prev, response]);
      setNewTask(''); // Limpa o campo de título
      setTaskDescription(''); // Limpa o campo de descrição
      setError('');
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      setError("Erro ao criar tarefa. Tente novamente.");
    }
  };

  // Função para editar uma tarefa
  const handleEditTask = async (id, newTitle) => {
    if (!newTitle || !newTitle.trim()) {
      setError('O título da tarefa não pode estar vazio!');
      return;
    }
    try {
      await updateTask(id, newTitle); // Atualiza a tarefa no backend
      await loadTasks(); // Recarrega as tarefas após editar
    } catch (err) {
      console.error('Erro ao editar tarefa:', err);
      setError('Erro ao editar tarefa');
    }
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id); // Exclui a tarefa no backend
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Atualiza o estado local para refletir a exclusão
      setError('');
    } catch (err) {
      console.error('Erro ao excluir tarefa:', err);
      setError('Erro ao excluir tarefa');
    }
  };

  // useEffect para carregar as tarefas quando o componente for montado
  useEffect(() => {
    loadTasks(); // Carrega as tarefas ao montar o componente
  }, []); // Executa apenas uma vez após o primeiro render

  return { 
    tasks,
    loading,
    error,
    newTask,
    setNewTask,
    taskDescription,
    setTaskDescription, // Retorna o setTaskDescription para atualizar o estado da descrição
    handleAddTask,
    handleEditTask,
    handleDeleteTask
  };
};

export default useTasks;
