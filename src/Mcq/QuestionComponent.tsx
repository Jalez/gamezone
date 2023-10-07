import React, { useState, useEffect } from "react";
import ThumbsUp from "../ThumbsUp";
import { Question_i } from "./interfaces";
import Question from "./Question";
import McqSlider from "./McqSlider";

const QuestionComponent: React.FC<{
  questions: Question_i[];
  questionIndex: number;
  sectionIndex: number;
  onAnswer: (answer: string) => void;
}> = ({ questions, questionIndex, sectionIndex, onAnswer }) => {
  const [question, setQuestion] = useState<Question_i>(
    questions[questionIndex]
  );

  const questionChanger = (questionIndex: number) => {
    setQuestion(questions[questionIndex]);
  };

  const handleAnswer = (answer: boolean) => {
    if (answer) onAnswer(question.answer);
  };

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
