import express  from 'express';
import mongoose  from 'mongoose';
import cors  from 'cors';
import authRoutes  from './routes/auth.js';
import todoRoutes  from './routes/todos.js';
import sessionRoutes  from './routes/sessions.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const {PORT} = process.env;
const {MONGODB_URI} = process.env;

app.use('/api', authRoutes);
app.use('/api', todoRoutes);
app.use('/api', sessionRoutes);

mongoose.connect(MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}, and connected to the database.`)))
  .catch(err => console.log(err));
