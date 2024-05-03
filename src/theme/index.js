import { createTheme } from '@mui/material/styles';
import Palette from './palette';

const palette = Palette();

// Manage the website theme
let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: palette.GHOST_WHITE,
    },
    secondary: {
      main: palette.GHOST_BLACK,
    },
    background: {
      default: palette.GHOST_BLACK,
    },
    text: {
      primary: palette.GHOST_WHITE,
    },
  },
  typography: {
    fontFamily: '"Karla", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    h1: {
      fontFamily: '"Chillax-Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: 90,
      letterSpacing: '-4%',
      lineHeight: 1.2,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: '"Chillax-Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: 48,
      letterSpacing: '-4%',
      lineHeight: 1.25,
    },
    h3: {
      fontFamily: '"Chillax-Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.125,
    },
    h4: {
      fontFamily: '"Chillax-Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 4 / 3,
    },
    // p 24px
    body1: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      fontSize: 24,
      lineHeight: 4 / 3,
    },
    // p 20px
    body2: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      fontSize: 20,
      lineHeight: 1.2,
    },
    // label 20px
    subtitle1: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 1.2,
      letterSpacing: '20%',
    },
    // label 16px
    subtitle2: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: '16%',
    },
    // label 14px
    caption: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1.29,
      letterSpacing: '8%',
    },
    button: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      fontSize: 24,
      lineHeight: 1.29,
      textTransform: 'none',
    },
    countdown: {
      fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: 'min(80px, 10vw)',
    },
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 15,
          border: '2px',
          padding: '12px 25px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: 'white',
          outline: 'none',
          height: '44px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          color: 'black',
          height: '46px',
          backgroundColor: palette.GHOST_WHITE,
        },
        input: {
          textAlign: 'center', // Center the text
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 14,
  },
});

//theme = responsiveFontSizes(theme);

export default theme;
