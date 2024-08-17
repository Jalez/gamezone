/** @format */

import { Box, Typography, IconButton, Paper } from '@mui/material';
import { GeneralArticle } from './interfaces';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import PopUp from './PopUp';
import { useState } from 'react';

type ChapterDisplayerProps = {
  chapter?: GeneralArticle | null;
  articleDeleteHandler: (articleId?: string) => void;
};

const ChapterDisplayer = ({
  chapter,
  articleDeleteHandler,
}: ChapterDisplayerProps) => {
  const [open, setOpen] = useState(false);
  if (!chapter) {
    return null;
  }

  const onConfirm = () => {
    articleDeleteHandler(chapter._id);
    setOpen(false);
  };

  const onDeleteButtonClick = () => {
    setOpen(true);
  };

  return (
    <Box>
      <PopUp
        title='Delete Chapter'
        message='Are you sure you want to delete this chapter?'
        open={open}
        onConfirm={onConfirm}
        onCancel={() => setOpen(false)}
      />
      <Link
        to={'../' + chapter.details.title}
        style={{
          textDecoration: 'none',
          color: 'black',
        }}>
        <Typography
          variant='h5'
          sx={{
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
          {chapter.details.title}
        </Typography>
      </Link>
      {/* If it has an author, display it */}
      {chapter.details.author && (
        <Typography
          variant='body1'
          sx={{
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
          By {chapter.details.author}
        </Typography>
      )}
      {/* If it has children, let user know */}
      {chapter.children.length > 0 && (
        <Typography
          variant='body1'
          sx={{
            textAlign: 'center',
            marginBottom: '1rem',
          }}>
          Subchapters available
        </Typography>
      )}
      <Paper
        sx={{
          padding: '1rem',
          margin: '2rem',
          maxHeight: '40vh',
          minHeight: '200px',
          overflow: 'auto',
        }}>
        {chapter.details.content.map((content, index) => (
          <Typography
            key={index}
            variant='body1'
            sx={{
              marginBottom: '1rem',
              // padding: '1rem',
            }}>
            {content}
          </Typography>
        ))}
      </Paper>
      <IconButton aria-label='delete' onClick={onDeleteButtonClick}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default ChapterDisplayer;
