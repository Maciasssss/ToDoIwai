import React from 'react';

export interface Task {
  _id?: string;
  task: string;
  category: string;
  completed: boolean;
  completionTime: Date; // Zmiana typu na Date
}

interface TaskItemProps {
  task: Task;
  index: number;
  onCheck: (index: number) => void;
  onDelete: (index: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, onCheck, onDelete }) => {
  const { _id, task: taskName, completed, completionTime } = task;
  
  // Funkcja do formatowania daty zakończenia zadania
  const formatCompletionTime = (date: Date | string): string => {
    if (!(date instanceof Date)) {
     
      date = new Date(date);
    }
    
   
    if (isNaN(date.getTime())) {
    
      return '';
    }
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
  };
  return (
    <li key={_id} className={`flex justify-between p-2 border-b ${completed ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex items-center">
        <input type="checkbox" checked={completed} onChange={() => onCheck(index)} />
        <p className={`ml-2 ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{taskName}</p>
        <p className="ml-2">{formatCompletionTime(completionTime)}</p> {}
      </div>
      <button className="text-red-500" onClick={() => onDelete(index)}>Delete</button>
    </li>
  );
}

export default TaskItem;
