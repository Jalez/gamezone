/** @format */

import * as React from 'react';
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@mui/material';
import ChapterAdder from './ChapterAdder';
import { Chapter } from './interfaces';

type ChapterStepperProps = {
  steps: string[] | undefined;
  stepChoseHandler: (step: string) => void;
  handleChapterAdd: (chapter: Chapter) => void;
};

const ChapterStepper = ({
  steps,
  stepChoseHandler,
  handleChapterAdd,
}: ChapterStepperProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    if (steps === undefined) return 0;
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    if (steps === undefined) return;
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    stepChoseHandler(steps[newActiveStep]);
  };

  const handleBack = () => {
    if (steps === undefined) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    stepChoseHandler(steps[activeStep - 1]);
  };

  const handleStep = (step: number) => () => {
    if (steps === undefined) return;
    setActiveStep(step);
    stepChoseHandler(steps[step]);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  if (steps === undefined) {
    //TODO: ADD A LOADING SKELETON FOR THIS COMPONENT
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color='inherit' onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
        <Step>
          <ChapterAdder addChapter={handleChapterAdd} />
        </Step>
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant='caption'
                    sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
};

export default ChapterStepper;
