/** @format */

import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { RootArticle } from './interfaces';

const Homepage = () => {
  const [mainArticles, setMainArticles] = useState<RootArticle[]>([]);

  useEffect(() => {
    const fetchMainArticles = async () => {
      const response = await fetch(
        'http://localhost:3000/api/articles/root-articles'
      );
      const articles = await response.json();
      setMainArticles(articles);
    };
    fetchMainArticles();
  }, []);

  return (
    <Box>
      <Typography variant='h1'>Your homepage</Typography>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
        {mainArticles.map((article: RootArticle) => (
          <Box
            key={article._id}
            //stylize this into a box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              margin: '1rem',
              padding: '1rem',
              border: '2px solid black',
              borderRadius: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography variant='h2'>{article.details.title}</Typography>
            <Typography variant='h3'>{article.details.author}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Homepage;
