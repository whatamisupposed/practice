const express = require('express');
const Course = require('../models/Course');
const { registerCourse, unregisterCourse, getCourses } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCourses);
router.post('/register', protect, registerCourse);
router.post('/unregister', protect, unregisterCourse);

module.exports = router;
