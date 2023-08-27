const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  courseId: mongoose.Schema.Types.ObjectId,
  title: String,
  exercises: [{
    question: String,
    choices: [String],
    correctAnswerIndex: Number
  }]
});

module.exports = mongoose.model('Chapter', chapterSchema);
