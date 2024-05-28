import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import {
  setTasks, addTask, deleteTask, updateTask,
  setCategory, setShowConfetti
} from './taskslice';
import './App.css';
import Confetti from 'react-confetti';
import TaskItem from './TaskItem';
import DateTimePicker from 'react-datetime-picker';

const TodoApp: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const category = useSelector((state: RootState) => state.tasks.category);
  const showConfetti = useSelector((state: RootState) => state.tasks.showConfetti);

  const [inputTask, setInputTask] = useState<string>('');
  const [completionTime, setCompletionTime] = useState<Date>(new Date());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputTask(event.target.value);
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => dispatch(setCategory(event.target.value));
  const handleCompletionTimeChange = (value: Date | null) => {
    if (value) {
      setCompletionTime(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputTask.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: inputTask,
          category,
          completed: false,
          completionTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const data = await response.json();
      dispatch(addTask(data));
      setInputTask('');
      setCompletionTime(new Date());
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
  
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  const handleCheck = async (index: number) => {
    const task = tasks[index];
    const updatedTask = { ...task, completed: !task.completed };

    if (updatedTask.completed) {
      dispatch(setShowConfetti(true));
      setTimeout(() => {
        dispatch(setShowConfetti(false));
      }, 5000);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      dispatch(updateTask(updatedTask));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        dispatch(setTasks(data));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const filteredTasks = tasks.filter(task => category === 'All' || task.category === category);

  return (
    <main className="flex-grow">
      <div className="todo-app p-4 max-w-xl mx-auto shadow-xl rounded-lg bg-purple-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">ToDo App</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:gap-2 mb-6">
          <input
            type="text"
            value={inputTask}
            onChange={handleChange}
            placeholder="Add new task..."
            className="flex-grow p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          <DateTimePicker
            value={completionTime}
            onChange={handleCompletionTimeChange}
            calendarIcon={null}
            clearIcon={null}
            format="h:mm a"
            className="customDateTimePicker"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="Daily">Daily</option>
            <option value="One-time">One-time</option>
          </select>
          <button type="submit" className="px-4 py-2 bg-yellow-500 text-gray-800 font-semibold rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
            Add Task
          </button>
        </form>
        <ul>
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              onCheck={() => handleCheck(index)}
              onDelete={() => task._id && handleDelete(task._id)}
            />
          ))}
        </ul>
        {showConfetti && <Confetti />}
      </div>
    </main>
  );
};

export default TodoApp;
