const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
    const { task, category, completionTime } = req.body;
    try {
        const newTask = await Task.create({ task, category, completed: false, completionTime });
        res.status(201).json(newTask); // Odpowiedź z kodem 201 - Created
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an existing task
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { task, category, completed, completionTime } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { task, category, completed, completionTime }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
