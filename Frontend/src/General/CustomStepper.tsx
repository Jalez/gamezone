/** @format */

import * as React from 'react';
import { Box, Step, StepButton, Stepper } from '@mui/material';

type CustomStepperProps = {
  steps: string[];
  onStepChange: (step: string) => void;
  children?: React.ReactNode;
};

const CustomStepper = ({
  steps,
  onStepChange,
  children,
}: CustomStepperProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

  const handleStepChange = (step: number) => {
    setActiveStep(step);
    onStepChange(steps[step]);
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflow: "hidden",
        overflowX: 'auto', // Allow horizontal scrolling if needed
        paddingBottom: 2, // Add some space at the bottom to prevent the last step from being cut off
      }}
    >
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Adjust alignment to prevent the steps from being pushed too far
          width: 'max-content', // Ensures the Stepper grows as needed to fit the steps
        }}
      >
        {steps.map((label, index) => (
          <Step key={label+index} completed={completed[index]}>
            <StepButton color="inherit" onClick={() => handleStepChange(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
        {children && <Step>{children}</Step>}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;
