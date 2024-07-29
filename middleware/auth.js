import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const {JWT_SECRET} = process.env;

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {_id: decoded.id};
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default auth;