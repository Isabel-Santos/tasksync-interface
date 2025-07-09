// import React, { useEffect, useState } from 'react';
// import { getTasks, deleteTask } from '../api/api';
// import TaskCard from './TaskCard';
// import TaskForm from './TaskForm';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const tasksData = await getTasks();
//         setTasks(tasksData);
//       } catch (error) {
//         console.error('Erro ao obter tarefas:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleDelete = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//       setTasks(tasks.filter((task) => task.id !== taskId));
//     } catch (error) {
//       console.error('Erro ao deletar tarefa:', error);
//     }
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task);
//   };

//   const handleUpdate = (updatedTask) => {
//     setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
//     setEditingTask(null);
//   };

//   return (
//     <div>
//       <h2>Lista de Tarefas</h2>
//       <TaskForm task={editingTask} onTaskCreated={(task) => setTasks([...tasks, task])} onTaskUpdated={handleUpdate} />
//       {tasks.map((task) => (
//         <TaskCard
//           key={task.id}
//           task={task}
//           onEdit={() => handleEdit(task)}
//           onDelete={() => handleDelete(task.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default TaskList;

// import React, { useEffect, useState } from 'react';
// import { getTasks, deleteTask } from '../api/api';
// import TaskCard from './TaskCard';
// import TaskForm from './TaskForm';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const tasksData = await getTasks();
//         setTasks(tasksData);
//       } catch (error) {
//         console.error('Erro ao obter tarefas:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const handleDelete = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//       setTasks(tasks.filter((task) => task.id !== taskId));
//     } catch (error) {
//       console.error('Erro ao deletar tarefa:', error);
//     }
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task);
//   };

//   const handleUpdate = (updatedTask) => {
//     setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
//     setEditingTask(null);
//   };

//   return (
//     <div>
//       <h2>Lista de Tarefas</h2>
//       <TaskForm
//         task={editingTask}
//         onTaskCreated={(task) => setTasks([...tasks, task])}
//         onTaskUpdated={handleUpdate}
//       />
//       <div className="task-cards-container">
//         {tasks.map((task) => (
//           <TaskCard
//             key={task.id}
//             task={task}
//             onEdit={() => handleEdit(task)}
//             onDelete={() => handleDelete(task.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;



// import React, { useEffect, useState } from 'react';
// import { getTasks, deleteTask } from '../api/api';
// import TaskCard from './TaskCard';
// import TaskForm from './TaskForm';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const tasksData = await getTasks();
//         setTasks(tasksData);
//       } catch (error) {
//         console.error('Erro ao obter tarefas:', error);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleDelete = async (taskId) => {
//     try {
//       await deleteTask(taskId);
//       setTasks(tasks.filter((task) => task.id !== taskId));
//     } catch (error) {
//       console.error('Erro ao deletar tarefa:', error);
//     }
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task);
//   };

//   const handleUpdate = (updatedTask) => {
//     setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
//     setEditingTask(null);
//   };

//   return (
//     <section className="task-section">
//       <h2>Lista de Tarefas</h2>
//       <TaskForm
//         task={editingTask}
//         onTaskCreated={(task) => setTasks([...tasks, task])}
//         onTaskUpdated={handleUpdate}
//       />
//       <div className="task-cards-container">
//         {tasks.map((task) => (
//           <TaskCard
//             key={task.id}
//             task={task}
//             onEdit={() => handleEdit(task)}
//             onDelete={() => handleDelete(task.id)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TaskList;


import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api/api'; // Supondo que suas funções API estão ok
import TaskColumn from './TaskColumn';
// import TaskForm from './TaskForm'; // Vamos lidar com o formulário depois

const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const tasksData = await getTasks(); // Busca todas as tarefas
        setAllTasks(tasksData);
      } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        // Adicionar tratamento de erro para o usuário (ex: um toast)
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Filtra as tarefas para cada coluna.
  // IMPORTANTE: Estou supondo que seu modelo `task` no backend tem um campo `status`
  // com valores como 'Pendente', 'A Fazer', 'Em Andamento', 'Concluído'.
  const pendingTasks = allTasks.filter(task => task.status === 'Pendente');
  const todoTasks = allTasks.filter(task => task.status === 'A fazer');
  const inProgressTasks = allTasks.filter(task => task.status === 'Em andamento');
  const doneTasks = allTasks.filter(task => task.status === 'Concluído');

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando tarefas...</p>;
  }

  return (
    // Container das colunas do Kanban
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <TaskColumn title="Pendente" tasks={pendingTasks} />
      <TaskColumn title="A Fazer" tasks={todoTasks} />
      <TaskColumn title="Em Andamento" tasks={inProgressTasks} />
      <TaskColumn title="Concluído" tasks={doneTasks} />
    </div>
    // OBS: O <TaskForm> foi removido daqui. O ideal é que ele seja um Modal
    // que é ativado pelo botão "Nova Tarefa" no header do dashboard.
  );
};

export default TaskList;