const express = require('express');
const router = express.Router();
const protectedController = require('../controllers/protectedController'); // Import the controller

// Protected route, will only be accessible after login
router.get('/', protectedController.getProtectedData); // Use the correct controller function

module.exports = router;
