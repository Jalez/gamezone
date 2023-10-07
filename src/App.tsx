/** @format */

import { useState } from "react";
import MatchMaker from "./MatchMaker/MatchMaker";
import { Button, Divider, ThemeProvider } from "@mui/material";

import WordFill from "./WordFill/WordFill";
import Hangman from "./Hangman/Hangman";
import Timeline from "./Timeline";
import Debate from "./Debate";
// import { darkTheme, lightTheme } from "./main.tsx";
import { useTheme } from "@mui/material/styles";
import Background from "./Background.tsx";
import Mcq from "./Mcq/Mcq.tsx";
import mcqJson from "./mcq.json";

interface Game {
  name: string;
  setShow: (show: boolean) => void;
}

function GameButton({
  name,
  setShow,
  setOtherGames,
}: Game & { setOtherGames: (name: string) => void }) {
  return (
    <Button
      // Make the button take as much space as possible
      // sx={{ flex: 1, color: "white" }}
      onClick={() => {
        setShow(true);
        setOtherGames(name);
      }}
    >
      {name}
    </Button>
  );
}

interface Question {
  question: string;
  options: string[];
  answer: string;
  solvedTimes: number;
  sessionAttempts: number;
}

interface McqChapter {
  title: string;
  instructions: string;
  questions: Question[];
}

function App() {
  const [showMatchMaker, setShowMatchMaker] = useState(false);
  const [showWordFill, setShowWordFill] = useState(false);
  const [showHangman, setShowHangman] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showDebate, setShowDebate] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showMcq, setShowMcq] = useState(false);
  const theme = useTheme();

  console.log("mcqJson", mcqJson);

  const [mcqChapter, setMcqChapter] = useState<McqChapter[]>(
    mcqJson.chapters["Chapter 1"]
  );

  const [games, setGames] = useState<Game[]>([
    { name: "MatchMaker", setShow: setShowMatchMaker },
    { name: "WordFill", setShow: setShowWordFill },
    { name: "Hangman", setShow: setShowHangman },
    { name: "Timeline", setShow: setShowTimeline },
    { name: "Debate", setShow: setShowDebate },
    { name: "Mcq", setShow: setShowMcq },
  ]);

  const setOtherGames = (name: string) => {
    games.forEach((game) => {
      if (game.name !== name) {
        game.setShow(false);
      }
    });
  };
  // console.log(darkMode);
  // console.log("theme.palette.secondary.main", theme.palette.secondary.main);

  console.log(mcqChapter);

  return (
    // <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Background>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {games.map((game) => (
          <GameButton
            key={game.name}
            name={game.name}
            setShow={game.setShow}
            setOtherGames={setOtherGames}
          />
        ))}
      </div>
      <Divider
        flexItem
        //   main color
        style={{ borderColor: "white", color: "white" }}
      />
      {showMatchMaker && <MatchMaker />}
      {showWordFill && <WordFill />}
      {showHangman && <Hangman />}
      {showTimeline && <Timeline />}
      {showDebate && (
        <Debate topic="What is the best way to learn a new language?" />
      )}
      {showMcq && <Mcq chapter={mcqChapter} />}
    </Background>
    // </ThemeProvider>
  );
}

export default App;
