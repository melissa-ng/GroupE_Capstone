# Emergency Medical Call Analysis Project  

## Description  
This project focuses on analyzing transcripts of emergency medical calls for service to evaluate adherence to required protocols. By leveraging advanced natural language processing (NLP) techniques, the system identifies discrepancies between actual conversations and the mandated procedures outlined in dispatcher training materials.  

The ultimate goal is to ensure that critical information is correctly collected during emergency calls and effectively communicated to the appropriate parties, enhancing emergency response efficiency and accuracy.  

## Identified Technologies and Tools  
- **Python**: The primary programming language for development.  
- **OpenAI API**: For vectorizing phrases from the dispatcher training flip book and comparing them with transcripts.  
- **Retrieval-Augmented Generation (RAG)**: To assist in the comparison process and improve accuracy in text analysis.  
- **GitHub**: Version control and collaboration.  
- **GroupMe**: Task management and communication.  
- **CJIS Training Compliance**: Ensures secure handling of sensitive call data.  

## Group Goals and Progress Plan  
- **January–February**:  
  - Complete CJIS training and submit fingerprints.  
  - Finalize access to the dispatcher training flip book and call transcripts.  
  - Set up the project environment and ensure all team members are onboarded.  

- **March**:  
  - Develop and test the vectorization pipeline using OpenAI and RAG.  
  - Build a system to compare transcripts with expected phrases from the training flip book.  
  - Establish collaborative workflows using Git branches and issue tracking on GroupMe.  

- **April**:  
  - Conduct comprehensive testing and evaluation of the analysis system.  
  - Prepare project documentation, including user guides and technical references.  
  - Refine and finalize the system for presentation.  

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

Here’s your text formatted properly in Markdown:

```markdown
## Navigate to the Project Directory  
```bash
cd dqa
```  

## Install Dependencies  
```bash
pip install -r requirements.txt
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
- **[Your Name]**  
- [Name]  
- [Name]  
- [Name]  

## Acknowledgments  
This project builds on the work of the previous semester's group. Special thanks to Bryan Tran and his team for their foundational contributions: [https://github.com/bryanltran/dqa](https://github.com/bryanltran/dqa).  

## License  
This repository is licensed under [insert license here]. See the LICENSE file for more details.  

## Contact  
For questions or contributions, please reach out to the team via GroupMe or email.  
```

This version will render cleanly as Markdown in your GitHub repository or any Markdown viewer. Let me know if you’d like further refinements!
