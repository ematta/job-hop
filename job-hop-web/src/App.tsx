import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Resumes from './pages/Resumes'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import NavMenu from './pages/NavMenu';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import HelpCenter from './pages/HelpCenter';
import About from './pages/About';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0a7ea4',
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
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    h1: { fontSize: 32, fontWeight: 700 },
    h2: { fontSize: 24, fontWeight: 700 },
    h3: { fontSize: 20, fontWeight: 600 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
