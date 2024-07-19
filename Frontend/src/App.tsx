/** @format */

import { useEffect, useState } from 'react';
import MatchMaker from './MatchMaker/MatchMaker.tsx';
import { Divider, Switch, ThemeProvider } from '@mui/material';

import WordFill from './WordFill/WordFill.tsx';
import Hangman from './Hangman/Hangman.tsx';
import Timeline from './Timeline.tsx';
import Debate from './Debate.tsx';
// import { darkTheme, lightTheme } from "./main.tsx";
import Background from './Background.tsx';
import Mcq from './Mcq/Mcq.tsx';
import { lightTheme } from './main.tsx';
import { Article, Chapter, Game, newGameInitialData } from './interfaces.ts';
import GameSelector from './GameSelector.tsx';
import ArticleHeader from './ArticleHeader.tsx';
import ChapterDisplayer from './ChapterDisplayer.tsx';

//For now, we'll import the data from a pre-made json file
// import data from './data.json';
import ChapterStepper from './ChapterStepper.tsx';
import Homepage from './Homepage.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicBreadcrumbs from './Breadcrumbs.tsx';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<number>(0);

  useEffect(() => {
    const fetchChapter = async (chapterIndex: number) => {
      const response = await fetch(
        'http://localhost:3000/data/' + chapterIndex
      );
      const data = await response.json();
      console.log('data', data);
      setArticles(data.articles);
    };
    fetchChapter(0);
  }, []);

  useEffect(() => {
    if (articles.length === 0) {
      return;
    }
    console.log('articles', articles);
    setSelectedArticle(articles[0]);
  }, [articles]);

  useEffect(() => {
    if (selectedArticle) {
      console.log('selectedArticle', selectedArticle);
      setSelectedChapter(selectedArticle.chapters[0]);
    }
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedChapter) {
      return;
    }
    console.log('selectedChapter', selectedChapter);
    setGames(selectedChapter.games);
    setSectionIndex(0);
    setSelectedGameId(0);
  }, [selectedChapter]);

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
    // add new chapter to the article
    if (selectedArticle === null) {
      return;
    }
    setSelectedArticle((prevArticle) => {
      if (!prevArticle) {
        return null;
      }
      return {
        ...prevArticle,
        chapters: [...prevArticle.chapters, newChapter],
      };
    });
  };

  const handleChapterChoise = (newChapterTitle: string) => {
    const newChapter = selectedArticle?.chapters.find(
      (chapter: Chapter) => chapter.title === newChapterTitle
    );
    if (newChapter) {
      setSelectedChapter(newChapter);
    }
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

  return (
    <ThemeProvider theme={lightTheme}>
      <Background>
        <BasicBreadcrumbs />
        <Router>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/about' element={<About />} />

            {/* <ArticleHeader
          title={selectedArticle?.title}
          author={selectedArticle?.author}
          />
          <ChapterStepper
          steps={selectedArticle?.chapters.map((chapter) => chapter.title)}
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
          
          {getGame(selectedGameId)} */}
          </Routes>
        </Router>
      </Background>
    </ThemeProvider>
  );
}

const About = () => <h2>About</h2>;

export default App;
