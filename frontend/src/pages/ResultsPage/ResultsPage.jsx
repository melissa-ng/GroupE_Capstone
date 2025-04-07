import React from "react";
import { useParams } from "react-router-dom";
import TranscriptSection from "../../components/TranscriptDisplaySectionComponent";
import SummarySection from "../../components/SummaryDisplaySectionComponent";
import AdditionalDetailsSection from "../../components/AdditionalDetailSectionComponent";

export default function ResultsPage({ sessions }) {
  const { sessionId } = useParams();

  // Find the selected session data
  const session = sessions.find((s) => s.session === sessionId);

  if (!session) {
    return <h2>Session not found</h2>;
  }

  // Return all components for the results page
  return (
    <div className="results-container">
      <TranscriptSection />
      <SummarySection />
      <AdditionalDetailsSection />
    </div>
  );
}
