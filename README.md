# CHAT WITH PDF

## Project Overview
This project aims to develop a comprehensive application that facilitates document upload, natural language processing (NLP) question answering, and a seamless user experience. The application stack comprises a FastAPI backend for robust server-side logic, React.js for dynamic and interactive frontend components, and appropriate database and file storage solutions.

## Setup Instructions

### Backend Setup
1. **Clone the Repository:**
    ```bash
    git clone "https://github.com/itsAakanksha/chat-with-document"
    cd backend
    ```

2. **Create Virtual Environment:**
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows: .\env\Scripts\activate
    ```

3. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Run FastAPI Server:**
    ```bash
    uvicorn app:app --reload
    ```

### Frontend Setup
1. **Navigate to Frontend Directory:**
    ```bash
    cd frontend
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Start React Development Server:**
    ```bash
    npm run dev
    ```

## API Documentation

### Endpoints

#### PDF Upload:
- **Method:** POST
- **URL:** /upload/
- **Request Body:** FormData with "file" field containing the PDF file.

#### Question Answering:
- **Method:** POST
- **URL:** /ask/
- **Request Body:** JSON with "question" fields.

## Application Architecture
- **Backend:** FastAPI serves as the backend framework, handling PDF upload, question answering, and database interactions.
- **NLP Processing:** Utilizes LangChain/LLamaIndex for natural language processing tasks.
- **Frontend:** React.js powers the frontend, providing a dynamic user interface for document upload, question submission, and answer display.


## Usage
- **Upload PDF:** Navigate to the upload page, select a PDF document, and wait for the upload to complete.
- **Ask Questions:** Enter a question related to the document content and submit it. View the answer displayed on the screen.

## Next Steps
- Enhance user feedback during file upload and question processing.
- Implement error handling for unsupported file types or processing errors.
- Optimize PDF processing and question answering algorithms for improved performance.

## Feedback and Improvements
Your feedback is invaluable in improving this project. If you encounter any issues or have suggestions for enhancements, please don't hesitate to reach out.
