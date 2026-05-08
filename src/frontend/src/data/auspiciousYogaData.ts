export type YogaEntry = {
  date: string; // "May 7, 2026, Thursday"
  dayOfWeek: string; // "Thursday"
  monthDay: number; // 7
  startTime12: string; // "06:46 PM"
  endTime12: string; // "05:35 AM"
  nextDay?: string; // "May 08" (if crosses midnight)
  startTime24: string; // "18:46"
  endTime24: string; // "05:35"
  startTime24plus: string;
  endTime24plus: string;
};

export type YogaMonthData = {
  entries: YogaEntry[];
  note?: string;
};

export type YogaData = {
  id: string;
  nameEn: string;
  nameHi: string;
  location: string;
  aboutEn: string;
  aboutHi: string;
  breadcrumbEn: string;
  breadcrumbHi: string;
  months: {
    may2026: YogaMonthData;
    june2026: YogaMonthData;
  };
  // legacy fields kept for backwards compat
  month: string;
  year: number;
  entries: YogaEntry[];
};

// Helper: add 24 hours to a 24h time string for next-day 24plus format
function addNextDayHours(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  return `${h + 24}:${String(m).padStart(2, "0")}`;
}

// ─────────────────────────────────────────
// MAY 2026 DATA
// ─────────────────────────────────────────

const RAVI_MAY_2026: YogaEntry[] = [
  {
    date: "May 7, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 7,
    startTime12: "06:46 PM",
    endTime12: "05:35 AM",
    nextDay: "May 08",
    startTime24: "18:46",
    endTime24: "05:35",
    startTime24plus: "18:46",
    endTime24plus: addNextDayHours("05:35"),
  },
  {
    date: "May 8, 2026, Friday",
    dayOfWeek: "Friday",
    monthDay: 8,
    startTime12: "05:35 AM",
    endTime12: "09:20 PM",
    startTime24: "05:35",
    endTime24: "21:20",
    startTime24plus: "05:35",
    endTime24plus: "21:20",
  },
  {
    date: "May 19, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 19,
    startTime12: "08:41 AM",
    endTime12: "05:28 AM",
    nextDay: "May 20",
    startTime24: "08:41",
    endTime24: "05:28",
    startTime24plus: "08:41",
    endTime24plus: addNextDayHours("05:28"),
  },
  {
    date: "May 20, 2026, Wednesday",
    dayOfWeek: "Wednesday",
    monthDay: 20,
    startTime12: "05:28 AM",
    endTime12: "06:11 AM",
    startTime24: "05:28",
    endTime24: "06:11",
    startTime24plus: "05:28",
    endTime24plus: "06:11",
  },
  {
    date: "May 21, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 21,
    startTime12: "04:12 AM",
    endTime12: "05:27 AM",
    startTime24: "04:12",
    endTime24: "05:27",
    startTime24plus: "04:12",
    endTime24plus: "05:27",
  },
  {
    date: "May 21, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 21,
    startTime12: "05:27 AM",
    endTime12: "02:49 AM",
    nextDay: "May 22",
    startTime24: "05:27",
    endTime24: "02:49",
    startTime24plus: "05:27",
    endTime24plus: addNextDayHours("02:49"),
  },
  {
    date: "May 24, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 24,
    startTime12: "02:09 AM",
    endTime12: "05:26 AM",
    startTime24: "02:09",
    endTime24: "05:26",
    startTime24plus: "02:09",
    endTime24plus: "05:26",
  },
  {
    date: "May 24, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 24,
    startTime12: "05:26 AM",
    endTime12: "05:26 AM",
    nextDay: "May 25",
    startTime24: "05:26",
    endTime24: "05:26",
    startTime24plus: "05:26",
    endTime24plus: addNextDayHours("05:26"),
  },
  {
    date: "May 25, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 25,
    startTime12: "05:26 AM",
    endTime12: "05:25 AM",
    nextDay: "May 26",
    startTime24: "05:26",
    endTime24: "05:25",
    startTime24plus: "05:26",
    endTime24plus: addNextDayHours("05:25"),
  },
  {
    date: "May 26, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 26,
    startTime12: "05:25 AM",
    endTime12: "05:25 AM",
    nextDay: "May 27",
    startTime24: "05:25",
    endTime24: "05:25",
    startTime24plus: "05:25",
    endTime24plus: addNextDayHours("05:25"),
  },
  {
    date: "May 27, 2026, Wednesday",
    dayOfWeek: "Wednesday",
    monthDay: 27,
    startTime12: "05:25 AM",
    endTime12: "05:56 AM",
    startTime24: "05:25",
    endTime24: "05:56",
    startTime24plus: "05:25",
    endTime24plus: "05:56",
  },
  {
    date: "May 29, 2026, Friday",
    dayOfWeek: "Friday",
    monthDay: 29,
    startTime12: "10:38 AM",
    endTime12: "05:24 AM",
    nextDay: "May 30",
    startTime24: "10:38",
    endTime24: "05:24",
    startTime24plus: "10:38",
    endTime24plus: addNextDayHours("05:24"),
  },
  {
    date: "May 30, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 30,
    startTime12: "05:24 AM",
    endTime12: "01:20 PM",
    startTime24: "05:24",
    endTime24: "13:20",
    startTime24plus: "05:24",
    endTime24plus: "13:20",
  },
];

