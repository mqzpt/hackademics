import React, { useRef, useState } from "react";
import EncryptButton from "./EncryptButton";
import TextComponent from "./BubbleText";
import HoverSuccessBox from "./HoverSuccessBox";
import SubmitButton from "./SubmitButton";
import FlipCard from "./Flashcard";

export default function Main() {
  const sectionRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file

    if (file) {
      console.log("File uploaded:", file);
      setUploading(true);
      setUploadComplete(false);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file); // Append the file to the form data

      // Submit the file to the backend
      fetch('http://localhost:8080/api/generate_flashcards', {
        method: 'POST',
        body: formData, // Send the form data containing the file
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to generate flashcards');
          }
          return response.json();
        })
        .then(data => {
          setFlashcards({questions: data.Questions, answers: data.Answers}); // Set the questions and answers in the state
          setUploadComplete(true);
        })
        .catch((error) => {
          console.error('Error:', error);
          setError(error.message);
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  const scrollToSection = () => {
    const targetElement = document.getElementById("get-started");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (textInput) {
      setLoading(true);
      setUploading(true);  // Show loading cube
      setError(null);
      setFlashcards([]);
  
      try {
        const response = await fetch('http://localhost:8080/api/generate_flashcards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: textInput }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate flashcards');
        }
  
        const data = await response.json();
  
        // Store the questions and answers separately
        setFlashcards({ questions: data.Questions, answers: data.Answers });
        setUploadComplete(true);  // Set the upload completion status
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setUploading(false);  // Hide loading cube after processing
      }
    }
  };
  

  // Format flashcards to map over both questions and answers and match them
  const formatFlashcards = () => {
    const rows = [];

    for (let i = 0; i < flashcards.questions.length; i += 3) {
      const row = (
        <div className="flex justify-between w-full px-4 py-4" key={i}>
          {flashcards.questions.slice(i, i + 3).map((question, index) => (
            <FlipCard
              key={index + i}
              card={{
                id: (index + i).toString(),
                variant: "click",
                front: `Q${index + i + 1}: ${question}`, // Display question
                back: `A${index + i + 1}: ${flashcards.answers[index + i] || "Answer not available"}` // Corresponding answer
              }}
              className="w-1/3 mx-2" // Ensure that each flashcard takes up 1/3rd of the width with margin
            />
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <TextComponent />
        <div className="flex justify-center mb-4">
          <img src="./images/cohere-logo.svg" alt="Cohere Logo" className="h-20 w-30" />
        </div>
        <div className="ml-6 text-center">
          <EncryptButton scrollTo={scrollToSection} />
        </div>
      </div>

      <div
        id="get-started"
        ref={sectionRef}
        className="container flex flex-col items-center justify-center mx-auto mt-20"
      >
        {/* Centered Text */}
        <div className="text-center mb-10">
          <p className="text-xl font-semibold">
            Upload a file or enter your own text to automatically create flashcards for learning and revision.
          </p>
        </div>

        <div className="flex justify-between w-full px-4 py-10 mb-10">
          {/* File Upload Section */}
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-1/2 px-4 py-10 text-center border-2 border-dashed rounded-lg cursor-pointer shadow-md hover:bg-gray-100 mb-4"
          >
            <p className="text-gray-600">
              Drag and drop or click here to upload your file
            </p>
            <p className="mt-1 text-sm text-gray-500">Supported formats: .txt, .pptx, .docx, .mp3, .mp4, .pdf</p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".txt,.ppt,.pptx,.doc,.docx,.mp3,.mp4,.wav,.pdf,.avi,.mov,.xlsx,.xls"
              onChange={handleFileUpload}
            />
          </label>

          {/* Text Input Section */}
          <label
            htmlFor="text-input"
            className="flex flex-col items-center justify-center w-1/2 px-4 py-10 text-center border-2 border-dashed rounded-lg cursor-pointer mb-4"
          >
            <p className="text-gray-600">
              Enter text here
            </p>
            <textarea
              id="text-input"
              className="w-full h-48 px-3 py-2 text-white border-none rounded-lg focus:outline-none bg-black"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              style={{ caretColor: 'white' }} // White cursor
            />
            <SubmitButton
              onClick={handleTextSubmit}
              disabled={!textInput || loading}
            >
              Submit Text
            </SubmitButton>
          </label>
        </div>

        {/* Loading and Error States */}
        {loading && <p></p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Flashcards */}
        {flashcards.questions && flashcards.answers && (
          <div className="w-full px-4 mt-10">
            <h2 className="text-xl font-semibold"></h2>
            <div className="container mx-auto">
              {formatFlashcards()} {/* Render flashcards in rows of 3 */}
            </div>
          </div>
        )}

        {uploading && (
          <div className="flex justify-center mt-4">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        )}
        {uploadComplete && !uploading && <HoverSuccessBox uploadComplete={uploadComplete} />}
      </div>
    </section>
  );
}
