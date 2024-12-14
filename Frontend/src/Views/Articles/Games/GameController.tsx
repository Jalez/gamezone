// GameController.tsx
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import { Box } from "@mui/material";
import Mcq from "./Mcq/Mcq";
import useGameStore from "../../../General/Store/gameStore";
import QuestionNavigation from "../../../General/QuestionNavigation";
// ... other imports

const GameController = () => {
  const {
    gamesById,
    selectedGameId,
    gameProgress,
    setCurrentQuestion,
  } = useGameStore();
  const { user } = useContext(AuthContext);

  const selectedGame = selectedGameId ? gamesById[selectedGameId] : null;
  const currentQuestion = selectedGameId ? gameProgress[selectedGameId] || 0 : 0;

  if (!selectedGame) return null;

  const getGame = () => {
    switch (selectedGame.type.toLowerCase()) {
      case "mcq":
        return <Mcq />;
      default:
        return null;
    }
  };

  const isOwner = user
    ? selectedGame.creators.some((creatorId) => creatorId === user._id)
    : false;

  return (
    <Box sx={{ overflow: "hidden" }}>
      {getGame()}
      <QuestionNavigation
        isOwner={isOwner}
        content={selectedGame?.content}
        currentQuestion={currentQuestion}
        questionChangeHandler={(index) => {
          // Update the current question for this game
          if (selectedGameId) {
            setCurrentQuestion(selectedGameId, index);
          }
        }}
      />
    </Box>
  );
};

export default GameController;
