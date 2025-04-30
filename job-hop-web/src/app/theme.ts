import { createTheme } from '@mui/material/styles';

// Colors from job-hop-mobile/constants/Colors.ts
const tintColorLight = '#0a7ea4';

export const theme = createTheme({
  palette: {
    mode: 'light', // You can make this dynamic later
    primary: {
      main: tintColorLight,
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
    text: {
      primary: '#11181C',
      secondary: '#687076',
    },
    divider: '#cbd5e1',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    h1: { fontSize: 32, fontWeight: 700 },
    h2: { fontSize: 24, fontWeight: 700 },
    h3: { fontSize: 20, fontWeight: 600 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#f1f5f9',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});