/** @format */

import { Box } from '@mui/material';
import CustomStepper from './CustomStepper';
import ChapterAdder from './ChapterAdder';
import { Details, Game } from './interfaces';

type ChapterStepperProps = {
  steps: string[] | undefined;
  stepChoseHandler: (step: string) => void;
  handleChapterAdd: (newChapterDetails: Details, games: Game[]) => void;
};

const ChapterStepper = ({
  steps,
  stepChoseHandler,
  handleChapterAdd,
}: ChapterStepperProps) => {
  if (!steps) {
    // TODO: ADD A LOADING SKELETON FOR THIS COMPONENT
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <CustomStepper steps={steps} onStepChange={stepChoseHandler}>
        <ChapterAdder addChapter={handleChapterAdd} />
      </CustomStepper>
    </Box>
  );
};

export default ChapterStepper;