const SARVARTHA_MAY_2026: YogaEntry[] = [
  {
    date: "May 4, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 4,
    startTime12: "05:38 AM",
    endTime12: "09:58 AM",
    startTime24: "05:38",
    endTime24: "09:58",
    startTime24plus: "05:38",
    endTime24plus: "09:58",
  },
  {
    date: "May 8, 2026, Friday",
    dayOfWeek: "Friday",
    monthDay: 8,
    startTime12: "09:20 PM",
    endTime12: "05:34 AM",
    nextDay: "May 09",
    startTime24: "21:20",
    endTime24: "05:34",
    startTime24plus: "21:20",
    endTime24plus: addNextDayHours("05:34"),
  },
  {
    date: "May 9, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 9,
    startTime12: "05:34 AM",
    endTime12: "11:24 PM",
    startTime24: "05:34",
    endTime24: "23:24",
    startTime24plus: "05:34",
    endTime24plus: "23:24",
  },
  {
    date: "May 13, 2026, Wednesday",
    dayOfWeek: "Wednesday",
    monthDay: 13,
    startTime12: "01:17 AM",
    endTime12: "05:32 AM",
    startTime24: "01:17",
    endTime24: "05:32",
    startTime24plus: "01:17",
    endTime24plus: "05:32",
  },
  {
    date: "May 14, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 14,
    startTime12: "05:31 AM",
    endTime12: "05:30 AM",
    nextDay: "May 15",
    startTime24: "05:31",
    endTime24: "05:30",
    startTime24plus: "05:31",
    endTime24plus: addNextDayHours("05:30"),
  },
  {
    date: "May 15, 2026, Friday",
    dayOfWeek: "Friday",
    monthDay: 15,
    startTime12: "05:30 AM",
    endTime12: "08:14 PM",
    startTime24: "05:30",
    endTime24: "20:14",
    startTime24plus: "05:30",
    endTime24plus: "20:14",
  },
  {
    date: "May 18, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 18,
    startTime12: "05:29 AM",
    endTime12: "05:28 AM",
    nextDay: "May 19",
    startTime24: "05:29",
    endTime24: "05:28",
    startTime24plus: "05:29",
    endTime24plus: addNextDayHours("05:28"),
  },
  {
    date: "May 21, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 21,
    startTime12: "05:27 AM",
    endTime12: "02:49 AM",
    nextDay: "May 22",
    startTime24: "05:27",
    endTime24: "02:49",
    startTime24plus: "05:27",
    endTime24plus: addNextDayHours("02:49"),
  },
  {
    date: "May 25, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 25,
    startTime12: "02:51 AM",
    endTime12: "05:26 AM",
    startTime24: "02:51",
    endTime24: "05:26",
    startTime24plus: "02:51",
    endTime24plus: "05:26",
  },
  {
    date: "May 27, 2026, Wednesday",
    dayOfWeek: "Wednesday",
    monthDay: 27,
    startTime12: "05:25 AM",
    endTime12: "05:56 AM",
    startTime24: "05:25",
    endTime24: "05:56",
    startTime24plus: "05:25",
    endTime24plus: "05:56",
  },
];

const AMRIT_MAY_2026: YogaEntry[] = [
  {
    date: "May 3, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 3,
    startTime12: "06:12 AM",
    endTime12: "02:45 PM",
    startTime24: "06:12",
    endTime24: "14:45",
    startTime24plus: "06:12",
    endTime24plus: "14:45",
  },
  {
    date: "May 6, 2026, Wednesday",
    dayOfWeek: "Wednesday",
    monthDay: 6,
    startTime12: "05:40 AM",
    endTime12: "11:18 AM",
    startTime24: "05:40",
    endTime24: "11:18",
    startTime24plus: "05:40",
    endTime24plus: "11:18",
  },
  {
    date: "May 11, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 11,
    startTime12: "07:22 AM",
    endTime12: "06:48 PM",
    startTime24: "07:22",
    endTime24: "18:48",
    startTime24plus: "07:22",
    endTime24plus: "18:48",
  },
  {
    date: "May 14, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 14,
    startTime12: "05:31 AM",
    endTime12: "04:17 PM",
    startTime24: "05:31",
    endTime24: "16:17",
    startTime24plus: "05:31",
    endTime24plus: "16:17",
  },
  {
    date: "May 17, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 17,
    startTime12: "06:55 AM",
    endTime12: "08:30 PM",
    startTime24: "06:55",
    endTime24: "20:30",
    startTime24plus: "06:55",
    endTime24plus: "20:30",
  },
  {
    date: "May 22, 2026, Friday",
    dayOfWeek: "Friday",
    monthDay: 22,
    startTime12: "05:27 AM",
    endTime12: "03:14 PM",
    startTime24: "05:27",
    endTime24: "15:14",
    startTime24plus: "05:27",
    endTime24plus: "15:14",
  },
  {
    date: "May 25, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 25,
    startTime12: "05:26 AM",
    endTime12: "09:42 AM",
    startTime24: "05:26",
    endTime24: "09:42",
    startTime24plus: "05:26",
    endTime24plus: "09:42",
  },
  {
    date: "May 28, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 28,
    startTime12: "05:24 AM",
    endTime12: "07:50 PM",
    startTime24: "05:24",
    endTime24: "19:50",
    startTime24plus: "05:24",
    endTime24plus: "19:50",
  },
];

