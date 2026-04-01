import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthCallback = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ name, email }));
      onLogin();
      navigate('/history');
    } else {
      navigate('/login?error=OAuth failed');
    }
  }, [location, navigate, onLogin]);

  return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-muted)' }}>Finalizing your login...</p>
    </div>
  );
};

export default OAuthCallback;
