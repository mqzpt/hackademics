import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle flashcards generation
  const handleGenerateFlashcards = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setFlashcards([]);
    setQuiz([]); // Clear quiz data if any

    try {
      const response = await fetch('http://localhost:8080/api/generate_flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle quiz generation
  const handleGenerateQuiz = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setQuiz([]);
    setFlashcards([]); // Clear flashcards data if any

    try {
      const response = await fetch('http://localhost:8080/api/generate_quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      const data = await response.json();
      setQuiz(data.quiz);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Study Sync: Flashcard & Quiz Generator</h1>
      <form>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here"
          rows={10}
          cols={50}
        />
        <br />
        <button
          type="button"
          onClick={handleGenerateFlashcards}
          disabled={!text || loading}
        >
          Generate Flashcards
        </button>
        <button
          type="button"
          onClick={handleGenerateQuiz}
          disabled={!text || loading}
          style={{ marginLeft: '10px' }}
        >
          Generate Quiz
        </button>
      </form>

      {loading && <p>Processing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display flashcards if available */}
      {flashcards.length > 0 && (
        <div>
          <h2>Generated Flashcards:</h2>
          <ul>
            {flashcards.map((flashcard, index) => (
              <li key={index}>
                <strong>Question:</strong> {flashcard.question}<br />
                <strong>Answer:</strong> {flashcard.answer}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display quiz if available */}
      {quiz.length > 0 && (
        <div>
          <h2>Generated Quiz:</h2>
          <ul>
            {quiz.map((q, index) => (
              <li key={index}>
                <strong>Question:</strong> {q.question}<br />
                <strong>Options:</strong>
                <ul>
                  {q.answers.map((answer, i) => (
                    <li key={i}>{answer}</li>
                  ))}
                </ul>
                <strong>Correct Answer:</strong> {q.correct_answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
