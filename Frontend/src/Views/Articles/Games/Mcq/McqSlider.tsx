/** @format */

import { Slide, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { mcq } from '../../../../interfaces';

const McqSlider: React.FC<{
  children: React.ReactNode;
  questionIndex: number;
  sectionIndex: number;
  question: mcq;
  questionChanger: (questionIndex: number) => void;
}> = ({ children, questionIndex, sectionIndex, question, questionChanger }) => {
  const [slideDirection, setSlideDirection] = useState<
    'left' | 'right' | 'up' | 'down'
  >('left');
  const [slideMount, setSlideMount] = useState<boolean>(false);
  const [previousSectionIndex, setPreviousSectionIndex] = useState<number>(-1);
  const [previousQuestionIndex, setPreviousQuestionIndex] =
    useState<number>(questionIndex);

  useEffect(() => {
    if (sectionIndex !== previousSectionIndex) {
      // Go up
      if (sectionIndex >= previousSectionIndex) setSlideDirection('down');
      // Go down
      else setSlideDirection('up');
    } else {
      if (questionIndex >= previousQuestionIndex) setSlideDirection('right');
      else setSlideDirection('left');
    }

    const timeOutId = setTimeout(() => {
      questionChanger(questionIndex);
    }, 1000);
    return () => {
      setSlideMount(false);
      clearTimeout(timeOutId);
    };
  }, [questionIndex, sectionIndex]);

  useEffect(() => {
    if (sectionIndex !== previousSectionIndex) {
      // Go up
      if (sectionIndex >= previousSectionIndex) setSlideDirection('up');
      // Go down
      else setSlideDirection('down');
      setPreviousSectionIndex(sectionIndex);
    } else {
      if (questionIndex >= previousQuestionIndex) setSlideDirection('left');
      else setSlideDirection('right');
      setPreviousQuestionIndex(questionIndex);
    }
    setSlideMount(true);
  }, [question]);

  return (
    <Slide direction={slideDirection} in={slideMount} timeout={500}>
      <Box>{children}</Box>
    </Slide>
  );
};

export default McqSlider;
