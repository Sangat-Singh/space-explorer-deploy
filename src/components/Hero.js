import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { SpaceScene } from './SpaceScene';
import './Hero.css';

const Hero = ({ scrollY }) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="hero-container" id="hero">
      <div className="hero-canvas-container">
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 60 }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <SpaceScene scrollY={scrollY} />
          </Suspense>
        </Canvas>
      </div>
      <div
        className="hero-content"
        style={{
          opacity: Math.max(1 - scrollY * 0.0035, 0),
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <motion.h1 custom={0} initial="hidden" animate="visible" variants={textVariants}>
          Stellar.log

        </motion.h1>
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="subtitle"
        >
          Discover the wonders of the universe
        </motion.p>
        <motion.div custom={2} initial="hidden" animate="visible" variants={textVariants}>
          <Link to="on-this-day" smooth={true} duration={1000} className="get-started-btn">
            GET STARTED
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
