import { useEffect, useState } from "react";

interface DebateGameProps {
    topic: string;
}

interface DebateQuestionProps {
    question: string;
    answers: string[];
    onSelectAnswer: (answer: string) => void;
}

interface DebateAnswerProps {
    answer: string;
    onChangeAnswer: (answer: string) => void;
}

interface DebateOpponentProps {
    opponentResponse: string;
}

interface DebateTimerProps {
    timeRemaining: number;
}

const Debate = ({ topic }: DebateGameProps) => {
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleAnswerSubmit = (answer: string) => {
        // Check if the answer is correct and update the score
        // Move to the next level if the user answered correctly
        // Reset the timer for the next question
    };

    return (
        <div>
            <h1>{topic}</h1>
            <DebateQuestion
                question="What is the capital of France?"
                answers={["Paris", "London", "Berlin"]}
                onSelectAnswer={handleAnswerSubmit}
            />
            <DebateAnswer answer="" onChangeAnswer={() => { }} />
            <DebateOpponent opponentResponse="" />
            <DebateTimer timeRemaining={timeRemaining} />
        </div>
    );
};

const DebateQuestion = ({
    question,
    answers,
    onSelectAnswer,
}: DebateQuestionProps) => {
    return (
        <div>
            <h2>{question}</h2>
            {answers.map((answer) => (
                <button key={answer} onClick={() => onSelectAnswer(answer)}>
                    {answer}
                </button>
            ))}
        </div>
    );
};

const DebateAnswer = ({ answer, onChangeAnswer }: DebateAnswerProps) => {
    return (
        <div>
            <h3>Your Answer:</h3>
            <input type="text" value={answer} onChange={(e) => onChangeAnswer(e.target.value)} />
        </div>
    );
};

const DebateOpponent = ({ opponentResponse }: DebateOpponentProps) => {
    return (
        <div>
            <h3>Opponent's Response:</h3>
            <p>{opponentResponse}</p>
        </div>
    );
};

const DebateTimer = ({ timeRemaining }: DebateTimerProps) => {
    return (
        <div>
            <h3>Time Remaining:</h3>
            <p>{timeRemaining}</p>
        </div>
    );
};

export default Debate;