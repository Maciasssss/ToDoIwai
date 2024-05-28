import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  _id: string;
  task: string;
  category: string;
  completed: boolean;
  completionTime: Date;
}

interface TaskState {
  tasks: Task[];
  category: string;
  showConfetti: boolean;
}

const initialState: TaskState = {
  tasks: [],
  category: 'All',
  showConfetti: false,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setShowConfetti(state, action: PayloadAction<boolean>) {
      state.showConfetti = action.payload;
    },
  },
});

export const { setTasks, addTask, deleteTask, updateTask, setCategory, setShowConfetti } = taskSlice.actions;

export default taskSlice.reducer;
