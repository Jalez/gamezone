// Games.tsx
import GameStepper from "./GameStepper";
import GameController from "./GameController";
import { Container } from "../../../General/Container";
import { useEffect } from "react";
import useGameStore from "../../../General/Store/gameStore";



const Games = () => {
  const {
    gameIds,
    setSelectedGameId,
  } = useGameStore();

  useEffect(() => {
    if (gameIds.length > 0) {
      setSelectedGameId(gameIds[0]);
    } else {
      setSelectedGameId(null);
    }
  }, [gameIds]);

  return (
    <Container>
      <GameStepper />
      <GameController />
    </Container>
  );
};

export default Games;
