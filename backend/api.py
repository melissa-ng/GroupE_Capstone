# Need post for sending the transcript (txt file) to our model
# Need get for retriveing results of model and sending to user
# Rate limiting (may be necessary)

from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from EMS_CallAnalyzer import EMSCallAnalyzer

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:5173" # port frontend is running at
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/results")
async def results(file: UploadFile):
    # Needs to read the file for transcript parsing
    #file = await file.read()

    # Example Transcript
    call_transcript = """
    Caller: Hi, I’m calling because I’ve been having some really sharp pain in my stomach. It started about an hour ago, and it's been getting worse. I feel like it’s mostly in my lower abdomen, and I can barely stand up straight because of it. I’ve tried to sit down, but the pain is still there, and it’s just getting worse with time.
    Dispatc her: Okay, I understand. How severe would you say the pain is on a scale from 1 to 10, with 10 being the worst pain you’ve ever felt?
    Caller: I’d say it’s about a 7 or 8 right now. It feels really intense, and I can’t move around much without feeling like it's getting worse. I'm at the Walmart off 63rd.
    Dispatcher: Alright, thank you for letting me know. I’m sending help your way right now. Stay calm, and we’ll get you the assistance you need.
    """
    analyzer = EMSCallAnalyzer()
    response = analyzer.analyze_call(call_transcript)
    return response

    