/** @format */

import { useState } from 'react';
import GameForm from '../../../../General/GameForm';
import GameTitle from '../../../../General/GameTitle';
import Hints from '../../../../General/Hints';
import Info from '../../../../General/Info';

function WordFill() {
	const [attempts, setAttempts] = useState(0);
	const text = "Hello, I'm a React app!";
	// Replace "React" from the text with a dialog box

	const correctAnswer = 'React';
	const firstPart = text.split(correctAnswer)[0];
	const secondPart = text.split(correctAnswer)[1];
	const checkAnswer = (answer: string) => {
		if (answer === correctAnswer) {
			alert('Correct!');
		} else {
			alert('Wrong!');
			setAttempts(attempts + 1);
		}
	};

	const hints = [
		'It starts with R',
		"It's either react, vue or a svelte app.",
		'Correct answer: React',
	];
	return (
		<>
			<GameTitle title='Word Fill' explanation='Fill in the missing word' />
			<div>
				<GameForm
					firstPart={firstPart}
					secondPart={secondPart}
					submitHandler={checkAnswer}
					textSize={correctAnswer.length}
				/>
				<Info attempts={attempts} />
				<Hints attempts={attempts} hints={hints} />
			</div>
		</>
	);
}

export default WordFill;
