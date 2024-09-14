import cohere as co
from dotenv import load_dotenv
from pprint import pprint
import requests
import os

load_dotenv()

def get_cohere_token():
    return os.getenv("COHERE_API_KEY")

def feed_cohere_text(text):
    summary_generated = co.generate(
        model='command-xlarge-nightly',
        prompt=f"Summarize the following text:\n\n{text}",
        max_tokens=150,
        num_generations=1,
        temperature=0.5
    )
    summary = summary_generated.generations[0].text.strip()
    questions_response = co.generate(
        model='command-xlarge-nightly',
        prompt=f"Create a list of questions from the following summary:\n\n{summary}",
        max_tokens=100,
        num_generations=5, 
        temperature=0.7
    )
    questions = [gen.text.strip() for gen in questions_response.generations]
    reranked_questions = co.rerank(
        query=f"Select the most relevant questions from the following list:",
        documents=questions, 
        top_n=3,  
        return_documents=True  
    )
    # for result in reranked_questions.results:
    #     print(f"Document: {result.document.text}")
    #     print(f"Relevance Score: {result.relevance_score}\n")
    best_result = max(reranked_questions.results, key=lambda x: x.relevance_score)
    text_with_questions = best_result.document.text
    selected_questions = [line.strip() for line in text_with_questions.splitlines() if line.startswith('-')]
    # for question in questions:
    #     print(question)
    flashcards = []
    for question in selected_questions:
        answer_response = co.generate(
            model='command-xlarge-nightly',
            prompt=f"Provide a concise answer to the following question based on the text: {text}\n\nQuestion: {question}",
            max_tokens=100,
            num_generations=1,  
            temperature=0.7
        )
        answer = answer_response.generations[0].text.strip()
        flashcards.append({
            "question": question,
            "answer": answer
        })

    return flashcards
    

if __name__ == "__main__":
    # CLI for testing
    print('\n*** Feed me some text! ***\n')
    
    text_to_process = input("\nEnter the content to generate questions from:")
    
    questions_and_answers = co.feed_cohere_text(text_to_process)
    
    print("\n")
    pprint(questions_and_answers)
    
    
    