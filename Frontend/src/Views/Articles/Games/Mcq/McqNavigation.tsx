/** @format */

import {  IconButton, Stack, Typography } from "@mui/material";
import { mcq } from "../../../../interfaces";
import PoppingTitle from "../../../../General/PoppingTitle";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';

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
      direction="row"
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
        <IconButton
          disabled={currentQuestion === 0}
          onClick={() => questionChangeHandler(currentQuestion - 1)}
        >
      <PoppingTitle topTitle={"Previous Question"}>
      <ArrowBackIcon />
      </PoppingTitle>
        </IconButton>

      <PoppingTitle topTitle="Question/Total Questions">
      <Typography variant="body2" gutterBottom>
        {currentQuestion + 1}/{mcqs.length}
      </Typography>
      </PoppingTitle>
      <IconButton
        disabled={currentQuestion === mcqs.length - 1}
        onClick={() => questionChangeHandler(currentQuestion + 1)}
      >
        <PoppingTitle topTitle={currentQuestion < mcqs.length - 1 ? "Next Question" : "Finish"}>

        {currentQuestion < mcqs.length - 1 ? <ArrowForwardIcon /> : <DoneIcon />}
        </PoppingTitle>
      </IconButton>
    </Stack>
  );
};

export default McqNavigation;
