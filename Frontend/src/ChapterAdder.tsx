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
import { Chapter } from './interfaces';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type ChapterAdder = {
  addChapter: (chapter: Chapter) => void;
};

/**
 * @description This component is used to add a new chapter to the article. By default, only a button is visible that when clicked, opens a form to add a new chapter. Use material ui components to style the form and the button. Make it look stylish and modern
 * @format
 * @param addChapter
 * @returns {JSX.Element}
 */
const ChapterAdder = ({ addChapter }: ChapterAdder) => {
  const [chapterName, setChapterName] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [openAdder, setOpenAdder] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Chapter Name:', chapterName);
    console.log('Chapter Content:', chapterContent);
    addChapter({ title: chapterName, content: chapterContent, mcqs: [] });
    handleClose();
  };

  const handleClose = () => {
    setOpenAdder(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpenAdder(true)}
        // Dont automatically put the letters to uppercase
        sx={{ textTransform: 'none', display: 'flex', gap: 1 }}>
        <AddCircleIcon />
        New Chapter
      </Button>
      <Modal
        open={openAdder}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}>
            Adding a new section:
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='Chapter Title'
              variant='outlined'
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              required
            />
            <TextField
              label='Chapter Content'
              variant='outlined'
              multiline
              rows={4}
              value={chapterContent}
              onChange={(e) => setChapterContent(e.target.value)}
              required
            />
            <Button type='submit' variant='contained' color='primary'>
              Add Chapter
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default ChapterAdder;
