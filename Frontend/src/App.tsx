/** @format */

import { useState } from "react";
import { ThemeProvider } from "@mui/material";
// import { darkTheme, lightTheme } from "./main.tsx";
import Background from "./Main/Background.tsx";
import { lightTheme } from "./main.tsx";
import Homepage from "./Views/Homepage/Homepage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BasicBreadcrumbs from "./Main/Breadcrumbs.tsx";
import { Breadcrumb } from "./types.ts";
import Articles from "./Views/Articles/Articles.tsx";
import NotFoundPage from "./Views/NotFound.tsx";
import LoginButton from "./Main/LoginButton.tsx";
import { AuthProvider } from "./AuthContext.tsx";

function App() {
  const [Breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { href: "/", name: "HOME" },
  ]);

  const handleUpdateBreadcrumbs = (index: number) => {
    setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, index + 1));
  };

  const handleAddBreadCrumbAndActivate = (Breadcrumb: Breadcrumb) => {
    //Look for the breadcrumb in the current breadcrumbs
    //If it exists, do nothing
    //If it doesn't exist, add it
    const index = Breadcrumbs.findIndex(
      (crumb) => crumb.name.toUpperCase() === Breadcrumb.name.toUpperCase()
    );
    if (index !== -1) {
      handleUpdateBreadcrumbs(index);
      //Also, add a ... in between the breadcrumbs
      return;
    }

    //Set to uppercase
    Breadcrumb.name = Breadcrumb.name.toUpperCase();
    setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, Breadcrumb]);
  };
  return (
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <Background>
          <LoginButton />
          <Router>
            <BasicBreadcrumbs
              breadcrumbs={Breadcrumbs}
              updateBreadcrumbs={handleUpdateBreadcrumbs}
            />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/:title"
                element={
                  <Articles
                    handleAddBreadCrumbAndActivate={
                      handleAddBreadCrumbAndActivate
                    }
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </Background>
      </ThemeProvider>
    </AuthProvider>
  );
}

const About = () => <h2>About</h2>;

export default App;
