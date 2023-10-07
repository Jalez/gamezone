import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import QuestionComponent from "./QuestionComponent";

interface Question {
  question: string;
  options: string[];
  answer: string;
  solvedTimes: number;
  sessionAttempts: number;
}

interface Chapter {
  title: string;
  instructions: string;
  questions: Question[];
}

const Mcq: React.FC<{ chapter: Chapter[] }> = ({ chapter }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [section, setSection] = useState<Chapter>(chapter[0]);
  const [sectionIndex, setSectionIndex] = useState<number>(0);

  const handleChange = (event: any) => {
    const newSection = chapter.find(
      (section) => section.title === event.target.value
    );
    // set section index to the index of the new section
    setSectionIndex(chapter.indexOf(newSection!));
    if (newSection) {
      setCurrentQuestion(0);
      setSection(newSection);
    }
  };
  return (
    <Container>
      {/* Choose a section */}
      <FormControl fullWidth>
        <InputLabel id="section-select-label">Section</InputLabel>
        <Select
          labelId="section-select-label"
          id="section-select"
          value={section.title}
          label="Section"
          onChange={handleChange}
        >
          {chapter.map((pickableSection) => {
            return (
              <MenuItem value={pickableSection.title}>
                {pickableSection.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Typography variant="body1" paragraph>
        {section.instructions}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          {currentQuestion > 0 ? "Previous Question" : "Previous Question"}
        </Button>
        <Typography variant="h5" gutterBottom>
          {currentQuestion + 1}/{section.questions.length}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Solved Times: {section.questions[currentQuestion].solvedTimes}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Session Attempts: {section.questions[currentQuestion].sessionAttempts}
        </Typography>
        <Button
          disabled={currentQuestion === section.questions.length - 1}
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
          {currentQuestion < section.questions.length - 1
            ? "Next Question"
            : "Finish"}
        </Button>
      </Stack>
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <QuestionComponent
          questions={section.questions}
          questionIndex={currentQuestion}
          sectionIndex={sectionIndex}
          onAnswer={() => setCurrentQuestion(currentQuestion + 1)}
        />
      </div>
    </Container>
  );
};

export default Mcq;
