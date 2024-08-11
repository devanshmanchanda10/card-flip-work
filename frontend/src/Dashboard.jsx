import React, { useState } from "react";
import axios from "axios";

const Dashboard = ({ flashcards, updateFlashcards, navigateTo }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  const addFlashcard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/flashcards",
        {
          question: newQuestion,
          answer: newAnswer,
        }
      );
      const updatedFlashcards = [...flashcards, response.data];
      updateFlashcards(updatedFlashcards);
      setNewQuestion("");
      setNewAnswer("");
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const updateFlashcard = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/flashcards/${id}`, {
        question: newQuestion,
        answer: newAnswer,
      });
      const updatedFlashcards = flashcards.map((card) =>
        card.id === id
          ? { ...card, question: newQuestion, answer: newAnswer }
          : card
      );
      updateFlashcards(updatedFlashcards);
      setEditingId(null);
      setNewQuestion("");
      setNewAnswer("");
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      const updatedFlashcards = flashcards.filter((card) => card.id !== id);
      updateFlashcards(updatedFlashcards);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const startEditing = (card) => {
    setEditingId(card.id);
    setNewQuestion(card.question);
    setNewAnswer(card.answer);
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <h3>
        I can make authentication admin login using JWT and make this dashboard
        only visible to admin, but was less on time so thats why{" "}
      </h3>
      <form
        onSubmit={
          editingId !== null
            ? (e) => {
                e.preventDefault();
                updateFlashcard(editingId);
              }
            : addFlashcard
        }
      >
        <input
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter question"
          required
        />
        <input
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Enter answer"
          required
        />
        <button type="submit">
          {editingId !== null ? "Update Flashcard" : "Add Flashcard"}
        </button>
        {editingId !== null && (
          <button onClick={() => setEditingId(null)}>Cancel</button>
        )}
      </form>
      <ul>
        {flashcards.map((card) => (
          <li key={card.id}>
            {card.question}: {card.answer}
            <button onClick={() => startEditing(card)}>Edit</button>
            <button onClick={() => deleteFlashcard(card.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
