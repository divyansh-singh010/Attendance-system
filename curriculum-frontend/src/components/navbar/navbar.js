import React from "react";
import "./navbar.css";
import iitdlogo from "../../images/iitdlogo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    return (
      <svg
        width="36"
        height="37"
        viewBox="0 0 36 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="logout">
          <mask
            id="mask0_479_93"
            // style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="36"
            height="37"
          >
            <rect
              id="Bounding box"
              y="0.5"
              width="36"
              height="36"
              fill="#D9D9D9"
            />
          </mask>
          <g mask="url(#mask0_479_93)">
            <path
              id="logout_2"
              d="M7.5 32C6.675 32 5.96875 31.7063 5.38125 31.1188C4.79375 30.5312 4.5 29.825 4.5 29V8C4.5 7.175 4.79375 6.46875 5.38125 5.88125C5.96875 5.29375 6.675 5 7.5 5H16.5C16.925 5 17.2813 5.14375 17.5688 5.43125C17.8563 5.71875 18 6.075 18 6.5C18 6.925 17.8563 7.28125 17.5688 7.56875C17.2813 7.85625 16.925 8 16.5 8H7.5V29H16.5C16.925 29 17.2813 29.1438 17.5688 29.4313C17.8563 29.7188 18 30.075 18 30.5C18 30.925 17.8563 31.2812 17.5688 31.5687C17.2813 31.8562 16.925 32 16.5 32H7.5ZM25.7625 20H15C14.575 20 14.2188 19.8563 13.9312 19.5688C13.6438 19.2813 13.5 18.925 13.5 18.5C13.5 18.075 13.6438 17.7188 13.9312 17.4313C14.2188 17.1438 14.575 17 15 17H25.7625L22.95 14.1875C22.675 13.9125 22.5375 13.575 22.5375 13.175C22.5375 12.775 22.675 12.425 22.95 12.125C23.225 11.825 23.575 11.6687 24 11.6562C24.425 11.6438 24.7875 11.7875 25.0875 12.0875L30.45 17.45C30.75 17.75 30.9 18.1 30.9 18.5C30.9 18.9 30.75 19.25 30.45 19.55L25.0875 24.9125C24.7875 25.2125 24.4312 25.3563 24.0187 25.3438C23.6062 25.3312 23.25 25.175 22.95 24.875C22.675 24.575 22.5438 24.2188 22.5563 23.8063C22.5688 23.3938 22.7125 23.05 22.9875 22.775L25.7625 20Z"
              fill="white"
            />
          </g>
        </g>
      </svg>
    );
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("faculty_access_token");
    localStorage.removeItem("faculty_refresh_token");
    localStorage.removeItem("name");
    localStorage.removeItem("user");
    localStorage.removeItem("student_access_token");
    localStorage.removeItem("student_refresh_token");
    navigate("/", { replace: true });
  };
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={iitdlogo} alt="logo" />
      </div>
      <div className="nav-head">Attendance Nexus</div>
      <div className="logout" onClick={handleLogout}>
        <div className="logout-border">
          <div className="logout-icon">{logout()}</div>
          <div className="logout-text">Logout</div>
        </div>
        {/* <img src={logout} alt="logout" onClick={handleLogout} /> */}
      </div>
    </div>
  );
};

export default Navbar;
