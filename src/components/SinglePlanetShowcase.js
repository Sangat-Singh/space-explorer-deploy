import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

const RotatingPlanet = ({ texturePath }) => {
  const texture = useTexture(texturePath);
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const SinglePlanetShowcase = ({ planet, onBack }) => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'radial-gradient(ellipse at center, #020617, #0a0f2c)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      color: 'white',
      overflow: 'hidden',
      padding: '0 2rem',
      position: 'relative'
    }}>
      {/* 🔙 Back Button */}
      <button onClick={onBack} style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        background: '#1e293b',
        border: '1px solid #38bdf8',
        color: '#7dd3fc',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 2
      }}>
        ← Back to Solar System
      </button>

      {/* 🌍 Planet Canvas */}
      <div style={{ width: '40%', minWidth: '300px', height: '60vh' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1.5} position={[4, 4, 4]} />
          <RotatingPlanet texturePath={planet.texture} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>

      {/* 📝 Text Info */}
      <div style={{ width: '45%', maxWidth: '600px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#7dd3fc', marginBottom: '0.5rem' }}>
          THE {planet.tagline?.toUpperCase() || 'PLANET'}
        </h2>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          {planet.name.toUpperCase()}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2rem' }}>
          {planet.description}
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#38bdf8',
            color: '#fff',
            borderRadius: '999px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Get Started</button>

          <button style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            color: '#38bdf8',
            borderRadius: '999px',
            border: '2px solid #38bdf8',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default SinglePlanetShowcase;
