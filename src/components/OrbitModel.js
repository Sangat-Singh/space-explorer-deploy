import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import './PlanetShowcase.css';

const SUN_POSITION = [0, 0, 0];

const Planet = ({ name, distance, size, speed, texturePath, hasRings = false, setInfo, planetRefs }) => {
  const ref = useRef();
  const texture = useTexture(texturePath);
  const ringTexture = useTexture('/textures/saturn_ring.png');

  useEffect(() => {
    planetRefs.current[name] = ref;
  }, [name, planetRefs]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = Math.cos(t * speed) * distance;
    const z = Math.sin(t * speed) * distance;
    ref.current.position.set(x, 0, z);
    ref.current.rotation.y += 0.002;
  });

  return (
    <group ref={ref} onClick={() => setInfo(name)}>
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {hasRings && (
        <mesh rotation={[-0.5, 0, 0]}>
          <ringGeometry args={[size * 1.2, size * 1.8, 64]} />
          <meshBasicMaterial map={ringTexture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

const Sun = ({ size, setInfo, setCameraTargetRef, setCameraSize }) => {
  const texture = useTexture('/textures/sun.jpg');

  return (
    <mesh
      position={SUN_POSITION}
      onClick={() => {
        setInfo('Sun');
        const dummyRef = { current: { position: new THREE.Vector3(...SUN_POSITION) } };
        setCameraTargetRef(dummyRef);
        setCameraSize(size);
      }}
    >
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive="orange"
        emissiveMap={texture}
        emissiveIntensity={10}
        toneMapped={false}
      />
      <pointLight position={SUN_POSITION} intensity={50} distance={1000} decay={1} />
    </mesh>
  );
};

const CameraController = ({ targetRef, size, defaultMode }) => {
  const { camera } = useThree();
  const offset = size ? size * 6 : 5;
  const solarSystemView = new THREE.Vector3(0, 10, 50);

  useFrame(() => {
    if (defaultMode || !targetRef?.current) {
      if (camera.position.distanceTo(solarSystemView) > 0.5) {
        camera.position.lerp(solarSystemView, 0.05);
      } else {
        camera.position.copy(solarSystemView);
      }
      camera.lookAt(0, 0, 0);
      return;
    }

    const planetPosition = targetRef.current.position;
    const cameraTarget = new THREE.Vector3(
      planetPosition.x,
      planetPosition.y + size * 1.2,
      planetPosition.z + offset
    );

    if (camera.position.distanceTo(cameraTarget) > 0.05) {
      camera.position.lerp(cameraTarget, 0.05);
    } else {
      camera.position.copy(cameraTarget);
    }

    camera.lookAt(planetPosition);
  });

  return null;
};

const OrbitModel = () => {
  const [selected, setSelected] = useState(null);
  const [cameraTargetRef, setCameraTargetRef] = useState(null);
  const [cameraSize, setCameraSize] = useState(1);
  const [defaultView, setDefaultView] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const planetRefs = useRef({});

  const sunSize = 1.5;

  const planets = [
    {
      name: 'Mercury',
      baseDistance: 5,
      baseSize: 0.3,
      speed: 0.4,
      texture: '/textures/mercury.jpg',
      description:
        'Mercury, the closest planet to the Sun, is a small, rocky world with a cratered surface similar to the Moon. It has no atmosphere to retain heat, resulting in drastic temperature changes between day and night.'
    },
    {
      name: 'Venus',
      baseDistance: 7.5,
      baseSize: 0.45,
      speed: 0.25,
      texture: '/textures/venus.jpg',
      description:
        'Venus is Earth’s sister planet in size but shrouded in thick clouds of carbon dioxide. Its runaway greenhouse effect makes it the hottest planet in the solar system, with surface temperatures high enough to melt lead.'
    },
    {
      name: 'Earth',
      baseDistance: 10,
      baseSize: 0.5,
      speed: 0.2,
      texture: '/textures/earth.jpg',
      description:
        'Earth is the only known planet to support life, with vast oceans, a breathable atmosphere, and a dynamic climate system. Its protective magnetic field and ozone layer make it a unique oasis in space.'
    },
    {
      name: 'Mars',
      baseDistance: 13,
      baseSize: 0.4,
      speed: 0.15,
      texture: '/textures/mars.jpg',
      description:
        'Mars, known as the Red Planet, has a cold, desert-like environment and features such as the largest volcano and canyon in the solar system. Scientists are exploring its potential for future human colonization.'
    },
    {
      name: 'Jupiter',
      baseDistance: 17,
      baseSize: 0.9,
      speed: 0.1,
      texture: '/textures/jupiter.jpg',
      description:
        'Jupiter is the giant of the solar system, made mostly of hydrogen and helium. It boasts a swirling atmosphere with the iconic Great Red Spot and has over 80 moons, including the volcanic world Io and icy Europa.'
    },
    {
      name: 'Saturn',
      baseDistance: 21,
      baseSize: 0.75,
      speed: 0.08,
      texture: '/textures/saturn.jpg',
      hasRings: true,
      description:
        'Saturn is famed for its spectacular ring system composed of ice and rock. It is a gas giant with a low density and dozens of moons, including Titan, which has a thick atmosphere and lakes of liquid methane.'
    },
    {
      name: 'Uranus',
      baseDistance: 25,
      baseSize: 0.6,
      speed: 0.06,
      texture: '/textures/uranus.jpg',
      description:
        'Uranus is an icy gas giant with a pale blue hue caused by methane in its atmosphere. Unique among planets, it rotates almost sideways, making its seasons extreme and long-lasting.'
    },
    {
      name: 'Neptune',
      baseDistance: 29,
      baseSize: 0.58,
      speed: 0.05,
      texture: '/textures/neptune.jpg',
      description:
        'Neptune, the farthest known planet, is a deep blue ice giant known for supersonic winds and dark storms. It has a faint ring system and 14 known moons, including the intriguing Triton.'
    }
  ];

  const selectedPlanetInfo = selected === 'Sun'
    ? { name: 'Sun', baseDistance: '—', baseSize: sunSize, speed: '—', description: 'The Sun is the star at the center of the Solar System, providing light and heat to the planets orbiting around it.' }
    : planets.find(p => p.name === selected);

  const info = defaultView
    ? {
        name: 'Solar System Overview',
        baseDistance: 'N/A',
        baseSize: 'N/A',
        speed: 'N/A',
        description: 'This is a full view of the Solar System. Click any planet to zoom in and explore more about it!'
      }
    : {
        ...selectedPlanetInfo,
        description: selectedPlanetInfo?.description || 'Explore this planet in more detail.'
      };

  // 🔊 Voiceover Handler
  const speakDescription = (text) => {
    if (!voiceEnabled) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger voiceover when selection changes
  useEffect(() => {
    if (!defaultView && selectedPlanetInfo) {
      speakDescription(selectedPlanetInfo.description);
    }
  }, [selected, voiceEnabled]);

  const handlePlanetClick = (planetName) => {
    if (planetName === 'Sun') {
      const dummyRef = { current: { position: new THREE.Vector3(...SUN_POSITION) } };
      setSelected('Sun');
      setCameraTargetRef(dummyRef);
      setCameraSize(sunSize);
      setDefaultView(false);
      return;
    }

    const ref = planetRefs.current[planetName];
    const planet = planets.find(p => p.name === planetName);
    if (ref && ref.current && planet) {
      setSelected(planetName);
      setCameraTargetRef(ref);
      setCameraSize(planet.baseSize);
      setDefaultView(false);
    }
  };

  const handleResetSolarSystem = () => {
    setCameraTargetRef(null);
    setDefaultView(true);
    setSelected(null);
    window.speechSynthesis.cancel();
  };

  return (
    <div className="orbit-container">
      {/* Top Bar */}
      <div className="orbit-header">
        {[...planets.map(p => p.name), 'Sun'].map(name => (
          <button
            key={name}
            className={`planet-btn-top ${selected === name ? 'active' : ''}`}
            onClick={() => handlePlanetClick(name)}
          >
            {name}
          </button>
        ))}
        <button onClick={handleResetSolarSystem} className="exit-btn-top">🌌 Solar System</button>
        <button onClick={() => setVoiceEnabled(prev => !prev)} className="exit-btn-top">
          {voiceEnabled ? '🔊 Voice: On' : '🔇 Voice: Off'}
        </button>
      </div>

      {/* Canvas Section */}
      <div className="orbit-canvas">
  {(selectedPlanetInfo || defaultView) && (
    <div className="planet-info-sidebar">
      <h2>{info.name}</h2>

      {/* ✅ Description moved to top */}
      <p className="planet-description">{info.description}</p>

      <hr style={{ margin: '1rem 0', borderColor: '#334155' }} />

      <p><strong>Distance:</strong> {info.baseDistance} AU</p>
      <p><strong>Size:</strong> {info.baseSize}</p>
      <p><strong>Speed:</strong> {info.speed}</p>
    </div>
        )}

        <Canvas camera={{ position: [0, 50, 200], fov: 45 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.15} />
          <Stars />
          <CameraController
            targetRef={cameraTargetRef}
            size={cameraSize}
            defaultMode={defaultView}
          />
          <Sun
            size={sunSize}
            setInfo={setSelected}
            setCameraTargetRef={setCameraTargetRef}
            setCameraSize={setCameraSize}
          />
          {planets.map((p, i) => (
            <Planet
              key={i}
              name={p.name}
              distance={p.baseDistance}
              size={p.baseSize}
              speed={p.speed}
              texturePath={p.texture}
              hasRings={p.hasRings}
              setInfo={setSelected}
              planetRefs={planetRefs}
            />
          ))}
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default OrbitModel;
