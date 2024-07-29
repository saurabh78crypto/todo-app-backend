import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  loginTime: { 
    type: Date, 
    default: Date.now 
  },
  logoutTime: { 
    type: Date 
  },
  ipAddress: { 
    type: String 
  },
});

const Session = mongoose.model('Session', SessionSchema);
export default Session; 
