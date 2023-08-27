const Exercise = require('../models/Exercise');

// Get all exercises for a chapter
exports.getAllExercisesByChapter = async (req, res) => {
  try {
    const exercises = await Exercise.find({ chapterId: req.params.chapterId });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching exercises' });
  }
};

// Submit user answer for an exercise
exports.submitAnswer = async (req, res) => {
  const { exerciseId } = req.params;
  const { selectedAnswerIndex } = req.body;

  try {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    const isCorrect = exercise.correctAnswerIndex === selectedAnswerIndex;
    res.json({ isCorrect });
  } catch (err) {
    res.status(500).json({ error: 'Error submitting answer' });
  }
};
