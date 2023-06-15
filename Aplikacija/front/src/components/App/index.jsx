import GlobalStyle from 'style/GlobalStyle';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { getRoutesAsArray } from 'Routes';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from 'style/themes';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import LayoutProvider from 'components/Layouts/LayoutProvider';
import { useEffect } from 'react';

export default function App() {
  const routes = getRoutesAsArray();
  console.log(routes);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <LayoutProvider>
            <Routes>
              {routes.map((route) => {
                return (
                  <Route
                    key={route.name}
                    path={route.path}
                    Component={route.component}
                  />
                );
              })}
            </Routes>
          </LayoutProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
