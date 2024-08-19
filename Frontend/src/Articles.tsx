/** @format */

import { Divider, Paper } from '@mui/material';
import GameStepper from './GameStepper';
import ChapterDisplayer from './ChapterDisplayer';
import ChapterStepper from './ChapterStepper';
import ArticleHeader from './ArticleHeader';
import { useEffect, useState } from 'react';
import {
  Chapter,
  Details,
  Game,
  GeneralArticle,
  newGameInitialData,
} from './interfaces';
import MatchMaker from './MatchMaker/MatchMaker';
import WordFill from './WordFill/WordFill';
import Hangman from './Hangman/Hangman';
import Timeline from './Timeline';
import Debate from './Debate';
import Mcq from './Mcq/Mcq';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from './types';
import ArticleDetails from './ArticleDetails';

type ArticlesProps = {
  handleAddBreadCrumbAndActivate: (newBreadcrumb: Breadcrumb) => void;
};

const Articles = ({ handleAddBreadCrumbAndActivate }: ArticlesProps) => {
  //Get the parameters from the URL using the useParams hook
  const { title } = useParams<{ title: string }>();
  const [articles, setArticles] = useState<GeneralArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<GeneralArticle | null>(
    null
  );
  const [selectedChapter, setSelectedChapter] =
    useState<GeneralArticle | null>();
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number>(0);
  const [children, setChildren] = useState<GeneralArticle[]>([]);

  useEffect(() => {
    if (articles.length === 0) {
      return;
    }
    setSelectedArticle(articles[0]);
  }, [articles]);

  useEffect(() => {
    // if (selectedArticle) {
    //   console.log('selectedArticle', selectedArticle);
    //   setSelectedChapter(selectedArticle.children[0]);
    // }
    if (!selectedArticle) {
      return;
    }
  }, [selectedArticle]);

  useEffect(() => {
    console.log('selectedArticle', selectedArticle);
    setGames(selectedArticle?.games || []);
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedChapter) {
      return;
    }
    // setGames(selectedChapter.games);
    setSectionIndex(0);
    setSelectedGameId(0);
  }, [selectedChapter]);

  useEffect(() => {
    if (!title) {
      return;
    }
    setSelectedChapter(null);
    setSelectedGameId(0);
    handleAddBreadCrumbAndActivate({ href: '/' + title, name: title });
    const fetchByTitle = async (title: string) => {
      const response = await fetch(
        'http://localhost:3000/api/articles/details/' + title
      );
      const openedArticle = await response.json();
      setSelectedArticle(openedArticle);
      //Let's also fetch the children of the article
      if (!openedArticle) {
        return;
      }
      const articleChildren = openedArticle.children;
      if (!articleChildren) {
        return;
      }
      //Children is a list of strings (article ids)
      const childArticles: GeneralArticle[] = [];
      for (const id of articleChildren) {
        const response = await fetch(
          'http://localhost:3000/api/articles/' + id
        );
        const data = await response.json();
        console.log('child', data);
        childArticles.push(data);
      }
      setChildren(childArticles);
    };
    fetchByTitle(title);
  }, [title]);

  // useEffect(() => {
  //   if (games.length === 0) {
  //     return;
  //   }
  //   setSelectedGameId(games[0].id);
  // }, [games]);

  //Return game based on the type of the game
  const getGame = (id: number) => {
    const Game = games.find((game) => game._id === id);
    if (!Game) {
      return null;
    }
    switch (Game.type) {
      case 'MatchMaker':
        return <MatchMaker />;
      case 'WordFill':
        return <WordFill />;
      case 'Hangman':
        return <Hangman />;
      case 'Timeline':
        return <Timeline />;
      case 'Debate':
        return <Debate topic='What is the best way to learn a new language?' />;
      case 'Mcq':
        return <Mcq mcqs={Game.mcqs} sectionIndex={sectionIndex} />;
      default:
        return null;
    }
  };

  const handleArticleAdd = (newArticleDetails: Details, games: Game[]) => {
    //Get the sibling ids
    const siblings = selectedArticle?.children;
    console.log('selectedArticle', selectedArticle);
    const newArticle: GeneralArticle = {
      creators: [],
      parent: selectedArticle?._id || null,
      children: [],
      siblings: siblings || [],
      details: {
        title: newArticleDetails.title,
        content: newArticleDetails.content,
        author: newArticleDetails?.author || '',
      },
      games: games,
    };
    // // add new chapter to the article
    if (selectedArticle === null) {
      return;
    }
    const addArticle = async (newArticle: GeneralArticle) => {
      console.log('SENT TO SERVER', newArticle);
      const response = await fetch('http://localhost:3000/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
      const data = await response.json();
      console.log('addArticle', data);
      //Also add the article to the children
      setChildren((prevChildren) => [...prevChildren, data]);
    };
    addArticle(newArticle);
    // setSelectedArticle((prevArticle) => {
    //   if (!prevArticle) {
    //     return null;
    //   }
    //   return {
    //     ...prevArticle,
    //     chapters: [...prevArticle.chapters, newChapter],
    //   };
    // });
  };

  const handleChapterChoise = (newChapterTitle: string) => {
    console.log('newChapterTitle', newChapterTitle);
    //From the children, find the one with the title
    const newChapter = children.find(
      (article) => article.details.title === newChapterTitle
    );
    if (!newChapter) {
      return;
    }
    console.log('newChapter', newChapter);
    setSelectedChapter(newChapter);
    // const newChapter = selectedArticle?.chapters.find(
    //   (chapter: Chapter) => chapter.title === newChapterTitle
    // );
    // if (newChapter) {
    //   setSelectedChapter(newChapter);
    // }
  };

  const handleSelectGame = (gameId: number) => {
    console.log('gameId', gameId);
    setSelectedGameId(gameId);
  };

  const handleArticleRemove = (articleId?: string) => {
    if (!articleId) {
      return;
    }
    const removeArticle = async () => {
      const response = await fetch(
        'http://localhost:3000/api/articles/' + articleId,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        console.log('Error deleting article');
        return;
      }
      const newChildren = children.filter(
        (article) => article._id !== articleId
      );
      setChildren(newChildren);
      setSelectedChapter(null);
    };
    removeArticle();
  };

  const handleGameAdd = (newGameInitialData: newGameInitialData) => {
    const newGameDetails = {
      name: newGameInitialData.name,
      type: newGameInitialData.type,
      mcqs: newGameInitialData?.mcqs || [],
      dataForGeneration: [] as Details[],
    };

    const dataForGeneration = newGameDetails.dataForGeneration;

    if (newGameInitialData.generateMainArticle) {
      if (selectedArticle?.details && selectedArticle?.details !== null) {
        dataForGeneration.push(selectedArticle.details);
      }
    }
    if (newGameInitialData.generateContent) {
      //TODO: ENABLE GENERATING GAMES USING THE CHILDREN OF THE MAIN ARTICLE
      if (selectedChapter?.details && selectedChapter?.details !== null) {
        // dataForGeneration.push(selectedChapter?.details);
      }
    }
    // const postGame = async () => {
    //   const response = await fetch('http://localhost:3000/api/games', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newGameInitialData),
    //   });
    //   const data = await response.json();
    //   console.log('data', data);
    // };
    //TODO: If generate is true in newGameInitialData, generate the game content based on the current chapter. Otherwise, add the game with the initial data provided along with an empty template of the given game type.
    // add new game to the chapter

    const newGame: Game = {
      ...newGameDetails,
      _id: games.length + 1,
      generateMainArticle: newGameInitialData.generateMainArticle,
      generateContent: newGameInitialData.generateContent,
      dataForGeneration: dataForGeneration,
      mcqs: newGameInitialData.mcqs,
    };
    setGames((prevGames) => [...prevGames, newGame]);
    // postGame();
  };

  const titles = children.map((article) => article.details.title);

  return (
    <Paper
      sx={{
        margin: '2rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}>
      <ArticleHeader
        title={selectedArticle?.details?.title}
        author={selectedArticle?.details?.author}
        content={selectedArticle?.details?.content}
      />
      <ChapterStepper
        steps={titles}
        stepChoseHandler={handleChapterChoise}
        handleChapterAdd={handleArticleAdd}
      />

      <ChapterDisplayer
        chapter={selectedChapter}
        articleDeleteHandler={handleArticleRemove}
      />
      <GameStepper
        games={games}
        selectGameHandler={handleSelectGame}
        addGameHandler={handleGameAdd}
      />

      {getGame(selectedGameId)}
    </Paper>
  );
};

export default Articles;
