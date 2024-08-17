/** @format */

import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { RootArticle, RootChildArticle } from './interfaces';
import { Breadcrumb } from './types';
import { useNavigate } from 'react-router-dom';

const Homepage = (): JSX.Element => {
  const [mainArticles, setMainArticles] = useState<RootArticle[]>([]);
  const navigate = useNavigate();

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

  const handleMainArticleClick = (articleId: string) => {
    //Take the article from the main articles that has the id
    //And pass its children to the handleGoToChildren function
    const article = mainArticles.find((article) => article._id === articleId);
    if (!article) {
      return;
    }

    //Take the _id of the children and pass it to the handleGoToChildren function

    navigate('/' + article.details.title);
  };

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
          <Button
            key={article._id}
            //stylize this into a box
            onClick={() => handleMainArticleClick(article._id)}>
            <Typography variant='h2'>{article.details.title}</Typography>
            <Typography variant='h3'>{article.details.author}</Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Homepage;
