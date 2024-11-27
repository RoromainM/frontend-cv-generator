import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <div className='navbar-container'>
            <div className="navbar">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Home</NavLink>
                <NavLink to="/cv" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>CV</NavLink>
                <NavLink to="/recommendation" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Recommendations</NavLink>
            </div>
            <div>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Login</NavLink>
            </div>
        </div>
      </ul>
    </nav>
  )
}
