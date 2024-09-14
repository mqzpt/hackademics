import React, { useState } from "react";

export default function Home() {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setFlashcards([]);

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

  return (
    <div>
      <h1>Study Sync Flashcard Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here"
          rows={10}
          cols={50}
        />
        <br />
        <button type="submit" disabled={!text || loading}>Generate Flashcards</button>
      </form>

      {loading && <p>Generating flashcards...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
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
    </div>
  );
}
