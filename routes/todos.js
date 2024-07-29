import express from 'express';
import Todo from '../models/Todo.js';
import authMiddleware from '../middleware/auth.js';
const router = express.Router();

router.post('/todos', authMiddleware, async (req, res) => {
  const { title } = req.body;
  console.log('Todo Route: ', req.user._id);
  try {
    const todo = new Todo({
      userId: req.user._id,
      title,
    });
    await todo.save();
    res.status(201).json({
      message: 'Todo created successfully.',
      todo
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/todos', authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id });
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/todos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const userId = req.user._id;
    const todo = await Todo.findByIdAndUpdate(
      {_id: id, userId}, 
      { title, completed }, 
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'To-do item not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/todos/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ error: 'To-do item not found' });
    res.json({ message: 'To-do item deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
