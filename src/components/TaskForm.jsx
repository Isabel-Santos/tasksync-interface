// import React, { useState, useEffect } from 'react';
// import { createTask, updateTask } from '../api/api';

// const TaskForm = ({ task, onTaskCreated, onTaskUpdated }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     if (task) {
//       setTitle(task.title);
//       setDescription(task.description);
//     }
//   }, [task]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (task) {
//         const updatedTask = await updateTask(task.id, title, description);
//         onTaskUpdated(updatedTask);
//       } else {
//         const newTask = await createTask(title, description);
//         onTaskCreated(newTask);
//       }
      
//       // Limpa o formulário
//       setTitle('');
//       setDescription('');
//     } catch (error) {
//       console.error('Erro ao salvar tarefa:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Título</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Descrição</label>
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">{task ? 'Atualizar Tarefa' : 'Criar Tarefa'}</button>
//     </form>
//   );
// };

// export default TaskForm;

import React from 'react';

const TaskForm = ({ newTask, setNewTask, taskDescription, setTaskDescription, onSubmit }) => {
  return (
    <>
      <h2>Adicionar Tarefa</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Título da tarefa"
      />
      <br />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Descrição da tarefa"
      />
      <br />
      <button className="add-task-btn" onClick={onSubmit}>
        Adicionar Tarefa
      </button>
    </>
  );
};

export default TaskForm;
