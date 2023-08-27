import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ExerciseList.css";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const { courseId, chapterId } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);



  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${courseId}/${chapterId}`)
      .then((response) => {
        setExercises(response.data);
        initializeSelectedAnswers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      });
  }, [courseId, chapterId]);

  useEffect(() => {
    updateProgress();
  }, [selectedAnswers]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleSubmission();
    }
  
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);
  

  const initializeSelectedAnswers = (exercises) => {
    const initialAnswers = {};
    exercises.forEach((exercise) => {
      initialAnswers[exercise._id] = null;
    });
    setSelectedAnswers(initialAnswers);
  };

  const handleAnswerSelect = (exerciseId, selectedAnswer) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [exerciseId]: selectedAnswer,
    }));
    // updateProgress();
  
  };

  const updateProgress = () => {
    const answeredCount = Object.values(selectedAnswers).filter(answer => answer !== null).length;
    const totalQuestions = exercises.length;
    const calculatedProgress = (answeredCount  / totalQuestions) * 100;
    setProgress(calculatedProgress);
  };
  
  
  

  const handleSubmission = () => {
    setIsTimerRunning(false);
    const newFeedback = {};
    exercises.forEach((exercise) => {
      if (selectedAnswers[exercise._id] === exercise.correctAnswerIndex) {
        newFeedback[exercise._id] = "Correct!";
      } else {
        newFeedback[exercise._id] = "Incorrect :(";
      }
    });
    setFeedback(newFeedback);
    setSubmitClicked(true);
  };

  const handleReset = () => {
    if(isTimerRunning){
      initializeSelectedAnswers(exercises);
      setFeedback({});
      setProgress(0);
    }
    
  };

  return (
    <div>
      <h2>exercises</h2>
      <div className="timer timer-container">Time left: {timer} seconds</div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%`}}
        ></div>
      </div>
      <ul className="exercise-list">
        {exercises.map((exercise) => (
          <li key={exercise._id} className="exercise-item">
            <h4>{exercise.question}</h4>
            <ul className="choices-list">
              {exercise.choices.map((option, index) => (
                <li key={index}>
                  <label className="choice-label">
                    <input
                      type="radio"
                      name={`answer-${exercise._id}`}
                      value={option}
                      checked={selectedAnswers[exercise._id] === index}
                      onChange={() => handleAnswerSelect(exercise._id, index)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            <p className={feedback[exercise._id] === "Correct!" ? "correct-feedback" : "incorrect-feedback"}>
            {feedback[exercise._id]}
            </p>
          </li>
        ))}
      </ul>
      <div className="button-container">
      <button onClick={handleSubmission} className="submit-button">submit</button>
      <button onClick={handleReset} className={`reset-button ${submitClicked ? "faded" : ""}`}>reset</button>
      </div>
      
    </div>
  );
}

export default ExerciseList;
