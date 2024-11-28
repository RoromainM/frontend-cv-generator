import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { v_isConnected: isConnected, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <div className="navbar-container">
          <div className="navbar">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Home</NavLink>
            <NavLink to="/cv" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>CV</NavLink>
            {isConnected && (
              <NavLink to="/create/cv" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Create CV</NavLink>
            )}
          </div>
          <div>
            {isConnected ? (
              <div>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Profile</NavLink>
                <button onClick={logout} className="logout-button">Logout</button>
              </div>
            ) : (
              <div>
                <NavLink to="/register" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Register</NavLink> | 
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Login</NavLink>
              </div>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
};
