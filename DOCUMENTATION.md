# Documentation

## Backend  
 

## Frontend 

### Overview

This is a React-based frontend application designed for analyzing dispatcher-caller conversations. The app provides a user-friendly interface to upload transcripts, view results and result history, view distacher profiles, and manage user authentication The dispatcher profile page is purely frontend with no real functionality with a database since NPD was still unsure of how dispather identification would look like/be entered into the system. User authentication also has dummy functionality for demo purposes. 

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
