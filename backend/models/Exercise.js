const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  chapterId: mongoose.Schema.Types.ObjectId,
  question: String,
  choices: [String],
  correctAnswerIndex: Number
});

module.exports = mongoose.model('Exercise', exerciseSchema);
