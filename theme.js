import { createTheme } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const getPalette = (mode) => ({
  mode,
  ...(mode === 'dark'
    ? {
        primary: { main: '#9DC4EC', border: '#ffffff1f' },
        secondary: { main: '#f48fb1' },
        background: { default: '#121212', main: '#181C20', paper: '#1e1e1e' },
        text: { primary: '#FFFFFF', secondary: '#ffffffb3', invert: '#000000f0'},
        drawer: { main: '#121212' },
      }
    : {
        primary: { main: '#2574c2', border: '#0000001F' },
        secondary: { main: '#dc004e' },
        background: { default: '#FFFFFF', main: '#f7f8f9', paper: '#ffffff' },
        text: { primary: '#000000f0', secondary: '#00000099', invert: '#FFFFFF'},
        drawer: { main: '#FFFFFF' },
      }),
});

export const theme = () =>
  createTheme({
    colorSchemes: {
      light: {palette: getPalette('light')},
      dark: {palette: getPalette('dark')},
    },
    typography: {
      fontFamily: 'inter-regular, Arial, sans-serif',
      fontFamilyMedium: 'inter-medium, Arial, sans-serif',
      fontFamilyBold: 'inter-semibold, Arial, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            scrollbarColor: 'var(--primary-color) var(--primary-scrollbar)',
            scrollbarWidth: 'thin',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: 'inter-regular',
            '&:hover, &.Mui-selected': {
              color: 'var(--primary-color) !important',
            },
            '&:hover, &:focus-visible': {  //For Select labels using tab key press
              color: 'var(--primary-color) !important',
            },
            '&:hover, &:focus-visible svg': { //For Select Icons using tab key press
              color: 'var(--primary-color) !important',
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          option: {
            fontSize: '1rem',
            fontFamily: 'inter-regular',
            '&:hover': {
              color: 'var(--primary-color)',
            },
            '&[aria-selected="true"]': {
              color: 'var(--primary-color) !important',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // fontSize: '0.813rem',
            fontFamily: 'inter-medium',
          },
          // textPrimary: {
          //   color: 'var(--primary-color) !important',
          // },
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ExpandMoreRoundedIcon,
        },
        styleOverrides: {
          icon: {
            color: 'var(--text-secondary-color)',
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
        styleOverrides: {
          tooltip: ({ theme }) => ({
            backgroundColor: 'var(--tooltip-bg)',
            color: theme.palette.text.invert,
            fontSize: '0.75rem',
          }),
          arrow: {
            color: 'var(--tooltip-bg)',
          },
        },
      },
      //TODO - Check dependency on all icons
      MuiIconButton: {
        styleOverrides: {
          root: {
            '@media (hover: hover)': {
              '&:hover': {
                backgroundColor: 'var(--primary-icon-hover) !important',
              },
              '&:hover .MuiSvgIcon-root': {
                color: 'var(--primary-color) !important',
              },
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--divider-color)',
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: "var(--pure-color) !important",
            },
          },
        },
      },
    },
  });

export default theme;
