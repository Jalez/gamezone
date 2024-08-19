/** @format */

import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
// import { darkTheme, lightTheme } from "./main.tsx";
import Background from './Background.tsx';
import { lightTheme } from './main.tsx';
import Homepage from './Homepage.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicBreadcrumbs from './Breadcrumbs.tsx';
import { Breadcrumb } from './types.ts';
import Articles from './Articles.tsx';
import NotFoundPage from './NotFound.tsx';

function App() {
  const [Breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { href: '/', name: 'HOME' },
  ]);

  const handleUpdateBreadcrumbs = (index: number) => {
    setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, index + 1));
  };

  const handleAddBreadCrumbAndActivate = (Breadcrumb: Breadcrumb) => {
    console.log('Breadcrumb', Breadcrumb);
    //Look for the breadcrumb in the current breadcrumbs
    //If it exists, do nothing
    //If it doesn't exist, add it
    const index = Breadcrumbs.findIndex(
      (crumb) => crumb.name.toUpperCase() === Breadcrumb.name.toUpperCase()
    );
    console.log('index', index);
    if (index !== -1) {
      handleUpdateBreadcrumbs(index);
      //Also, add a ... in between the breadcrumbs
      return;
    }

    console.log('Breadcrumb', Breadcrumb);
    console.log(Breadcrumbs);
    //Set to uppercase
    Breadcrumb.name = Breadcrumb.name.toUpperCase();
    setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, Breadcrumb]);
  };
  return (
    <ThemeProvider theme={lightTheme}>
      <Background>
        <Router>
          <BasicBreadcrumbs
            breadcrumbs={Breadcrumbs}
            updateBreadcrumbs={handleUpdateBreadcrumbs}
          />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/about' element={<About />} />
            <Route
              path='/:title'
              element={
                <Articles
                  handleAddBreadCrumbAndActivate={
                    handleAddBreadCrumbAndActivate
                  }
                />
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Background>
    </ThemeProvider>
  );
}

const About = () => <h2>About</h2>;

export default App;
