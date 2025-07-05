import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ContentSection.css';

import starfield from '../assets/starfield.png';
import nebula from '../assets/nebula.png';

import { classifyEventWithScore } from '../utils/classifyEvent';
import { getZodiacSign } from '../utils/getZodiacSign';
import { getMoonPhase } from '../utils/getMoonPhase';

const ContentSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltered, setShowFiltered] = useState(true);
  const [showCurrentEvents, setShowCurrentEvents] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showAllCurrent, setShowAllCurrent] = useState(false);

  const eventsRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();

  const dateString = selectedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  const zodiac = getZodiacSign(day, month);
  const moonPhase = getMoonPhase(selectedDate);
  const moonClass = moonPhase.includes('Full') ? 'badge-moon full-moon' : 'badge-moon';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchAndClassify = async () => {
      setLoading(true);
      setError(null);
      setEvents([]);

      try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`);
        const data = await res.json();
        const allEvents = data?.events || [];

        const classified = await Promise.all(
          allEvents.map(async (event) => {
            const result = await classifyEventWithScore(event.text);
            const imageUrl = event.pages?.[0]?.thumbnail?.source || null;
            return {
              ...event,
              isRelevant: result.isRelevant,
              confidence: result.confidence,
              image: imageUrl,
            };
          })
        );

        const filtered = showFiltered
          ? classified.filter((e) => e.isRelevant && e.confidence >= 0.6)
          : classified;

        setEvents(filtered.sort((a, b) => b.confidence - a.confidence));
        if (eventsRef.current && !loading) {
          eventsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.error('❌ Failed to load or classify:', err);
        setError('Failed to load or classify events.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndClassify();
  }, [selectedDate, showFiltered]);

  useEffect(() => {
    const fetchCurrentEvents = async () => {
      try {
        const res = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=30');
        const data = await res.json();
        const launches = data.results || [];

        const mappedEvents = launches.map((launch) => ({
          date: new Date(launch.net),
          year: new Date(launch.net).getFullYear(),
          text: `${launch.name} - ${launch.mission?.description || 'No mission description available.'}`,
          confidence: 1.0,
          image: launch.image || null,
          link: launch.url || null, // ✅ Use SpaceDevs launch page
        }));

        setCurrentEvents(mappedEvents);
      } catch (err) {
        console.error('❌ Failed to fetch current events:', err);
      }
    };

    if (showCurrentEvents && currentEvents.length === 0) {
      fetchCurrentEvents();
    }
  }, [showCurrentEvents, currentEvents.length]);

  const cardVariants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', bounce: 0.4, duration: 1.0 },
    },
  };

  const filteredEvents = searchMode
    ? events.filter((e) => e.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : events;

  const filteredCurrentEvents = searchMode
    ? currentEvents.filter((e) => e.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentEvents;

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);
  const displayedCurrentEvents = showAllCurrent ? filteredCurrentEvents : filteredCurrentEvents.slice(0, 6);

  return (
    <div className="parallax-container">
      {/* ✅ Fixed z-index and pointer-events for parallax layers */}
      <div className="stars" style={{
        backgroundImage: `url(${nebula})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -10,
        transform: `translateY(${scrollY * 0.2}px)`,
        opacity: Math.max(1 - scrollY * 0.0012, 0.3),
        transition: 'transform 0.05s linear, opacity 0.2s ease-out',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }} />
      <div className="nebula-layer" style={{
        backgroundImage: `url(${starfield})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: -9,
        transform: `translateY(${scrollY * 0.5}px)`,
        opacity: Math.max(0.3 - scrollY * 0.0015, 0.25),
        transition: 'transform 0.05s linear, opacity 0.2s ease-out',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }} />
      <div className="gradient-overlay" style={{ zIndex: -8, pointerEvents: 'none' }} />

      <div className="content-container scroll-anchor" id="on-this-day">
        <div className="content-wrapper">
          <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {showFiltered ? 'SPACE HISTORY TODAY' : 'ALL EVENTS TODAY'}
          </motion.h2>

          <motion.div className="calendar-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="today-heading">
              <h3>📅 Viewing Events For: {dateString}</h3>
              <div className="astro-badges">
                <span className="badge-zodiac">🔮 Zodiac: {zodiac}</span>
                <span className={moonClass}>🌒 Moon Phase: {moonPhase}</span>
              </div>
            </div>

            <div className="calendar-container">
              <label className="calendar-label">Pick a date:</label>
              <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="MMMM d" className="custom-datepicker no-year" maxDate={new Date(2099, 11, 31)} minDate={new Date(2000, 0, 1)} fixedHeight showPopperArrow={false} showMonthDropdown showDayDropdown dropdownMode="select" />
            </div>

            <div className="filter-toggle">
              <label>
                <input type="checkbox" checked={showFiltered} onChange={() => setShowFiltered(!showFiltered)} /> Show only space-related events
              </label>
            </div>

            <div className="search-toggle">
              <button className="toggle-button" onClick={() => setSearchMode(!searchMode)}>
                {searchMode ? 'Close Search' : 'Search Events'}
              </button>
              {searchMode && (
                <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
              )}
            </div>

            <div className="current-events-toggle">
              <button className="toggle-button" onClick={() => setShowCurrentEvents(!showCurrentEvents)}>
                {showCurrentEvents ? 'Hide Current Events' : 'Show Current Events (2025)'}
              </button>
            </div>
          </motion.div>

          {/* 🚀 Current Events */}
          {showCurrentEvents && filteredCurrentEvents.length > 0 && (
            <>
              <h3 className="section-heading">🚀 Current Space Events in 2025</h3>
              <div className="event-meta">
                <p>Showing {displayedCurrentEvents.length} of {filteredCurrentEvents.length} events.</p>
                {filteredCurrentEvents.length > 6 && (
                  <button className="toggle-button" onClick={() => setShowAllCurrent(!showAllCurrent)}>
                    {showAllCurrent ? 'Show Less' : 'Show More →'}
                  </button>
                )}
              </div>
              <div className="event-list" ref={eventsRef}>
                {displayedCurrentEvents.map((event, i) => (
                  <motion.article key={`current-${i}`} className="event-card parallax-card" initial="offscreen" whileInView="onscreen" variants={cardVariants} viewport={{ once: true }}>
                    {event.image && <div className="card-image-container"><img src={event.image} alt="Event" className="card-image" /></div>}
                    <div className="card-content">
                      <time className="card-year">{event.year}</time>
                      <h3 className="card-title">{event.text.split('.')[0]}</h3>
                      <p className="card-description">{event.text}</p>
                      <p className="confidence-score">Confidence: 100%</p>
                      {event.link && <a href={event.link} className="card-link" target="_blank" rel="noopener noreferrer">Learn More →</a>}
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}

          {/* 📜 Historical Events */}
          {error ? (
            <motion.div className="error-card"><h3>{error}</h3></motion.div>
          ) : loading ? (
            <div className="loader" />
          ) : filteredEvents.length > 0 ? (
            <>
              <div className="event-meta">
                <p>Showing {displayedEvents.length} of {filteredEvents.length} events.</p>
                {filteredEvents.length > 6 && (
                  <button className="toggle-button" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Show Less' : 'Show More →'}
                  </button>
                )}
              </div>
              <div className="event-list">
                {displayedEvents.map((event, i) => (
                  <motion.article key={i} className="event-card parallax-card" initial="offscreen" whileInView="onscreen" variants={cardVariants} viewport={{ once: true }}>
                    {event.image && <div className="card-image-container"><img src={event.image} alt="Event" className="card-image" /></div>}
                    <div className="card-content">
                      <time className="card-year">{event.year}</time>
                      <h3 className="card-title">{event.text.split('.')[0]}</h3>
                      <p className="card-description">{event.text}</p>
                      <p className="confidence-score">Confidence: {(event.confidence * 100).toFixed(1)}%</p>
                      {event.pages?.[0]?.pageid && (
                        <a href={`https://en.wikipedia.org/?curid=${event.pages[0].pageid}`} className="card-link" target="_blank" rel="noopener noreferrer">
                          Learn More →
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          ) : (
            <motion.div className="no-events-card">
              <h3>No Events Found</h3>
              <p>Try another date or search term.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
