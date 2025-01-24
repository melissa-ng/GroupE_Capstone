import { expect } from 'chai';
import { parseTranscript } from './text_parsing_module.js'; // Ensure this is the correct path

describe('JStextTranscriptUnitTest', function () {
  let sampleTranscript, noisyTranscript, incompleteTranscript, expectedOutput;

  beforeEach(function () {
    // Set up test data
    sampleTranscript = `
      [00:00:01] Operator: 911, what's your emergency?
      [00:00:05] Caller: My friend is unconscious and not breathing.
      [00:00:10] Operator: Can you tell me your location?
      [00:00:15] Caller: 123 Main Street.
    `;

    noisyTranscript = `
      [00:00:01] Operator: 911, what's your emergency?
      [garbled audio]
      [00:00:10] Operator: Can you tell me your location?
    `;

    incompleteTranscript = `
      [00:00:01] Operator: 911, what's your emergency?
      [00:00:05] Caller: I think I—
    `;

    expectedOutput = {
      operatorQuestions: [
        "911, what's your emergency?",
        "Can you tell me your location?"
      ],
      callerResponses: [
        "My friend is unconscious and not breathing.",
        "123 Main Street."
      ],
      timestamps: [
        "00:00:01",
        "00:00:05",
        "00:00:10",
        "00:00:15"
      ]
    };
  });

  it('should correctly parse a valid transcript', function () {
    const result = parseTranscript(sampleTranscript);
    expect(result).to.deep.equal(expectedOutput);
  });

  it('should handle noisy transcripts gracefully', function () {
    const result = parseTranscript(noisyTranscript);
    expect(result.callerResponses).to.include('garbled audio');
  });

  it('should handle incomplete transcripts without crashing', function () {
    const result = parseTranscript(incompleteTranscript);
    expect(result.callerResponses.length).to.be.lessThan(expectedOutput.callerResponses.length);
  });

  it('should return a parsed output with the correct structure', function () {
    const result = parseTranscript(sampleTranscript);
    expect(result).to.have.all.keys('operatorQuestions', 'callerResponses', 'timestamps');
  });
});
