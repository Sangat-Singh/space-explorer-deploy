// In a real application, you would fetch this from an API.
// For this static version, we'll hardcode it.
// I've added events for a few different dates so you can test
// by changing your computer's date or modifying the code temporarily.

export const spaceEvents = [
  {
    month: 4, // April
    day: 12,
    year: 1961,
    title: "The First Human in Space",
    description: "Soviet cosmonaut Yuri Gagarin becomes the first human to journey into outer space, orbiting the Earth aboard the Vostok 1 spacecraft. His 108-minute flight marked a pivotal moment in the Space Race.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Vostok_1_mission_patch.png",
    link: "https://en.wikipedia.org/wiki/Vostok_1",
  },
  {
    month: 7, // July
    day: 20,
    year: 1969,
    title: "A Giant Leap For Mankind",
    description: "NASA's Apollo 11 mission lands the first humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin spent over 21 hours on the lunar surface, forever changing our place in the cosmos.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/800px-Aldrin_Apollo_11_original.jpg",
    link: "https://en.wikipedia.org/wiki/Apollo_11",
  },
  {
    month: 4, // April
    day: 24,
    year: 1990,
    title: "Hubble's Window to the Universe",
    description: "The Hubble Space Telescope is deployed into low Earth orbit from the Space Shuttle Discovery. It has since become one of the most vital instruments in astronomy, capturing breathtaking images of deep space.",
    image: "https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/hubble-in-orbit.jpg",
    link: "https://en.wikipedia.org/wiki/Hubble_Space_Telescope",
  },
  {
    month: 11, // November
    day: 2,
    year: 2000,
    title: "A Home in Orbit",
    description: "Expedition 1 crew arrives at the International Space Station (ISS), beginning an era of continuous human presence in space. The ISS remains a symbol of global scientific collaboration.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/International_Space_Station_after_undocking_of_STS-132.jpg/1280px-International_Space_Station_after_undocking_of_STS-132.jpg",
    link: "https://en.wikipedia.org/wiki/International_Space_Station",
  },
  {
    month: 7, // July
    day: 20,
    year: 1976,
    title: "First Touchdown on Mars",
    description: "NASA's Viking 1 lander successfully touches down on the surface of Mars, becoming the first spacecraft to successfully land and operate on the Red Planet, sending back the first images from the surface.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Viking_1_lander_image_%28Color%29.jpg",
    link: "https://en.wikipedia.org/wiki/Viking_1",
  },
  // Add more events for other dates here...
];