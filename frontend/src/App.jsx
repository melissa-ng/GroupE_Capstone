import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TranscriptUpload from "./components/TranscriptUploadPage";
import ResultsPage from "./components/ResultsPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import "./App.css"


export default function App() {
  return (
    <>
      <Router>
        <NavigationBar />
          <Routes>
            <Route path="/" element={<TranscriptUpload />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
      </Router>
    </>
  );
}