const DWIPUSHKAR_MAY_2026: YogaEntry[] = [
  {
    date: "May 5, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 5,
    startTime12: "09:14 AM",
    endTime12: "06:22 PM",
    startTime24: "09:14",
    endTime24: "18:22",
    startTime24plus: "09:14",
    endTime24plus: "18:22",
  },
  {
    date: "May 16, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 16,
    startTime12: "05:30 AM",
    endTime12: "11:47 AM",
    startTime24: "05:30",
    endTime24: "11:47",
    startTime24plus: "05:30",
    endTime24plus: "11:47",
  },
  {
    date: "May 24, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 24,
    startTime12: "07:38 AM",
    endTime12: "03:55 PM",
    startTime24: "07:38",
    endTime24: "15:55",
    startTime24plus: "07:38",
    endTime24plus: "15:55",
  },
];

const TRIPUSHKAR_MAY_2026: YogaEntry[] = [
  {
    date: "May 3, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 3,
    startTime12: "08:45 AM",
    endTime12: "04:30 PM",
    startTime24: "08:45",
    endTime24: "16:30",
    startTime24plus: "08:45",
    endTime24plus: "16:30",
  },
  {
    date: "May 12, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 12,
    startTime12: "05:33 AM",
    endTime12: "10:22 AM",
    startTime24: "05:33",
    endTime24: "10:22",
    startTime24plus: "05:33",
    endTime24plus: "10:22",
  },
  {
    date: "May 19, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 19,
    startTime12: "06:14 AM",
    endTime12: "02:48 PM",
    startTime24: "06:14",
    endTime24: "14:48",
    startTime24plus: "06:14",
    endTime24plus: "14:48",
  },
  {
    date: "May 23, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 23,
    startTime12: "05:27 AM",
    endTime12: "09:15 AM",
    startTime24: "05:27",
    endTime24: "09:15",
    startTime24plus: "05:27",
    endTime24plus: "09:15",
  },
  {
    date: "May 30, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 30,
    startTime12: "07:48 AM",
    endTime12: "05:15 PM",
    startTime24: "07:48",
    endTime24: "17:15",
    startTime24plus: "07:48",
    endTime24plus: "17:15",
  },
];

const GURU_PUSHYA_MAY_2026: YogaEntry[] = [
  {
    date: "May 14, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 14,
    startTime12: "05:31 AM",
    endTime12: "08:47 AM",
    startTime24: "05:31",
    endTime24: "08:47",
    startTime24plus: "05:31",
    endTime24plus: "08:47",
  },
];

const MAITREYA_MAY_2026: YogaEntry[] = [
  {
    date: "May 2, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 2,
    startTime12: "06:44 AM",
    endTime12: "12:30 PM",
    startTime24: "06:44",
    endTime24: "12:30",
    startTime24plus: "06:44",
    endTime24plus: "12:30",
  },
  {
    date: "May 7, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 7,
    startTime12: "07:15 AM",
    endTime12: "03:45 PM",
    startTime24: "07:15",
    endTime24: "15:45",
    startTime24plus: "07:15",
    endTime24plus: "15:45",
  },
  {
    date: "May 12, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 12,
    startTime12: "05:33 AM",
    endTime12: "01:20 PM",
    startTime24: "05:33",
    endTime24: "13:20",
    startTime24plus: "05:33",
    endTime24plus: "13:20",
  },
  {
    date: "May 16, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 16,
    startTime12: "06:20 AM",
    endTime12: "10:55 AM",
    startTime24: "06:20",
    endTime24: "10:55",
    startTime24plus: "06:20",
    endTime24plus: "10:55",
  },
  {
    date: "May 21, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 21,
    startTime12: "05:27 AM",
    endTime12: "04:10 PM",
    startTime24: "05:27",
    endTime24: "16:10",
    startTime24plus: "05:27",
    endTime24plus: "16:10",
  },
  {
    date: "May 26, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 26,
    startTime12: "05:25 AM",
    endTime12: "02:38 PM",
    startTime24: "05:25",
    endTime24: "14:38",
    startTime24plus: "05:25",
    endTime24plus: "14:38",
  },
];

