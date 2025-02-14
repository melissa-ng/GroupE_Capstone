import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TranscriptUpload from "./components/TranscriptUploadPage";
import ResultsPage from "./components/ResultsPage";
import "./App.css"


export default function App() {
  return (
    <Router>
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<TranscriptUpload />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}