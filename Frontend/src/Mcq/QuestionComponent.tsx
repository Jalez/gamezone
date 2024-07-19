/** @format */

import React, { useEffect, useState } from "react";
import Question from "./Question";
import McqSlider from "./McqSlider";
import { mcq } from "../interfaces";

const QuestionComponent: React.FC<{
  mcqs: mcq[];
  questionIndex: number;
  sectionIndex: number;
  onAnswer: (answer: string) => void;
}> = ({ mcqs, questionIndex, sectionIndex, onAnswer }) => {
  const [question, setQuestion] = useState<mcq>(mcqs[questionIndex]);

  const questionChanger = (questionIndex: number) => {
    setQuestion(mcqs[questionIndex]);
  };

  const handleAnswer = (answer: boolean) => {
    if (answer) onAnswer(question.answer);
  };

  useEffect(() => {
    setQuestion(mcqs[questionIndex]);
  }, [mcqs, questionIndex]);

  return (
    <>
      <McqSlider
        question={question}
        questionIndex={questionIndex}
        sectionIndex={sectionIndex}
        questionChanger={questionChanger}
      >
        <Question question={question} onAnswer={handleAnswer} />
      </McqSlider>
    </>
  );
};

export default QuestionComponent;
