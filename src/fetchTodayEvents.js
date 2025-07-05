// src/fetchTodayEvents.js
export async function fetchTodayEvents() {
  const today = new Date();
  const month = today.toLocaleString('en-US', { month: 'long' });
  const day = today.getDate();

  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Optional: filter only space-related events
    const spaceEvents = data.events.filter((event) =>
      event.text.toLowerCase().includes('space') ||
      event.text.toLowerCase().includes('nasa') ||
      event.text.toLowerCase().includes('astronaut') ||
      event.text.toLowerCase().includes('launch') ||
      event.text.toLowerCase().includes('moon') ||
      event.text.toLowerCase().includes('apollo')
    );

    return spaceEvents.slice(0, 5); // limit to top 5
  } catch (error) {
    console.error('Failed to fetch today\'s events:', error);
    return [];
  }
}
