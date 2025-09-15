import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quizId: {
    type: String,
    default: 'general',
  },
  score: {
    type: Number,
    required: true,
  },
  correctCount: {
    type: Number,
    required: true,
  },
  wrongCount: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  attemptDate: {
    type: Date,
    default: Date.now,
  },
});

const Attempt = mongoose.model('Attempt', attemptSchema);

export default Attempt;