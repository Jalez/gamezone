/** @format */

import { SetStateAction, useEffect, useState } from 'react';
import CardButton from '../CardButton';
import Splitter from '../General/Splitter';
import MatchCard from '../CardButton';

const memoryCards = [
	{
		id: 1,
		term: 'Model',
		description: 'The state of your application',
		source:
			'Model is the state of your application. It tells you what your application looks like at any point in time.',
	},
	{
		id: 2,
		term: 'View',
		description: 'A way to turn your state into HTML',
		source:
			'View is a way to turn your state into HTML. It describes what your application looks like at any point in time.',
	},
	{
		id: 3,
		term: 'Update',
		description: 'A way to update your state based on messages',
		source:
			'Update is a way to update your state based on messages. It describes how your state changes in response to messages.',
	},
	{
		id: 4,
		term: 'Pure Function',
		description:
			'A function that always returns the same output given the same input',
		source:
			'Pure Function is a function that always returns the same output given the same input. It describes how your state changes in response to messages.',
	},
	{
		id: 5,
		term: 'Side Effect',
		description: 'A function that does something other than return a value',
		source:
			'Side Effect is a function that does something other than return a value. It describes how your state changes in response to messages.',
	},
	{
		id: 6,
		term: 'Message',
		description: 'A description of a state change',
		source:
			'Message is a description of a state change. It describes how your state changes in response to messages.',
	},
	{
		id: 7,
		term: 'State',
		description: 'The state of your application',
		source:
			'State is the state of your application. It tells you what your application looks like at any point in time.',
	},
	{
		id: 8,
		term: 'HTML',
		description: 'A way to turn your state into HTML',
		source:
			'HTML is a way to turn your state into HTML. It describes what your application looks like at any point in time.',
	},
	{
		id: 9,
		term: 'CSS',
		description: 'A way to update your state based on messages',
		source:
			'CSS is a way to update your state based on messages. It describes how your state changes in response to messages.',
	},
	{
		id: 10,
		term: 'JavaScript',
		description:
			'A function that always returns the same output given the same input',
		source:
			'JavaScript is a function that always returns the same output given the same input. It describes how your state changes in response to messages.',
	},
];

const MatchMaker = () => {
	// Split the memoryCards array into two arrays, one for terms and one for descriptions, both with the identifier key
	// Take the first 7 terms and descriptions and put them into the termCards and descriptionCards arrays
	const [termCards, setTermCards] = useState<
		{ id: number; text: string; matched: boolean }[]
	>([]);

	const [descriptionCards, setDescriptionCards] = useState<
		{ id: number; text: string; matched: boolean }[]
	>([]);

	const [remainingTermCards, setRemainingTermCards] = useState<
		{ id: number; text: string; matched: boolean }[]
	>([]);
	const [remainingDescriptionCards, setRemainingDescriptionCards] = useState<
		{ id: number; text: string; matched: boolean }[]
	>([]);
	useEffect(() => {
		// Loop through all the memoryCards
		const boardTerms: SetStateAction<
			{ id: number; text: string; matched: boolean }[]
		> = [];
		const boardDescription: SetStateAction<
			{ id: number; text: string; matched: boolean }[]
		> = [];
		const remainingTermCards: SetStateAction<
			{ id: number; text: string; matched: boolean }[]
		> = [];
		const remainingDescriptionCards: SetStateAction<
			{ id: number; text: string; matched: boolean }[]
		> = [];
		for (let index = 0; index < memoryCards.length; index++) {
			const card = memoryCards[index];
			// If the index is greater than 6, finish the loop
			if (index > 6) {
				remainingTermCards.push({
					id: card.id,
					text: card.term,
					matched: false,
				});
				remainingDescriptionCards.push({
					id: card.id,
					text: card.description,
					matched: false,
				});
				continue;
			}
			// Take the first 7 terms and descriptions and put them into the termCards and descriptionCards arrays
			boardTerms.push({
				id: card.id,
				text: card.term,
				matched: false,
			});
			boardDescription.push({
				id: card.id,
				text: card.description,
				matched: false,
			});
		}
		setTermCards(boardTerms);
		setDescriptionCards(boardDescription);
		setRemainingTermCards(remainingTermCards);
		setRemainingDescriptionCards(remainingDescriptionCards);
	}, []);
	// Take the remaining terms and descriptions and put them into the remainingTermCards and remainingDescriptionCards arrays

	const [activeTermCard, setActiveTermCard] = useState('');
	const [activeDescriptionCard, setActiveDescriptionCard] = useState('');

	useEffect(() => {
		if (activeTermCard === '' || activeDescriptionCard === '') return;
		// Check if the active term card and active description card identifiers match
		const termCard = termCards.find((card) => card.text === activeTermCard);
		const descriptionCard = descriptionCards.find(
			(card) => card.text === activeDescriptionCard
		);
		if (termCard?.id === descriptionCard?.id) {
			console.log('match');
			// Set the matched key to true for both cards
			const newTermCards = [...termCards];
			const newDescriptionCards = [...descriptionCards];
			// Find the card in the array and set the matched key to true
			const updatedTermCards = newTermCards.map((card) => {
				if (card.text === activeTermCard) {
					return { ...card, matched: true };
				}
				return card;
			});
			const updatedDescriptionCards = newDescriptionCards.map((card) => {
				if (card.text === activeDescriptionCard) {
					return { ...card, matched: true };
				}
				return card;
			});
			setTermCards(updatedTermCards);
			setDescriptionCards(updatedDescriptionCards);
			setActiveTermCard('');
			setActiveDescriptionCard('');
		} else {
			console.log('no match');
			setActiveTermCard('');
			setActiveDescriptionCard('');
		}
	}, [activeTermCard, activeDescriptionCard]);

	const handleTermClick = (text: string) => {
		setActiveTermCard(text);
	};

	const handleDescriptionClick = (text: string) => {
		setActiveDescriptionCard(text);
	};

	const handleChange = (text: string) => {
		// Lets try to get a new term and description from the remaining cards
		const newTermCard = remainingTermCards.pop();
		const newDescriptionCard = remainingDescriptionCards.pop();
		if (!newTermCard || !newDescriptionCard) return;
		// Remove the new term and description from the remaining cards, should be the first card in the array
		setRemainingTermCards([...remainingTermCards]);
		setRemainingDescriptionCards([...remainingDescriptionCards]);

		if (termCards.find((card) => card.text === text)) {
			const newTermCards = termCards.map((card) => {
				if (card.text === text) {
					return newTermCard;
				}
				return card;
			});
			setTermCards(newTermCards);
		} else {
			const newDescriptionCards = descriptionCards.map((card) => {
				if (card.text === text) {
					return newDescriptionCard;
				}
				return card;
			});
			setDescriptionCards(newDescriptionCards);
		}
	};

	return (
		<>
			<h1>MatchMaker</h1>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					// alignItems: "space-between",

					width: '100%',
					backgroundColor: 'lightblue',
					height: '50vh',
				}}>
				<div>
					{termCards.map((card) => {
						return (
							<MatchCard
								key={card.id}
								{...card}
								type='term'
								active={activeTermCard === card.text}
								onClick={handleTermClick}
								onChange={handleChange}
								matched={card.matched}
							/>
						);
					})}
				</div>
				<Splitter />
				<div>
					{descriptionCards.map((card) => {
						return (
							<MatchCard
								key={card.id}
								{...card}
								type='description'
								active={activeDescriptionCard === card.text}
								onClick={handleDescriptionClick}
								onChange={handleChange}
								matched={card.matched}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default MatchMaker;
