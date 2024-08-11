
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'devansh',
  database: 'flashcards'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// GET all flashcards
app.get('/api/flashcards', (req, res) => {
  const sql = 'SELECT * FROM cards';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// POST a new flashcard
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  const sql = 'INSERT INTO cards (question, answer) VALUES (?, ?)';
  db.query(sql, [question, answer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, question, answer });
  });
  // PUT route to update a flashcard
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const sql = 'UPDATE cards SET question = ?, answer = ? WHERE id = ?';
  db.query(sql, [question, answer, id], (err, result) => {
    if (err) throw err;
    res.json({ id, question, answer });
  });
});

// DELETE route to remove a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM cards WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Flashcard deleted successfully' });
  });
});

});

const PORT =   5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
