/** @format */

import { Slide, Box } from "@mui/material";
import React, { useState, useEffect } from "react";

const Slider: React.FC<{
  children: React.ReactNode;
  nextSlideIndex: number;
  slideOrientation: "horizontal" | "vertical";
}> = ({
  children,
  nextSlideIndex,
  slideOrientation,
}) => {
  const [slideDirection, setSlideDirection] = useState<
    "left" | "right" | "up" | "down"
  >(slideOrientation === "horizontal" ? "left" : "up");
  const [phase, setPhase] = useState<"go out" | "go in">("go in");
  const [previousSlideIndex, setPreviousSectionIndex] = useState<number>(-1);

  const changeDirection = () => {
    // if (phase === "go in")
      if (nextSlideIndex > previousSlideIndex)
        setSlideDirection(slideOrientation === "horizontal" ? "right" : "down");
      else setSlideDirection(slideOrientation === "horizontal" ? "left" : "up");
  };

  useEffect(() => {
    if (!nextSlideIndex) return;
    else changeDirection();
    setPreviousSectionIndex(nextSlideIndex);
    setPhase("go out");
    
    // const timeOutId = setTimeout(() => {
        // }, 1000);
        return () => {
            console.log("Need to go back in");
        setPhase("go in");

    //   clearTimeout(timeOutId);
    };
  }, [nextSlideIndex]);
  console.log("phase", phase);
  return (
    <Slide direction={slideDirection} in={phase === "go in"}
         timeout={500}>
      <Box>{children}</Box>
    </Slide>
  );
};

export default Slider;
