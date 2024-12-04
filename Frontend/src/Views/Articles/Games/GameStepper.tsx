// GameStepper.tsx
import { Box } from '@mui/material';
import GameAdder from './GameAdder';
import CustomStepper from '../../../General/CustomStepper';
import { useEffect } from 'react';
import useGameStore from '../../../General/Store/gameStore';

const GameStepper = () => {
  const {
    gameIds,
    gamesById,
    setSelectedGameId,
    fetchGameById,
  } = useGameStore();

  useEffect(() => {
    // Fetch game data for game IDs that are not yet in the store
    gameIds.forEach(async (gameId) => {
      if (!gamesById[gameId]) {
        await fetchGameById(gameId);
      }
    });
  }, [gameIds]);

  const gameNames = gameIds.map((gameId) => gamesById[gameId]?.name || '');

  const handleStepChange = (stepName: string) => {
    const gameEntry = Object.entries(gamesById).find(([id, game]) => game.name === stepName);
    if (gameEntry) {
      const [gameId] = gameEntry;
      setSelectedGameId(gameId);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        overflow: 'auto',
      }}>
      <CustomStepper steps={gameNames} onStepChange={handleStepChange}>
        <GameAdder />
      </CustomStepper>
    </Box>
  );
};

export default GameStepper;
