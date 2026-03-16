const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ─── In-memory data store ───────────────────────────────────────────────────
let tasks = [
  { id: 1, title: 'Buy groceries',    completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Read a book',      completed: true,  createdAt: new Date().toISOString() },
  { id: 3, title: 'Build a REST API', completed: false, createdAt: new Date().toISOString() }
];

let nextId = 4;

// ─── Helper ─────────────────────────────────────────────────────────────────
function findTask(id) {
  return tasks.find(t => t.id === id);
}

// ─── Routes ─────────────────────────────────────────────────────────────────

// GET /api/tasks — list all tasks (optional ?completed=true/false filter)
app.get('/api/tasks', (req, res) => {
  const { completed } = req.query;
  let result = tasks;

  if (completed !== undefined) {
    const flag = completed === 'true';
    result = tasks.filter(t => t.completed === flag);
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/tasks/:id — get a single task
app.get('/api/tasks/:id', (req, res) => {
  const task = findTask(parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  res.json({ success: true, data: task });
});

// POST /api/tasks — create a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, message: '"title" is required and must be a non-empty string' });
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  res.status(201).json({ success: true, data: task });
});

// PUT /api/tasks/:id — update a task
app.put('/api/tasks/:id', (req, res) => {
  const task = findTask(parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

  const { title, completed } = req.body;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, message: '"title" must be a non-empty string' });
    }
    task.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ success: false, message: '"completed" must be a boolean' });
    }
    task.completed = completed;
  }

  res.json({ success: true, data: task });
});

// DELETE /api/tasks/:id — delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Task not found' });

  const deleted = tasks.splice(index, 1)[0];
  res.json({ success: true, message: 'Task deleted', data: deleted });
});

// ─── 404 catch-all ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` });
});

// ─── Start server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  GET    /api/tasks');
  console.log('  GET    /api/tasks/:id');
  console.log('  POST   /api/tasks');
  console.log('  PUT    /api/tasks/:id');
  console.log('  DELETE /api/tasks/:id');
});
