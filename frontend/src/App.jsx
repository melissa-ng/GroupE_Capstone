import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TranscriptUpload from "./pages/TranscriptUploadPage/TranscriptUploadPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// import Home from './pages/HomePage/HomePage';
// import History from './pages/HistoryPage/HistoryPage';
import "./App.css";
import Sidebar from "./components/SideBar/SideBar";
import SignIn from "./pages/SignInPage/SignInPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-container">
          <NavigationBar />
          <div className="content-container">
            <Routes>
              {/* <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} /> */}
              <Route path="/" element={<TranscriptUpload />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;