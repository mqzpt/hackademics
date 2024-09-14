from flask import Flask, render_template, request, send_file
from generator import feed_cohere_text, generate_apkg_from_text
import os

app = Flask(__name__)

# Ensure the 'uploads' directory exists
if not os.path.exists("uploads"):
    os.makedirs("uploads")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/generate")
def generate():
    return render_template("generator.html")


@app.route("/test")
def test():
    return "Test Page"


@app.route("/upload", methods=["POST"])
def upload_file():
    # Get the deck name from the form
    deck_name = request.form.get("deck_name", "Unnamed Deck")

    # Check if a file was uploaded
    if "txt_file" not in request.files:
        return "No file part", 400

    file = request.files["txt_file"]

    if file.filename == "":
        return "No selected file", 400

    # Save the uploaded file to the 'uploads' directory
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    # Read the file content
    with open(file_path, "r") as f:
        file_content = f.read()

    # Generate the Anki deck using the file content
    generate_apkg_from_text(file_content, deck_name)

    # Send the generated .apkg file back to the user for download
    apkg_filename = f"{deck_name}.apkg"
    return send_file(apkg_filename, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
