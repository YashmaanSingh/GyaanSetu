// index.js
const express = require('express');
const cors = require('cors');
const { initDb } = require('./src/db');
const authRoutes = require('./src/routes/auth');
const lessonsRoutes = require('./src/routes/lessons');
const resourcesRoutes = require('./src/routes/resources');
const studentsRoutes = require('./src/routes/students');
const progressRoutes = require('./src/routes/progress');

const PORT = process.env.PORT || 4000;

async function start() {
  const app = express();
  await initDb(); // ensure DB is initialized

  app.use(cors({
    origin: 'http://localhost:3000', // allow frontend
    credentials: true
  }));
  app.use(express.json());

  // routes
  app.use('/api/auth', authRoutes);
  app.use('/api/lessons', lessonsRoutes);
  app.use('/api/resources', resourcesRoutes);
  app.use('/api/students', studentsRoutes);
  app.use('/api/progress', progressRoutes);

  // basic health
  app.get('/api/health', (req, res) => res.json({ ok: true }));

  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
