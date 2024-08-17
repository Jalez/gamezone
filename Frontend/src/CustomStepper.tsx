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
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );

  // const totalSteps = steps.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
    onStepChange(steps[step]);
  };

  // const handleNext = () => {
  //   const newActiveStep =
  //     activeStep === totalSteps - 1
  //       ? steps.findIndex((_, i) => !(i in completed))
  //       : activeStep + 1;
  //   handleStepChange(newActiveStep);
  // };

  // const handleComplete = () => {
  //   setCompleted({ ...completed, [activeStep]: true });
  //   handleNext();
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color='inherit' onClick={() => handleStepChange(index)}>
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
