import React from "react";
import styled from "styled-components";

const StyledText = styled.div`
  text-align: center;

  h1, h2 {
    margin: 0;
    padding: 0;
    position: relative;
    display: inline-block;
    color: white;
    font-weight: bold;
  }

  h1 {
    font-size: 7rem; /* Adjust size as needed */
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem; /* Adjust size as needed */
    color: #707070; /* Gray color for h2 */
  }

  h1::before, h2::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(128, 0, 128, 0.5); /* Purple glow */
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s;
  }

  h1:hover::before, h2:hover::before {
    opacity: 1;
  }
`;

const TextComponent = () => {
  return (
    <StyledText>
      <h1 class="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
        Create Anki decks instantly from text with AI-powered precision 
        </h1>
        <h2 class="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
        Upload your file and let AI create question-answer pairs for your deck.
          <br />
          Powered by Cohere, effortlessly turn text into Anki decks.
        </h2>
    </StyledText>
  );
};

export default TextComponent;
