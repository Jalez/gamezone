/** @format */

import { useState } from 'react';
import MatchMaker from './MatchMaker/MatchMaker';
import { Button } from '@mui/material';

import WordFill from './WordFill/WordFill';
import Hangman from './Hangman/Hangman';
import Timeline from './Timeline';
import Debate from './Debate';

interface Game {
	name: string;
	setShow: (show: boolean) => void;
}

function GameButton({ name, setShow, setOtherGames }: Game & { setOtherGames: (name: string) => void }) {
	return (
		<Button onClick={() => {
			setShow(true);
			setOtherGames(name);
		}}>
			{name}
		</Button>
	);
}

function App() {

	const [showMatchMaker, setShowMatchMaker] = useState(false);
	const [showWordFill, setShowWordFill] = useState(false);
	const [showHangman, setShowHangman] = useState(false);
	const [showTimeline, setShowTimeline] = useState(false);
	const [showDebate, setShowDebate] = useState(false);
	const [games, setGames] = useState<Game[]>([
		{ name: 'MatchMaker', setShow: setShowMatchMaker },
		{ name: 'WordFill', setShow: setShowWordFill },
		{ name: 'Hangman', setShow: setShowHangman },
		{ name: 'Timeline', setShow: setShowTimeline },
		{ name: 'Debate', setShow: setShowDebate },
	]);

	const setOtherGames = (name: string) => {
		games.forEach((game) => {
			if (game.name !== name) {
				game.setShow(false);
			}
		});
	};

	return (
		<>
			{games.map((game) => (
				<GameButton key={game.name} name={game.name} setShow={game.setShow} setOtherGames={setOtherGames} />
			))}

			{showMatchMaker && <MatchMaker />}
			{showWordFill && <WordFill />}
			{showHangman && <Hangman />}
			{showTimeline && <Timeline />}
			{showDebate && <Debate
				topic="What is the best way to learn a new language?"

			/>}
		</>
	);
}

export default App;
