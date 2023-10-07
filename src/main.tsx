import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#2c3e50",
    },
    // ... other colors or theme-related properties for light mode
  },
});

// export const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       // main: "#000000",
//       main: "#ffffff",
//     },
//     secondary: {
//       main: "#222",
//     },
//     background: {
//       paper: "#2c3e50",
//     },
//     // Change heading color to white
//     text: {
//       primary: "#ffffff",
//       secondary: "#ffffff",
//     },

//     // ... other colors or theme-related properties for dark mode
//   },
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);
