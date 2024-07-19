/** @format */

import { Box, Button } from '@mui/material';
import { Game, newGameInitialData } from './interfaces';
import GameAdder from './GameAdder';

const GameSelector = ({
  games,
  selectGameHandler,
  addGameHandler,
}: {
  games: Game[];
  selectGameHandler: (gameId: number) => void;
  addGameHandler: (newGameInitialData: newGameInitialData) => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      {games.map((game) => (
        <GameButton
          key={game.id}
          Game={game}
          selectGameHandler={selectGameHandler}
        />
      ))}
      <GameAdder addGameHandler={addGameHandler} />
    </Box>
  );
};

type GameButtonProps = {
  Game: Game;
  selectGameHandler: (gameId: number) => void;
};

function GameButton({ Game, selectGameHandler }: GameButtonProps) {
  return (
    <Button
      onClick={() => {
        selectGameHandler(Game.id);
      }}>
      {Game.name}
    </Button>
  );
}

export default GameSelector;
