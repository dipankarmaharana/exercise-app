import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar">
      <div className="container">
        <a className="navbar-brand" href="/">exercise-app</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">about</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">contact</a>
          </li>
          <li className='nav-item'><Link className='nav-link' to="/login">login</Link></li>
          <li className='nav-item'><Link className='nav-link' to="/register">register</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