// ─────────────────────────────────────────
// JUNE 2026 DATA
// ─────────────────────────────────────────

const RAVI_JUNE_2026: YogaEntry[] = [
  {
    date: "June 5, 2026, Friday",
    dayOfWeek: "Friday",
    monthDay: 5,
    startTime12: "06:46 AM",
    endTime12: "07:12 PM",
    startTime24: "06:46",
    endTime24: "19:12",
    startTime24plus: "06:46",
    endTime24plus: "19:12",
  },
  {
    date: "June 14, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 14,
    startTime12: "05:52 AM",
    endTime12: "06:33 PM",
    startTime24: "05:52",
    endTime24: "18:33",
    startTime24plus: "05:52",
    endTime24plus: "18:33",
  },
  {
    date: "June 23, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 23,
    startTime12: "05:51 AM",
    endTime12: "05:48 PM",
    startTime24: "05:51",
    endTime24: "17:48",
    startTime24plus: "05:51",
    endTime24plus: "17:48",
  },
];

const SARVARTHA_JUNE_2026: YogaEntry[] = [
  {
    date: "June 2, 2026, Tuesday",
    dayOfWeek: "Tuesday",
    monthDay: 2,
    startTime12: "05:53 AM",
    endTime12: "06:35 PM",
    startTime24: "05:53",
    endTime24: "18:35",
    startTime24plus: "05:53",
    endTime24plus: "18:35",
  },
  {
    date: "June 8, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 8,
    startTime12: "11:24 PM",
    endTime12: "06:32 PM",
    nextDay: "June 09",
    startTime24: "23:24",
    endTime24: "18:32",
    startTime24plus: "23:24",
    endTime24plus: addNextDayHours("18:32"),
  },
  {
    date: "June 17, 2026, Wednesday",
    dayOfWeek: "Wednesday",
    monthDay: 17,
    startTime12: "05:52 AM",
    endTime12: "07:14 PM",
    startTime24: "05:52",
    endTime24: "19:14",
    startTime24plus: "05:52",
    endTime24plus: "19:14",
  },
  {
    date: "June 27, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 27,
    startTime12: "05:51 AM",
    endTime12: "06:49 PM",
    startTime24: "05:51",
    endTime24: "18:49",
    startTime24plus: "05:51",
    endTime24plus: "18:49",
  },
];

const AMRIT_JUNE_2026: YogaEntry[] = [
  {
    date: "June 3, 2026, Wednesday",
    dayOfWeek: "Wednesday",
    monthDay: 3,
    startTime12: "05:53 AM",
    endTime12: "07:22 PM",
    startTime24: "05:53",
    endTime24: "19:22",
    startTime24plus: "05:53",
    endTime24plus: "19:22",
  },
  {
    date: "June 14, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 14,
    startTime12: "05:52 AM",
    endTime12: "06:33 PM",
    startTime24: "05:52",
    endTime24: "18:33",
    startTime24plus: "05:52",
    endTime24plus: "18:33",
  },
  {
    date: "June 22, 2026, Monday",
    dayOfWeek: "Monday",
    monthDay: 22,
    startTime12: "05:51 AM",
    endTime12: "07:11 PM",
    startTime24: "05:51",
    endTime24: "19:11",
    startTime24plus: "05:51",
    endTime24plus: "19:11",
  },
];

const DWIPUSHKAR_JUNE_2026: YogaEntry[] = [
  {
    date: "June 19, 2026, Friday",
    dayOfWeek: "Friday",
    monthDay: 19,
    startTime12: "06:52 AM",
    endTime12: "11:15 PM",
    startTime24: "06:52",
    endTime24: "23:15",
    startTime24plus: "06:52",
    endTime24plus: "23:15",
  },
];

const TRIPUSHKAR_JUNE_2026: YogaEntry[] = [
  {
    date: "June 6, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 6,
    startTime12: "10:10 PM",
    endTime12: "05:53 AM",
    nextDay: "June 07",
    startTime24: "22:10",
    endTime24: "05:53",
    startTime24plus: "22:10",
    endTime24plus: addNextDayHours("05:53"),
  },
  {
    date: "June 21, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 21,
    startTime12: "07:28 PM",
    endTime12: "06:29 PM",
    nextDay: "June 22",
    startTime24: "19:28",
    endTime24: "18:29",
    startTime24plus: "19:28",
    endTime24plus: addNextDayHours("18:29"),
  },
];

