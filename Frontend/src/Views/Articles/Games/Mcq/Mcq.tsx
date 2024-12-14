// Mcq.tsx
import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import QuestionComponent from './QuestionComponent';
import { useGameToolStore } from '../../../../General/Store/contentTools';
import useGameStore from '../../../../General/Store/gameStore';
import { Game, mcq } from '../../../../interfaces';

const Mcq = () => {
  const {
    selectedGameId,
    gamesById,
    gameProgress,
    handleUpdateGame,
  } = useGameStore();
  const { isAdding, setAdding } = useGameToolStore();

  const selectedGame = selectedGameId ? gamesById[selectedGameId] : null;
  const currentQuestion = selectedGameId ? gameProgress[selectedGameId] || 0 : 0;
  const mcqs = selectedGame?.content as mcq[];

  useEffect(() => {
    if (isAdding && selectedGame) {
      const newMcq: mcq = {
        question: '',
        options: [''],
        answer: '',
      };
      const updatedContent = [...(mcqs || []), newMcq];
      const updatedGame = { ...selectedGame, content: updatedContent } as Game;
      handleUpdateGame(updatedGame);
      setAdding(false);
    }
  }, [isAdding]);

  if (!mcqs || mcqs.length === 0) {
    return (
      <Typography variant='body1' paragraph>
        No questions available for this game.
      </Typography>
    );
  }

  return (
    <Box sx={{ margin: 0, padding: 0 }}>
      <Typography variant='body1' paragraph>
        Select the correct answer for the following questions.
      </Typography>
      <Box sx={{ overflow: 'hidden' }}>
        <QuestionComponent />
      </Box>
    </Box>
  );
};

export default Mcq;
