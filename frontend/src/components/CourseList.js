import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import "../styles/global.css";
import "../styles/CourseList.css";

function CourseList() {
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // fetchData(); // Call the fetchData function directly when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="course-list">
      <h2>courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <Link to={`/chapters/${course._id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