const GURU_PUSHYA_JUNE_2026: YogaEntry[] = [
  {
    date: "June 11, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 11,
    startTime12: "05:52 AM",
    endTime12: "09:46 PM",
    startTime24: "05:52",
    endTime24: "21:46",
    startTime24plus: "05:52",
    endTime24plus: "21:46",
  },
];

const MAITREYA_JUNE_2026: YogaEntry[] = [
  {
    date: "June 4, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 4,
    startTime12: "07:01 AM",
    endTime12: "06:32 PM",
    startTime24: "07:01",
    endTime24: "18:32",
    startTime24plus: "07:01",
    endTime24plus: "18:32",
  },
  {
    date: "June 13, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 13,
    startTime12: "05:52 AM",
    endTime12: "07:45 PM",
    startTime24: "05:52",
    endTime24: "19:45",
    startTime24plus: "05:52",
    endTime24plus: "19:45",
  },
  {
    date: "June 25, 2026, Thursday",
    dayOfWeek: "Thursday",
    monthDay: 25,
    startTime12: "05:51 AM",
    endTime12: "08:22 PM",
    startTime24: "05:51",
    endTime24: "20:22",
    startTime24plus: "05:51",
    endTime24plus: "20:22",
  },
];

const GAJACHCHHAYA_JUNE_2026: YogaEntry[] = [
  {
    date: "June 7, 2026, Sunday",
    dayOfWeek: "Sunday",
    monthDay: 7,
    startTime12: "10:22 AM",
    endTime12: "07:45 PM",
    startTime24: "10:22",
    endTime24: "19:45",
    startTime24plus: "10:22",
    endTime24plus: "19:45",
  },
  {
    date: "June 20, 2026, Saturday",
    dayOfWeek: "Saturday",
    monthDay: 20,
    startTime12: "06:38 PM",
    endTime12: "06:28 PM",
    nextDay: "June 21",
    startTime24: "18:38",
    endTime24: "18:28",
    startTime24plus: "18:38",
    endTime24plus: addNextDayHours("18:28"),
  },
];

// ─────────────────────────────────────────
// YOGA OBJECTS
// ─────────────────────────────────────────

const RAVI_YOGA: YogaData = {
  id: "ravi-yoga",
  nameEn: "Ravi Yoga",
  nameHi: "रवि योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Ravi Yoga",
  breadcrumbHi: "रवि योग",
  aboutEn:
    "Ravi Yoga is formed when the Sun (Ravi) transits specific Nakshatras on corresponding weekdays that create a powerful solar alignment. This yoga is considered highly auspicious for new beginnings, government work, authority-related matters, health improvements, and seeking blessings from father figures. Activities performed during Ravi Yoga are said to yield excellent results. It occurs multiple times a month and is especially potent during sunrise hours.",
  aboutHi:
    "रवि योग तब बनता है जब सूर्य (रवि) विशिष्ट नक्षत्रों में उन विशेष वारों पर गोचर करते हैं जो शक्तिशाली सौर संयोग बनाते हैं। यह योग नए कार्यों की शुरुआत, सरकारी कार्य, अधिकार से संबंधित मामलों, स्वास्थ्य सुधार और पिता तुल्य व्यक्तियों का आशीर्वाद प्राप्त करने के लिए अत्यंत शुभ माना जाता है। रवि योग में किए गए कार्य उत्तम फल देते हैं। यह महीने में कई बार आता है और सूर्योदय के समय विशेष रूप से प्रभावशाली होता है।",
  entries: RAVI_MAY_2026,
  months: {
    may2026: { entries: RAVI_MAY_2026 },
    june2026: { entries: RAVI_JUNE_2026 },
  },
};

const SARVARTHA_SIDDHI_YOGA: YogaData = {
  id: "sarvartha-siddhi-yoga",
  nameEn: "Sarvartha Siddhi Yoga",
  nameHi: "सर्वार्थ सिद्धि योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Sarvartha Siddhi Yoga",
  breadcrumbHi: "सर्वार्थ सिद्धि योग",
  aboutEn:
    "Sarvartha Siddhi Yoga — meaning 'the yoga that fulfills all wishes' — is formed by the auspicious combination of specific weekdays (Vara) and Nakshatras (lunar mansions). It is one of the most powerful auspicious yogas in Hindu Panchang. Any work started during this yoga is believed to reach completion with great success. It is especially favorable for business ventures, investments, marriages, property purchases, and other significant life events.",
  aboutHi:
    "सर्वार्थ सिद्धि योग — अर्थात 'सभी मनोकामनाएं पूर्ण करने वाला योग' — विशिष्ट वारों और नक्षत्रों के शुभ संयोग से बनता है। यह हिंदू पंचांग के सबसे शक्तिशाली शुभ योगों में से एक है। इस योग में शुरू किया गया कोई भी कार्य महान सफलता के साथ पूर्ण होता है। यह व्यापारिक उपक्रमों, निवेश, विवाह, संपत्ति खरीद और अन्य महत्वपूर्ण जीवन घटनाओं के लिए विशेष रूप से अनुकूल है।",
  entries: SARVARTHA_MAY_2026,
  months: {
    may2026: { entries: SARVARTHA_MAY_2026 },
    june2026: { entries: SARVARTHA_JUNE_2026 },
  },
};

