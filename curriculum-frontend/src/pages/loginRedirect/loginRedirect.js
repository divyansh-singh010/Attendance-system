import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookies";

const LoginRedirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        console.log(code);
        const csrfToken = Cookies.getItem("csrftoken");
        if (code) {
            axios.post(
                'https://curriculum.iitd.ac.in/api/user/login/',
                {
                    "code": code
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    }
                }
            )
                .then((response) => {
                    console.log(response.data);
                    const access_token = response.data.tokens.access;
                    const refresh_token = response.data.tokens.refresh;
                    const category = response.data.user.category;
                    const name = response.data.user.name;
                    localStorage.setItem("name", name);
                    if (category === "faculty" || category === "vfaculty" || category === "staff" || category === "head" || category === "adjunct") {
                        localStorage.setItem("faculty_access_token", access_token);
                        localStorage.setItem("faculty_refresh_token", refresh_token);
                        navigate("/profhome", { replace: true });
                    } else {
                        localStorage.setItem("student_access_token", access_token);
                        localStorage.setItem("student_refresh_token", refresh_token);
                        navigate("/student", { replace: true });
                    }
                }).catch((error) => {
                    console.log(error);
                    navigate("/", { replace: true });
                });
        } else {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return (
        <div className="login-page">
            <h2 className='login-head'>Logging in...</h2>
        </div>
    )
}

export default LoginRedirect;