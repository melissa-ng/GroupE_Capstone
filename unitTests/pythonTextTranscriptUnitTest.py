import unittest
from text_parsing_module import parse_transcript  # Replace with the actual module name

class TestTranscriptParsing(unittest.TestCase):
    def setUp(self):
        """Set up test data for the unit tests."""
        self.sample_transcript = """
        [00:00:01] Operator: 911, what's your emergency?
        [00:00:05] Caller: My friend is unconscious and not breathing.
        [00:00:10] Operator: Can you tell me your location?
        [00:00:15] Caller: 123 Main Street.
        """
        
        self.noisy_transcript = """
        [00:00:01] Operator: 911, what's your emergency?
        [garbled audio]
        [00:00:10] Operator: Can you tell me your location?
        """

        self.incomplete_transcript = """
        [00:00:01] Operator: 911, what's your emergency?
        [00:00:05] Caller: I think I—
        """
        
        self.expected_output = {
            "operator_questions": [
                "911, what's your emergency?",
                "Can you tell me your location?"
            ],
            "caller_responses": [
                "My friend is unconscious and not breathing.",
                "123 Main Street."
            ],
            "timestamps": [
                "00:00:01",
                "00:00:05",
                "00:00:10",
                "00:00:15"
            ]
        }

    def test_parse_valid_transcript(self):
        """Test that the parser correctly processes a valid transcript."""
        result = parse_transcript(self.sample_transcript)
        self.assertEqual(result, self.expected_output, "Parsed output does not match expected output for valid transcript.")

    def test_parse_noisy_transcript(self):
        """Test that the parser handles noisy transcripts gracefully."""
        result = parse_transcript(self.noisy_transcript)
        self.assertIn("garbled audio", result["caller_responses"], "Noisy transcript was not handled correctly.")

    def test_parse_incomplete_transcript(self):
        """Test that the parser handles incomplete transcripts without crashing."""
        result = parse_transcript(self.incomplete_transcript)
        self.assertTrue(len(result["caller_responses"]) < len(self.expected_output["caller_responses"]), "Incomplete transcript handling is incorrect.")

    def test_parsed_structure(self):
        """Test that the parsed transcript has the correct structure."""
        result = parse_transcript(self.sample_transcript)
        self.assertTrue(
            all(key in result for key in ["operator_questions", "caller_responses", "timestamps"]),
            "Parsed output structure is incorrect."
        )

if __name__ == "__main__":
    unittest.main()
