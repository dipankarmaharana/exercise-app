import React from 'react';

function AnswerFeedback({ feedback }) {
  return (
    <div className="answer-feedback">
      {feedback && <p className={feedback === 'Correct!' ? 'correct' : 'incorrect'}>{feedback}</p>}
    </div>
  );
}

export default AnswerFeedback;
