const spaceKeywords = [
  // Core space terms
  'space mission',
  'space exploration',
  'spacecraft',
  'astronaut',
  'cosmonaut',
  'launch vehicle',
  'rocket launch',
  'orbital',
  'low earth orbit',
  'space station',
  'international space station',
  'spacewalk',
  'extravehicular activity',

  // Organizations
  'NASA',
  'ESA',
  'ISRO',
  'Roscosmos',
  'JAXA',
  'SpaceX',
  'Blue Origin',
  'Virgin Galactic',

  // Satellites & telescopes
  'satellite',
  'weather satellite',
  'communications satellite',
  'telescope',
  'hubble',
  'james webb',
  'radio telescope',
  'observatory',

  // Planetary science
  'planet discovered',
  'exoplanet',
  'planetary system',
  'protoplanetary disk',
  'habitable zone',
  'gas giant',
  'terrestrial planet',
  'planetary alignment',

  // Famous missions & programs
  'apollo',
  'gemini',
  'mercury program',
  'sputnik',
  'soyuz',
  'shuttle',
  'voyager',
  'pioneer',
  'cassini',
  'galileo spacecraft',
  'chandrayaan',
  'mangalyaan',
  'perseverance',
  'curiosity',
  'insight lander',
  'juno',
  'new horizons',

  // Moon and Mars
  'moon landing',
  'mars landing',
  'lunar module',
  'lunar rover',
  'mars rover',
  'lunar orbit',
  'mars orbit',
  'lunar eclipse',
  'solar eclipse',

  // Stars, galaxies, cosmology
  'supernova',
  'nebula',
  'milky way',
  'galaxy discovered',
  'spiral galaxy',
  'black hole',
  'event horizon',
  'cosmic microwave background',
  'expanding universe',
  'big bang',
  'redshift',
  'dark matter',
  'dark energy',
  'comet',
  'asteroid',
  'meteor shower',
  'meteorite',
  'asteroid belt',
  'meteor impact',
  'milky way galaxy',
  'andromeda galaxy',
  'meteoroid',
  'orbital mechanics',
  'orbit',
  'eclipse',
' solar system',
  'solar flare',
  'solar wind',
  'stellar evolution',
  'stellar nursery',
  'stellar black hole',
  'stellar nebula',
  'stellar cluster',
  'stellar parallax',
  'stellar spectroscopy',
  'stellar luminosity',
  'stellar classification',
  'stellar mass',
  'stellar radius',



  // Major planets
  'sun',
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',

  // Dwarf planets
  'pluto',
  'ceres',
  'eris',
  'makemake',
  'haumea'
];

const keywordRegex = new RegExp(`\\b(${spaceKeywords.join('|')})\\b`, 'i');

export const classifyEventWithScore = async (text) => {
  const isRelevant = keywordRegex.test(text);
  return {
    isRelevant,
    confidence: isRelevant ? 0.9 : 0, // optional scoring
  };
};
