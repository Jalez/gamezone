/** @format */

import { IconButton, Stack, Typography } from "@mui/material";
import PoppingTitle from "./PoppingTitle";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoneIcon from '@mui/icons-material/Done';
import ContentTools from "./ContentTools";
import { useGameToolStore } from "./Store/contentTools";
type QuestionNavigationProps = {
  content?: any[];
  children?: React.ReactNode;
  currentQuestion: number;
  questionChangeHandler: (value: number) => void;
  isOwner: boolean;
};


const QuestionNavigation = ({
  content,
  children,
  currentQuestion,
  questionChangeHandler,
  isOwner,
}: QuestionNavigationProps) => {
  if (!content || content.length === 0) { return null; }
  return (
    <Stack
      direction="row"
      spacing={1}
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
      <ContentTools
        isOwner={true}
        useToolsStore={useGameToolStore}
      
      />
        {children}
      <PoppingTitle topTitle="Question/Total Questions">
      <Typography variant="body2" gutterBottom>
        {currentQuestion + 1}/{content.length}
      </Typography>
      </PoppingTitle>
      <IconButton
        disabled={currentQuestion === content.length - 1}
        onClick={() => questionChangeHandler(currentQuestion + 1)}
      >
        <PoppingTitle topTitle={currentQuestion < content.length - 1 ? "Next Question" : "Finish"}>

        {currentQuestion < content.length - 1 ? <ArrowForwardIcon /> : <DoneIcon />}
        </PoppingTitle>
      </IconButton>
    </Stack>
  );
};

export default QuestionNavigation;
