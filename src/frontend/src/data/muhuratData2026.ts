export interface MuhuratMonth {
  month: string;
  monthNum: number;
  shubhDays: number[];
  note: string;
  muhuratDetails?: {
    day: number;
    timing: string;
    nakshatra: string;
    tithi: string;
  }[];
}

export interface MuhuratData {
  type: string;
  year: number;
  location: string;
  months: MuhuratMonth[];
}

export const VIVAH_MUHURAT_2026: MuhuratData = {
  type: "Vivah (Marriage)",
  year: 2026,
  location: "New Delhi, India",
  months: [
    {
      month: "January",
      monthNum: 1,
      shubhDays: [],
      note: "Shukra Tara Asta — No auspicious days for marriage",
    },
    {
      month: "February",
      monthNum: 2,
      shubhDays: [5, 6, 8, 10, 12, 14, 19, 20, 21, 24, 25, 26],
      note: "12 auspicious days available",
    },
    {
      month: "March",
      monthNum: 3,
      shubhDays: [2, 3, 4, 7, 8, 9, 11, 12],
      note: "8 auspicious days available",
    },
    {
      month: "April",
      monthNum: 4,
      shubhDays: [15, 20, 21, 25, 26, 27, 28, 29],
      note: "8 auspicious days available",
    },
    {
      month: "May",
      monthNum: 5,
      shubhDays: [1, 3, 5, 6, 7, 8, 13, 14],
      note: "8 auspicious days; May 17-31 prohibited (Adhika month)",
    },
    {
      month: "June",
      monthNum: 6,
      shubhDays: [21, 22, 23, 24, 25, 26, 27, 29],
      note: "8 auspicious days; Jun 1-15 prohibited (Adhika month)",
    },
    {
      month: "July",
      monthNum: 7,
      shubhDays: [1, 6, 7, 11],
      note: "4 auspicious days; Jul 15+ Guru Tara Asta",
    },
    {
      month: "August",
      monthNum: 8,
      shubhDays: [],
      note: "Guru Tara Asta + Prohibited Solar month — No auspicious days",
    },
    {
      month: "September",
      monthNum: 9,
      shubhDays: [],
      note: "Prohibited Solar month — No auspicious days",
    },
    {
      month: "October",
      monthNum: 10,
      shubhDays: [],
      note: "Prohibited Solar month + Shukra Tara Asta — No auspicious days",
    },
    {
      month: "November",
      monthNum: 11,
      shubhDays: [21, 24, 25, 26],
      note: "4 auspicious days; Nov 1-20 Prohibited Chaturmas",
    },
    {
      month: "December",
      monthNum: 12,
      shubhDays: [2, 3, 4, 5, 6, 11, 12],
      note: "7 auspicious days available",
    },
  ],
};

export const VEHICLE_MUHURAT_2026: MuhuratData = {
  type: "Vehicle Purchase",
  year: 2026,
  location: "New Delhi, India",
  months: [
    {
      month: "January",
      monthNum: 1,
      shubhDays: [1, 2, 4, 5, 11, 12, 14, 21, 28, 29],
      note: "10 auspicious days",
    },
    {
      month: "February",
      monthNum: 2,
      shubhDays: [1, 6, 11, 26, 27],
      note: "5 auspicious days",
    },
    {
      month: "March",
      monthNum: 3,
      shubhDays: [1, 5, 6, 8, 9, 15, 16, 23, 25, 27],
      note: "10 auspicious days",
    },
    {
      month: "April",
      monthNum: 4,
      shubhDays: [1, 2, 3, 6, 12, 13, 20, 24, 29],
      note: "9 auspicious days",
    },
    {
      month: "May",
      monthNum: 5,
      shubhDays: [1, 4, 10, 11, 14],
      note: "5 auspicious days; May 17-31 prohibited (Adhika month)",
    },
    {
      month: "June",
      monthNum: 6,
      shubhDays: [17, 22, 24, 25],
      note: "4 auspicious days",
    },
    {
      month: "July",
      monthNum: 7,
      shubhDays: [2, 3, 5, 8, 12, 19, 24, 29, 30],
      note: "9 auspicious days",
    },
    {
      month: "August",
      monthNum: 8,
      shubhDays: [7, 9, 10, 16, 17, 20, 26, 27, 28, 31],
      note: "10 auspicious days",
    },
    {
      month: "September",
      monthNum: 9,
      shubhDays: [4, 6, 7, 13, 14, 16, 17, 24],
      note: "8 auspicious days; Sep 27-30 Pitru Paksha",
    },
    {
      month: "October",
      monthNum: 10,
      shubhDays: [21, 22, 25, 28, 30],
      note: "5 auspicious days; Oct 1-10 Pitru Paksha",
    },
    {
      month: "November",
      monthNum: 11,
      shubhDays: [1, 6, 25, 26, 29],
      note: "5 auspicious days",
    },
    {
      month: "December",
      monthNum: 12,
      shubhDays: [3, 4, 6, 13, 14, 23, 30, 31],
      note: "8 auspicious days",
    },
  ],
};

