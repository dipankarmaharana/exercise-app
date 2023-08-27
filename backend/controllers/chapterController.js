const Chapter = require('../models/Chapter');

// Get all chapters for a course
exports.getAllChaptersByCourse = async (req, res) => {
  try {
    const chapters = await Chapter.find({ courseId: req.params.courseId });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching chapters' });
  }
};

// Get a chapter by ID
exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    res.json(chapter);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching chapter' });
  }
};
