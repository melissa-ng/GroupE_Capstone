export function parseTranscript(transcript) {
    // Initialize result structure
    const result = {
      operatorQuestions: [],
      callerResponses: [],
      timestamps: [],
    };
  
    // Split the transcript into lines
    const lines = transcript.trim().split('\n');
  
    // Process each line to extract data
    lines.forEach((line) => {
      const timestampMatch = line.match(/^\[(\d{2}:\d{2}:\d{2})\]/); // Match timestamp
      const operatorMatch = line.match(/Operator:\s*(.+)$/);         // Match operator's text
      const callerMatch = line.match(/Caller:\s*(.+)$/);             // Match caller's text
  
      if (timestampMatch) {
        // Add the timestamp to the result
        result.timestamps.push(timestampMatch[1]);
      }
      if (operatorMatch) {
        // Add operator's question to the result
        result.operatorQuestions.push(operatorMatch[1].trim());
      }
      if (callerMatch) {
        // Add caller's response to the result
        result.callerResponses.push(callerMatch[1].trim());
      }
    });
  
    return result;
  }
  