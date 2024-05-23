import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Studenthome from './pages/studenthome/studenthome';
import Navbar from './components/navbar/navbar';
import Login from './pages/login/login';
import Profhome from './pages/profhome/profhome';
import LoginRedirect from './pages/loginRedirect/loginRedirect';
import RegisterDevice from './pages/registerDevice/registerDevice';
import AddCourse from './pages/profhome/addcourse';
import CoursePage from './pages/profhome/courses';
import axios from 'axios';

const App = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('faculty_access_token');
  useEffect(() => {
    if (!token) {
      return;
    }
    axios.get(`https://curriculum.iitd.ac.in/api/curriculum/courses/all_courses/`, { headers: { Authorization: `Bearer ${localStorage.getItem('faculty_access_token')}` } })
      .then(res => {
        setCourses(res.data.courses);
      })
      .catch(err => {
        console.log(err);
      });
  }, [token]);


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Studenthome />} />
        <Route path="/profhome" element={<AddCourse />} />
        <Route path="/attendance/home" element={<LoginRedirect />} />
        <Route path="/student/register" element={<RegisterDevice />} />
        {courses.map((course) => (
          <Route key={course.course_code} path={`/courses/${course.semester.semester_id}/${course.course_code}`} element={<CoursePage courseCode={course.course_code} semester_id={course.semester.semester_id} />} />
        ))}
        <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
