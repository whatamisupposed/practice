const express = require('express');
const { getUsers, updateUser, deleteUser, createCourse, updateCourse, deleteCourse } = require('../controllers/adminController.js');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, admin);

router.get('/users', getUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/course', createCourse);
router.put('/course/:id', updateCourse);
router.delete('/course/:id', deleteCourse);

module.exports = router;
