const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/exercises/:courseId/:chapterId
router.get('/:courseId/:chapterId', async (req, res) => {
  const courseId = req.params.courseId;
  const chapterId = req.params.chapterId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const chapter = course.chapters.find(chap => chap._id.toString() === chapterId);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    const exercises = chapter.exercises;
    res.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Error fetching exercises' });
  }
});

module.exports = router;
