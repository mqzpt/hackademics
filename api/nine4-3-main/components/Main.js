import React, { useRef, useState } from "react";
import EncryptButton from "./EncryptButton";
import TextComponent from "./BubbleText";
import HoverSuccessBox from "./HoverSuccessBox";
import SubmitButton from "./SubmitButton";

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
    const file = e.target.files[0];
    if (file) {
      console.log("File uploaded:", file);
      setUploading(true);
      setUploadComplete(false);
  
      // Read the file content
      const reader = new FileReader();
  
      reader.onload = async () => {
        const fileContent = reader.result;
  
        // Submit the file content to the backend
        try {
          const response = await fetch('http://localhost:8080/api/generate_flashcards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: fileContent }), // Assuming backend can process file content like text input
          });
  
          if (!response.ok) {
            throw new Error('Failed to generate flashcards');
          }
  
          const data = await response.json();
          setFlashcards(data.flashcards);
          setUploadComplete(true);
        } catch (err) {
          setError(err.message);
        } finally {
          setUploading(false);
        }
      };
  
      reader.readAsText(file); // Assuming the file is text-based (txt, docx, etc.)
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
        setFlashcards(data.flashcards);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
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
        <div className="flex justify-between w-full px-4 py-10">
          {/* File Upload Section */}
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-1/2 px-4 py-10 text-center border-2 border-dashed rounded-lg cursor-pointer shadow-md hover:bg-gray-100"
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
            className="flex flex-col items-center justify-center w-1/2 px-4 py-10 text-center border-2 border-dashed rounded-lg cursor-pointer"
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
        {loading && <p>Generating flashcards...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display Flashcards */}
        {flashcards.length > 0 && (
          <div className="w-full px-4 mt-10 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold">Generated Flashcards:</h2>
            <ul>
              {flashcards.map((flashcard, index) => (
                <li key={index} className="mt-4">
                  <strong>Question:</strong> {flashcard.question}
                  <br />
                  <strong>Answer:</strong> {flashcard.answer}
                </li>
              ))}
            </ul>
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

      <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
        Clean and tidy code.
      </h2>
      <br />
      <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed lg:w-2/3">
        Here is our collection of free to use templates made with Next.js &
        styled with Tailwind CSS.
      </p>
      <div className="pt-12 pb-24 max-w-4xl mx-auto">
        {/* Content */}
      </div>
      <div className="pt-32 pb-32 max-w-6xl mx-auto">
        {/* Content */}
      </div>
      <section className="relative pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-200">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              type="email"
              placeholder="jack@example.com"
              name="email"
              autoComplete="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
            />
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              href="/"
            >
              <span className="justify-center">Subscribe</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
