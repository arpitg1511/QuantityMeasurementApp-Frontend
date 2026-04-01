import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <div className="flex items-center gap-2">
           QuantityMaster.
        </div>
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Dashboard</Link>
        {isLoggedIn ? (
          <>
            <Link to="/history" className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}>History</Link>
            <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
