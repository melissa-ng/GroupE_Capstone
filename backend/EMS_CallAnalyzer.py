from llama_index.core import Settings, VectorStoreIndex, SimpleDirectoryReader, StorageContext, Document
from llama_index.vector_stores.faiss import FaissVectorStore
from llama_index.readers.file import PandasCSVReader
from llama_index.core.node_parser import SemanticSplitterNodeParser
from llama_index.llms.openai import OpenAI
from schema.models import NatureCode, NatureCodeQuestionAnalysis


# Sentence Transformers (for local embeddings)
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import faiss

class EMSCallAnalyzer:

    def __init__(self, raw_transcript: str, embedding_model: str = "all-MiniLM-L6-v2"):
        Settings.embed_model = HuggingFaceEmbedding(model_name=embedding_model)
        # TODO: Change to local llama
        Settings.llm = OpenAI(
                model="gpt-3.5-turbo",
                api_key = ""
        )

        self.process_call(raw_transcript)
        

    # Currently a short method, but may have to manually create documents
    # and assign metadata based on the rows nature code/section in the csv
    def data_processing(self):
        """ 
        This is a function that loads the EMS Protocols (CSV) data, creates documents for each protocol (Case Entry and the different types of key questions)
        """
        parser = PandasCSVReader()
        qa_documents = SimpleDirectoryReader( 
            input_files=["data/(Updated) - EMS-Calltaking-QA.csv"],
            file_extractor={".csv": parser}
        ).load_data()

        return qa_documents

    def create_index(self, documents):
        """
        This is a function to setup the node parsing, embedding, and indexing
        """
        # Chunking (Needs to be tested)
        ## Used for retrieving more precise information instead of scanning entire documents
        ## and decreases the size of relevant chunks for the similarity search
        ## https://stackoverflow.blog/2024/12/27/breaking-up-is-hard-to-do-chunking-in-rag-applications/
        ## Currently using SemanticSplitter which should keep related questions together
        ## TODO: Use ingestion pipeline for creating nodes, instead of just this
        Settings.node_parser = SemanticSplitterNodeParser(
            buffer_size = 0,
            breakpoint_percentile_threshold = 89,
            embed_model = Settings.embed_model
        )

        nodes = Settings.node_parser.get_nodes_from_documents(documents)

        # Vector Index
        dimension = 384 # dimensions of all-MiniLM-L6-v2
        faiss_index = faiss.IndexFlatL2(dimension)

        vector_store = FaissVectorStore(faiss_index=faiss_index)
        storage_context = StorageContext.from_defaults(vector_store=vector_store)

        # Create index
        self.index = VectorStoreIndex(
            nodes,
            show_progress=True,
            storage_context=storage_context
        )
    
    def determine_nature_code(self, transcript):
        """
        This is a function for determining the nature code/section based on the conversation
        """

        # Combine transcript into context
        #transcript_context = " ".join(
        #    transcript['operator_questions'] + transcript['caller_answers']
        #)
        
        # Prepare nature code determination query
        nature_code_query = f"""
        Based on the below emergency call transcript, 
        determine the most appropriate Section ID/Nature Code (disregard case entry):
        
        Transcript: {transcript}
        
        Provide:
        1. The most likely nature code
        2. Brief explanation of your reasoning
        3. Confidence level
        """
        
        # Use query engine to determine nature code
        query_engine = self.index.as_query_engine(
            output_cls = NatureCode
        )
        response = query_engine.query(nature_code_query)
        print(response)
        return response

    def process_call(self, raw_transcript):

        documents = self.data_processing()
        self.create_index(documents)

        response = self.determine_nature_code(raw_transcript)
        
        query = f"""
        Based on the below emergency call transcript,
        determine if the Case Entry and the {response.name} Section ID/Nature Code question's were all asked:

        Transcript: {raw_transcript}

        """
        query_engine = self.index.as_query_engine(
            output_cls = NatureCodeQuestionAnalysis
        )
        response = query_engine.query(query)
        print(response)


def main():
    call_transcript = """
    Caller: Hi, I’m calling because I’ve been having some really sharp pain in my stomach. It started about an hour ago, and it's been getting worse. I feel like it’s mostly in my lower abdomen, and I can barely stand up straight because of it. I’ve tried to sit down, but the pain is still there, and it’s just getting worse with time.
    Dispatcher: Okay, I understand. How severe would you say the pain is on a scale from 1 to 10, with 10 being the worst pain you’ve ever felt?
    Caller: I’d say it’s about a 7 or 8 right now. It feels really intense, and I can’t move around much without feeling like it's getting worse.
    Dispatcher: Alright, thank you for letting me know. I’m sending help your way right now. Stay calm, and we’ll get you the assistance you need.
    """
    analyzer = EMSCallAnalyzer(call_transcript)

    analyzer.process_call(call_transcript)

if __name__ == "__main__":
    main()



