// Placeholder Panchang data structured to match AstrologyAPI.com response format
// TODO: Replace with live API call to AstrologyAPI.com or Prokerala
// API Integration:
//   const response = await fetch(`https://json.astrologyapi.com/v1/panchang`, {
//     method: 'POST',
//     headers: { 'Authorization': `Basic ${btoa('USER_ID:API_KEY')}`, 'Content-Type': 'application/json' },
//     body: JSON.stringify({ day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear(),
//       hour: 6, min: 0, lat: 28.6139, lon: 77.2090, tzone: 5.5 })
//   });

export interface PanchangData {
  tithi: { name: string; paksha: string; endTime: string };
  nakshatra: { name: string; lord: string; endTime: string };
  yoga: { name: string; endTime: string };
  karan: { name: string; endTime: string };
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  shubhMuhurat: Array<{ name: string; startTime: string; endTime: string }>;
  rahukaal: { startTime: string; endTime: string };
  yamaganda: { startTime: string; endTime: string };
  gulika: { startTime: string; endTime: string };
  day: string;
  date: string;
}

export function getTodayPanchang(): PanchangData {
  const today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const tithis = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'];
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
  const yogas = ['Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
  const karans = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'];

  const dayIdx = today.getDay();
  const dateNum = today.getDate();
  const tithiIdx = (dateNum - 1) % 15;
  const nakIdx = dateNum % 27;
  const yogaIdx = dateNum % 27;
  const karanIdx = dateNum % 11;

  return {
    tithi: { name: tithis[tithiIdx], paksha: dateNum <= 15 ? 'Shukla Paksha' : 'Krishna Paksha', endTime: '11:42 PM' },
    nakshatra: { name: nakshatras[nakIdx], lord: 'Moon', endTime: '09:15 PM' },
    yoga: { name: yogas[yogaIdx], endTime: '08:30 PM' },
    karan: { name: karans[karanIdx], endTime: '12:00 PM' },
    sunrise: '06:42 AM',
    sunset: '06:18 PM',
    moonrise: '10:24 AM',
    moonset: '11:52 PM',
    shubhMuhurat: [
      { name: 'Abhijit Muhurat', startTime: '11:58 AM', endTime: '12:48 PM' },
      { name: 'Brahma Muhurat', startTime: '05:06 AM', endTime: '05:54 AM' },
      { name: 'Vijaya Muhurat', startTime: '02:28 PM', endTime: '03:18 PM' },
    ],
    rahukaal: { startTime: '09:00 AM', endTime: '10:30 AM' },
    yamaganda: { startTime: '03:00 PM', endTime: '04:30 PM' },
    gulika: { startTime: '06:00 AM', endTime: '07:30 AM' },
    day: days[dayIdx],
    date: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
}
