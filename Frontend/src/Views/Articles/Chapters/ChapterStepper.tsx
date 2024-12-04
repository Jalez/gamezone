/** @format */

import { Box } from '@mui/material';
import CustomStepper from '../../../General/CustomStepper';
import ChapterAdder from './ChapterAdder';
import { Details, Game, GeneralArticle } from '../../../interfaces';

type ChapterStepperProps = {
  steps: GeneralArticle[];
  selectChapterHandler: (step: GeneralArticle) => void;
  handleChapterAdd: (newChapterDetails: Details, games: Game[]) => void;
};

const ChapterStepper = ({
  steps,
  selectChapterHandler,
  handleChapterAdd,
}: ChapterStepperProps) => {
  const chapterTitles = steps?.map((chapter) => chapter.details.title);
  if (!steps) {
    // TODO: ADD A LOADING SKELETON FOR THIS COMPONENT
    return null;
  }

  const handleStepChange = (title: string) => {
    const selectedChapter= steps.find((chapter) => chapter.details.title === title);
    if (selectedChapter) {
      selectChapterHandler(selectedChapter);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CustomStepper steps={chapterTitles} onStepChange={handleStepChange}>
        <ChapterAdder addChapter={handleChapterAdd} />
      </CustomStepper>
    </Box>
  );
};

export default ChapterStepper;
