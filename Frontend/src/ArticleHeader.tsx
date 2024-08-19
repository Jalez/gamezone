/** @format */

type ArticleHeaderProps = {
  title?: string;
  author?: string;
  content?: string[];
};

import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MainArticle = ({
  title = 'Lorem Ipsum',
  author = 'John Doe',
  content = [],
}: ArticleHeaderProps) => {
  return (
    <Box>
      <Accordion
        //remove accordion border
        sx={{ border: 'none', boxShadow: 'none' }}>
        <AccordionSummary
          sx={{ display: 'flex', flexDirection: 'column' }}
          expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}>
            <Typography align='center' variant='h1'>
              {title}
            </Typography>
            {author && (
              <Typography align='center' variant='body1'>
                By {author}
              </Typography>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
            {content.map((paragraph, index) => (
              <Typography key={index} variant='body1'>
                {paragraph}
              </Typography>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MainArticle;
