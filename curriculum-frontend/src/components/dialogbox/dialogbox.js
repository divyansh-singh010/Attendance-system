import React, { useState } from "react";
import './dialogbox.css';
import axios from "axios";

const DialogBox = ({ isOpen, onClose, onAddCourse, semesters }) => {
    const [courseInfo, setCourseInfo] = useState({
        course_code: '',
        course_name: '',
        number_of_classes: '',
        semester_id: semesters,
    });
    console.log("Semester:", semesters);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddCourse = () => {
        onAddCourse(courseInfo);
        console.log("Adding course:", courseInfo);
        axios.post('https://curriculum.iitd.ac.in/api/curriculum/course/add/', {
            ...courseInfo,
            semester_id: semesters.semester_id, // Include the semester_id in the request data
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('faculty_access_token')}` }
        })
            .then(res => {
                alert('Course added successfully');
            })
            .catch(err => {
                alert(err.response.data.message || 'An error occurred while adding the course')
            });
    };

    return (
        <>
            {isOpen && semesters && (
                <div className="dialog-background">
                    <div className="dialog-container">
                        <div className="dialog-header">Add Course</div>
                        <div className="dialog-content">
                            <input
                                type="text"
                                name="course_code"
                                className="dialog-input"
                                placeholder="Course Code"
                                value={courseInfo.course_code}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="course_name"
                                className="dialog-input"
                                placeholder="Course Name"
                                value={courseInfo.course_name}
                                onChange={handleInputChange}
                            />
                            {/* Display semester information for each semester */}
                            <div key={semesters.semester_id} className="semester-view">
                                <p>Semester: {semesters.academic_year} ({semesters.semester_id === 2 ? 'Even' : 'Odd'})</p>
                            </div>
                        </div>
                        <div className="dialog-buttons">
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleAddCourse}>Add</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DialogBox;
