import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContentSection from './components/ContentSection';
import PlanetShowcase from './components/PlanetShowcase';
import SpaceShowcase from './components/SpaceShowcase';
import ChatWidget from './components/ChatWidget';
import OrbitModel from './components/OrbitModel';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isTaraVisible, setIsTaraVisible] = useState(false);
  const [showOrbit, setShowOrbit] = useState(false);
  const [booting, setBooting] = useState(true); // 🚀 boot loader

  // Handle boot loader timer
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // lock scroll
    const timer = setTimeout(() => {
      setBooting(false);
      document.body.style.overflow = 'auto'; // unlock scroll
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTaraBot = () => setIsTaraVisible(prev => !prev);

  return (
    <div className="App">
      {booting ? (
        <div className="booter-overlay">
          <h1 className="booter-title">🚀 Initializing <span className="highlight">Stellar.log</span>...</h1>
          <div className="loader-spinner" />
        </div>
      ) : (
        <>
          <Navbar />
          {!showOrbit ? (
            <>
              <Hero scrollY={scrollY} />
              <ContentSection />
              <PlanetShowcase onEnterOrbit={() => setShowOrbit(true)} />
              <SpaceShowcase />
              <Footer />
            </>
          ) : (
            <OrbitModel onExit={() => setShowOrbit(false)} />
          )}
          <ChatWidget isVisible={isTaraVisible} />
        </>
      )}
    </div>
  );
}

export default App;