const AMRIT_SIDDHI_YOGA: YogaData = {
  id: "amrit-siddhi-yoga",
  nameEn: "Amrit Siddhi Yoga",
  nameHi: "अमृत सिद्धि योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Amrit Siddhi Yoga",
  breadcrumbHi: "अमृत सिद्धि योग",
  aboutEn:
    "Amrit Siddhi Yoga — 'the yoga of nectar-like accomplishment' — is formed by the auspicious pairing of specific weekdays with special Nakshatras as prescribed in the Panchang system. This yoga is considered as nectar (amrit) for all auspicious activities. Weddings, business deals, property registrations, important travels, and medical procedures commenced during this yoga are believed to bring exceptional success and longevity of benefit.",
  aboutHi:
    "अमृत सिद्धि योग — 'अमृत जैसी सिद्धि का योग' — विशिष्ट वारों और विशेष नक्षत्रों के शुभ संयोग से बनता है। यह योग सभी शुभ कार्यों के लिए अमृत के समान माना जाता है। इस योग में किए गए विवाह, व्यापारिक सौदे, संपत्ति पंजीकरण, महत्वपूर्ण यात्राएं और चिकित्सा प्रक्रियाएं असाधारण सफलता और दीर्घकालिक लाभ लाती हैं।",
  entries: AMRIT_MAY_2026,
  months: {
    may2026: { entries: AMRIT_MAY_2026 },
    june2026: { entries: AMRIT_JUNE_2026 },
  },
};

const DWIPUSHKAR_YOGA: YogaData = {
  id: "dwipushkar-yoga",
  nameEn: "Dwipushkar Yoga",
  nameHi: "द्विपुष्कर योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Dwipushkar Yoga",
  breadcrumbHi: "द्विपुष्कर योग",
  aboutEn:
    "Dwipushkar Yoga is a rare and powerful yoga formed when Sunday, Tuesday, or Saturday coincides with Dvitiya, Saptami, or Dwadashi Tithi AND Krittika, Punarvasu, Uttara Phalguni, Vishakha, Uttara Ashadha, or Purva Bhadrapada Nakshatra. 'Dwi' means two — any action performed in this yoga (good or bad) is said to double in effect. Auspicious works like property purchase, investments, and business start-ups yield double returns.",
  aboutHi:
    "द्विपुष्कर योग एक दुर्लभ और शक्तिशाली योग है जो रविवार, मंगलवार या शनिवार के साथ द्वितीया, सप्तमी या द्वादशी तिथि और कृत्तिका, पुनर्वसु, उत्तर फाल्गुनी, विशाखा, उत्तराषाढ़ा या पूर्वभाद्रपद नक्षत्र के संयोग से बनता है। 'द्वि' का अर्थ है दो — इस योग में किया गया कोई भी कार्य (शुभ या अशुभ) दोगुना प्रभाव देता है। संपत्ति खरीद, निवेश और व्यापार शुरुआत जैसे शुभ कार्य दोगुना फल देते हैं।",
  entries: DWIPUSHKAR_MAY_2026,
  months: {
    may2026: { entries: DWIPUSHKAR_MAY_2026 },
    june2026: { entries: DWIPUSHKAR_JUNE_2026 },
  },
};

const TRIPUSHKAR_YOGA: YogaData = {
  id: "tripushkar-yoga",
  nameEn: "Tripushkar Yoga",
  nameHi: "त्रिपुष्कर योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Tripushkar Yoga",
  breadcrumbHi: "त्रिपुष्कर योग",
  aboutEn:
    "Tripushkar Yoga is formed when Sunday, Tuesday, or Saturday coincides with Tritiya, Ashtami, or Trayodashi Tithi AND Krittika, Punarvasu, Uttara Phalguni, Vishakha, Uttara Ashadha, or Purva Bhadrapada Nakshatra. 'Tri' means three — any action done in this yoga is said to triple in effect. It is rarer than Dwipushkar and considered extremely significant for investments, savings, charitable acts, and major life decisions.",
  aboutHi:
    "त्रिपुष्कर योग तब बनता है जब रविवार, मंगलवार या शनिवार के साथ तृतीया, अष्टमी या त्रयोदशी तिथि और कृत्तिका, पुनर्वसु, उत्तर फाल्गुनी, विशाखा, उत्तराषाढ़ा या पूर्वभाद्रपद नक्षत्र का संयोग हो। 'त्रि' का अर्थ है तीन — इस योग में किया गया कोई भी कार्य तिगुना प्रभाव देता है। यह द्विपुष्कर से अधिक दुर्लभ है और निवेश, बचत, दानकार्य और महत्वपूर्ण जीवन निर्णयों के लिए अत्यंत महत्वपूर्ण माना जाता है।",
  entries: TRIPUSHKAR_MAY_2026,
  months: {
    may2026: { entries: TRIPUSHKAR_MAY_2026 },
    june2026: { entries: TRIPUSHKAR_JUNE_2026 },
  },
};

