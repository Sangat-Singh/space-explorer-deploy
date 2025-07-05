import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './SpaceShowcase.css';

// Models configuration (✅ all paths are relative now)
const models = {
  Satellite: {
    file: 'models/space_satellite.glb',
    description: 'A space satellite for communication, surveillance, and research.',
    scale: 1.5,
    cameraZ: 5,
  },
  Shuttle: {
    file: 'models/space_shuttle.glb',
    description: 'A spacecraft used for transporting astronauts and cargo.',
    scale: 0.7,
    cameraZ: 5,
  },
  PerseveranceRover: {
    file: 'models/perseverance_voxel_rover.glb',
    description: 'NASA’s Mars Perseverance rover for exploration.',
    scale: 0.2,
    cameraZ: 0,
  },
  SpaceStation: {
    file: 'models/space_station.glb', // ✅ fixed path
    description: 'A modular space station in Earth orbit.',
    scale: 0.05,
    cameraZ: 50,
  },
  Astronaut: {
    file: 'models/space_hazmat_rust.glb', // ✅ fixed path
    description: 'A hazmat astronaut for EVA and spacewalks.',
    scale: 0.3,
    cameraZ: 0.15,
  },
};

// ✅ Moved preload inside the component using useEffect
export default function SpaceShowcase() {
  const [selected, setSelected] = useState('Satellite');
  const current = models[selected];
  const parallaxRef = useRef();

  useEffect(() => {
    Object.values(models).forEach((m) => useGLTF.preload(m.file));
  }, []);

  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (e.clientX - centerX) * 0.02;
    const offsetY = (e.clientY - centerY) * 0.02;

    if (parallaxRef.current) {
      parallaxRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.1)`;
    }
  };

  return (
    <div
      id="space-showcase"
      className="parallax-container"
      onMouseMove={handleMouseMove}
    >
      {/* ✅ Use relative path for background image */}
      <div
        className="parallax-bg"
        ref={parallaxRef}
        style={{ backgroundImage: "url('images/nebula.png')" }}
      />

      <div className="space-showcase-container">
        <div className="sidebar">
          <h2>🌌 Space Showcase</h2>
          <p>{current.description}</p>
          <div className="button-group">
            {Object.keys(models).map((key) => (
              <button
                key={key}
                className={selected === key ? 'active' : ''}
                onClick={() => setSelected(key)}
              >
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="canvas-area">
          <Canvas camera={{ position: [0, 0, current.cameraZ], fov: 45 }}>
            <ambientLight intensity={3} />
            <directionalLight intensity={5} position={[10, 10, 5]} />
            <ScaledModel modelPath={current.file} scale={current.scale} />
            <OrbitControls
              enableZoom
              enablePan={false}
              minDistance={3}
              maxDistance={10}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

// ✅ ScaledModel component remains the same
function ScaledModel({ modelPath, scale }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = Math.sin(t * 1.5) * 0.1;
    }
  });

  return <primitive object={scene} ref={ref} scale={scale} />;
}
