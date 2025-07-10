// // // // import React, { useEffect, useState } from 'react';
// // // // import { getTasks, deleteTask } from '../api/api';
// // // // import TaskCard from './TaskCard';
// // // // import TaskForm from './TaskForm';

// // // // const TaskList = () => {
// // // //   const [tasks, setTasks] = useState([]);
// // // //   const [editingTask, setEditingTask] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchTasks = async () => {
// // // //       try {
// // // //         const tasksData = await getTasks();
// // // //         setTasks(tasksData);
// // // //       } catch (error) {
// // // //         console.error('Erro ao obter tarefas:', error);
// // // //       }
// // // //     };

// // // //     fetchTasks();
// // // //   }, []);

// // // //   const handleDelete = async (taskId) => {
// // // //     try {
// // // //       await deleteTask(taskId);
// // // //       setTasks(tasks.filter((task) => task.id !== taskId));
// // // //     } catch (error) {
// // // //       console.error('Erro ao deletar tarefa:', error);
// // // //     }
// // // //   };

// // // //   const handleEdit = (task) => {
// // // //     setEditingTask(task);
// // // //   };

// // // //   const handleUpdate = (updatedTask) => {
// // // //     setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
// // // //     setEditingTask(null);
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Lista de Tarefas</h2>
// // // //       <TaskForm task={editingTask} onTaskCreated={(task) => setTasks([...tasks, task])} onTaskUpdated={handleUpdate} />
// // // //       {tasks.map((task) => (
// // // //         <TaskCard
// // // //           key={task.id}
// // // //           task={task}
// // // //           onEdit={() => handleEdit(task)}
// // // //           onDelete={() => handleDelete(task.id)}
// // // //         />
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TaskList;

// // // // import React, { useEffect, useState } from 'react';
// // // // import { getTasks, deleteTask } from '../api/api';
// // // // import TaskCard from './TaskCard';
// // // // import TaskForm from './TaskForm';

// // // // const TaskList = () => {
// // // //   const [tasks, setTasks] = useState([]);
// // // //   const [editingTask, setEditingTask] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchTasks = async () => {
// // // //       try {
// // // //         const tasksData = await getTasks();
// // // //         setTasks(tasksData);
// // // //       } catch (error) {
// // // //         console.error('Erro ao obter tarefas:', error);
// // // //       }
// // // //     };

// // // //     fetchTasks();
// // // //   }, []);

// // // //   const handleDelete = async (taskId) => {
// // // //     try {
// // // //       await deleteTask(taskId);
// // // //       setTasks(tasks.filter((task) => task.id !== taskId));
// // // //     } catch (error) {
// // // //       console.error('Erro ao deletar tarefa:', error);
// // // //     }
// // // //   };

// // // //   const handleEdit = (task) => {
// // // //     setEditingTask(task);
// // // //   };

// // // //   const handleUpdate = (updatedTask) => {
// // // //     setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
// // // //     setEditingTask(null);
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2>Lista de Tarefas</h2>
// // // //       <TaskForm
// // // //         task={editingTask}
// // // //         onTaskCreated={(task) => setTasks([...tasks, task])}
// // // //         onTaskUpdated={handleUpdate}
// // // //       />
// // // //       <div className="task-cards-container">
// // // //         {tasks.map((task) => (
// // // //           <TaskCard
// // // //             key={task.id}
// // // //             task={task}
// // // //             onEdit={() => handleEdit(task)}
// // // //             onDelete={() => handleDelete(task.id)}
// // // //           />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TaskList;



// // // // import React, { useEffect, useState } from 'react';
// // // // import { getTasks, deleteTask } from '../api/api';
// // // // import TaskCard from './TaskCard';
// // // // import TaskForm from './TaskForm';

// // // // const TaskList = () => {
// // // //   const [tasks, setTasks] = useState([]);
// // // //   const [editingTask, setEditingTask] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchTasks = async () => {
// // // //       try {
// // // //         const tasksData = await getTasks();
// // // //         setTasks(tasksData);
// // // //       } catch (error) {
// // // //         console.error('Erro ao obter tarefas:', error);
// // // //       }
// // // //     };
// // // //     fetchTasks();
// // // //   }, []);

// // // //   const handleDelete = async (taskId) => {
// // // //     try {
// // // //       await deleteTask(taskId);
// // // //       setTasks(tasks.filter((task) => task.id !== taskId));
// // // //     } catch (error) {
// // // //       console.error('Erro ao deletar tarefa:', error);
// // // //     }
// // // //   };

