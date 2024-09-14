import genanki
import random

deck_name = 'test-deck'

# Define the deck model
model = genanki.Model(
    random.randrange(1 << 30, 1 << 31),  # Need unique ID's locally for Anki to know what's what,
    'Simple Model',
    fields=[
        {'name': 'Question'},
        {'name': 'Answer'},
    ],
    templates=[
        {
            'name': 'Card 1',
            'qfmt': '{{Question}}',
            'afmt': '{{FrontSide}}<hr id="answer">{{Answer}}',
        },
    ])

# Create a new deck
deck = genanki.Deck(
    random.randrange(1 << 30, 1 << 31),  # Need unique ID's locally for Anki to know what's what
    deck_name)

# Read questions and answers from a text file
# This is the file where your question-answer pairs are stored
input_file = './testing-text-to-apkg/test-deck.txt'
with open(input_file, 'r') as f:
    lines = f.readlines()

# Initialize variables for questions and answers
question = None
answer = None

# Iterate over lines and create note (card) pairs
# Basically we're assuming that the input is consistent, and it should be since we'll preprocess any input

for line in lines:
    line = line.strip()
    if not line:
        # Ignore empty lines
        continue

    if question is None:
        question = line  # First line is the question
    elif answer is None:
        answer = line  # Second line is the answer
        # Add a new note (card) to the deck
        note = genanki.Note(
            model=model,
            fields=[question, answer]
        )
        deck.add_note(note)
        # Reset for next question-answer pair
        question = None
        answer = None

# Create the package and save it as a .apkg file
genanki.Package(deck).write_to_file(f'{deck_name}.apkg')

print(f"Anki deck has been created as '{deck_name}.apkg'.")
