import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CourseList from './components/CourseList';
import ChapterList from './components/ChapterList';
import ExerciseList from './components/ExerciseList';
import './styles/App.css';
import './styles/global.css';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<CourseList/>} />
          <Route path="/chapters/:courseId" element={<ChapterList/>} />
          <Route path="/exercises/:courseId/:chapterId" element={<ExerciseList/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
