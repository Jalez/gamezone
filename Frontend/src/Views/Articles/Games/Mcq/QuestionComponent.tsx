// QuestionComponent.tsx
import { useEffect, useState } from "react";
import Question from "./Question";
import { Game, mcq } from "../../../../interfaces";
import useGameStore from "../../../../General/Store/gameStore";

const QuestionComponent = () => {
  const {
    selectedGameId,
    gamesById,
    gameProgress,
    handleUpdateGame,
    setCurrentQuestion,
  } = useGameStore();

  const selectedGame = selectedGameId ? gamesById[selectedGameId] : null;
  const mcqs = selectedGame?.content as mcq[];
  const currentQuestionIndex = selectedGameId ? gameProgress[selectedGameId] || 0 : 0;

  const [question, setQuestion] = useState<mcq>(mcqs[currentQuestionIndex]);

  useEffect(() => {
    setQuestion(mcqs[currentQuestionIndex]);
  }, [mcqs, currentQuestionIndex]);

  const handleAnswer = (correct: boolean) => {
    if (correct && selectedGameId) {
      setCurrentQuestion(selectedGameId, currentQuestionIndex + 1);
    }
  };

  const handleQuestionUpdate = (newQuestion: mcq) => {
    if (!selectedGame) return;
    const updatedMcqs = mcqs.map((mcq, index) =>
      index === currentQuestionIndex ? newQuestion : mcq
    );
    const updatedGame = { ...selectedGame, content: updatedMcqs } as Game;
    console.log("UPDATED GAME", updatedGame);
    handleUpdateGame(updatedGame);
    setQuestion(newQuestion);
  };

  return (
    <Question
      question={question}
      onAnswer={handleAnswer}
      updateQuestion={handleQuestionUpdate}
    />
  );
};

export default QuestionComponent;
