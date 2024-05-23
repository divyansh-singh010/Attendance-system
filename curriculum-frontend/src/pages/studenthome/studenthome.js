import React from "react";
import "./studenthome.css";
import { Link } from "react-router-dom";
import loggedInNavigator from "../../routes/loggedInNavigator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Studenthome = () => {
  React.useEffect(loggedInNavigator(useNavigate()));

  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  React.useEffect(() => {
    const apiUrl = "https://curriculum.iitd.ac.in/api/user/profile/";
    const student_access_token = localStorage.getItem("student_access_token");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${student_access_token}`,
        },
      })
      .then((response) => {
        setUser(response.data.profile);
        localStorage.setItem("user", JSON.stringify(response.data.profile));
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const Coursecard = (props) => {
    return (
      <div className="student-page-coursecard">
        <h1 className="student-page-coursecard-heading">{props.courseCode}</h1>
        <h2 className="student-page-coursecard-subheading">
          {props.courseName}
        </h2>
        <h2 className="student-page-coursecard-credit">
          {props.courseCredits} Credit
        </h2>
        <div className="student-page-coursecard-attendance-container">
          <div className="student-page-coursecard-attendance">
            Attendance = {props.courseAttendance}%
          </div>
        </div>
        <h2 className="student-page-coursecard-slot">
          Slot : {props.courseSlot}
        </h2>
      </div>
    );
  };

  // React.useEffect(() => {
  //   const student_access_token = localStorage.getItem("student_access_token");

  //   axios
  //     .get(apiUrl, {
  //       headers: {
  //         Authorization: `Bearer ${student_access_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setCourses(response.data.courses);
  //     })
  //     .catch((error) => {
  //       if(error.response.status === 401){
  //         alert("Please login again");
  //         localStorage.removeItem("student_access_token");
  //         localStorage.removeItem("user");
  //         window.location.reload();
  //       }
  //       else if(error.response.status === 404){
  //         setTimeout(() => {
  //         alert("You have not registered in any course yet.");
  //         }, 1000);
  //       }
  //     });
  // }, []);

  return (
    <>
      <div className="student-page">
        <div className="student-page-container">
          <div class="rule"></div>
          <h1 className="student-page-heading">Welcome, {user.name}.</h1>
          <Link to="/student/register" className="student-page-register">
            Register your device
          </Link>
        </div>
        <div className="student-page-container2">
          <div className="student-page-container2-entry">
            <div className="student-page-container2-entry-heading">
              Entry No.: &nbsp;
            </div>
            <div className="student-page-container2-entry-heading2">
              {user.uniqueiitdid}
            </div>
          </div>
          <div className="student-page-container2-entry">
            <div className="student-page-container2-entry-heading">
              Department : &nbsp;
            </div>
            <div className="student-page-container2-entry-heading2">
              {user.department !== undefined
                ? user.department.toUpperCase()
                : ""}
            </div>
          </div>
        </div>
        <div className="student-page-container3">
          {/* {courses.map((course) => {
            const attendance = (
              (course.numberOfClassesAttended / course.numberOfClasses) *
              100
            ).toFixed(2);
            return (
              <Coursecard
                courseCode={course.courseCode}
                courseName={course.courseName}
                courseCredits="4"
                courseAttendance={attendance}
                courseSlot={course.slotName}
              />
            );
          })} */}
        </div>
      </div>
    </>
  );
};

export default Studenthome;
