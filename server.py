from flask import Flask, render_template, request
from generator import feed_cohere_text, generate_apkg_from_text

app = Flask(__name__)


@app.route("/")
@app.route("/index")
def index():
    return "hello world"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8892)
