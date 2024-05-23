import React, { useEffect, useState } from "react";
import DialogBox from "../../components/dialogbox/dialogbox";
import './addcourse.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState({});

    console.log("Selected Semester:", selectedSemester.semester_id);

    useEffect(() => {
        const access_token = localStorage.getItem('faculty_access_token');
        axios.get('https://curriculum.iitd.ac.in/api/curriculum/semesters/', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(res => {
                console.log(res.data);
                setSemesters(res.data.semesters);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    React.useEffect(() => {
        const apiUrl = "https://curriculum.iitd.ac.in/api/user/profile/";
        const faculty_access_token = localStorage.getItem("faculty_access_token");
    
        axios
          .get(apiUrl, {
            headers: {
              Authorization: `Bearer ${faculty_access_token}`,
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

    useEffect(() => {
        if (selectedSemester) {
            axios.get(`https://curriculum.iitd.ac.in/api/curriculum/courses/this_semester/?semester_id=${selectedSemester.semester_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('faculty_access_token')}` } })
                .then(res => {
                    setCourses(res.data.courses);
                    console.log(res.data.courses);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            setCourses([]);
        }
    }, [selectedSemester]);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSemesterChange = (e) => {
        if (!e.target.value) {
            setSelectedSemester('');
            return;
        }
        const { value } = e.target;
        setSelectedSemester(semesters.find(semester => semester.semester_id === parseInt(value)));
    };

    const handleAddCourse = () => {
        console.log("Selected Semester ID:", selectedSemester);
        setIsDialogOpen(false);
    };

    const Coursecard = (props) => {
        const navigate = useNavigate();

        const navigateToCoursePage = () => {
            console.log("Navigating to course page with courseId:", props.courseCode);
            navigate(`/courses/${selectedSemester.semester_id}/${props.courseCode}`);
        };

        return (
            <button className="student-page-coursecard" onClick={navigateToCoursePage}>
                <h1 className="student-page-coursecard-heading">Course - {props.courseCode}</h1>
                <h2 className="student-page-coursecard-subheading">
                    {props.courseName}
                </h2>
            </button>
        );
    };

    return (
        <>
            <div className={`student-page ${isDialogOpen ? 'blurred' : ''}`}>
                <div className="student-page-container">
                    <div className="rule"></div>
                    <h1 className='student-page-heading'>Welcome, {user.name}</h1>
                </div>
                <div className="student-page-container2">
                    <div className="student-page-container2-entry">
                        <div className="student-page-container2-entry-heading">Department :&nbsp;</div>
                        <div className="student-page-container2-entry-heading2">
                            { user.department!==undefined ?  user.department.charAt(0).toUpperCase() + user.department.slice(1) : "Not Available"}
                        </div>
                    </div>
                </div>
                <div className="student-page-container2">
                    <select
                        name="semester"
                        className="semester-dropdown"
                        value={selectedSemester.semester_id}
                        onChange={handleSemesterChange}
                    >
                        <option value="">Select Semester</option>
                        {semesters.map(semester => (
                            <option key={semester.semester_id} value={semester.semester_id}>{semester.academic_year} {semester.semester_id === 2 ? 'Even' : 'Odd'}</option>
                        ))}
                    </select>
                    <button className="add-course-button" onClick={handleOpenDialog} disabled={!selectedSemester} >Add Course</button>
                </div>
            </div>
            {selectedSemester ? (
                <DialogBox
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                    onAddCourse={handleAddCourse}
                    semesters={selectedSemester}
                />
            ) : (
                // alert message
                <div className="alert-message">Please select a semester to add/view courses</div>
            )}
            {selectedSemester && courses.length === 0 && <div className="alert-message">No courses found for the selected semester</div>}
            <div className="student-page-coursecard-container">
                {console.log(courses)}
                {courses.map(course => (
                    <Coursecard
                        key={course.course_code}
                        courseCode={course.course_code}
                        courseName={course.course_name}
                        number_of_classes={course.number_of_classes}
                        semester_id={selectedSemester.semester_id}
                    />
                ))}
            </div>
        </>
    )
}

export default AddCourse;
