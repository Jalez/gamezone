/** @format */

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Chapter } from './Mcq/interfaces';

type ChapterSelectorProps = {
  chapters: Chapter[];
  selectedChapter: { title: string };
  chapterChangeHandler: (newChapter: Chapter) => void;
};

const ChapterSelector = ({
  chapters,
  selectedChapter,
  chapterChangeHandler,
}: ChapterSelectorProps) => {
  //Create a function handleChange that takes the onChange event as an argument
  const handleChange = (event: SelectChangeEvent<string>) => {
    //Call the chapterChangeHandler function with the selected chapter
    const selectedChapter = chapters.find(
      (chapter) => chapter.title === event.target.value
    );
    if (selectedChapter) {
      chapterChangeHandler(selectedChapter);
    }
  };
  return (
    <FormControl fullWidth variant='outlined' sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id='section-select-label'>Current Chapter:</InputLabel>
      <Select
        labelId='section-select-label'
        id='section-select'
        value={selectedChapter.title}
        label='Current Chapter:'
        onChange={handleChange}>
        {chapters.map((pickableChapter, index) => {
          return (
            <MenuItem value={pickableChapter.title} key={Math.random() * index}>
              {pickableChapter.title}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ChapterSelector;
