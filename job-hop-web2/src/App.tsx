import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Resumes from './pages/Resumes'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/jobs">Jobs</Link> |{' '}
        <Link to="/resumes">Resumes</Link> |{' '}
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
