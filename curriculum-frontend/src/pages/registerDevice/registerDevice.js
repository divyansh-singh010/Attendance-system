import React from 'react';
import { Link } from 'react-router-dom';
import './registerDevice.css';
import QRCode from "react-qr-code";
import loggedInNavigator from "../../routes/loggedInNavigator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const RegisterDevice = () => {
    React.useEffect(loggedInNavigator(useNavigate()));
    const student_access_token = localStorage.getItem("student_access_token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [qr, setQr] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const apiUrl = "https://curriculum.iitd.ac.in/api/user/device/qr/";
        axios.get(apiUrl,
            {
                headers: {
                    'Authorization': `Bearer ${student_access_token}`
                }
            }
        ).then((response) => {
            setQr(response.data["qr_text"]);
            if (response.data.status !== null) {
                setStatus(response.data.status);
            }
        }).catch((error) => {
            alert(error);
        });
    }, [student_access_token]);


    return (
        <>
            <div className="student-page">
                <div className="student-page-container">
                    <div class="rule"></div>
                    <h1 className='student-page-heading'>Welcome, {user.name}</h1>
                </div>
                <div className="student-page-container2">
                    <div className="student-page-container2-entry">
                        <div className="student-page-container2-entry-heading">Entry No.:&nbsp;</div>
                        <div className="student-page-container2-entry-heading2">{user.uniqueiitdid}</div>
                    </div>
                    <div className="student-page-container2-entry">
                        <div className="student-page-container2-entry-heading">Department :&nbsp;</div>
                        <div className="student-page-container2-entry-heading2">{user.department!==undefined ? user.department.toUpperCase() : ""}</div>
                    </div>
                </div>
                <div className="qr-container">
                    <h1 className="qr-heading">Scan this QR Code from Attendance app to register your device</h1>
                    <h2 className="qr-status">{status}</h2>
                    <QRCode value={qr} level="H" className="student-register-qr" />
                </div>
            </div>
        </>
    )
}

export default RegisterDevice;