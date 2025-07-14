import React from 'react';
import TaskColumn from './TaskColumn';
import { deleteTask, updateTask } from '../api/api';

const TaskList = ({ tasks, isLoading, onEditTask, refreshTasks }) => {

  const handleDelete = async (taskId) => {
    if (window.confirm('Tem a certeza que quer apagar esta tarefa?')) {
      try {
        await deleteTask(taskId);
        refreshTasks(); // Avisa o Dashboard para recarregar as tarefas
      } catch (error) {
        console.error("Erro ao apagar tarefa:", error);
        alert("Não foi possível apagar a tarefa.");
      }
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    const payload = {
      title: task.title,
      description: task.description || '', 
      status: newStatus,
      priority: task.priority
    };
    try {
      await updateTask(task.id, payload);
      refreshTasks();
    } catch (error) {
      console.error("Erro ao mudar o status:", error);
      alert(error.response?.data?.message || "Não foi possível mudar o status da tarefa.");
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-8">A carregar tarefas...</p>;
  }
  
  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Nenhuma tarefa encontrada. Crie uma nova!</p>;
  }

  const todoTasks = tasks.filter(task => task.status === 'A Fazer');
  const inProgressTasks = tasks.filter(task => task.status === 'Em Andamento');
  const doneTasks = tasks.filter(task => task.status === 'Concluído');
  const pendingTasks = tasks.filter(task => task.status === 'Em Revisão');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <TaskColumn title="A Fazer" tasks={todoTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
      <TaskColumn title="Em Andamento" tasks={inProgressTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
      <TaskColumn title="Concluído" tasks={doneTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
      <TaskColumn title="Em Revisão" tasks={pendingTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default TaskList;
