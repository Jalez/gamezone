/** @format */

import { useState } from 'react';

interface GameFormProps {
	firstPart: string;
	submitHandler: (answer: string) => void;
	textSize: number;
	secondPart: string;
}

const GameForm = ({
	firstPart,
	submitHandler,
	textSize,
	secondPart,
}: GameFormProps) => {
	const [answer, setAnswer] = useState('');

	const handleSubmit = (e: any) => {
		e.preventDefault();
		submitHandler(answer);
	};

	return (
		<form
			className='App'
			style={{
				backgroundColor: '#111',
				padding: '20px',
			}}>
			<div>
				{firstPart}
				<input
					value={answer}
					onInput={(e) => {
						setAnswer(e.currentTarget.value);
					}}
					style={{
						margin: 10,
						// Check how many characters are in the correct answer and determine width based on that
						width: textSize * 7,
						// Remove border from input
						border: 'none',
						padding: 5,
					}}></input>
				{secondPart}
			</div>
			<button onClick={handleSubmit}>Check answer</button>
		</form>
	);
};

export default GameForm;
