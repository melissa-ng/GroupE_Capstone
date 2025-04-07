# Kaylee Nguyen
# STILL TESTING
# Backend API to Retrieve Missed and Asked Questions

from flask import Flask, jsonify, request
import pandas as pd
from llama_index.core import VectorStoreIndex
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.vector_stores.faiss import FaissVectorStore

app = Flask(__name__)

# Step 1: Read CSV to extract questions with Section ID
def read_questions_from_csv(file_path):
    """
    Reads a CSV file containing section IDs and question text.
    Returns a list of (section_id, question_text) tuples.
    """
    try:
        df = pd.read_csv(file_path, encoding="utf-8")
        df.columns = df.columns.str.strip()

        if "Section ID" not in df.columns or "Question Text" not in df.columns:
            raise ValueError("The CSV file must contain 'Section ID' and 'Question Text' columns.")

        return list(df[["Section ID", "Question Text"]].itertuples(index=False, name=None))

    except FileNotFoundError:
        print(f"Error: File not found at path: {file_path}")
        return []
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return []

# Step 2: Create index with combined Section ID and question
def create_index(questions):
    """
    Creates a searchable index of questions using LlamaIndex and OpenAI embeddings.
    Each document is formatted as "Section ID: Question Text"
    """
    documents = [{"text": f"{section_id}: {question_text}"} for section_id, question_text in questions]
    storage_context = FaissVectorStore()
    index = VectorStoreIndex.from_documents(
        documents,
        storage_context=storage_context,
        embedding=OpenAIEmbedding()
    )
    return index

# Step 3: API Route to retrieve all questions
@app.route('/api/questions', methods=['GET'])
def get_questions():
    """
    API endpoint to retrieve all questions (with Section ID).
    """
    csv_file_path = "data/(Updated) - EMS-Calltaking-QA.csv"  # Adjusted to match shared file
    questions = read_questions_from_csv(csv_file_path)

    if not questions:
        return jsonify({"error": "No questions found."}), 404

    formatted_questions = [
        {"section_id": section_id, "question_text": question_text}
        for section_id, question_text in questions
    ]
    
    return jsonify({"questions": formatted_questions})

# Step 4: API Route to search based on transcript
@app.route('/api/questions/search', methods=['POST'])
def search_questions():
    """
    API endpoint to retrieve relevant questions based on a transcript.
    Returns top-k similar questions with Section ID.
    """
    data = request.json
    transcript = data.get("transcript", "")

    if not transcript:
        return jsonify({"error": "No transcript provided."}), 400

    # Load questions and build index
    csv_file_path = "data/(Updated) - EMS-Calltaking-QA.csv"
    questions = read_questions_from_csv(csv_file_path)
    index = create_index(questions)

    # Perform semantic search
    response = index.query(transcript, top_k=5)

    # Reformat response to include section ID (by extracting from the text)
    results = []
    for match in response:
        if ": " in match.text:
            section_id, question_text = match.text.split(": ", 1)
            results.append({"section_id": section_id, "question_text": question_text})
        else:
            results.append({"section_id": "Unknown", "question_text": match.text})

    return jsonify({"relevant_questions": results})

if __name__ == "__main__":
    app.run(debug=True)
    