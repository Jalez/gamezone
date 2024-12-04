import React, { useState, useEffect } from 'react';

const WordScramble = () => {
    const [words, setWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<string>('');
    const [scrambledWord, setScrambledWord] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(10);

    useEffect(() => {
        // 1. Create a list of key terms or vocabulary from the book.
        const wordList: string[] = ['react', 'javascript', 'component', 'state', 'props'];
        setWords(wordList);
    }, []);

    useEffect(() => {
        // 2. Randomly select a word from the list.
        const randomIndex: number = Math.floor(Math.random() * words.length);
        const newWord: string = words[randomIndex];
        setCurrentWord(newWord);

        // 3. Jumble up the letters of the selected word.
        const jumbledWord: string = newWord.split('').sort(() => Math.random() - 0.5).join('');
        setScrambledWord(jumbledWord);

        // 9. Set a time limit for each word.
        setTimeLeft(10);
    }, [words]);

    useEffect(() => {
        // 11. End the game when all words have been completed or the time limit has been reached.
        if (timeLeft === 0) {
            alert(`Game over! Your score is ${score}.`);
            setWords([]);
        }
    }, [timeLeft, score]);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // 6. Check if the player's answer matches the original word.
        if (answer.toLowerCase() === currentWord) {
            // 7. If the answer is correct, display a success message and move on to the next word.
            alert('Correct!');
            setScore(score + 1);
            setAnswer('');
        } else {
            // 8. If the answer is incorrect, display an error message and allow the player to try again.
            alert('Incorrect. Try again.');
        }
    };

    useEffect(() => {
        // Countdown timer
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    return (
        <div>
            <h1>Word Scramble</h1>
            <p>Unscramble the word within 10 seconds:</p>
            <p>{scrambledWord}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Answer:
                    <input type="text" value={answer} onChange={handleAnswerChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>Time left: {timeLeft}</p>
            <p>Score: {score}</p>
        </div>
    );
};

export default WordScramble;
