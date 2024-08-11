import React, { useState } from 'react';
import './ReactQuestionCard.css';

const ReactQuestionCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="card">
      <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-front">
          <div className="question-info">
            <h2 className="question-text">{question}</h2>
          </div>
          <button className="flip-button" onClick={handleFlip}>Show Answer</button>
        </div>
        <div className="card-back">
          <h3>Answer</h3>
          <p className="answer-text">{answer}</p>
          <button className="flip-button" onClick={handleFlip}>Show Question</button>
        </div>
      </div>
    </div>
  );
};

export default ReactQuestionCard;