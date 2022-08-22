import { GlobalStyles, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useSettings } from './Settings';

// export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function Theme(props: { children: React.ReactNode }) {
  // const [Settings, setSetting] = useSettings();
  // const [mode, setMode] = React.useState<PaletteMode>('light');
  // const colorMode = React.useMemo(
  //   () => ({
  //     // The dark mode switch would invoke this method
  //     toggleColorMode: () => {
  //       setSetting({
  //         setting: 'darkMode',
  //         value: Settings.darkMode === 'light' ? 'dark' : 'light'
  //       });
  //     },
  //   }),
  //   [],
  // );

  // Update the theme only if the mode changes
  // const theme = React.useMemo(() => createTheme(getDesignTokens(Settings.darkMode)), [Settings]);
  const theme = createTheme(getDesignTokens('dark'));
  return (
    <>
    {/* <ColorModeContext.Provider value={colorMode}> */}
      <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default }}} />
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    {/* </ColorModeContext.Provider> */}
    </>
  );
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main:         '#f06901',
            light:        '#ff9a3f',
            dark:         '#b63900',
            contrastText: '#000000'
          },
          secondary: {
            main:         '#2cd3d3',
            light:        '#72ffff',
            dark:         '#00a1a2',
            contrastText: '#000000'
          },
          background: {
            paper: '#212121',
          }
        }
      : {
          // palette values for dark mode
          primary: {
            main:         '#f06901',
            light:        '#ff9a3f',
            dark:         '#b63900',
            contrastText: '#000000'
          },
          secondary: {
            main:         '#2cd3d3',
            light:        '#72ffff',
            dark:         '#00a1a2',
            contrastText: '#000000'
          },
          background: {
            default: '#212121',
            paper: '#212121',
          },
          text: {
            primary: '#fff',
            secondary: '#9e9e9e',
          },
        }),
  },
  typography: {
    fontFamily: 'Michroma'
  }
});

export default Theme;