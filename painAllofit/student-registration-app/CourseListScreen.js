import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCourses } from '../actions/courseActions';

const CourseListScreen = () => {
  const dispatch = useDispatch();

  const courseList = useSelector((state) => state.courseList);
  const { loading, error, courses } = courseList;

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  return (
    <div>
      <h1>Courses</h1>
      {loading ? <h3>Loading...</h3> : error ? <h3>{error}</h3> : (
        <ul>
          {courses.map(course => (
            <li key={course._id}>{course.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseListScreen;