export const GRIHA_PRAVESH_MUHURAT_2026: MuhuratData = {
  type: "Griha Pravesh (House Warming)",
  year: 2026,
  location: "New Delhi, India",
  months: [
    {
      month: "January",
      monthNum: 1,
      shubhDays: [],
      note: "Shukra Tara Asta — No auspicious days",
    },
    {
      month: "February",
      monthNum: 2,
      shubhDays: [6, 11, 19, 20, 21, 25, 26],
      note: "7 auspicious days",
    },
    {
      month: "March",
      monthNum: 3,
      shubhDays: [4, 5, 6, 9, 13, 14],
      note: "6 auspicious days; Mar 20-31 lunar month inauspicious",
    },
    {
      month: "April",
      monthNum: 4,
      shubhDays: [20],
      note: "1 auspicious day; Apr 1-17 lunar month inauspicious",
    },
    {
      month: "May",
      monthNum: 5,
      shubhDays: [4, 8, 13],
      note: "3 auspicious days",
    },
    {
      month: "June",
      monthNum: 6,
      shubhDays: [24, 26, 27],
      note: "3 auspicious days",
    },
    {
      month: "July",
      monthNum: 7,
      shubhDays: [1, 2, 6],
      note: "3 auspicious days; Jul 15+ Guru Tara Asta",
    },
    {
      month: "August",
      monthNum: 8,
      shubhDays: [],
      note: "Guru Tara Asta + lunar month inauspicious — No auspicious days",
    },
    {
      month: "September",
      monthNum: 9,
      shubhDays: [],
      note: "Lunar month inauspicious — No auspicious days",
    },
    {
      month: "October",
      monthNum: 10,
      shubhDays: [],
      note: "Lunar month + Shukra Tara Asta — No auspicious days",
    },
    {
      month: "November",
      monthNum: 11,
      shubhDays: [11, 14, 20, 21, 25, 26],
      note: "6 auspicious days",
    },
    {
      month: "December",
      monthNum: 12,
      shubhDays: [2, 3, 4, 11, 12, 18, 19, 30],
      note: "8 auspicious days",
    },
  ],
};

// Property muhurat uses a blend of vehicle + marriage dates
export const PROPERTY_MUHURAT_2026: MuhuratData = {
  type: "Property Purchase",
  year: 2026,
  location: "New Delhi, India",
  months: [
    {
      month: "January",
      monthNum: 1,
      shubhDays: [2, 5, 11, 14, 28],
      note: "5 auspicious days",
    },
    {
      month: "February",
      monthNum: 2,
      shubhDays: [6, 11, 20, 25, 26],
      note: "5 auspicious days",
    },
    {
      month: "March",
      monthNum: 3,
      shubhDays: [4, 5, 8, 9, 14],
      note: "5 auspicious days",
    },
    {
      month: "April",
      monthNum: 4,
      shubhDays: [3, 12, 20, 25, 29],
      note: "5 auspicious days",
    },
    {
      month: "May",
      monthNum: 5,
      shubhDays: [4, 8, 13],
      note: "3 auspicious days",
    },
    {
      month: "June",
      monthNum: 6,
      shubhDays: [22, 24, 27],
      note: "3 auspicious days",
    },
    {
      month: "July",
      monthNum: 7,
      shubhDays: [1, 3, 8],
      note: "3 auspicious days",
    },
    {
      month: "August",
      monthNum: 8,
      shubhDays: [7, 16, 26],
      note: "3 auspicious days",
    },
    {
      month: "September",
      monthNum: 9,
      shubhDays: [6, 13, 17],
      note: "3 auspicious days; Sep 27-30 Pitru Paksha",
    },
    {
      month: "October",
      monthNum: 10,
      shubhDays: [22, 25, 28],
      note: "3 auspicious days; Oct 1-10 Pitru Paksha",
    },
    {
      month: "November",
      monthNum: 11,
      shubhDays: [14, 21, 25, 26],
      note: "4 auspicious days",
    },
    {
      month: "December",
      monthNum: 12,
      shubhDays: [3, 4, 11, 18, 30],
      note: "5 auspicious days",
    },
  ],
};

// Sample nakshatra/timing details for first few months
const SAMPLE_NAKSHATRAS = [
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
];
const SAMPLE_TITHIS = [
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
];
const SAMPLE_TIMINGS = [
  "7:15 AM – 9:30 AM",
  "8:00 AM – 10:15 AM",
  "6:45 AM – 8:30 AM",
  "9:00 AM – 11:00 AM",
  "7:30 AM – 9:45 AM",
  "10:00 AM – 12:00 PM",
  "6:30 AM – 8:00 AM",
  "8:45 AM – 10:30 AM",
  "11:00 AM – 1:00 PM",
];

export function getMuhuratDetails(day: number, monthNum: number) {
  const seed = day + monthNum * 31;
  return {
    timing: SAMPLE_TIMINGS[seed % SAMPLE_TIMINGS.length],
    nakshatra: SAMPLE_NAKSHATRAS[seed % SAMPLE_NAKSHATRAS.length],
    tithi: SAMPLE_TITHIS[seed % SAMPLE_TITHIS.length],
  };
}

export const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getDayName(
  year: number,
  monthNum: number,
  day: number,
): string {
  return WEEKDAY_NAMES[new Date(year, monthNum - 1, day).getDay()];
}
