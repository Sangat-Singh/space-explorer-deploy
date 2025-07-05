import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const scrollToPlanets = () => {
    const section = document.getElementById('planet-showcase');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSpaceShowcase = () => {
    const section = document.getElementById('space-showcase');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🚀 Stellar.log</h1>
      <div className="nav-links">
        <button onClick={scrollToPlanets}>🪐 Planet Showcase</button>
        <button onClick={scrollToSpaceShowcase}>🌌 Space Showcase</button>
      </div>
    </nav>
  );
};

export default Navbar;
