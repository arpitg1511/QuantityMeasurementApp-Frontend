import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import History from './pages/History/History';
import { authService } from './services/authService';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isLoggedIn());

  useEffect(() => {
    setIsLoggedIn(authService.isLoggedIn());
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/history" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={isLoggedIn ? <History /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--glass-border)', textAlign: 'center', background: 'var(--surface)', marginTop: 'auto' }}>
        <p style={{ color: 'var(--text-muted)' }}>© 2026 QuantityMaster. Developed for Precision.</p>
      </footer>
    </Router>
  );
}

export default App;