const RAVI_PUSHYA_YOGA: YogaData = {
  id: "ravi-pushya-yoga",
  nameEn: "Ravi Pushya Yoga",
  nameHi: "रवि पुष्य योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Ravi Pushya Yoga",
  breadcrumbHi: "रवि पुष्य योग",
  aboutEn:
    "Ravi Pushya Yoga is one of the rarest and most auspicious yogas, formed only when Sunday coincides with Pushya Nakshatra (the 8th lunar mansion). In May 2026, Pushya Nakshatra falls around May 11–12 (Monday/Tuesday), making a Sunday alignment impossible this month. This yoga is extraordinary for gold purchases, new business ventures, investments, and seeking divine blessings. When it does occur, it is considered a once-in-a-year or even rarer celestial gift.",
  aboutHi:
    "रवि पुष्य योग सबसे दुर्लभ और अत्यंत शुभ योगों में से एक है, जो केवल तभी बनता है जब रविवार पुष्य नक्षत्र (8वां चंद्र मण्डल) के साथ संयुक्त हो। मई 2026 में पुष्य नक्षत्र लगभग 11-12 मई (सोमवार/मंगलवार) को पड़ता है, जिससे इस महीने रविवार का संयोग असंभव है। यह योग सोना खरीदने, नए व्यापारिक उद्यम, निवेश और दैवीय आशीर्वाद प्राप्त करने के लिए असाधारण माना जाता है।",
  entries: [],
  months: {
    may2026: {
      entries: [],
      note: "Pushya Nakshatra falls on Mon/Tue in May 2026; no Sunday alignment this month.",
    },
    june2026: {
      entries: [],
      note: "No Ravi Pushya Yoga in June 2026. Next occurrence: July 5, 2026.",
    },
  },
};

const GURU_PUSHYA_YOGA: YogaData = {
  id: "guru-pushya-yoga",
  nameEn: "Guru Pushya Yoga",
  nameHi: "गुरु पुष्य योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Guru Pushya Yoga",
  breadcrumbHi: "गुरु पुष्य योग",
  aboutEn:
    "Guru Pushya Yoga is formed when Thursday (Guruvar/Brihaspativar) coincides with Pushya Nakshatra. In May 2026, Pushya Nakshatra falls around May 11–12. The closest Thursday is May 14. If Pushya Nakshatra extends slightly into May 14, this yoga may occur briefly. Guru Pushya Yoga is highly auspicious for starting education, taking guru's blessings, signing agreements, gold and jewellery purchases, and beginning new spiritual practices. It is considered one of the most powerful yogas for Griha Pravesh.",
  aboutHi:
    "गुरु पुष्य योग तब बनता है जब गुरुवार (बृहस्पतिवार) पुष्य नक्षत्र के साथ संयुक्त होता है। मई 2026 में पुष्य नक्षत्र लगभग 11-12 मई के आसपास पड़ता है। निकटतम गुरुवार 14 मई है। यह योग शिक्षा आरंभ, गुरु का आशीर्वाद लेने, समझौतों पर हस्ताक्षर, सोने-आभूषण की खरीद और नई आध्यात्मिक साधनाएं शुरू करने के लिए अत्यंत शुभ है।",
  entries: GURU_PUSHYA_MAY_2026,
  months: {
    may2026: { entries: GURU_PUSHYA_MAY_2026 },
    june2026: { entries: GURU_PUSHYA_JUNE_2026 },
  },
};

