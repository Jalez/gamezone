/** @format */

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import { Details, Game } from '../../../interfaces';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type ChapterAdder = {
  addChapter: (newChapterDetails: Details, games: Game[]) => void;
};

/**
 * @description This component is used to add a new chapter to the article. By default, only a button is visible that when clicked, opens a form to add a new chapter. Use material ui components to style the form and the button. Make it look stylish and modern
 * @format
 * @param addChapter
 * @returns {JSX.Element}
 */
const ChapterAdder = ({ addChapter }: ChapterAdder) => {


  const handleSubmit = () => {
    const newChapterDetails: Details = {
      title: "New chapter",
      content: "New Chapter content\n\n\n\n",
      author: "Placeholder Author",
      edit: Date.now().toString(),
    };

    const games: Game[] = [];
    addChapter(newChapterDetails, games);
  };


  return (
      <Button
        onClick={handleSubmit}
        // Dont automatically put the letters to uppercase
        sx={{
          width: '130px',
          textTransform: 'none',
          display: 'flex',
          gap: 1,

          justifyContent: 'flex-start',
        }}>
        <AddCircleIcon />
        New Page
      </Button>

  );
};

export default ChapterAdder;
