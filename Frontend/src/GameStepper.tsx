/** @format */

import * as React from 'react';
import { Box } from '@mui/material';
import { Game, newGameInitialData } from './interfaces';
import GameAdder from './GameAdder';
import CustomStepper from './CustomStepper';

const GameStepper = ({
  games,
  selectGameHandler,
  addGameHandler,
}: {
  games: Game[];
  selectGameHandler: (gameId: number) => void;
  addGameHandler: (newGameInitialData: newGameInitialData) => void;
}) => {
  const gameNames = games.map((game) => game.name); // Extract names of games as steps

  const handleStepChange = (stepName: string) => {
    const selectedGame = games.find((game) => game.name === stepName);
    if (selectedGame) {
      selectGameHandler(selectedGame._id as number);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <CustomStepper steps={gameNames} onStepChange={handleStepChange}>
        <GameAdder addGameHandler={addGameHandler} />
      </CustomStepper>
    </Box>
  );
};

export default GameStepper;
