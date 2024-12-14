import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import ThumbsUp from "../../../../Misc/ThumbsUp";
import { mcq } from "../../../../interfaces";
import EditableText from "../../../../General/EditableText";
import { useGameToolStore } from "../../../../General/Store/contentTools";

const Question: React.FC<{
  question: mcq;
  updateQuestion: (newQuestion: mcq) => void;
  onAnswer: (correct: boolean) => void;
}> = ({ question, updateQuestion, onAnswer }) => {
  const { isEditing, isSaving, setSaving, setHovering } = useGameToolStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>(question.answer);
  const [solved, setSolved] = useState<boolean>(false);
  const [currentQuestionText, setCurrentQuestionText] = useState<string>(
    question.question
  );
  const [currentOptions, setCurrentOptions] = useState<string[]>(
    question.options
  );
  const [showThumbsUp, setShowThumbsUp] = useState<boolean>(false);
  const [showFailureMessage, setShowFailureMessage] = useState<boolean>(false);

  useEffect(() => {
    setSelectedAnswer("");
    if (showFailureMessage) setShowFailureMessage(false);
    setCorrectAnswer(question.answer);
    setCurrentQuestionText(question.question);
    setCurrentOptions(question.options);
    setShowThumbsUp(false);
    setSolved(false);
  }, [question]);

  useEffect(() => {
    let timeOutId: NodeJS.Timeout;
    if (solved) {
      timeOutId = setTimeout(() => {
        onAnswer(true);
      }, 1500);
    }
    return () => {
      if (timeOutId) clearTimeout(timeOutId);
    };
  }, [solved]);

  // Ensure there's always one empty option at the end during editing
  useEffect(() => {
    if (isEditing) {
      if (
        currentOptions.length === 0 ||
        currentOptions[currentOptions.length - 1] !== ""
      ) {
        setCurrentOptions([...currentOptions, ""]);
      }
    }
  }, [isEditing, currentOptions]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (isEditing) {
      handleSetCorrectAnswer(value);
    } else {
      setSelectedAnswer(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCorrect = selectedAnswer === correctAnswer;
    setShowThumbsUp(isCorrect);
    setShowFailureMessage(!isCorrect);

    if (isCorrect) {
      setSolved(true);
    } else {
      onAnswer(false);
    }
  };

  const handleQuestionSave = (newText: string) => {
    setCurrentQuestionText(newText);
    const updatedQuestion: mcq = {
      ...question,
      question: newText,
    };
    updateQuestion(updatedQuestion);
  };

  const handleOptionSave = (index: number, newText: string) => {
    const updatedOptions = [...currentOptions];

    // Remove empty option unless it's the last one
    if (newText.trim() === "" && index !== currentOptions.length - 1) {
      updatedOptions.splice(index, 1);
      // Reset correct answer if necessary
      if (String.fromCharCode(97 + index) === correctAnswer) {
        setCorrectAnswer("");
      }
    } else {
      updatedOptions[index] = newText;
    }

    // Remove last option if it's empty
    if (
      newText.trim() === "" &&
      index === updatedOptions.length - 1 &&
      updatedOptions.length > 1
    ) {
      updatedOptions.splice(index, 1);
    }

    setCurrentOptions(updatedOptions);
    setSaving(false);

    const updatedQuestion: mcq = {
      ...question,
      options: updatedOptions,
      answer: correctAnswer,
    };
    updateQuestion(updatedQuestion);
  };

  const handleSetCorrectAnswer = (value: string) => {
    setCorrectAnswer(value);
    const updatedQuestion: mcq = {
      ...question,
      answer: value,
    };
    updateQuestion(updatedQuestion);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        style={{
          border: "none",
          boxShadow: "none",
          marginBottom: "16px",
          backgroundColor: showThumbsUp
            ? "#e8f5e9"
            : showFailureMessage
            ? "#ffebee"
            : "#fff",
        }}
      >
        <EditableText
          text={currentQuestionText}
          onUpdate={handleQuestionSave}
          isEditing={isEditing}
          isSaving={isSaving}
          fontSize="1.5rem"
          placeholder="Enter Question here"
        />
        <RadioGroup
          value={isEditing ? correctAnswer : selectedAnswer}
          onChange={handleChange}
          sx={{
            pointerEvents: showThumbsUp ? "none" : "auto",
            flex: 1,
            padding: 1.5,
          }}
        >
          {currentOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              value={String.fromCharCode(97 + index)}
              control={<Radio />}
              sx={{
                width: "100%",
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
                "& .MuiFormControlLabel-label": {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 16px",
                },
                "& .MuiRadio-root": {
                  padding: 0,
                },
              }}
              label={
                <EditableText
                  text={option}
                  onSave={(newText) => handleOptionSave(index, newText)}
                  isEditing={isEditing}
                  isSaving={isSaving}
                  fontSize="1rem"
                  placeholder="Write new option here"
                />
              }
            />
          ))}
        </RadioGroup>

        {isEditing && (
          <Typography variant="body2" color="textSecondary">
            Select the correct answer by clicking on it.
          </Typography>
        )}

        {showThumbsUp ? (
          <ThumbsUp display={showThumbsUp} />
        ) : (
          <Stack direction="row" spacing={2}>
            {!isEditing && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={showThumbsUp}
              >
                Submit Answer
              </Button>
            )}
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
