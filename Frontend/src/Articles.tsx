/** @format */

import { Divider } from '@mui/material';
import GameSelector from './GameSelector';
import ChapterDisplayer from './ChapterDisplayer';
import ChapterStepper from './ChapterStepper';
import ArticleHeader from './ArticleHeader';
import { useEffect, useState } from 'react';
import {
  Chapter,
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

type ArticlesProps = {
  articleIds: string[];
};

const Articles = ({ articleIds }: ArticlesProps) => {
  const [articles, setArticles] = useState<GeneralArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<GeneralArticle | null>(
    null
  );
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number>(0);

  useEffect(() => {
    if (articles.length === 0) {
      return;
    }
    setSelectedArticle(articles[0]);
  }, [articles]);

  // useEffect(() => {
  //   if (selectedArticle) {
  //     console.log('selectedArticle', selectedArticle);
  //     setSelectedChapter(selectedArticle.children[0]);
  //   }
  // }, [selectedArticle]);

  useEffect(() => {
    if (!selectedChapter) {
      return;
    }
    console.log('selectedChapter', selectedChapter);
    setGames(selectedChapter.games);
    setSectionIndex(0);
    setSelectedGameId(0);
  }, [selectedChapter]);

  // useEffect(() => {
  //   if (games.length === 0) {
  //     return;
  //   }
  //   setSelectedGameId(games[0].id);
  // }, [games]);

  useEffect(() => {
    //If there are articles, fetch the articles from the server
    if (articleIds.length === 0) {
      return;
    }
    const fetchArticles = async (articleIds: string[]) => {
      const articles: GeneralArticle[] = [];
      for (const id of articleIds) {
        const response = await fetch(
          'http://localhost:3000/api/articles/' + id
        );
        const data = await response.json();
        articles.push(data);
      }
      console.log('articles', articles);
      setArticles(articles);
    };
    fetchArticles(articleIds);
  }, [articleIds]);

  //Return game based on the type of the game
  const getGame = (id: number) => {
    const Game = games.find((game) => game.id === id);
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

  const handleChapterAdd = (newChapter: Chapter) => {
    // // add new chapter to the article
    // if (selectedArticle === null) {
    //   return;
    // }
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
    // const newChapter = selectedArticle?.chapters.find(
    //   (chapter: Chapter) => chapter.title === newChapterTitle
    // );
    // if (newChapter) {
    //   setSelectedChapter(newChapter);
    // }
  };

  const handleSelectGame = (gameId: number) => {
    setSelectedGameId(gameId);
  };

  const handleGameAdd = (newGameInitialData: newGameInitialData) => {
    const postGame = async () => {
      const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGameInitialData),
      });
      const data = await response.json();
      console.log('data', data);
    };
    //TODO: If generate is true in newGameInitialData, generate the game content based on the current chapter. Otherwise, add the game with the initial data provided along with an empty template of the given game type.
    // add new game to the chapter
    const newGame: Game = {
      id: games.length + 1,
      ...newGameInitialData,
    };
    setGames((prevGames) => [...prevGames, newGame]);
    postGame();
  };

  // const titles = selectedArticle?.children?.map(
  //   (chapter: GeneralArticle) => chapter?.details?.title
  // );
  const testTitles = ['Chapter 1', 'Chapter 2', 'Chapter 3'];

  return (
    <>
      <ArticleHeader
        title={selectedArticle?.details?.title}
        author={selectedArticle?.details?.author}
      />
      <ChapterStepper
        steps={testTitles}
        stepChoseHandler={handleChapterChoise}
        handleChapterAdd={handleChapterAdd}
      />

      <ChapterDisplayer chapter={selectedChapter} />
      <GameSelector
        games={games}
        selectGameHandler={handleSelectGame}
        addGameHandler={handleGameAdd}
      />
      <Divider flexItem sx={{ borderColor: 'black', color: 'white' }} />

      {getGame(selectedGameId)}
    </>
  );
};

export default Articles;