// // // //   const handleEdit = (task) => {
// // // //     setEditingTask(task);
// // // //   };

// // // //   const handleUpdate = (updatedTask) => {
// // // //     setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
// // // //     setEditingTask(null);
// // // //   };

// // // //   return (
// // // //     <section className="task-section">
// // // //       <h2>Lista de Tarefas</h2>
// // // //       <TaskForm
// // // //         task={editingTask}
// // // //         onTaskCreated={(task) => setTasks([...tasks, task])}
// // // //         onTaskUpdated={handleUpdate}
// // // //       />
// // // //       <div className="task-cards-container">
// // // //         {tasks.map((task) => (
// // // //           <TaskCard
// // // //             key={task.id}
// // // //             task={task}
// // // //             onEdit={() => handleEdit(task)}
// // // //             onDelete={() => handleDelete(task.id)}
// // // //           />
// // // //         ))}
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default TaskList;


// // // import React, { useEffect, useState } from 'react';
// // // import { getTasks, deleteTask } from '../api/api'; // Supondo que suas funções API estão ok
// // // import TaskColumn from './TaskColumn';
// // // // import TaskForm from './TaskForm'; // Vamos lidar com o formulário depois

// // // const TaskList = () => {
// // //   const [allTasks, setAllTasks] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchTasks = async () => {
// // //       try {
// // //         setIsLoading(true);
// // //         const tasksData = await getTasks(); // Busca todas as tarefas
// // //         setAllTasks(tasksData);
// // //       } catch (error) {
// // //         console.error('Erro ao obter tarefas:', error);
// // //         // Adicionar tratamento de erro para o usuário (ex: um toast)
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };
// // //     fetchTasks();
// // //   }, []);

// // //   // Filtra as tarefas para cada coluna.
// // //   // IMPORTANTE: Estou supondo que seu modelo `task` no backend tem um campo `status`
// // //   // com valores como 'Pendente', 'A Fazer', 'Em Andamento', 'Concluído'.
// // //   const pendingTasks = allTasks.filter(task => task.status === 'Pendente');
// // //   const todoTasks = allTasks.filter(task => task.status === 'A fazer');
// // //   const inProgressTasks = allTasks.filter(task => task.status === 'Em andamento');
// // //   const doneTasks = allTasks.filter(task => task.status === 'Concluído');

// // //   if (isLoading) {
// // //     return <p className="text-center text-gray-500">Carregando tarefas...</p>;
// // //   }

// // //   return (
// // //     // Container das colunas do Kanban
// // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
// // //       <TaskColumn title="Pendente" tasks={pendingTasks} />
// // //       <TaskColumn title="A Fazer" tasks={todoTasks} />
// // //       <TaskColumn title="Em Andamento" tasks={inProgressTasks} />
// // //       <TaskColumn title="Concluído" tasks={doneTasks} />
// // //     </div>
// // //     // OBS: O <TaskForm> foi removido daqui. O ideal é que ele seja um Modal
// // //     // que é ativado pelo botão "Nova Tarefa" no header do dashboard.
// // //   );
// // // };

// // // export default TaskList;
// // import React, { useEffect, useState } from 'react';
// // import { getTasks, deleteTask } from '../api/api'; 
// // import TaskColumn from './TaskColumn';

// // const TaskList = () => {
// //   const [allTasks, setAllTasks] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchTasks = async () => {
// //       try {
// //         setIsLoading(true);
// //         // A função getTasks() retorna a resposta completa do Axios
// //         const response = await getTasks(); 

// //         // --- CORREÇÃO APLICADA AQUI ---
// //         // Verificamos se a resposta contém a propriedade 'data' e se ela é um array.
// //         // Isso é uma prática segura para lidar com respostas de API.
// //         if (response && Array.isArray(response.data)) {
// //           setAllTasks(response.data);
// //         } else if (response && Array.isArray(response)) {
// //           // Fallback caso a API retorne o array diretamente
// //           setAllTasks(response);
// //         } else {
// //           // Se a resposta não for um array, definimos como um array vazio para evitar erros.
// //           console.warn("A resposta da API de tarefas não é um array:", response);
// //           setAllTasks([]);
// //         }

// //       } catch (err) {
// //         console.error('Erro ao obter tarefas:', err);
// //         setError('Não foi possível carregar as tarefas. Tente atualizar a página.');
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     fetchTasks();
// //   }, []);

