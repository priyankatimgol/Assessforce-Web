import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import { createContext, useEffect } from 'react';
import appTheme from '../../theme';

export const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={appTheme()} defaultMode="light">
      <ThemeWrapper>{children}</ThemeWrapper>
    </ThemeProvider>
  );
};

// Inner wrapper to correctly use useColorScheme()
const ThemeWrapper = ({ children }) => {
  const { mode, setMode } = useColorScheme();

  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  // Update theme mode on page load or theme change
  useEffect(() => {
    const resolvedMode =
      mode === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : mode;

    document.documentElement.setAttribute("data-theme", resolvedMode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
