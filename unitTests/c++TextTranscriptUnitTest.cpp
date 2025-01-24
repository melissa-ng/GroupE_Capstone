#include <gtest/gtest.h>
#include <string>
#include <map>
#include <vector>
#include <algorithm> // For std::find
#include "text_parsing_module.h" // Replace with your actual implementation header

// Test fixture for setting up common data for all test cases
class TranscriptParsingTest : public ::testing::Test {
protected:
    std::string sampleTranscript;
    std::string noisyTranscript;
    std::string incompleteTranscript;
    std::map<std::string, std::vector<std::string>> expectedOutput;

    void SetUp() override {
        // Initialize test data
        sampleTranscript = R"(
        [00:00:01] Operator: 911, what's your emergency?
        [00:00:05] Caller: My friend is unconscious and not breathing.
        [00:00:10] Operator: Can you tell me your location?
        [00:00:15] Caller: 123 Main Street.
        )";

        noisyTranscript = R"(
        [00:00:01] Operator: 911, what's your emergency?
        [garbled audio]
        [00:00:10] Operator: Can you tell me your location?
        )";

        incompleteTranscript = R"(
        [00:00:01] Operator: 911, what's your emergency?
        [00:00:05] Caller: I think I—
        )";

        expectedOutput = {
            {"operator_questions", {"911, what's your emergency?", "Can you tell me your location?"}},
            {"caller_responses", {"My friend is unconscious and not breathing.", "123 Main Street."}},
            {"timestamps", {"00:00:01", "00:00:05", "00:00:10", "00:00:15"}}
        };
    }
};

// Ensure your `parseTranscript` function is implemented in text_parsing_module.cpp
std::map<std::string, std::vector<std::string>> parseTranscript(const std::string& transcript) {
    // This is a placeholder implementation; replace it with your actual function.
    std::map<std::string, std::vector<std::string>> mockResult;
    if (transcript.find("garbled audio") != std::string::npos) {
        mockResult = {
            {"operator_questions", {"911, what's your emergency?", "Can you tell me your location?"}},
            {"caller_responses", {"[garbled audio]"}},
            {"timestamps", {"00:00:01", "00:00:10"}}
        };
    } else if (transcript.find("I think I—") != std::string::npos) {
        mockResult = {
            {"operator_questions", {"911, what's your emergency?"}},
            {"caller_responses", {"I think I—"}},
            {"timestamps", {"00:00:01", "00:00:05"}}
        };
    } else {
        mockResult = {
            {"operator_questions", {"911, what's your emergency?", "Can you tell me your location?"}},
            {"caller_responses", {"My friend is unconscious and not breathing.", "123 Main Street."}},
            {"timestamps", {"00:00:01", "00:00:05", "00:00:10", "00:00:15"}}
        };
    }
    return mockResult;
}

TEST_F(TranscriptParsingTest, ParseValidTranscript) {
    auto result = parseTranscript(sampleTranscript);
    EXPECT_EQ(result, expectedOutput) << "Parsed output does not match expected output for valid transcript.";
}

TEST_F(TranscriptParsingTest, ParseNoisyTranscript) {
    auto result = parseTranscript(noisyTranscript);
    auto it = std::find(result["caller_responses"].begin(), result["caller_responses"].end(), "[garbled audio]");
    EXPECT_NE(it, result["caller_responses"].end()) << "Noisy transcript was not handled correctly.";
}

TEST_F(TranscriptParsingTest, ParseIncompleteTranscript) {
    auto result = parseTranscript(incompleteTranscript);
    EXPECT_LT(result["caller_responses"].size(), expectedOutput["caller_responses"].size())
        << "Incomplete transcript handling is incorrect.";
}

TEST_F(TranscriptParsingTest, ParsedStructure) {
    auto result = parseTranscript(sampleTranscript);
    EXPECT_TRUE(result.count("operator_questions") > 0);
    EXPECT_TRUE(result.count("caller_responses") > 0);
    EXPECT_TRUE(result.count("timestamps") > 0);
    EXPECT_EQ(result.size(), 3) << "Parsed output structure is incorrect.";
}

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}