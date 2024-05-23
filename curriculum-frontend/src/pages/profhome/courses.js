import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import './course.css';

// Define CSS styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    heading: {
        marginBottom: '10px',
    },
    button: {
        marginRight: '10px',
    },
    qrCode: {
        marginTop: '20px',
        marginBottom: '20px',
    },
};

const CoursePage = ({ courseCode, semester_id }) => {
    const [qrCode, setQrCode] = useState('');
    const token = localStorage.getItem('faculty_access_token');
    const [isActive, setIsActive] = useState(false);
    console.log("Semester ID:", semester_id);
    useEffect(() => {
        let intervalId;

        if (isActive) {
            handleStartAttendance();
            intervalId = setInterval(handleStartAttendance, 14500);
        } else {
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        };

    }, [isActive]);



    const handleStartAttendance = () => {
        axios.get(`https://curriculum.iitd.ac.in/api/attendance/attendance/qr/?course_code=${courseCode}&semester_id=${semester_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('faculty_access_token')}`,
            },
        })
            .then(res => {
                console.log(res.data);
                setQrCode(res.data.qr_text);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const handleCloseAttendance = () => {
        console.log(token);
        axios.post(`https://curriculum.iitd.ac.in/api/attendance/attendance/close/`, {
            course_code: courseCode,
            semester_id: semester_id,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_code: courseCode,
                semester_id: semester_id,
            },
        })
            .then(res => {
                console.log(res.data);
                setQrCode('');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Course: {courseCode}</h1>
            {/* Add a button for starting attendance */}
            <div className='attendance-button-container'>
                <button style={styles.button} className='buttons' onClick={() => { setIsActive(true); handleStartAttendance(); }}>Start Attendance</button>
                {/* <div className='attendance-button'> */}
                {qrCode && <button className='buttons' onClick={() => { setIsActive(false); handleCloseAttendance(); }}>Close Attendance</button>}
                {/* </div> */}
            </div>

            {/* Render QR code if it exists */}
            <div className='qr-code'>
                {qrCode && <QRCode value={qrCode} style={styles.qrCode} />}
            </div>
        </div >
    );
};

export default CoursePage;
