const Course = require('../models/Course'); // Import your Course model

exports.getProtectedData = async (req, res) => {
  try {
    // Retrieve data from your database
    const courses = await Course.find();

    // Return the data as a JSON response
    res.json(courses);
  } catch (error) {
    console.error('Error fetching protected data:', error);
    res.status(500).json({ error: 'Error fetching protected data' });
  }
};
