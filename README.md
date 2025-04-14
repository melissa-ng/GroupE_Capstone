# Emergency Medical Call Analysis Project  

## Description  
This project focuses on analyzing transcripts of emergency medical calls for service to evaluate adherence to required protocols. By leveraging advanced natural language processing (NLP) techniques, the system identifies discrepancies between actual conversations and the mandated procedures outlined in dispatcher training materials.  

The ultimate goal is to ensure that critical information is correctly collected during emergency calls and effectively communicated to the appropriate parties, enhancing emergency response efficiency and accuracy.  

## Identified Technologies and Tools  
- **Python (3.11.5)**: The primary programming language for development.  
- **OpenAI API**: For vectorizing phrases from the dispatcher training flip book and comparing them with transcripts.  
- **Retrieval-Augmented Generation (RAG)**: To assist in the comparison process and improve accuracy in text analysis.  
- **React**: Front-end development of the web interface (led by Melissa and Karan).  
- **GitHub**: Version control and collaboration.  
- **Discord**: Task management and communication.  
- **CJIS Training Compliance**: Ensures secure handling of sensitive call data.

## Features
### Transcript Parsing Feature Documentation  

---

#### **Overview**  
The transcript parsing feature processes raw emergency call transcripts into a structured format for further analysis. It extracts key information such as operator questions, caller responses, and timestamps, ensuring that the data is properly segmented and formatted for comparison against required emergency response protocols.  

---

#### **Features**  
1. **Question and Response Extraction**  
   - Separates operator questions and caller responses.  
   - Handles various transcript formats, including noisy or incomplete data.  

2. **Timestamp Handling**  
   - Extracts timestamps associated with each conversation segment.  

3. **Error Handling**  
   - Gracefully processes transcripts with garbled or missing data.  
   - Ensures incomplete transcripts do not cause crashes.  

4. **Output Format**  
   - Returns a structured dictionary containing the following keys:  
     - `operator_questions`: List of questions asked by the operator.  
     - `caller_responses`: List of responses provided by the caller.  
     - `timestamps`: List of timestamps for each line of the transcript.  

---

#### **Input Format**  
The parser expects raw text transcripts in the following format:  
```plaintext
[00:00:01] Operator: 911, what's your emergency?  
[00:00:05] Caller: My friend is unconscious and not breathing.  
[00:00:10] Operator: Can you tell me your location?  
[00:00:15] Caller: 123 Main Street.  
```  

---

#### **Output Format**  
The parsed transcript is returned as a dictionary:  
```python
{
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
```

---

#### **Unit Testing**  
To validate the parsing feature, run the unit tests:  
1. Add the test file `test_transcript_parsing.py` to your project.  
2. Run the tests using:  
   ```bash
   python -m unittest test_transcript_parsing.py
   ```  
3. Ensure all test cases pass:  
   - Valid transcripts are parsed correctly.  
   - Noisy and incomplete transcripts are handled gracefully.  
   - The parsed output structure matches the expected schema.
  
---

#### **Technologies and Tools**  
- **Programming Language**: React, Python  
- **Testing Framework**: unittest  

---

#### **Future Enhancements**  
1. Support for multiple languages in transcripts.  
2. Integration with speech-to-text pipelines for real-time transcript processing.  
3. Advanced handling of noisy data using NLP techniques.

---

## Group Goals and Progress Plan  
- **January–February**:  
  - Complete CJIS training and submit fingerprints.  
  - Finalize access to the dispatcher training flip book and call transcripts.  
  - Set up the project environment and ensure all team members are onboarded.  

- **March**:  
  - Complete layout of front-end web pages, including:  
    - Home/Transcript Upload Page  
    - Dashboard Page  
    - History Page (previous sessions and results of transcripts)  
    - Sign-in Page using Google Authentication  

- **April**:  
  - Finalize the front-end implementation.  
  - Conduct testing and refine UI components.  
  - Ensure proper integration between front-end and back-end systems.  

- **May 2nd**:  
  - Present the final product at the Capstone Expo.  

## Requirements  
All contributors must fulfill the following requirements before working with sensitive data:  
1. Submit fingerprints and complete **Criminal Justice Information System (CJIS)** training.  
2. Sign a **Collaborator Confidentiality Agreement** before accessing emergency medical call recordings.  

## Installation  
1. Clone the repository:  
   ```bash
   git clone https://github.com/melissa-ng/GroupE_Capstone/
   ```

2. Navigate to the Project Directory  
   ```bash
   cd frontend
   ```  

3. Install Dependencies  
   ```bash
   npm install
   ```  

## Usage  

### Vectorization of Training Materials and Transcripts  
```bash
python scripts/vectorize.py
```  

### Analysis of Call Transcripts for Protocol Adherence  
```bash
python scripts/analyze_transcripts.py
```  

## Workflow  

### Collaboration  
- **Branches**: Each feature or bug fix will be developed on a separate branch (e.g., `feature/vectorization`, `bugfix/error-handling`).  
- **Issue Tracking**: Tasks and updates will be communicated on GroupMe.  
- **Pull Requests**: All changes must be reviewed and approved via pull requests before being merged into the main branch.  

### Directory Structure  
```plaintext
dqa/  
├── data/                  # Dispatcher training flip book and call transcripts  
├── models/                # NLP models for vectorization and analysis  
├── scripts/               # Python scripts for processing and analysis  
├── tests/                 # Unit and integration tests  
└── README.md              # Project documentation  
```

## Authors  
#### **Gary King: Project Manager**
- Oversees the overall direction and progress of the project.
- Ensures that the project stays on schedule and meets deadlines (e.g., Capstone Expo on May 2nd).
- Coordinates communication between team members and external stakeholders.
- Tracks the progress of tasks and ensures alignment with project objectives.
- Facilitates decision-making for the team and resolves conflicts.
- Manages documentation and reporting to advisors or faculty.

#### **Kaylee Nguyen: Scrum Master 2**
- Leads daily stand-ups and facilitates sprint planning for the team.
- Ensures adherence to Agile principles and best practices.
- Monitors progress on assigned tasks and provides assistance as needed.
- Helps identify and remove blockers to keep the project moving forward.
- Oversees the implementation of the vectorization and NLP components.
- Reviews pull requests and ensures code quality for team collaboration.

#### **Melissa Ng: Scrum Master 3**
- Tracks the progress of GitHub branches, pull requests, and overall repository organization.
- Creates and manages issue tickets on GitHub to track development tasks and bug fixes.
- Develops React components and pages for the front-end interface.
- Designs and implements the navigation structure for the front-end application.

#### **Karan Suresh Prajapati: Scrum Master 4**
- Focuses on coordinating with team members to complete key deliverables.
- Manages task allocation and updates the task board to reflect team progress.
- Provides guidance on integrating AI models with the project pipeline.
- Assists in troubleshooting and debugging issues encountered during development.
- Leads efforts on ensuring data privacy and compliance with the confidentiality agreement.

#### **Samuel Imose: Scrum Master 1**
- Facilitates meetings to evaluate sprint outcomes.
- Works on the implementation of the RAG workflow.
- Collaborates with other Scrum Masters to create sprint goals and prioritize tasks.
- Oversees the preparation and presentation for the Capstone Expo.

## Acknowledgments  
This project builds on the work of the previous semester's group. Special thanks to Bryan Tran and his team for their foundational contributions: [https://github.com/bryanltran/dqa](https://github.com/bryanltran/dqa).  


## Contact  
For questions or contributions, please reach out to the team via GroupMe or email.  

