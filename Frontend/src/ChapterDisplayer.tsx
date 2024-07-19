/** @format */

import { Box, Typography } from '@mui/material';
import { Chapter } from './interfaces';

type ChapterDisplayerProps = {
  chapter: Chapter | null;
};

const ChapterDisplayer = ({ chapter }: ChapterDisplayerProps) => {
  if (!chapter) {
    //TODO: ADD A LOADING SKELETON FOR THIS COMPONENT
    return <div>No chapter selected</div>;
  }
  return (
    <Box>
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          marginBottom: '1rem',
        }}>
        {chapter.title}
      </Typography>
      {chapter.content.map((content, index) => (
        <Typography
          key={index}
          variant='body1'
          sx={{
            marginBottom: '1rem',
            padding: '1rem',
          }}>
          {content}
        </Typography>
      ))}
    </Box>
  );
};

export default ChapterDisplayer;
