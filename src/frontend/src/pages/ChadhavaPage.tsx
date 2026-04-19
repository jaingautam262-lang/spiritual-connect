import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Offering {
  id: number;
  temple: string;
  sevaTitle: string;
  benefit: string;
  location: string;
  dateKey: string;
  dateLabel: string;
  dayType:
    | "shukravar"
    | "shanivar"
    | "ravivar"
    | "somvar"
    | "mangalvar"
    | "budhvar"
    | "guruvar"
    | "amavasya"
    | "purnima"
    | "akshay";
  occasion: string;
  sevaItems: string[];
  videoUrl?: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const OFFERINGS: Offering[] = [
  {
    id: 1,
    temple: "Maa Bagalamukhi Mandir Haridwar",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Relief from Legal Problems & Enemies",
    location: "Maa Baglamukhi Temple, Haridwar",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "shukravar",
    occasion: "Shukravar Visesh",
    sevaItems: [
      "Haldi Chandan Seva",
      "Ghee Daan",
      "Haldi Shringar Seva",
      "Bagalamukhi Chalisa Path",
    ],
    videoUrl: "",
  },
  {
    id: 2,
    temple: "Adi Mahalaxmi Kashi",
    sevaTitle: "Visesh Daan Seva",
    benefit:
      "Receive Adi Mahalaxmi grace for wealth and removal of financial obstacles",
    location: "Shri Adi Mahalaxmi Mandir, Kashi",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "shukravar",
    occasion: "Shukravar Visesh",
    sevaItems: ["Kamal Daan", "Hansa Seva", "Paan Arpan", "Ghee Daan"],
    videoUrl: "",
  },
  {
    id: 3,
    temple: "Varahi Mata Uttarakhand",
    sevaTitle: "Visesh Path & Daan Seva",
    benefit: "Puja For Getting Relief from Land Related Issues",
    location: "Varahi Devi Temple, Devidhura",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "shukravar",
    occasion: "Shukravar Visesh",
    sevaItems: [
      "Saree Daan",
      "Shringar Dala Daan",
      "Gulab Daan",
      "Chunri Daan",
    ],
    videoUrl: "",
  },
  {
    id: 4,
    temple: "Sukreshwar Mahadev Birbhum",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Wealth & Luxury",
    location: "Shri Sukreshwar Mahadev, Bakreshwar",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "shukravar",
    occasion: "Shukravar Visesh",
    sevaItems: ["Hansa Seva", "Dahi Arpan", "Payesh Bhog", "Doodh Arpan"],
    videoUrl: "",
  },
  {
    id: 5,
    temple: "Kamakhya Mandir Kashi",
    sevaTitle: "Vishesh Daan Seva",
    benefit: "Puja for Child Birth & Pregnancy Issues",
    location: "Kamakhya Temple, Varanasi",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "shukravar",
    occasion: "Shukravar Visesh",
    sevaItems: [
      "Kamakhya Stotra Path",
      "Mithai Daan",
      "Kheer Daan",
      "108 Jaba Mala Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 6,
    temple: "Sagarpur Gaushala",
    sevaTitle: "Karma Shudhi Visesh Tri Pashu Punya Daan Seva",
    benefit: "Attain divine blessings and prosperity through Gauseva",
    location: "Sagarpur Gaushala, West Bengal",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "amavasya",
    occasion: "Darsha Amavasya",
    sevaItems: ["Gau Seva", "Buffalo Seva", "Hansa Seva", "Matsya Seva"],
    videoUrl: "",
  },
  {
    id: 7,
    temple: "Kalighat Visesh Maa Kali",
    sevaTitle: "Vastra Daan Seva",
    benefit: "Blessing of Prosperity and Removal of Negative Energy",
    location: "Maa Kalighat Mandir, Kolkata",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "amavasya",
    occasion: "Darsha Amavasya",
    sevaItems: ["Benarasi Saree Daan", "Tant Saree Daan"],
    videoUrl: "",
  },
  {
    id: 8,
    temple: "Gaya Phalgu Ghat",
    sevaTitle: "Visesh Deep Daan Seva",
    benefit: "Liberation from Pitra Dosh and blessings of Ancestors",
    location: "Gaya Phalgu Ghat, Gaya",
    dateKey: "fri-apr-17",
    dateLabel: "Fri — Apr 17, 2026",
    dayType: "amavasya",
    occasion: "Darsha Amavasya",
    sevaItems: ["51 Diya Daan", "101 Deep Daan", "11 Deep Daan"],
    videoUrl: "",
  },
  {
    id: 9,
    temple: "Rahu Paithani Mandir Uttarakhand",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Relief from Rahu Dosh & Rahu Mahadasha",
    location: "Rahu Paithani Temple, Paithani",
    dateKey: "sat-apr-18",
    dateLabel: "Sat — Apr 18, 2026",
    dayType: "shanivar",
    occasion: "Shanivar Visesh",
    sevaItems: [
      "Buffalo Seva - Rahu Special",
      "Tel Daan",
      "Til & Pushpa Daan",
      "Nil Vastra- Rahu Shanti",
    ],
    videoUrl: "",
  },
  {
    id: 10,
    temple: "Navgraha Shani Mandir Ujjain",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Relief in Sadhesati and removal of obstacle in Career",
    location: "Navagraha Shani Mandir, Ujjain",
    dateKey: "sat-apr-18",
    dateLabel: "Sat — Apr 18, 2026",
    dayType: "shanivar",
    occasion: "Shanivar Visesh",
    sevaItems: [
      "Kale Ghoda Naal Daan",
      "Urad Daan",
      "Naag Daan",
      "Buffalo Seva",
    ],
    videoUrl: "",
  },
  {
    id: 11,
    temple: "Bhadrakali Mandir Durgakund",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Attain divine protection and overcome fear",
    location: "Bhadra Kali Temple Durgakund, Varanasi",
    dateKey: "sat-apr-18",
    dateLabel: "Sat — Apr 18, 2026",
    dayType: "shanivar",
    occasion: "Shanivar Visesh",
    sevaItems: [
      "Buffalo Seva",
      "Kalika Stotra Path",
      "108 Jaba Mala Arpan",
      "Chunri Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 12,
    temple: "Adi Kaal Bhairav Kashi",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Get Prosperity and Growth in your life",
    location: "Adi Kaal Bhairav, Varanasi",
    dateKey: "sun-apr-19",
    dateLabel: "Sun — Apr 19, 2026",
    dayType: "ravivar",
    occasion: "Ravivar Visesh",
    sevaItems: [
      "Panchamrit Arpan",
      "11 Aparajita Pushpa",
      "Til Daan",
      "Madira Chadhawa",
    ],
    videoUrl: "",
  },
  {
    id: 13,
    temple: "Batuk Bhairav Mandir Ujjain",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Graha Shanti",
    location: "Batuk Bhairav, Ujjain",
    dateKey: "sun-apr-19",
    dateLabel: "Sun — Apr 19, 2026",
    dayType: "ravivar",
    occasion: "Ravivar Visesh",
    sevaItems: [
      "Paan & Supari Daan",
      "Choumukhi Diya Daan",
      "Pushp Mala",
      "Panch Fal Daan",
    ],
    videoUrl: "",
  },
  {
    id: 14,
    temple: "Maa Matangi Mandir Haridwar",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Success in Competitive Exam",
    location: "Maa Matangi Mandir, Haridwar",
    dateKey: "sun-apr-19",
    dateLabel: "Sun — Apr 19, 2026",
    dayType: "ravivar",
    occasion: "Ravivar Visesh",
    sevaItems: [
      "Rajbhog Daan",
      "Wooden Parrot",
      "Hansa Seva",
      "White Vastra Daan",
    ],
    videoUrl: "",
  },
  {
    id: 15,
    temple: "Chintapurni Mandir Kangra",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Happiness & Prosperity",
    location: "Chintapurni Mandir, Kangra",
    dateKey: "sun-apr-19",
    dateLabel: "Sun — Apr 19, 2026",
    dayType: "ravivar",
    occasion: "Ravivar Visesh",
    sevaItems: ["Ghee Diya Daan", "Lal Sindoor Daan", "Jaba Phul Arpan"],
    videoUrl: "",
  },
  {
    id: 16,
    temple: "Mahalaxmi Temple Kolhapur",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Attain blessings of wealth and prosperity",
    location: "Mahalaxmi Temple, Kolhapur",
    dateKey: "sun-apr-19",
    dateLabel: "Sun — Apr 19, 2026",
    dayType: "akshay",
    occasion: "Akshay Tritiya",
    sevaItems: [
      "Keshar Jal",
      "Nariyal Daan",
      "Vastra Daan",
      "Sringar Dala Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 17,
    temple: "Mrityunjay Mahadev Mandir Kashi",
    sevaTitle: "Vishesh Path & Daan Seva",
    benefit: "Puja for Good Health & Long Life",
    location: "Mrityunjay Mahadev, Varanasi",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: [
      "Panchamrit Chadhawa",
      "Nandi Seva",
      "Akand Mala Arpan",
      "Shiva Ashtakam Path",
    ],
    videoUrl: "",
  },
  {
    id: 18,
    temple: "Ghrishneshwar Jyotirlinga Maharashtra",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Gain spiritual merit and Lord Shiva blessings",
    location: "Ghrishneshwar Jyotirlinga, Ghrishneshwar",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: [
      "Dhutra Phul Arpan",
      "Shiva Ashttotar Satanaam Path",
      "Nandi Seva - Somvar Special",
      "Shiva Sahashranaam Path",
    ],
    videoUrl: "",
  },
  {
    id: 19,
    temple: "Triyuginarayan Mandir Rudraprayag",
    sevaTitle: "Vishesh Daan Seva",
    benefit: "Puja for Happy Love Life & Relationship",
    location: "Sri Triyuginarayan Mandir, Rudraprayag",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: ["Bilwapatra Arpan", "Banana Daan", "Madhu Arpan", "Gulab Daan"],
    videoUrl: "",
  },
  {
    id: 20,
    temple: "Pashupatinath Mandir Haridwar",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Happy Marriage & Relationship",
    location: "Pashupatinath Mandir, Haridwar",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: ["Nariyal Daan", "Bhasma Daan", "Panch Phal Daan"],
    videoUrl: "",
  },
  {
    id: 21,
    temple: "Trimbakeshwar Jyotirlinga",
    sevaTitle: "Visesh Daan Seva",
    benefit: "To Get Rid off Kaalsarpa Dosh",
    location: "Trimbakeshwar Tirtha Kshetra, Trimbakeshwar",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: [
      "Vastra Daan",
      "Bilwa Patra Arpan",
      "Flower Basket Arpan",
      "Nandi Seva",
    ],
    videoUrl: "",
  },
  {
    id: 22,
    temple: "NagVasuki Mandir Prayagraj",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Wealth & Prosperity",
    location: "Nagvasuki Mandir, Prayagraj",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: [
      "Doodh Kala Daan - Nag Panchami Visesh",
      "Nag Nagin Daan",
      "Mithai Daan",
      "Lotus Daan",
    ],
    videoUrl: "",
  },
  {
    id: 23,
    temple: "Someshwar Mahadev Mandir Prayagraj",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Mental Peace & Mental Stability",
    location: "Someshwar Mahadev, Prayagraj",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: [
      "Bhang Arpan",
      "Bilwapatra & Dhutra Phul Arpan",
      "Dudh Arpan",
      "Peda Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 24,
    temple: "Bhimashankar Jyotirlinga",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Removing Obstacles",
    location: "Bhimashankar Jyotirlinga, Pune",
    dateKey: "mon-apr-20",
    dateLabel: "Mon — Apr 20, 2026",
    dayType: "somvar",
    occasion: "Somvar Visesh",
    sevaItems: [
      "Nandi Seva",
      "Ganne Ka Ras Arpan",
      "Bhasma Snan",
      "Dudh Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 25,
    temple: "Akalipur Guhya Kali",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Good Luck & Removal of Obstacles",
    location: "Akalipur Guhya Kali, Akalipur",
    dateKey: "tue-apr-21",
    dateLabel: "Tue — Apr 21, 2026",
    dayType: "mangalvar",
    occasion: "Mangalvar Visesh",
    sevaItems: [
      "Peda Daan",
      "Nar Narayan Seva",
      "51 Jaba Mala",
      "Sankha Sindur Alta Loha & Dhup Daan",
    ],
    videoUrl: "",
  },
  {
    id: 26,
    temple: "Gajlaxmi Temple Ujjain",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Get wealth and prosperity in your life",
    location: "Gaj Laxmi Mandir, Ujjain",
    dateKey: "tue-apr-21",
    dateLabel: "Tue — Apr 21, 2026",
    dayType: "mangalvar",
    occasion: "Mangalvar Visesh",
    sevaItems: [
      "White Lotus Daan",
      "Jasmine Oil",
      "Kheer Daan",
      "Gaja Murti Daan",
    ],
    videoUrl: "",
  },
  {
    id: 27,
    temple: "Bakreshwar Shaktipith",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Good Luck & Removal of Obstacles",
    location: "Bakreshwar Shaktipith, Bakreshwar",
    dateKey: "tue-apr-21",
    dateLabel: "Tue — Apr 21, 2026",
    dayType: "mangalvar",
    occasion: "Mangalvar Visesh",
    sevaItems: [
      "Chunri Daan",
      "Bhog Daan",
      "108 Jaba Mala",
      "Sindur Shankha Flower Dip Daan",
    ],
    videoUrl: "",
  },
  {
    id: 28,
    temple: "Shri Panchamukhi Hanuman Mandir",
    sevaTitle: "Visesh Path & Daan Seva",
    benefit: "Puja for Removal of Obstacles",
    location: "Panchamukhi Hanuman Mandir, Raipur",
    dateKey: "tue-apr-21",
    dateLabel: "Tue — Apr 21, 2026",
    dayType: "mangalvar",
    occasion: "Mangalvar Visesh",
    sevaItems: [
      "Boondi Laddoo Daan",
      "Chola & Gur Daan",
      "Panchamukhi Hanuman Chalisa Path",
      "Red Vastra Daan",
    ],
    videoUrl: "",
  },
  {
    id: 29,
    temple: "Hanumangarhi Ayodhya",
    sevaTitle: "Visesh Path Seva",
    benefit: "Removal of all obstacles and blessing of growth",
    location: "Hanuman Garhi Mandir, Ayodhya",
    dateKey: "tue-apr-21",
    dateLabel: "Tue — Apr 21, 2026",
    dayType: "mangalvar",
    occasion: "Mangalvar Visesh",
    sevaItems: [
      "Hanuman Chalisa Path",
      "Deep Daan",
      "Besan Ladoo Daan",
      "Sadhu Bhojan",
    ],
    videoUrl: "",
  },
  {
    id: 30,
    temple: "Shri Siddhivinayak Siddhatek Ashtavinayak",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Get Prosperity and Growth in your life",
    location: "Siddhivinayak Temple, Ahilyanagar",
    dateKey: "wed-apr-22",
    dateLabel: "Wed — Apr 22, 2026",
    dayType: "budhvar",
    occasion: "Budhvar Visesh",
    sevaItems: [
      "Laddu & Durva Daan - Akshay Tritiya Visesh",
      "Dudh Abhishek",
      "Modak & Durba",
      "Modak Daan",
    ],
    videoUrl: "",
  },
  {
    id: 31,
    temple: "Mayureshwar Ganpati Morgaon Ashtavinayak",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Removal of all obstacles Growth in Career",
    location: "Mayureshwar Ganapati Mandir, Morgaon",
    dateKey: "wed-apr-22",
    dateLabel: "Wed — Apr 22, 2026",
    dayType: "budhvar",
    occasion: "Budhvar Visesh",
    sevaItems: [
      "Modak & Durba Mala - Ganesh Jayanti Visesh",
      "Modak Daan",
      "Dudh Abhishek",
      "Modaak & Durva Daan",
    ],
    videoUrl: "",
  },
  {
    id: 32,
    temple: "Lalita Tripura Sundari Ujjain",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja to Gain Power Position & Respect in Society",
    location: "Lalita Tripura Sundari Mandir, Ujjain",
    dateKey: "wed-apr-22",
    dateLabel: "Wed — Apr 22, 2026",
    dayType: "budhvar",
    occasion: "Budhvar Visesh",
    sevaItems: [
      "Anna Daan",
      "Shodasi Yantra",
      "Fal & Mithai Arpan",
      "Ganna Daan",
    ],
    videoUrl: "",
  },
  {
    id: 33,
    temple: "Sri Chintamani Ganesh Kashi",
    sevaTitle: "Visesh Path & Daan Seva",
    benefit: "Puja for Removing Obstacles & Financial Prosperity",
    location: "Chintamani Ganesh, Kashi",
    dateKey: "wed-apr-22",
    dateLabel: "Wed — Apr 22, 2026",
    dayType: "budhvar",
    occasion: "Budhvar Visesh",
    sevaItems: [
      "Yellow Dhoti Daan",
      "Laddo Daan",
      "Durva Mala Daan",
      "Ganesh Chalisa Path",
    ],
    videoUrl: "",
  },
  {
    id: 34,
    temple: "Buddheshwar Mahadev Mandir Prayagraj",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Career Growth & Enhanced Intelligence",
    location: "Budheshwar Mandir, Prayagraj",
    dateKey: "wed-apr-22",
    dateLabel: "Wed — Apr 22, 2026",
    dayType: "budhvar",
    occasion: "Budhvar Visesh",
    sevaItems: [
      "Green Vastra Daan",
      "Doodh Dahi Arpan",
      "Green Moong Dal Arpan",
      "Bilwapatra & Dhutra Phul Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 35,
    temple: "Ucchista Ganpati Mandir Ujjain",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Getting Rid of Bad Habits",
    location: "Ucchista Ganpati Mandir, Ujjain",
    dateKey: "wed-apr-22",
    dateLabel: "Wed — Apr 22, 2026",
    dayType: "budhvar",
    occasion: "Budhvar Visesh",
    sevaItems: [
      "Madira Daan",
      "Laddoo Daan - Ganesh Chaturthi Special",
      "Sindoor & Lal Chandan Daan",
      "Kela Daan",
    ],
    videoUrl: "",
  },
  {
    id: 36,
    temple: "Tarapith Special Maa Tara",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Removal of Negative Energy and Blessing of Prosperity",
    location: "Tarapith Mandir, Birbhum",
    dateKey: "thu-apr-23",
    dateLabel: "Thu — Apr 23, 2026",
    dayType: "guruvar",
    occasion: "Guruvar Visesh",
    sevaItems: [
      "Tarapith Vastra Daan (Tant Saree)",
      "Aparajita Mala Daan",
      "Charan Paduka Daan",
      "108 Jabar Mala Daan",
    ],
    videoUrl: "",
  },
  {
    id: 37,
    temple: "Khatu Shyam Mandir Ujjain",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for overall Well-Being Peace & Prosperity",
    location: "Shri Khatu Shyam Mandir, Ujjain",
    dateKey: "thu-apr-23",
    dateLabel: "Thu — Apr 23, 2026",
    dayType: "guruvar",
    occasion: "Guruvar Visesh",
    sevaItems: [
      "Mayur Pankh Daan",
      "Gulab Arpan",
      "Ittar Arpan Seva",
      "Gulab Jal Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 38,
    temple: "Laxmi Narayan Mandir Jhansi",
    sevaTitle: "Puja for Wealth & Prosperity",
    benefit: "Receive blessings for wealth and prosperity",
    location: "Laxmi Narayan Mandir, Jhansi",
    dateKey: "thu-apr-23",
    dateLabel: "Thu — Apr 23, 2026",
    dayType: "guruvar",
    occasion: "Guruvar Visesh",
    sevaItems: [
      "Chunri Arpan",
      "Laxmi Stotra Path",
      "Nariyal Daan",
      "Gulab Arpan",
    ],
    videoUrl: "",
  },
  {
    id: 39,
    temple: "Brihaspateeshwar Temple Kashi",
    sevaTitle: "Puja Visesh Daan Seva",
    benefit: "Offer Bhet for Wealth Wisdom & Luck",
    location: "Brihaspateeshwar Mandir, Kashi",
    dateKey: "thu-apr-23",
    dateLabel: "Thu — Apr 23, 2026",
    dayType: "guruvar",
    occasion: "Guruvar Visesh",
    sevaItems: ["Haldi Mala Daan", "Matsya Seva", "Gur & Banana Daan"],
    videoUrl: "",
  },
  {
    id: 40,
    temple: "Narsingha Mandir Haridwar",
    sevaTitle: "Visesh Daan & Path Seva",
    benefit: "Puja for Protection & Victory",
    location: "Narsingha Mandir, Haridwar",
    dateKey: "thu-apr-23",
    dateLabel: "Thu — Apr 23, 2026",
    dayType: "guruvar",
    occasion: "Guruvar Visesh",
    sevaItems: [
      "Panakam (Sarbat) Arpan",
      "Misri Daan",
      "Matsya Seva",
      "Rabri Daan",
    ],
    videoUrl: "",
  },
  {
    id: 41,
    temple: "Deergh Vishnu Mandir",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Blessing for health wealth and spiritual enlightenment",
    location: "Dirgh Vishnu Mandir, Mathura",
    dateKey: "thu-apr-23",
    dateLabel: "Thu — Apr 23, 2026",
    dayType: "guruvar",
    occasion: "Guruvar Visesh",
    sevaItems: [
      "Kesar Dudh Seva",
      "Yellow Vastra Daan",
      "Mithai Daan",
      "56 Bhog Arpan Seva",
    ],
    videoUrl: "",
  },
  {
    id: 42,
    temple: "Haridwar Ganga Ghat",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Remove all Sins & Pitra Dosh",
    location: "Har Ki Paudi, Haridwar",
    dateKey: "fri-may-1",
    dateLabel: "Fri — May 1, 2026",
    dayType: "purnima",
    occasion: "Buddha Purnima",
    sevaItems: [
      "Deep Daan (Big Size)",
      "Gita Path",
      "Gau Seva",
      "Flower Basket",
    ],
    videoUrl: "",
  },
  {
    id: 43,
    temple: "Radha Damodar Mandir Vrindavan",
    sevaTitle: "Visesh Daan Seva",
    benefit: "Puja for Happy Relationship & Prosperity",
    location: "Radha Damodar Mandir, Vrindavan",
    dateKey: "sat-may-9",
    dateLabel: "Sat — May 9, 2026",
    dayType: "shanivar",
    occasion: "Masik Janmashtami",
    sevaItems: ["Gau Seva", "Gita Paath", "Khowa Rabri", "Lotus Daan"],
    videoUrl: "",
  },
];

// ─── Badge helpers ─────────────────────────────────────────────────────────────

const DAY_BADGE_STYLES: Record<string, string> = {
  shukravar: "bg-orange-100 text-orange-700 border-orange-200",
  shanivar: "bg-purple-100 text-purple-700 border-purple-200",
  ravivar: "bg-amber-100 text-amber-700 border-amber-200",
  somvar: "bg-blue-100 text-blue-700 border-blue-200",
  mangalvar: "bg-red-100 text-red-700 border-red-200",
  budhvar: "bg-green-100 text-green-700 border-green-200",
  guruvar: "bg-yellow-100 text-yellow-700 border-yellow-200",
  amavasya: "bg-slate-200 text-slate-700 border-slate-300",
  purnima: "bg-indigo-100 text-indigo-700 border-indigo-200",
  akshay: "bg-primary/10 text-primary border-primary/20",
};

const DAY_EMOJI: Record<string, string> = {
  shukravar: "🌸",
  shanivar: "🪐",
  ravivar: "☀️",
  somvar: "🌙",
  mangalvar: "🔴",
  budhvar: "💚",
  guruvar: "🙏",
  amavasya: "🌑",
  purnima: "🌕",
  akshay: "✨",
};

// ─── Group offerings by date ───────────────────────────────────────────────────

function groupByDate(offerings: Offering[]) {
  const map = new Map<
    string,
    { label: string; occasions: Set<string>; items: Offering[] }
  >();
  for (const o of offerings) {
    if (!map.has(o.dateKey)) {
      map.set(o.dateKey, {
        label: o.dateLabel,
        occasions: new Set(),
        items: [],
      });
    }
    const group = map.get(o.dateKey)!;
    group.occasions.add(o.occasion);
    group.items.push(o);
  }
  return Array.from(map.entries()).map(([key, val]) => ({ key, ...val }));
}

// ─── Offering Card ─────────────────────────────────────────────────────────────

function OfferingCard({
  offering,
  index,
}: {
  offering: Offering;
  index: number;
}) {
  const badgeClass = DAY_BADGE_STYLES[offering.dayType] ?? "";
  const emoji = DAY_EMOJI[offering.dayType] ?? "🙏";

  return (
    <Card
      data-ocid={`chadhava.item.${index + 1}`}
      className="group border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 bg-card overflow-hidden"
    >
      <CardContent className="p-0">
        {/* Top accent strip */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary/50" />

        <div className="p-4 flex flex-col gap-3">
          {/* Temple name + seva title */}
          <div>
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2">
              {offering.temple}{" "}
              <span className="text-muted-foreground font-normal">
                — Bhet Offering
              </span>
            </h3>
            <p className="text-xs text-primary font-medium mt-0.5">
              {offering.sevaTitle}
            </p>
          </div>

          {/* Benefit */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {offering.benefit}
          </p>

          {/* Location row */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground min-w-0">
            <span className="text-primary/60 shrink-0">🛕</span>
            <MapPin className="h-3 w-3 shrink-0 text-muted-foreground/60" />
            <span className="truncate">{offering.location}</span>
          </div>

          {/* Date + occasion badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {offering.dateLabel.split("—")[1]?.trim() ?? offering.dateLabel}
            </span>
            <Badge
              variant="outline"
              className={`text-xs px-2 py-0.5 border font-medium ${badgeClass}`}
            >
              {emoji} {offering.occasion}
            </Badge>
          </div>

          {/* Seva item pills */}
          <div className="flex flex-wrap gap-1.5">
            {offering.sevaItems.slice(0, 3).map((item) => (
              <span
                key={item}
                className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border truncate max-w-[150px]"
              >
                {item}
              </span>
            ))}
            {offering.sevaItems.length > 3 && (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                +{offering.sevaItems.length - 3} more
              </span>
            )}
          </div>

          {/* Live Darshan */}
          {offering.videoUrl ? (
            <a
              href={offering.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`chadhava.live_darshan_button.${index + 1}`}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all hover:opacity-80 w-fit"
              style={{
                borderColor: "oklch(0.60 0.22 25 / 0.5)",
                color: "oklch(0.55 0.22 25)",
                background: "oklch(0.60 0.22 25 / 0.07)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full animate-pulse shrink-0"
                style={{ background: "oklch(0.55 0.22 25)" }}
              />
              🔴 Live Darshan देखें / Watch
            </a>
          ) : (
            <p className="text-xs text-muted-foreground/60 italic">
              📺 Live Darshan जल्द आएगा / Coming Soon
            </p>
          )}

          {/* CTA */}
          <Button
            data-ocid={`chadhava.book_seva_button.${index + 1}`}
            size="sm"
            className="w-full mt-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm"
          >
            🙏 Book This Seva
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Date Group Header ─────────────────────────────────────────────────────────

function DateGroupHeader({
  label,
  occasions,
}: {
  label: string;
  occasions: Set<string>;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5 mt-10 first:mt-0">
      <h2 className="font-display text-lg font-bold text-foreground">
        {label}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {Array.from(occasions).map((occ) => (
          <span
            key={occ}
            className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-medium"
          >
            {occ}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Sacred Offerings", value: "40+" },
  { label: "Temples", value: "30+" },
  { label: "Days of Seva", value: "7" },
  { label: "Daily Blessings", value: "∞" },
];

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ChadhavaPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return OFFERINGS;
    return OFFERINGS.filter(
      (o) =>
        o.temple.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q) ||
        o.occasion.toLowerCase().includes(q) ||
        o.sevaItems.some((s) => s.toLowerCase().includes(q)) ||
        o.benefit.toLowerCase().includes(q),
    );
  }, [query]);

  const groups = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Decorative row */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-2xl">🪔</span>
            <span className="text-sm tracking-widest text-primary font-semibold uppercase">
              Sacred Seva
            </span>
            <span className="text-2xl">🪔</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Offer Divine Seva
            </span>
            <br />
            <span className="text-foreground">& Sacred Bhet</span>
          </h1>

          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8">
            Serve the divine through Gau Seva, Anna Daan, and temple offerings —
            earn blessings through selfless giving.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="chadhava.search_input"
              placeholder="Search by temple, location, occasion, or seva item..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-background border-border focus:border-primary/60 rounded-full h-11 text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats Bar ───────────────────────────────────────────────────────── */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2">
            {STATS.map((s, idx) => (
              <div key={s.label} className="flex items-center gap-2 text-sm">
                <span className="font-display font-bold text-primary text-lg leading-none">
                  {s.value}
                </span>
                <span className="text-muted-foreground">{s.label}</span>
                {idx < STATS.length - 1 && (
                  <span className="text-border hidden sm:inline">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Offerings Grid ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {groups.length === 0 ? (
          <div
            data-ocid="chadhava.empty_state"
            className="text-center py-20 flex flex-col items-center gap-4"
          >
            <span className="text-5xl">🙏</span>
            <h3 className="font-display text-xl font-semibold text-foreground">
              No offerings found
            </h3>
            <p className="text-muted-foreground max-w-sm text-sm">
              Try searching by temple name, city, occasion, or a seva item like
              "Ghee Daan" or "Gau Seva".
            </p>
            <Button
              data-ocid="chadhava.clear_search_button"
              variant="outline"
              onClick={() => setQuery("")}
              className="mt-2"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            {query && (
              <p className="text-sm text-muted-foreground mb-6">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filtered.length}
                </span>{" "}
                offering{filtered.length !== 1 ? "s" : ""} for &quot;
                <span className="text-primary">{query}</span>&quot;
              </p>
            )}

            {groups.map((group) => (
              <div
                key={group.key}
                data-ocid={`chadhava.date_group.${group.key}`}
              >
                <DateGroupHeader
                  label={group.label}
                  occasions={group.occasions}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {group.items.map((offering) => (
                    <OfferingCard
                      key={offering.id}
                      offering={offering}
                      index={OFFERINGS.indexOf(offering)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ── Footer CTA ──────────────────────────────────────────────────────── */}
      <div className="bg-muted/40 border-t border-border py-10 mt-4">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="font-display text-lg font-semibold text-foreground mb-2">
            🌸 Every Seva Counts
          </p>
          <p className="text-sm text-muted-foreground">
            Each offering is performed by trained priests at the temple on the
            specified date. Prasad and puja video are sent to your registered
            email after completion.
          </p>
        </div>
      </div>
    </div>
  );
}
