import React, { useState, useEffect } from "react";
import UploadFile from "./components/UploadFile.jsx";
import QuestionForm from "./components/QuestionForm.jsx";
import AnswerDisplay from "./components/AnswerDisplay.jsx";
import "./index.css";
import "./App.css";
function App() {
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false)
  
  const [showQuestion, setShowQuestion] = useState("")
  const [answer, setAnswer] = useState([]);


//  useEffect(() => {
//     if (isDocumentUploaded) {
//       alert("Uploaded successfully");
//     }
//   }, [isDocumentUploaded]);

  return (
    <div className="App">
      <div className="header custom-header  text-black p-4 flex justify-between items-center">
        <div className="logo text-2xl font-bold px-8 ml-3">
          <img
            src="https://docs.aiplanet.com/~gitbook/image?url=https%3A%2F%2F3489179498-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fs7L723OVLEMUWCbQcOdb%252Flogo%252Fu2kIr4UzUe8kdXYkYkIT%252Flogo.svg%3Falt%3Dmedia%26token%3Dcc8bcd87-8d43-4138-ad8d-90b4435bb932&amp;width=192&amp;dpr=4&amp;quality=100&amp;sign=5d213dfe0f73cf7cd1b7a84a2cec457a248f50e76d318f775d510d2eec5e6a2e"
            className=" w-28 h-12"
            alt=""
          />
        </div>
        <div className="upload-section mr-4 px-4">
          <UploadFile setIsDocumentUploaded={setIsDocumentUploaded} />
        </div>
      </div>
      <div className="content flex justify-center mx-auto ">
        <QuestionForm isDocumentUploaded={isDocumentUploaded} answer={answer} setAnswer={setAnswer} setShowQuestion={setShowQuestion}  showQuestion= {showQuestion}  />
        <AnswerDisplay answer={answer} showQuestion= {showQuestion} />
      </div>
    </div>
  );
}

export default App;
