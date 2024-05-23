import React from "react";
import "./profhome.css";
import search from "../../images/search.png";
import { useState } from "react";
import nosearch from "../../images/nosearch.png";
import LoadingSpinner from "../../components/loading-icon/loading";
import { useEffect } from "react";
import "datatables.net";
import axios from "axios";
import Cookies from "js-cookies";
import loggedInNavigator from "../../routes/loggedInNavigator";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const Profhome = () => {
  React.useEffect(loggedInNavigator(useNavigate()));
  ReactSession.setStoreType("localStorage");

  const [inputValue, setInputValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("percentageAllTime");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("100");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputcourse, setInputcourse] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [user, setUser] = useState({});

  React.useEffect(() => {
    const apiUrl = "https://curriculum.iitd.ac.in/api/user/profile/";
    const faculty_access_token = localStorage.getItem("student_access_token");

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

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    if (sortConfig.key !== null) {
      const sorted = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return filteredData;
  };

  const arrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return "";
  };

  const performSearchStudent = () => {
    setLoading(true);
    setData([]);
    setFilteredData([]);
    const baseurl = "https://curriculum.iitd.ac.in/api/faculty/search/";
    let apiUrl = baseurl;
    let queryParams = "";
    if (inputValue.length > 0 && inputcourse.length > 0) {
      queryParams += `entryNumber=${inputValue}&`;
      queryParams += `courseCode=${inputcourse}`;
    } else if (inputcourse.length > 0 && inputValue.length === 0) {
      queryParams += `courseCode=${inputcourse}`;
    } else if (inputValue.length > 0 && inputcourse.length === 0) {
      queryParams += `entryNumber=${inputValue}`;
    }

    if (queryParams.length > 0) {
      apiUrl += `?${queryParams}`;
    }
    const token = localStorage.getItem("faculty_access_token");
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        // send alert
        alert("Error fetching data");
      });

    setInputValue("");
    setInputcourse("");
  };

  useEffect(() => {
    setFilteredData("");
    const filteredData = applyFilter(data, selectedRange, selectedOption);
    setFilteredData(filteredData);
  }, [selectedRange, selectedOption, data]);

  const handleRadioChange = (event) => {
    const selectedRange = event.target.value;
    setSelectedRange(selectedRange);
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      performSearchStudent();
    }
  };
  const applyFilter = (data, range, option) => {
    const filteredData = data.filter((entry) => {
      const columnValue = entry[range];
      return columnValue <= parseFloat(option);
    });

    return filteredData;
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadAttendance = () => {
    if (selectedFile) {
      const apiUrl = "http://127.0.0.1:8000/api/faculty/import";
      const token = localStorage.getItem("faculty_access_token");
      const formData = new FormData();
      formData.append("file", selectedFile);
      const csrfToken = Cookies.getItem("csrftoken");

      axios
        .post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Attendance uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading attendance:", error);
        });
    }
  };

  return (
    <div className="prof-login-page">
      <div className="prof-login-page-new1">
        <div className="prof-login-page-searchbar">
          <div className="prof-login-new">
            <input
              className="prof-login-page-searchbar-input"
              type="text"
              placeholder="Enter Student Entry Number....."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className="prof-login-page-searchbar">
          <div className="prof-login-new">
            <input
              className="prof-login-page-searchbar-input"
              type="text"
              placeholder="Enter Course Code....."
              value={inputcourse}
              onChange={(e) => setInputcourse(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <button onClick={performSearchStudent}>
          <img
            src={search}
            alt="search"
            className="prof-login-page-searchbar-icon"
          />
        </button>
      </div>
      <div className="prof-login-page-filter">
        <div className="prof-login-page-filter-container">
          <label className="label" htmlFor="inputField">
            Filter by:
          </label>
          <input
            className="inputfield"
            type="text"
            id="inputField"
            placeholder="Enter attendance% here..."
            value={selectedOption}
            onChange={handleOptionChange}
          />
          <h6 className="label-new">or</h6>
          <div className="prof-login-page-filter-container2">
            <label className="radio">
              <input
                className="radio-input"
                type="radio"
                value="25"
                checked={selectedOption === "25"}
                onChange={handleOptionChange}
              />
              <div className="label-text">25%</div>
            </label>
            <label className="radio">
              <input
                className="radio-input"
                type="radio"
                value="50"
                checked={selectedOption === "50"}
                onChange={handleOptionChange}
              />

              <div className="label-text">50%</div>
            </label>
            <label className="radio">
              <input
                className="radio-input"
                type="radio"
                value="100"
                checked={selectedOption === "100"}
                onChange={handleOptionChange}
              />
              <div className="label-text">100%</div>
            </label>
          </div>
          <div className="prof-pagebutton">
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUploadAttendance}>Upload Attendance</button>
          </div>
        </div>
      </div>
      <div className="prof-login-page-category">
        <div className="prof-login-page-category-heading">Category:</div>
        <div className="prof-login-page-category">
          <label className="radio">
            <input
              className="radio-input"
              type="radio"
              name="columnCondition"
              value="percentageAllTime"
              checked={selectedRange === "percentageAllTime"}
              onChange={handleRadioChange}
            />
            <div className="label-text">ALL TIME</div>
          </label>
          <br />

          <label className="radio">
            <input
              className="radio-input"
              type="radio"
              name="columnCondition"
              value="percentageLastFortnight"
              checked={selectedRange === "percentageLastFortnight"}
              onChange={handleRadioChange}
            />{" "}
            <div className="label-text">LAST 15 DAYS</div>
          </label>
          <br />

          <label className="radio">
            <input
              className="radio-input"
              type="radio"
              name="columnCondition"
              value="percentageLastWeek"
              checked={selectedRange === "percentageLastWeek"}
              onChange={handleRadioChange}
            />{" "}
            <div className="label-text">LAST 7 DAYS</div>
          </label>
          <br />

          <label className="radio">
            <input
              className="radio-input"
              type="radio"
              name="columnCondition"
              value="percentageLastMonth"
              checked={selectedRange === "percentageLastMonth"}
              onChange={handleRadioChange}
            />{" "}
            <div className="label-text">LAST 1 MONTH</div>
          </label>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : filteredData.length > 0 ? (
        <>
          <hr className="rule1" />
          <div className="prof-login-page-table">
            <table>
              <thead>
                <tr>
                  <th
                    style={{ padding: "1rem 4rem", textAlign: "start" }}
                    onClick={() => requestSort("student_name")}
                  >
                    STUDENT NAME {arrow("student_name")}
                  </th>
                  <th
                    style={{ padding: "1rem auto", textAlign: "center" }}
                    onClick={() => requestSort("student_entry_number")}
                  >
                    ENTRY NO {arrow("student_entry_number")}
                  </th>
                  <th
                    style={{ padding: "1rem auto", textAlign: "center" }}
                    onClick={() => requestSort("course")}
                  >
                    COURSE CODE {arrow("course")}
                  </th>
                  <th
                    style={{ padding: "1rem auto", textAlign: "center" }}
                    onClick={() => requestSort("percentageAllTime")}
                  >
                    all time {arrow("percentageAllTime")}
                  </th>
                  <th
                    style={{ padding: "1rem auto", textAlign: "center" }}
                    onClick={() => requestSort("percentageLastWeek")}
                  >
                    Last 7 days {arrow("percentageLastWeek")}
                  </th>
                  <th
                    style={{ padding: "1rem auto", textAlign: "center" }}
                    onClick={() => requestSort("percentageLastFortnight")}
                  >
                    lAST 15 Days {arrow("percentageLastFortnight")}
                  </th>
                  <th
                    style={{ padding: "1rem auto", textAlign: "center" }}
                    onClick={() => requestSort("percentageLastMonth")}
                  >
                    LAST 1 MONTH {arrow("percentageLastMonth")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData().map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: "1rem 4rem" }}>{row.student_name}</td>
                    <td style={{ padding: "1rem auto", textAlign: "center" }}>
                      {row.student_entry_number}
                    </td>
                    <td style={{ padding: "1rem auto", textAlign: "center" }}>
                      {row.course}
                    </td>
                    <td style={{ padding: "1rem auto", textAlign: "center" }}>
                      {row.percentageAllTime}
                    </td>
                    <td style={{ padding: "1rem auto", textAlign: "center" }}>
                      {row.percentageLastWeek}
                    </td>
                    <td style={{ padding: "1rem auto", textAlign: "center" }}>
                      {row.percentageLastFortnight}
                    </td>
                    <td style={{ padding: "1rem auto", textAlign: "center" }}>
                      {row.percentageLastMonth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="prof-login-nosearch">
          <img src={nosearch} alt="nosearch" />
        </div>
      )}
    </div>
  );
};

export default Profhome;
