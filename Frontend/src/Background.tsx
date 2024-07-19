import { useTheme } from "@mui/material";
import React from "react";

type BackgroundProps = {
  children: React.ReactNode;
};

const Background: React.FC<BackgroundProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        // backgroundColor: theme.palette.secondary.main,
        width: "100vw",
        //Set it to cover the whole screen
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* child components inside */}
      {children}
    </div>
  );
};

export default Background;