// //   // Função para deletar tarefas, que será passada para os TaskCards
// //   const handleDeleteTask = async (taskId) => {
// //     try {
// //       await deleteTask(taskId);
// //       setAllTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
// //     } catch (err) {
// //       console.error('Erro ao deletar tarefa:', err);
// //       setError('Não foi possível deletar a tarefa.');
// //     }
// //   };

// //   if (isLoading) {
// //     return <p className="text-center text-gray-500 mt-8">Carregando tarefas...</p>;
// //   }

// //   if (error) {
// //     return <p className="text-center text-red-500 mt-8">{error}</p>;
// //   }

// //   // A função .filter() agora funcionará com segurança
// //   const pendingTasks = allTasks.filter(task => task.status === 'Pendente');
// //   const todoTasks = allTasks.filter(task => task.status === 'A fazer');
// //   const inProgressTasks = allTasks.filter(task => task.status === 'Em andamento');
// //   const doneTasks = allTasks.filter(task => task.status === 'Concluído');

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
// //       <TaskColumn title="Pendente" tasks={pendingTasks} onDeleteTask={handleDeleteTask} />
// //       <TaskColumn title="A Fazer" tasks={todoTasks} onDeleteTask={handleDeleteTask} />
// //       <TaskColumn title="Em Andamento" tasks={inProgressTasks} onDeleteTask={handleDeleteTask} />
// //       <TaskColumn title="Concluído" tasks={doneTasks} onDeleteTask={handleDeleteTask} />
// //     </div>
// //   );
// // };

// // export default TaskList;

// import React from 'react';
// import TaskColumn from './TaskColumn';
// import { deleteTask, updateTask } from '../api/api';

// // Recebe as tarefas e funções como props do Dashboard
// const TaskList = ({ tasks, isLoading, onEditTask, refreshTasks }) => {

//   const handleDelete = async (taskId) => {
//     // Usamos window.confirm para uma confirmação simples
//     if (window.confirm('Tem a certeza que quer apagar esta tarefa?')) {
//       try {
//         await deleteTask(taskId);
//         refreshTasks(); // Chama a função de recarregar do Dashboard
//       } catch (error) {
//         console.error("Erro ao apagar tarefa:", error);
//         alert("Não foi possível apagar a tarefa.");
//       }
//     }
//   };

//   const handleStatusChange = async (task, newStatus) => {
//     try {
//       // Envia apenas os campos necessários para a atualização
//       await updateTask(task.id, { ...task, status: newStatus });
//       refreshTasks(); // Chama a função de recarregar do Dashboard
//     } catch (error) {
//       console.error("Erro ao mudar o status:", error);
//       alert("Não foi possível mudar o status da tarefa.");
//     }
//   };

//   if (isLoading) {
//     return <p className="text-center text-gray-500 mt-8">A carregar tarefas...</p>;
//   }

//   const pendingTasks = tasks.filter(task => task.status === 'Pendente');
//   const todoTasks = tasks.filter(task => task.status === 'A fazer');
//   const inProgressTasks = tasks.filter(task => task.status === 'Em andamento');
//   const doneTasks = tasks.filter(task => task.status === 'Concluído');

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
//       <TaskColumn title="Pendente" tasks={pendingTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
//       <TaskColumn title="A fazer" tasks={todoTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
//       <TaskColumn title="Em andamento" tasks={inProgressTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
//       <TaskColumn title="Concluído" tasks={doneTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
//     </div>
//   );
// };

// export default TaskList;


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
    try {
      await updateTask(task.id, { ...task, status: newStatus });
      refreshTasks(); // Avisa o Dashboard para recarregar as tarefas
    } catch (error) {
      console.error("Erro ao mudar o status:", error);
      alert("Não foi possível mudar o status da tarefa.");
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-8">A carregar tarefas...</p>;
  }
  
  if (!tasks) {
    return <p className="text-center text-gray-500 mt-8">Nenhuma tarefa encontrada.</p>;
  }

  const pendingTasks = tasks.filter(task => task.status === 'Pendente');
  const todoTasks = tasks.filter(task => task.status === 'A fazer');
  const inProgressTasks = tasks.filter(task => task.status === 'Em andamento');
  const doneTasks = tasks.filter(task => task.status === 'Concluído');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <TaskColumn title="Pendente" tasks={pendingTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
      <TaskColumn title="A fazer" tasks={todoTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
      <TaskColumn title="Em andamento" tasks={inProgressTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
      <TaskColumn title="Concluído" tasks={doneTasks} onEditTask={onEditTask} onDeleteTask={handleDelete} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default TaskList;
