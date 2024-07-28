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

function App() {
  const [Breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([
    { href: '/', name: 'Home' },
  ]);
  const [articleIds, setArticleIds] = useState<string[]>([]);

  const handleGoToChildren = (articleIds: string[], Breadcrumb: Breadcrumb) => {
    setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, Breadcrumb]);
    //Change the URL to the first child
    setArticleIds(articleIds);
  };

  const handleUpdateBreadcrumbs = (index: number) => {
    setBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, index + 1));
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
            <Route
              path='/'
              element={<Homepage handleGoToChildren={handleGoToChildren} />}
            />
            <Route path='/about' element={<About />} />
            <Route path='/*' element={<Articles articleIds={articleIds} />} />
          </Routes>
        </Router>
      </Background>
    </ThemeProvider>
  );
}

const About = () => <h2>About</h2>;

export default App;
