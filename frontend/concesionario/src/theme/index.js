import PropTypes from 'prop-types';
import {useMemo, useState} from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import ThemeContext from "./ThemeContext";
//
import lightPalette from './lightPalette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import darkPalette from "./darkPalette";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {

    const [modeC, setMode] = useState('light');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    const themeOptionsDark = useMemo(
        () => ({
            mode: 'dark',
            palette: darkPalette,
            shape: { borderRadius: 6 },
            typography,
            shadows: shadows(),
            customShadows: customShadows()
        }),
        []
    );


  const themeOptions = useMemo(
    () => ({
      mode: 'light',
      palette: lightPalette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows()
    }),
    []
  );

  const theme = createTheme(modeC === 'light' ? themeOptions : themeOptionsDark);
  theme.components = componentsOverride(theme);

  return (
      <ThemeContext.Provider value={{toggleMode, modeC}}>
          <StyledEngineProvider injectFirst>
              <MUIThemeProvider theme={theme}>
                  <CssBaseline />
                  <GlobalStyles />
                  {children}
              </MUIThemeProvider>
          </StyledEngineProvider>
      </ThemeContext.Provider>
  );
}
