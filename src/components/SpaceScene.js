import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Stars, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const SUN_POSITION = [6, 3, 0];

function Earth({ scrollY }) {
  const earthRef = useRef();
  const [dayMap, normalMap, cloudsMap] = useTexture([
    '/textures/earth_daymap.jpg',
    '/textures/earth_normal_map.jpg',
    '/textures/earth_clouds.jpg',
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    earthRef.current.rotation.y = t / 8;

    const posY = -scrollY * 0.005;
    const scale = Math.min(1 + scrollY * 0.0015, 2.2);
    earthRef.current.position.y = posY;
    earthRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={earthRef} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </group>
  );
}

function Moon() {
  const moonRef = useRef();
  const moonTexture = useTexture('/textures/moon.jpg');

  useFrame(({ clock }) => {
    moonRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <mesh ref={moonRef} position={[-4, 1.5, -5]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial map={moonTexture} />
    </mesh>
  );
}

function Shuttle() {
  const shuttleRef = useRef();
  const { scene } = useGLTF('/models/shuttle.glb');

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    const orbitRadius = 3.5;
    shuttleRef.current.position.x = Math.sin(t) * orbitRadius;
    shuttleRef.current.position.z = Math.cos(t) * orbitRadius;
    shuttleRef.current.lookAt(
      Math.sin(t + 0.1) * orbitRadius,
      0,
      Math.cos(t + 0.1) * orbitRadius
    );
  });

  return <primitive ref={shuttleRef} object={scene} scale={0.04} />;
}

function Sun() {
  const sunTexture = useLoader(THREE.TextureLoader, '/textures/sun.jpg');

  return (
    <mesh position={SUN_POSITION}>
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial
        map={sunTexture}
        emissive={new THREE.Color(1, 0.6, 0.2)}
        emissiveMap={sunTexture}
        emissiveIntensity={4}
        toneMapped={false}
      />
    </mesh>
  );
}

export const SpaceScene = ({ scrollY }) => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        color={new THREE.Color(1, 0.8, 0.6)}
        intensity={5.5}
        position={SUN_POSITION}
        castShadow
      />
      <Stars radius={300} depth={50} count={20000} factor={10} saturation={0} fade />
      <Sun />
      <Earth scrollY={scrollY} />
      <Shuttle />
      <Moon />
    </>
  );
};
