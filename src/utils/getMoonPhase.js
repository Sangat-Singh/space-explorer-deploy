export function getMoonPhase(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const lp = 2551443; // Lunar period in seconds
  const newMoon = new Date(1970, 0, 7, 20, 35, 0); // Reference new moon
  const thisDate = new Date(year, month - 1, day, 20, 35, 0);
  const phaseTime = ((thisDate.getTime() - newMoon.getTime()) / 1000) % lp;
  const phaseDays = Math.floor(phaseTime / (24 * 3600));

  if (phaseDays < 1) return "🌑 New Moon";
  else if (phaseDays < 7) return "🌓 First Quarter";
  else if (phaseDays < 15) return "🌕 Full Moon";
  else if (phaseDays < 22) return "🌗 Last Quarter";
  else return "🌑 New Moon";
}