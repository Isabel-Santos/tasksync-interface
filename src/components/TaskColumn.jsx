// import React from 'react';
// import TaskCard from './TaskCard';

// const TaskColumn = ({ title, tasks, onDeleteTask }) => {
//   const columnStyles = {
//     'Pendente': 'border-t-4 border-red-500',
//     'A Fazer': 'border-t-4 border-blue-500',
//     'Em Andamento': 'border-t-4 border-yellow-500',
//     'Concluído': 'border-t-4 border-green-500',
//   };

//   return (
//     <div className={`bg-gray-100 rounded-lg p-4 flex-1 ${columnStyles[title] || ''}`}>
//       <h3 className="text-lg font-bold text-gray-800 mb-4">{title} <span className="text-sm font-normal text-gray-500">{tasks.length}</span></h3>
//       <div className="space-y-4">
//         {tasks.map(task => (
//           <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskColumn;

import React from 'react';
import TaskCard from './TaskCard'; // Importa o TaskCard corretamente

const TaskColumn = ({ title, tasks, onEditTask, onDeleteTask, onStatusChange }) => {
  const columnStyles = {
    'A Fazer': 'border-t-4 border-red-500',
    'Em Andamento': 'border-t-4 border-yellow-500',
    'Concluído': 'border-t-4 border-green-500',
    'Em Revisão': 'border-t-4 border-blue-500'
  };

  return (
    <div className={`bg-gray-100 rounded-lg p-4 flex-1 ${columnStyles[title] || ''}`}>
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title} <span className="text-sm font-normal text-gray-500">{tasks.length}</span></h3>
      <div className="space-y-4">
        {tasks.map(task => (
          // Passa todas as props necessárias para o TaskCard
          <TaskCard 
            key={task.id} 
            task={task} 
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
