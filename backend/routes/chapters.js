const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/chapters/:courseId
router.get('/:courseId', async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const chapters = course.chapters;
    // console.log(chapters);
    res.send(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    res.status(500).json({ error: 'Error fetching chapters' });
  }
});

module.exports = router;
