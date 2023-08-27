const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authenticateJWT = require('../middleware/authMiddleware');

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

module.exports = router;
