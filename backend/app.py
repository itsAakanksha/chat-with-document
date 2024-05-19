import asyncio
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import google.generativeai as genai
from typing import List
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Load environment variables from .env file
load_dotenv()

# Configure the Google Generative AI with API key
os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize FastAPI app
app =FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://chat-with-document-wn3d.onrender.com/'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define Pydantic models for API requests and responses
class QuestionRequest(BaseModel):
    question:str



class PDFText(BaseModel):
    text: str
    
 # Utility functions for processing PDFs and text


def get_pdf_texts(file: UploadFile) -> str:
    pdf = PdfReader(file.file)
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    return text




def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks


def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")


def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return chain






# MAKING API END POINTS



@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    raw_texts = []
    for file in files:
        raw_text = get_pdf_texts(file)
        raw_texts.append(raw_text)
    text_chunks = get_text_chunks(" ".join(raw_texts))
    get_vector_store(text_chunks)
    return {"message": "Files processed successfully"}


async def async_user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)

    chain = get_conversational_chain()

    response = await chain.acall(
        {"input_documents": docs, "question": user_question}
    )
    return response["output_text"]



@app.post("/ask")
async def ask_question(request: QuestionRequest):
    response = await async_user_input(request.question)
    return {"answer": response}




@app.get("/")
def read_root():
    return {"message": "Welcome to the PDF Chat API"}



if __name__ == "__main__":
    
    uvicorn.run(app, host="0.0.0.0", port=8000)





