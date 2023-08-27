import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import ExerciseList from "./ExerciseList";
import "../styles/ChapterList.css"

function ChapterList() {
  const [chapters, setChapters] = useState([]);
  const { courseId } = useParams();
  // const courseId = "64e8aab9f63a80300dc2db74";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chapters/${courseId}`
      );
      const data = await response.json();
      console.log(response);
      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  // fetchData(); // Fetch data when component is rendered
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="chapter-list">
      <h2>chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter._id}>
            <Link to={`/exercises/${courseId}/${chapter._id}`}>
              {chapter.title}
            </Link>
            {/* <ExerciseList chapterId={chapter._id} courseId={courseId} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChapterList;
