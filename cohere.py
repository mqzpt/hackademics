import cohere
from dotenv import load_dotenv
from pprint import pprint
import requests
import os

load_dotenv()

def get_cohere_token():
    return os.getenv("COHERE_API_KEY")

def feed_cohere_text(text):
    # We're gonna send preprocessed text to the API.
    # The preprocessing is under development.
    return text;

if __name__ == "__main__":
    # CLI for testing
    print('\n*** Feed me some text! ***\n')
    
    text_to_process = input("\nEnter the content to generate questions from:")
    
    questions_and_answers = cohere.feed_cohere_text(text_to_process)
    
    print("\n")
    pprint(questions_and_answers)
    
    
    