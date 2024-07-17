const User = require('../models/User');
const Course = require('../models/Course');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.telephone = req.body.telephone || user.telephone;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.createCourse = async (req, res) => {
  const { name, description } = req.body;

  const course = new Course({
    name,
    description,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
};

exports.updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    course.name = req.body.name || course.name;
    course.description = req.body.description || course.description;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

exports.deleteCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};
