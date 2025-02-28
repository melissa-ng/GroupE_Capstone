import React from 'react';

const SummarySection = ({ questions = [], completenessScore = 0 }) => {
  // Sort questions by status to group asked and missed questions
  const sortedQuestions = [...questions].sort((a, b) => {
    if (a.asked === b.asked) return 0;
    return a.asked ? -1 : 1;
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-[#4a4a4a] mb-4">Summary</h2>
      
      <div className="mb-4">
        <h3 className="text-[#4a4a4a] font-medium mb-2">Required Questions:</h3>
        <ul className="space-y-3">
          {sortedQuestions.map((question, index) => (
            <li key={index} className="flex items-center">
              <span 
                className={`inline-block w-3 h-3 rounded-full mr-3 ${
                  question.asked ? 'bg-[#4ade80]' : 'bg-[#f87171]'
                }`}
              ></span>
              <span className="text-sm text-[#4a4a4a]">
                Question {index + 1}: {question.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-[#f5f5ff] rounded-md p-3 mt-4">
        <h3 className="text-[#4a4a4a] font-bold text-sm">Completeness Score:</h3>
        <div className="flex justify-end mt-2">
          <span className="text-xl font-bold text-[#7b68ee]">{completenessScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;