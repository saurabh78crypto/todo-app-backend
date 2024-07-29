import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo; 
