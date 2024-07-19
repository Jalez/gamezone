/** @format */

import { Button, Stack, Typography } from '@mui/material';
import { mcq } from '../interfaces';

type QuestionNavigationProps = {
  mcqs: mcq[];
  currentQuestion: number;
  questionChangeHandler: (value: number) => void;
};

const McqNavigation = ({
  mcqs,
  currentQuestion,
  questionChangeHandler,
}: QuestionNavigationProps) => {
  return (
    <Stack
      direction='row'
      spacing={2}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Button
        disabled={currentQuestion === 0}
        onClick={() => questionChangeHandler(currentQuestion - 1)}>
        {currentQuestion > 0 ? 'Previous Question' : 'Previous Question'}
      </Button>
      <Typography variant='h5' gutterBottom>
        {currentQuestion + 1}/{mcqs.length}
      </Typography>
      <Typography variant='body2' gutterBottom>
        Solved Times: {mcqs[currentQuestion].solvedTimes}
      </Typography>
      <Typography variant='body2' gutterBottom>
        Session Attempts: {mcqs[currentQuestion].sessionAttempts}
      </Typography>
      <Button
        disabled={currentQuestion === mcqs.length - 1}
        onClick={() => questionChangeHandler(currentQuestion + 1)}>
        {currentQuestion < mcqs.length - 1 ? 'Next Question' : 'Finish'}
      </Button>
    </Stack>
  );
};

export default McqNavigation;
