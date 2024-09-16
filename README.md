![hackademics-logo](https://github.com/user-attachments/assets/736642a2-6964-4978-8c37-cf12e4af160c)

## Inspiration
A couple of us started using Anki to study last term, and we quickly realized that one of the slowest parts of the process, especially when cramming for exams, is manually generating flashcards. The process is often repetitive, and when it involves media like PowerPoint slides or lecture recordings, it becomes even more time-consuming. While web services exist to automate the generation of Anki flashcards from text and other formats, we found that most of them aren't free. We believe students deserve a tool like this without any cost, as efficient studying shouldn't come with a price tag.

## What it does
Our tool, Hackademics, automatically converts various file formats—such as text files, PDFs, PowerPoints, Word documents, and even audio recordings—into ready-to-use Anki flashcards. Whether it's a transcript of a lecture or notes from a presentation, Hackademics takes the input and generates an Anki deck to help you study more effectively and efficiently. This tool empowers students to focus on learning, not on tedious card creation.

## How we built it
We developed Hackademics using Python and Flask to build the web interface and handle file uploads. For file conversion, python-docx and python-pptx were used to extract text from Word and PowerPoint files, respectively. Pdfplumber was used to extract text from PDF's, and audio transcriptions were handled using a custom transcription service.

We integrated Cohere's LLM API to format the extracted text and create meaningful question-and-answer pairs for flashcards. This step ensures the content is well-structured for efficient studying. Cohere’s rerank() feature was used to identify and prioritize the most relevant questions based on the extracted content, ensuring that only the highest-quality question-answer pairs are included in the final deck.

Once the text is processed and the question-answer pairs are generated, the output is converted into an Anki-compatible format (.apkg), which are automatically downloaded and imported directly into the Anki app, allowing immediate use for studying.

The website was deployed for free with Render, and we used the free domain provided by GoDaddy + MLH. You can find Hackademics online at https://www.hackademics.study/.

## Challenges we ran into
Handling audio transcription was another challenge. Converting speech into coherent text that could be transformed into effective flashcards proved difficult with most open-source packages due to limitations in accuracy and noise reduction. We wanted to ensure that the transcripts were not only accurate but also clean and concise, making them useful for generating high-quality flashcards. After evaluating various solutions, we chose to integrate AssemblyAI's API, as it provided the level of precision and reliability needed for this task. This allowed us to maintain a high standard of transcription quality, ensuring that the flashcards generated from audio content were as effective and meaningful as possible.

## Accomplishments that we're proud of
We're incredibly proud to have developed a tool that students will actually use. Throughout the hackathon, many people who walked by our booth asked for the website link, which gave us confidence that there is genuine demand for Hackademics. Knowing that our tool can make a real difference in helping students study more efficiently is deeply rewarding. Additionally, by offering this service for free, we’re not only saving students time but also potentially saving them money compared to other paid services that provide similar functionality. Above everything, it feels great to know we've built something that has immediate, practical value for the student community.

## What we learned
Throughout the development of Hackademics, we not only deepened our technical skills but also gained valuable experience in Flask development and project management. Building a full-stack application taught us how to handle file uploads, manage server-side processes, and deliver a seamless user experience, all while optimizing performance for large datasets like PDFs and audio files. In addition, we honed our project management skills, coordinating tasks across multiple team members, managing deadlines, and ensuring that we balanced feature development with quality assurance. This project reinforced the importance of clear communication, effective collaboration, and adaptability in a fast-paced environment like a hackathon

## What's next for Hackademics
Expanded File Format Support: We plan to add support for more file types, such as HTML, Markdown, and images, allowing for even more flexibility in content creation.

Enhanced AI Capabilities: We aim to refine the AI's ability to generate even more nuanced and subject-specific flashcards, potentially incorporating auto-generated hints, tags, and categories for more organized study sessions.

Integration with Cloud Storage: We intend to allow users to upload files directly from popular cloud platforms like Google Drive and Dropbox, making it easier to access materials from any device.

Collaborative Study Features: We’re exploring the idea of allowing users to share flashcard decks with others, encouraging collaborative learning and crowdsourced study materials.
