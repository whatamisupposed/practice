const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

exports.registerCourse = async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);

  if (course) {
    course.students.push(req.user._id);
    await course.save();
    res.json({ message: 'Registered for course' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

exports.unregisterCourse = async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);

  if (course) {
    course.students = course.students.filter(student => student.toString() !== req.user._id.toString());
    await course.save();
    res.json({ message: 'Unregistered from course' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};