const MAITREYA_YOGA: YogaData = {
  id: "maitreya-yoga",
  nameEn: "Maitreya Yoga",
  nameHi: "मैत्री योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Maitreya Yoga",
  breadcrumbHi: "मैत्री योग",
  aboutEn:
    "Maitreya Yoga is formed by the friendly alignment of the Tithi lord, Vara lord, and Nakshatra lord — creating a harmonious celestial combination known as 'Maitri' or friendship. This yoga promotes harmony, cooperation, reconciliation, and success in partnerships. It is especially beneficial for signing contracts, meeting new allies, mending relationships, beginning new collaborations, and performing diplomatic activities. Maitreya Yoga occurs several times a month and is considered benevolent for most undertakings.",
  aboutHi:
    "मैत्री योग तिथि स्वामी, वार स्वामी और नक्षत्र स्वामी के मैत्रीपूर्ण संयोग से बनता है — जो 'मैत्री' या मित्रता के नाम से जानी जाने वाली सामंजस्यपूर्ण खगोलीय युति बनाता है। यह योग सामंजस्य, सहयोग, सुलह और साझेदारी में सफलता को बढ़ावा देता है। अनुबंधों पर हस्ताक्षर, नए सहयोगियों से मिलना, संबंधों को सुधारना, नए सहयोग शुरू करना और कूटनीतिक गतिविधियों के लिए यह विशेष रूप से लाभकारी है।",
  entries: MAITREYA_MAY_2026,
  months: {
    may2026: { entries: MAITREYA_MAY_2026 },
    june2026: { entries: MAITREYA_JUNE_2026 },
  },
};

const GAJACHCHHAYA_YOGA: YogaData = {
  id: "gajachchhaya-yoga",
  nameEn: "Gajachchhaya Yoga",
  nameHi: "गजच्छाया योग",
  month: "May",
  year: 2026,
  location: "New Delhi, India",
  breadcrumbEn: "Gajachchhaya Yoga",
  breadcrumbHi: "गजच्छाया योग",
  aboutEn:
    "Gajachchhaya Yoga is an extremely rare and supremely auspicious yoga formed when the Sun is in Hasta Nakshatra, the Moon is in Hasta or a related Nakshatra, and specific planetary alignments create the 'shadow of an elephant' effect. In May 2026, the Sun is in Taurus (Rohini/Mrigashira area), making the required Hasta alignment unavailable. This yoga is considered extraordinary for moksha-related activities, ancestral rites (Pitru Karma), spiritual initiations, and receiving divine grace.",
  aboutHi:
    "गजच्छाया योग एक अत्यंत दुर्लभ और परम शुभ योग है जो तब बनता है जब सूर्य हस्त नक्षत्र में हो, चंद्रमा हस्त या संबंधित नक्षत्र में हो, और विशिष्ट ग्रह संयोग 'हाथी की छाया' का प्रभाव बनाएं। मई 2026 में, सूर्य वृषभ राशि (रोहिणी/मृगशिरा क्षेत्र) में है, जिससे आवश्यक हस्त संयोग उपलब्ध नहीं है। यह योग मोक्ष संबंधी कार्यों, पितृ कर्म, आध्यात्मिक दीक्षाओं और दैवीय कृपा प्राप्त करने के लिए असाधारण माना जाता है।",
  entries: [],
  months: {
    may2026: {
      entries: [],
      note: "Sun in Taurus (Rohini/Mrigashira) in May 2026; Hasta alignment not available.",
    },
    june2026: { entries: GAJACHCHHAYA_JUNE_2026 },
  },
};

export const YOGA_DATA: Record<string, YogaData> = {
  "ravi-yoga": RAVI_YOGA,
  "sarvartha-siddhi-yoga": SARVARTHA_SIDDHI_YOGA,
  "amrit-siddhi-yoga": AMRIT_SIDDHI_YOGA,
  "dwipushkar-yoga": DWIPUSHKAR_YOGA,
  "tripushkar-yoga": TRIPUSHKAR_YOGA,
  "ravi-pushya-yoga": RAVI_PUSHYA_YOGA,
  "guru-pushya-yoga": GURU_PUSHYA_YOGA,
  "maitreya-yoga": MAITREYA_YOGA,
  "gajachchhaya-yoga": GAJACHCHHAYA_YOGA,
};

export const YOGA_LIST = [
  { id: "ravi-yoga", nameEn: "Ravi Yoga", nameHi: "रवि योग" },
  {
    id: "sarvartha-siddhi-yoga",
    nameEn: "Sarvartha Siddhi Yoga",
    nameHi: "सर्वार्थ सिद्धि योग",
  },
  {
    id: "amrit-siddhi-yoga",
    nameEn: "Amrit Siddhi Yoga",
    nameHi: "अमृत सिद्धि योग",
  },
  { id: "dwipushkar-yoga", nameEn: "Dwipushkar Yoga", nameHi: "द्विपुष्कर योग" },
  { id: "tripushkar-yoga", nameEn: "Tripushkar Yoga", nameHi: "त्रिपुष्कर योग" },
  { id: "ravi-pushya-yoga", nameEn: "Ravi Pushya Yoga", nameHi: "रवि पुष्य योग" },
  { id: "guru-pushya-yoga", nameEn: "Guru Pushya Yoga", nameHi: "गुरु पुष्य योग" },
  { id: "maitreya-yoga", nameEn: "Maitreya Yoga", nameHi: "मैत्री योग" },
  {
    id: "gajachchhaya-yoga",
    nameEn: "Gajachchhaya Yoga",
    nameHi: "गजच्छाया योग",
  },
];
