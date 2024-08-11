

import React, { useState, useEffect } from "react";
import ReactQuestionCard from "./ReactQuestionCard";
import "./App.css";
import Dashboard from "./Dashboard";
import axios from 'axios';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flashcards, setFlashcards] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await axios.get('https://tuf-intern-5w9b.onrender.com');
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % flashcards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  const updateFlashcards = (newFlashcards) => {
    setFlashcards(newFlashcards);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React.js Flashcards</h1>
        <button className="toggle-button" onClick={() => setShowDashboard(!showDashboard)}>
          {showDashboard ? 'Show Flashcards' : 'Show Dashboard'}
        </button>
      </header>
      <main className="app-main">
        {showDashboard ? (
          <Dashboard flashcards={flashcards} updateFlashcards={updateFlashcards} />
        ) : (
          <div className="flashcard-view">
            <div className="card-navigation">
              <button onClick={prevSlide} className="nav-button prev">
                  Prev
              </button>
              {flashcards.length > 0 && (
                <ReactQuestionCard
                  question={flashcards[currentSlide].question}
                  answer={flashcards[currentSlide].answer}
                />
              )}
              <button onClick={nextSlide} className="nav-button next">
                Next
              </button>
            </div>
            <div className="progress-dots">
              {flashcards.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
