/** @format */

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';

import QuestionComponent from './QuestionComponent';
import QuestionNavigation from './McqNavigation';
import { mcq } from '../interfaces';

const Mcq: React.FC<{ mcqs?: mcq[]; sectionIndex: number }> = ({
  mcqs,
  sectionIndex,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  useEffect(() => {
    setCurrentQuestion(0);
  }, [mcqs]);

  const handleQuestionChange = (value: number) => {
    setCurrentQuestion(value);
  };
  if (!mcqs) {
    return null;
  }

  if (mcqs.length === 0) {
    return (
      <Container>
        <Typography variant='body1' paragraph>
          No questions available for this chapter.
        </Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant='body1' paragraph>
        {/* {selectedChapter.instructions} */}
        Based on the chapter, select the correct answer for the following
        questions.
      </Typography>
      <QuestionNavigation
        mcqs={mcqs}
        currentQuestion={currentQuestion}
        questionChangeHandler={handleQuestionChange}
      />
      <Box
        sx={{
          overflow: 'hidden',
        }}>
        <QuestionComponent
          mcqs={mcqs}
          questionIndex={currentQuestion}
          sectionIndex={sectionIndex}
          onAnswer={() => setCurrentQuestion(currentQuestion + 1)}
        />
      </Box>
    </Container>
  );
};

export default Mcq;
