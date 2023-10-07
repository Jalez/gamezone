import React, { useState, useEffect } from "react";

import {
  Button,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Slide,
  Box,
} from "@mui/material";
import { Question_i } from "./interfaces";
import ThumbsUp from "../ThumbsUp";

const Question: React.FC<{
  question: Question_i;
  onAnswer: (answer: boolean) => void;
}> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [solved, setSolved] = useState<boolean>(false);

  const [showThumbsUp, setShowThumbsUp] = useState<boolean>(false);
  const [showFailureMessage, setShowFailureMessage] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    setSelectedAnswer("");
    showFailureMessage && setShowFailureMessage(false);
    setCorrectAnswer(question.answer);
    setShowThumbsUp(false);
    setSolved(false);
  }, [question]);

  //   useEffect(() => {
  //     let timeOutId: any;
  //     if (showThumbsUp) {
  //       timeOutId = setTimeout(() => {
  //         setShowThumbsUp(false);
  //       }, 1000);
  //     }
  //     return () => {
  //       if (timeOutId) clearTimeout(timeOutId);
  //     };
  //   }, [showThumbsUp]);

  useEffect(() => {
    let timeOutId: any;
    if (solved) {
      timeOutId = setTimeout(() => {
        onAnswer(true);
      }, 1500);
    }
    return () => {
      if (timeOutId) clearTimeout(timeOutId);
    };
  }, [solved]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowThumbsUp(selectedAnswer === correctAnswer);
    setShowFailureMessage(selectedAnswer !== correctAnswer);

    if (selectedAnswer === correctAnswer) {
      question.solvedTimes++;
      question.sessionAttempts++;
      setSolved(true);
      console.log("Correct!");
    } else {
      question.sessionAttempts++;
      console.log("Wrong!");
      onAnswer(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        style={{
          padding: "16px",
          marginBottom: "16px",
          //   give it a greenish background if the answer is correct
          backgroundColor: showThumbsUp
            ? "#e8f5e9"
            : showFailureMessage
            ? "#ffebee"
            : "#fff",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">{question.question}</Typography>
        </Stack>
        <RadioGroup
          value={selectedAnswer}
          onChange={handleChange}
          //  disable the radio buttons if the answer is correct
          style={{ pointerEvents: showThumbsUp ? "none" : "auto" }}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={String.fromCharCode(97 + index)}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>

        {showThumbsUp ? (
          <ThumbsUp display={showThumbsUp} />
        ) : (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              //disable the button if the answer is correct
              disabled={showThumbsUp}
            >
              "Submit Answer"
              {/* Submit Answer */}
              {/* <ThumbsUp display={showThumbsUp} /> */}
            </Button>
            {showFailureMessage && (
              <Typography variant="h6">Try again!</Typography>
            )}
          </Stack>
        )}
      </Paper>
    </form>
  );
};

export default Question;
