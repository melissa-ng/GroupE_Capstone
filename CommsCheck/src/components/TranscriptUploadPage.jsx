import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Progress } from "./ui/Progress";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function TranscriptUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

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

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "text/plain": [".txt"], "application/pdf": [".pdf"] },
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles[0]),
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md flex flex-col justify-center items-center text-center p-6 bg-white border rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 w-full text-center">Upload GEMS Call Transcript</h1>
        <div
          {...getRootProps()}
          className="w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto mb-2 text-gray-600" size={40} />
          <p className="text-sm text-gray-700 text-center">
            Drag and drop a transcript file here, or click to select a file
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">Supported formats: .txt, .pdf</p>
        {file && <p className="mt-2 text-sm text-green-600 text-center">Uploading: {file.name}</p>}
        {uploadProgress > 0 && <Progress value={uploadProgress} className="mt-2" />}
        {errorMessage && <p className="text-sm text-red-600 mt-2 text-center">{errorMessage}</p>}
        <Button className="mt-4 w-full text-center" onClick={() => document.querySelector('input[type=file]').click()}>
          Select File
        </Button>
      </div>
    </div>
  ); 
}
