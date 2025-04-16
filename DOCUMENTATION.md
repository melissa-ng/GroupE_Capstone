# Documentation

## Backend  

### Overview
This a Python-based backend application designed for analyzing dispatcher-caller emergency call transcripts. It leverages the LlamaIndex framework in combination with FAISS for semantic search and retrieval-based question answering. The system is designed to process EMS protocol data from CSV files, index it using dense vector embeddings, and analyze transcripts by comparing them to existing protocol questions. The primary goal is to determine whether Case Entry and the appropriate Nature Code questions were asked or addressed in a given emergency call transcript.

---

### Project Structure
```
/backend
│
├── /data
|   ├── EMS-Calltaking-QA.csv
|   ├── /db_indexing
│       ├── default_vector_store.json
│       ├── docstore.json
│       ├── graph_store.json
│       ├── image_vector_store.json
│       └── index_store.json
├── /schema
│   └── models.py
|
├── EMS_CallAnalyzer.py
└── api.py

```

---

### Main Files

#### `EMS_CallAnalyzer.py`
- Key Components and Workflow:
  - Configures LlamaIndex settings for embedding model and LLM.
  - Loads EMS protocol data from the CSV file.
  - Processes EMS data as documents and creates a FAISS index. Uses `SemanticSplitterNodeParser` for splitting the documents into related chunks to improve retrieval.
  - Using the passed in EMS transcript, it constructs a query for the LLM to determine if the Case Entry and the identified Nature Code questions were all asked.
  - Returns a structured output that is detailed in the `models.py`.

---
 
#### `models.py`
- Uses Pydantic models to define a schema for the returned data in a JSON format.
- `EMS_CallAnalyzer.py` uses this class and its models described below to make the LLM's reponse conform this structure.
- `NatureCode` Model
  - Represents the categorization of the emergency call.
  - Attributes:
    -  The name of the nature code, an explanation of why this nature code was chosen, and the confidence level associated with the identified nature code.
- `Question` Model
  - Represents a question asked during the emergency call, that was matched to a question in the EMS protocol data for the identified nature code.
  - Attributes:
    -  The text of the question, if it was asked or not, justification and reasoning to how the question was handled, and an integer representing a score or evaluation of how the question was handled.
 - `NatureCodeQuestionAnalysis` Model
  - Represents the overall analysis of a call, combining nature code information and question analysis.
  - Attributes:
    -  A list of nature code objects (Should always be 2 with Case Entry being one of them) and a list of question objects.

---

#### `api.py`
- Defines FastAPI API endpoints for emergency call analysis.
- Configures CORS to allow requests from specified origins (frontend).
- Defines a POST endpoint at "/uploadfile" to receive a JSON file containing the call transcript.
- Reads the uploaded JSON file, analyzes the transcript using EMSCallAnalyzer, and returns the result.
   
---



## Frontend 

### Overview

This is a React-based frontend application designed for analyzing dispatcher-caller conversations. The app provides a user-friendly interface to upload transcripts, view results and result history, view distacher profiles, and manage user authentication The dispatcher profile page is purely frontend with no real functionality with a database since NPD was still unsure of how dispatcher identification would look like/be entered into the system. User authentication also has dummy functionality for demo purposes. 

---

### Project Structure

```
/src
│
├── /components
│   ├── NavigationBar.jsx
│   ├── Sidebar.jsx
│   ├── AdditionalDetailSection.jsx
│   ├── SummaryDisplaySection.jsx
│   └── TranscriptDisplaySection.jsx
│
├── /pages
│   ├── /DispatchersPage
│   │   ├── DispatchersPage.jsx
│   │   └── DispatchersPage.css
│   │
│   ├── /HistoryPage
│   │   ├── HistoryPage.jsx
│   │   └── HistoryPage.css
│   │
│   ├── /ResultsPage
│   │   ├── ResultsPage.jsx
│   │   └── ResultsPage.css
│   │
│   ├── /SignInPage
│   │   ├── SignInPage.jsx
│   │   ├── SignInPage.css
│   │   ├── GoogleAuth.js
│   │   └── GoogleAuth.jsx
│   │
│   ├── /SignUpPage
│   │   ├── SignUpPage.jsx
│   │   └── SignUpPage.css
│   │
│   └── /TranscriptUploadPage
│       ├── TranscriptUploadPage.jsx
│       └── TranscriptUploadPage.css
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

### Components

#### `NavigationBar.jsx`
- Displays navigation options across all pages.
- Handles routing links and user sign in.

#### `Sidebar.jsx`
- Contextual based on current page.
- Provides links to sessions on history page.

#### `AdditionalDetailSection.jsx`
- Area for additional results information about the transcript (categorical scoring, areas for improvement, suggested sections of focus in the flipbook)

#### `SummaryDisplaySection.jsx`
- Displays the summarized version of the transcript results with required questions and completeness score. 

#### `TranscriptDisplaySection.jsx`
- Renders the raw or structured transcript data.
- Scrollable and styled for easy readability.

---

### Pages

#### `DispatchersPage`
- Lists dispatcher profiles and overall scores with links to their sessions.
- Include search functionality.
- Dispatcher data is an array.

#### `HistoryPage`
- Shows past uploaded transcripts and analysis history.

#### `ResultsPage`
- Main analysis view for an uploaded transcript.
- Uses `SummaryDisplaySection`, `AdditionalDetailSection`, and `TranscriptDisplaySection`.

#### `SignInPage`
- Handles user login with support for email/password or Google.
- Includes:
  - `GoogleAuth.js` – Authentication logic (e.g., Google API integration).
  - `GoogleAuth.jsx` – Google login UI button.

#### `SignUpPage`
- User registration page with input validation and error messaging.

#### `TranscriptUploadPage`
- Allows users to upload transcripts.
- Shows upload progress and supported file 
- Navigates to the ResultsPage.

---

### `App.jsx`
- Root component of the application.
- Sets up React Router routes and global layout.
- Imports `App.css` for base styles.

---

### `App.css`
- Global styles applied across the application.
- Resets, fonts, layout, theme colors, and shared utility classes.

---

### `index.css`
- Global styles applied across the application.
- Resets, fonts, layout, theme colors, and shared utility classes.

---

### `main.jsx`
- Entry point for the React application.
- Mounts the root component (<App />) into the DOM using React's createRoot.
- Wraps the application in React’s <StrictMode> to help identify potential problems.
---

### Notes for Developers
- Every page is self-contained with its own `jsx` and `css` files for modularity.
- Use consistent naming conventions and component structure for scalability.
- Use `props` and state management (e.g., context or Redux if used) effectively for data passing between components.
