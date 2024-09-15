from flask import Flask, jsonify, request
from flask_cors import CORS
import cohere
import pdfplumber
import docx
import assemblyai as aai
from pptx import Presentation
import os

app = Flask(__name__)
CORS(app)

co = cohere.Client('s6QrVVNoTa8VaUiBUhWvVQk1jU0qu2E4TNw2fMyz')

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Function to extract text from a DOCX file
def extract_text_from_docx(docx_path):
    doc = docx.Document(docx_path)
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    return "\n".join(text)

# Function to extract text from PPTX (PowerPoint) file
def pptx_to_text(pptx_file):
    prs = Presentation(pptx_file)
    all_text = []
    for slide in prs.slides:
        for shape in slide.shapes:
            if hasattr(shape, "text"):
                all_text.append(shape.text)
    return "\n".join(all_text)

# Function to transcribe audio (replace with your audio transcription API logic)
def transcribe_audio(api_key, audio_file):
    # This is a placeholder function, replace it with actual transcription logic
    return "Transcribed audio text here..."

# Wrapper function to detect file type and convert to text
def convert_to_text(file, file_type):
    if file_type == 'pdf':
        return extract_text_from_pdf(file)
    elif file_type == 'docx':
        return extract_text_from_docx(file)
    elif file_type == 'pptx':
        return pptx_to_text(file)
    elif file_type == 'audio':
        api_key = "your-audio-api-key"  # Replace with your actual API key
        return transcribe_audio(api_key, file)
    else:
        return None

# Endpoint to handle both text and file uploads
@app.route("/api/generate_flashcards", methods=['POST'])
def generate_flashcards():
    if 'file' in request.files:
        file = request.files['file']
        file_type = file.filename.rsplit('.', 1)[1].lower()  # Get file extension
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        text = convert_to_text(file_path, file_type)
    else:
        data = request.get_json()
        text = data.get('text', '')

    if not text:
        return jsonify({'error': 'Text is missing or invalid file type'}), 400

    try:
        summary_response = co.generate(
            model='command-xlarge-nightly',
            prompt=f"Summarize the following text:\n\n{text}",
            max_tokens=150,
            temperature=0.5,
        )
        summary = summary_response.generations[0].text.strip()

        questions_response = co.generate(
            model='command-xlarge-nightly',
            prompt=f"Create a list of questions from the following summary:\n\n{summary}",
            max_tokens=2000,
            temperature=0.7,
        )
        # Retrieve questions from the response
        questions = [gen.text.strip() for gen in questions_response.generations]

        # Remove the introductory part (first 61 characters) from each question
        print(questions)
        questions = [q[62:].strip() for q in questions]
        print(questions)

        flashcards = []

        for index, question in enumerate(questions, start=1):
            # Generate the answer for the current question
            answer_response = co.generate(
                model='command-xlarge-nightly',
                prompt=f"Provide a concise answer to the following question based on the text: {text}\n\nQuestion: {question}",
                max_tokens=2000,
                temperature=0.7,
            )
            answer = answer_response.generations[0].text.strip()
            
            # Append the question and answer to the flashcards list with proper numbering
            flashcards.append({
                "question": f"{question}",
                "answer": f"{answer}"
            })
            questions = flashcards[0]['question'].split('?')
            questions = [q.strip() + '?' for q in questions if q.strip()]  # Ensuring proper formatting
            
            # Splitting the answers by '\n\n7.'
            answers = flashcards[0]['answer'].split('\n\n7.')
            answers = [a.strip() for a in answers if a.strip()]  # Ensuring proper formatting
            quest = []
            for i in range(len(questions)):
                quest.append(questions[i].split(',')[0])  

            split_by_newline = answers[0].split('\n')
            
# Removing any leading/trailing whitespaces and empty strings
            split_by_newline = [answer.strip() for answer in split_by_newline if answer.strip()]

            
            print("/////////////////////////", split_by_newline)
            print("*************************", quest)
            if len(quest)!=len(split_by_newline):
                min_len = min(len(quest), len(split_by_newline))
                quest=quest[:min_len]
                split_by_newline=split_by_newline[:min_len]



        return jsonify({'Questions': quest,"Answers":split_by_newline}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)