import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/Progress";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import "./TranscriptUploadPage.css";

export default function TranscriptUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle file upload of only allowed types and simulate upload progress
  const handleFileUpload = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = ["text/plain", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage("Unsupported file type. Please upload a .txt or .pdf file.");
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
    setUploadProgress(0);

    // Simulating upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // Navigate to results page after completion
        navigate("/results", { state: { fileName: selectedFile.name } });
      }
    }, 500);
  };

  // Hook for handling file drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/plain": [".txt"], "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles[0]),
  });

  return (
    <div className="transcript-upload-container">
      <div className="upload-box">
        <h1 className="upload-title">Upload Call Transcript</h1>
        <div {...getRootProps()} className="upload-area">
          <input {...getInputProps()} />
          <UploadCloud className="upload-icon" size={40} />
          <p className="upload-text">Drag and drop a transcript file here, or click to select a file</p>
        </div>
        <p className="upload-formats">Supported formats: .txt, .pdf</p>
        {file && <p className="upload-success">Uploading: {file.name}</p>}
        {uploadProgress > 0 && <Progress value={uploadProgress} className="upload-progress" />}
        {errorMessage && <p className="upload-error">{errorMessage}</p>}
        <Button className="upload-button" onClick={() => document.querySelector('input[type=file]').click()}>
          Select File
        </Button>
      </div>
    </div>
  );
}
