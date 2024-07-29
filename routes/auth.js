import express from'express';
import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';
import User from'../models/User.js';
import supabase from'../supabase.js';
import dotenv from 'dotenv';
import Session from '../models/Session.js';
const router = express.Router();

dotenv.config();
const {JWT_SECRET} = process.env;


router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      email: email, 
      password: hashedPassword, 
      name: name });
    await user.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      user
     });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });

    const session = new Session({
      userId: user._id,
      ipAddress: req.ip
    });

    await session.save();
    
    res.status(201).json({
      message: 'Signed In Successfully!', 
      token
     });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
