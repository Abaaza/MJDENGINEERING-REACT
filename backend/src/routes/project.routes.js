//src/routes/projects.js
import { Router } from 'express';
import { nanoid } from 'nanoid';
import Project from '../models/Project.js';

const router = Router();

router.get('/', async (_req, res) => {
  const projects = await Project.find().sort({ due: 1 });
  res.json(projects);
});

router.post('/', async (req, res) => {
  // normalise to an array
  const payload = Array.isArray(req.body) ? req.body : [req.body];

  // basic validation
  const invalid = payload.filter(p => !(p.client && p.type && p.due));
  if (invalid.length) {
    return res.status(400).json({
      message: 'Missing required fields',
      ids: invalid.map(p => p.id || '(no id)')
    });
  }

  // if you always want server-generated IDs, remove p.id here
  const docs = await Project.insertMany(payload);
  return res.status(201).json(docs);
});

export default router;

