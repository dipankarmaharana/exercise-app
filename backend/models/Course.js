const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  question: String,
  choices: [String],
  correctAnswerIndex: Number
});

const chapterSchema = new mongoose.Schema({
  title: String,
  exercises: [exerciseSchema]
});

const courseSchema = new mongoose.Schema({
  title: String,
  chapters: [chapterSchema]
});

module.exports = mongoose.model('Course', courseSchema);
