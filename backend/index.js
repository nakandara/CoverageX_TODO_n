const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Create a new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  try {
    const [result] = await pool.execute(
      'INSERT INTO task (title, description) VALUES (?, ?)',
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description, completed: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get 5 most recent uncompleted tasks
app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, description, created_at FROM task WHERE completed = 0 ORDER BY created_at DESC LIMIT 5'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Mark a task as completed
app.patch('/tasks/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute(
      'UPDATE task SET completed = 1 WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 