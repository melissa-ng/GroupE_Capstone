import { useLocation } from "react-router-dom";

export default function ResultsPage() {
  const location = useLocation();
  const fileName = location.state?.fileName || "Unknown file";

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Processing Complete</h1>
      <p className="text-sm text-gray-600">Your transcript <strong>{fileName}</strong> has been uploaded and is being analyzed.</p>
    </div>
  );
}
