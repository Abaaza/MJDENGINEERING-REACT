//src/routes/auth.js

import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

const router = Router();

/* Register */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.exists({ email }))
    return res.status(400).json({ message: 'Email already in use' });

  const user = await User.create({ name, email, password });
  const token = signToken({ id: user._id, name: user.name });
  res.json({ token, user: { id: user._id, name: user.name } });
});

/* Login */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Bad credentials' });

  const token = signToken({ id: user._id, name: user.name });
  res.json({ token, user: { id: user._id, name: user.name } });
});

export default router;
