import React from 'react';
import logo from '../assets/aiplanet.jpg';

function AnswerDisplay({ answer, showQuestion }) {
  // Combine questions and answers into a single array
  let combined = [];
  for (let i = 0; i < Math.max(answer.length, showQuestion.length); i++) {
    if (showQuestion[i]) combined.push({ type: 'question', content: showQuestion[i] });
    if (answer[i]) combined.push({ type: 'answer', content: answer[i] });
  }

  return (
    <div className="answer-display w-[85vw]">
      {combined.map((item, index) => (
        <div key={index} className='flex sm:gap-6 gap-3 my-10 leading-tight md:leading-normal sm:my-16 text-black font-semibold'>
          {item.type === 'question' ? (
            <img src="https://img.freepik.com/free-vector/flat-design-atheism-logo-template_23-2149242249.jpg?t=st=1716127371~exp=1716130971~hmac=026ea911a454354374edc1a8d74d847e9f7fa0c09a5f801554973b243084b946&w=740" alt="" className='w-12 h-12 rounded-full' />
          ) : (
            <img src={logo} alt="" className='w-12 h-12' />
          )}
          <p className="text-md my-auto">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default AnswerDisplay;
