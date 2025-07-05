import React from 'react';
import OrbitModel from './OrbitModel';
import './PlanetShowcase.css';

const PlanetShowcase = () => {
  return (
    <section id="planet-showcase" className="planet-showcase">
      <h2>🪐 Planet Showcase</h2>
      <div className="orbit-wrapper">
        <OrbitModel />
      </div>
    </section>
  );
};

export default PlanetShowcase;
