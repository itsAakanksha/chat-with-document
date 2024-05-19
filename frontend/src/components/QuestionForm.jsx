import React, { useState } from 'react';

function QuestionForm({ documentId, setAnswer,setShowQuestion,showQuestion,answer }) {
 
  const [question, setQuestion] = useState("");

  const handlesetquestion= (e)=>{
    setQuestion(e.target.value)
    
    
  }

  const handleQuestionSubmit = async () => {
    try {
       setShowQuestion([...showQuestion,question])
       setQuestion("")
      const response = await fetch("http://localhost:8000/ask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document_id: documentId,
          question: question,
        }),
      });
      const data = await response.json();
      console.log(data)
      setAnswer([...answer,data.answer]);
    
      
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  
  return (
    <div className="question-form flex items-center">
      <input 
        type="text" 
        value={question}
        onChange={ handlesetquestion}
        placeholder="Send a Message..."
        className="border border-gray-300 bg-[#F6F7F9] sm:p-4 p-2  w-full rounded"
        id="send-icon"
      />
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className='send-svg cursor-pointer' 
        width="24" 
        height="24" 
        id="paperplane"
        onClick={handleQuestionSubmit}
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path fill="#757575" d="M22.398 11.082c-5.171-2.243-8.935-3.921-11.692-5.15C5.329 3.534 3.883 2.89 2.876 2.89c-.864 0-1.289.524-1.429.695a2.003 2.003 0 0 0-.162 2.288L4.961 12l-3.675 6.125a2.004 2.004 0 0 0 .162 2.29c.14.173.565.698 1.43.698 1.006 0 2.446-.643 7.799-3.031 2.76-1.231 6.532-2.914 11.722-5.165a1 1 0 0 0-.001-1.835zM3.083 4.914c.8.164 2.929 1.114 6.808 2.843 1.91.852 4.312 1.922 7.317 3.241H6.693l-3.61-6.084zm6.779 11.341c-3.942 1.759-6.069 2.708-6.827 2.84l3.658-6.097h10.516c-3.021 1.329-5.433 2.404-7.347 3.257z"></path>
      </svg>
    </div>
  );
}

export default QuestionForm;
