export function getZodiacSign(day, month) {
  const signs = [
    "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
    "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
  ];
  const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
  return day > lastDay[month - 1] ? signs[month % 12] : signs[month - 1];
}