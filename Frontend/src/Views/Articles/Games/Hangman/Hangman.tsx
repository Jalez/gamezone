import { useState } from 'react';

function Hangman() {
    const [word, setWord] = useState('hangman');
    const [guess, setGuess] = useState('');
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [displayWord, setDisplayWord] = useState(word.split('').map(() => '_'));
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

    const handleGuess = (input: string) => {
        setGuess(input);
        if (word.includes(input)) {
            const newDisplayWord = [...displayWord];
            for (let i = 0; i < word.length; i++) {
                if (word[i] === input) {
                    newDisplayWord[i] = input;
                }
            }
            setDisplayWord(newDisplayWord);
        } else {
            setIncorrectGuesses(incorrectGuesses + 1);
            setWrongGuesses([...wrongGuesses, input]);
        }
        if (displayWord.join('') === word) {
            setGameOver(true);
        } else if (incorrectGuesses === 5) {
            setGameOver(true);
        }
    };

    return (
        <>
            <h1>Hangman</h1>
            <p>Guess the word:</p>
            <p>{displayWord.join(' ')}</p>
            <p>Incorrect guesses: {wrongGuesses.join(', ')}</p>
            <input type="text" maxLength={1} value={guess} onChange={(e) => setGuess(e.target.value)} />
            <button onClick={() => handleGuess(guess)}>Submit</button>
            {/* <img src={`hangman${incorrectGuesses}.png`} alt={`Hangman with ${incorrectGuesses} incorrect guesses`} /> */}
            {gameOver && <p>{incorrectGuesses === 6 ? 'You lose!' : 'You win!'}</p>}
        </>
    );
}

export default Hangman;
