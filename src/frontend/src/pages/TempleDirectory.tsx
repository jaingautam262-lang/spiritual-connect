import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Building2, MapPin, Search, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { TEMPLES_DATA } from "../data/temples-data";
import { useGetAllTemples } from "../hooks/useQueries";

interface TempleItem {
  id: string;
  name: string;
  city: string;
  state: string;
  deity: string;
  tradition: "Hindu" | "Jain" | "Sikh";
  description: string;
  history: string;
  timings?: string;
  badge?: string; // e.g. "Jyotirlinga", "Char Dham", "Takht", "Panch Tirth"
}

const SEED_TEMPLES: TempleItem[] = [
  // ── EXISTING HINDU ──────────────────────────────────────────────────────────
  {
    id: "temple-1",
    name: "Kashi Vishwanath Temple",
    city: "Varanasi",
    state: "Uttar Pradesh",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "One of the most sacred temples of Lord Shiva, situated on the western bank of the holy River Ganga.",
    history:
      "The Kashi Vishwanath Temple is one of the twelve Jyotirlingas, considered the holiest of all shrines dedicated to Lord Shiva. The original temple was destroyed by Mughal ruler Aurangzeb in 1669 and a mosque was built on its ruins. The present temple was built in 1780 by Maratha monarch Ahilyabai Holkar. The temple stands on the western bank of the holy river Ganga, and is made up of a series of smaller shrines. The main deity, Shivalingam, is 60 cm tall and 90 cm in circumference, and is housed in a silver altar. The temple is visited by thousands of devotees daily, and it is believed that a pilgrimage to Kashi and a darshan of Lord Vishwanath ensures moksha (liberation).",
    timings: "4:00 AM - 11:00 PM",
  },
  {
    id: "temple-2",
    name: "Ram Janmabhoomi Mandir",
    city: "Ayodhya",
    state: "Uttar Pradesh",
    deity: "Lord Ram",
    tradition: "Hindu",
    description:
      "The sacred birthplace of Lord Ram, site of the newly consecrated Ram Mandir built after the Supreme Court verdict.",
    history:
      "Ram Janmabhoomi in Ayodhya is considered the birthplace of Lord Ram, the seventh avatar of Vishnu. The site has immense religious significance for Hindus worldwide. After a prolonged legal battle spanning decades, the Supreme Court of India in November 2019 ruled in favor of the construction of a Ram Temple at the disputed site. The foundation stone was laid by Prime Minister Narendra Modi in August 2020. The magnificent new Ram Mandir was consecrated on January 22, 2024. The temple is built in Nagara style architecture with three floors, reaching a height of 161 feet.",
    timings: "7:00 AM - 11:00 PM",
  },
  {
    id: "temple-3",
    name: "Krishna Janmabhoomi Temple",
    city: "Mathura",
    state: "Uttar Pradesh",
    deity: "Lord Krishna",
    tradition: "Hindu",
    description:
      "The holy birthplace of Lord Krishna, one of the most sacred sites for Vaishnavas.",
    history:
      "Sri Krishna Janmabhoomi in Mathura marks the exact spot where Lord Krishna was born over 5,000 years ago. The site has a prison cell (kara griha) where Vasudeva and Devaki were imprisoned by Kansa when Krishna was born. The current complex was built and managed by the Sri Krishna Janmabhoomi Trust. Mathura is one of the seven sacred cities (Saptapuris) of Hinduism and is thronged by millions of pilgrims, especially during Janmashtami.",
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:30 PM",
  },
  {
    id: "temple-4",
    name: "Somnath Temple",
    city: "Prabhas Patan",
    state: "Gujarat",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "The first and foremost among the twelve Jyotirlingas, rebuilt 17 times after destruction by invaders.",
    history:
      "The Somnath Temple stands on the western coast of Gujarat at Prabhas Patan (Veraval). It is the first of the twelve Jyotirlinga shrines of Shiva. The temple was looted 17 times by various invaders, most famously by Mahmud of Ghazni in 1026 CE, but was rebuilt each time by Hindu kings. The current temple was rebuilt after India's independence, with construction beginning in 1947 under Sardar Vallabhbhai Patel.",
    timings: "6:00 AM - 9:30 PM",
  },
  {
    id: "temple-5",
    name: "Tirupati Balaji Temple",
    city: "Tirupati",
    state: "Andhra Pradesh",
    deity: "Lord Venkateswara (Vishnu)",
    tradition: "Hindu",
    description:
      "The richest and most visited temple in the world, dedicated to Lord Venkateswara (a form of Vishnu).",
    history:
      "The Sri Venkateswara Temple, located on the seventh peak of the Tirumala hills, is the most visited place of worship in the world with over 50,000–100,000 visitors daily. The temple is dedicated to Sri Venkateswara, a form of Vishnu, also known as Balaji, Govinda, and Srinivasa. The temple is managed by the Tirumala Tirupati Devasthanams (TTD). The temple receives one of the highest donations in the world, making it the wealthiest religious institution.",
    timings: "2:30 AM - 1:30 AM (almost 24 hours)",
  },
  {
    id: "temple-7",
    name: "Shirdi Sai Baba Temple",
    city: "Shirdi",
    state: "Maharashtra",
    deity: "Sai Baba of Shirdi",
    tradition: "Hindu",
    description:
      "The holy shrine of Shirdi Sai Baba, one of the most visited pilgrimage sites in India, revered by people of all faiths.",
    history:
      "Sai Baba of Shirdi was an Indian spiritual master regarded as a saint by devotees of both Hindu and Muslim faith. The Sai Baba temple in Shirdi, Maharashtra, is one of the most visited pilgrimage sites in India. Sai Baba lived in Shirdi from around 1858 to 1918. The temple complex encompasses the Samadhi Mandir (where Sai Baba's tomb is located), the Dwarkamai mosque where Sai Baba lived, and the Lendi Baug garden. The trust that manages the temple is one of the wealthiest religious trusts in India.",
    timings: "4:00 AM - 11:00 PM",
  },
  {
    id: "temple-8",
    name: "Vaishno Devi Temple",
    city: "Katra",
    state: "Jammu & Kashmir",
    deity: "Maa Vaishno Devi",
    tradition: "Hindu",
    description:
      "Situated 5,200 feet above sea level in the Trikuta Mountains, one of the most revered goddess temples in India.",
    history:
      "The Shri Mata Vaishno Devi Temple is dedicated to Mata Vaishno Devi, a manifestation of the Hindu Goddess Shakti. Located at an altitude of 5,200 feet, the temple attracts about 8 million visitors annually. The shrine inside the cave contains three naturally occurring rock formations representing Mahakali, Mahalakshmi, and Mahasaraswati. The trek from the base camp at Katra to the main shrine is approximately 14 km.",
    timings: "Darshan available 24 hours",
  },
  {
    id: "temple-9",
    name: "Siddhivinayak Temple",
    city: "Mumbai",
    state: "Maharashtra",
    deity: "Lord Ganesha",
    tradition: "Hindu",
    description:
      "One of the most visited temples in Mumbai, dedicated to Siddhivinayak Ganesha who grants all wishes.",
    history:
      "The Siddhivinayak Temple in Prabhadevi, Mumbai was originally built in 1801. The main deity, Lord Ganesha known as Siddhivinayak, has his trunk turned to the right — a rare and powerful form. The temple was rebuilt in 1991 with a golden dome. It is one of the richest temples in India and attracts millions of devotees including celebrities and politicians.",
    timings: "5:30 AM - 10:00 PM",
  },
  {
    id: "temple-10",
    name: "Meenakshi Amman Temple",
    city: "Madurai",
    state: "Tamil Nadu",
    deity: "Goddess Meenakshi (Parvati)",
    tradition: "Hindu",
    description:
      "A masterpiece of Dravidian architecture with 14 magnificent gateway towers (gopurams) and 33,000 sculptures.",
    history:
      "The Meenakshi Sundareswarar Temple is a historic Hindu temple dedicated to Goddess Meenakshi and her consort Sundareswarar. Built by the Nayak kings during the 16th–17th centuries, the complex has 14 gateway towers (gopurams), the highest being about 52 meters tall. The Hall of Thousand Pillars and the Golden Lotus Tank are major attractions within the complex.",
    timings: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
  },
  {
    id: "temple-11",
    name: "Jagannath Temple",
    city: "Puri",
    state: "Odisha",
    deity: "Lord Jagannath (Vishnu)",
    tradition: "Hindu",
    badge: "Char Dham",
    description:
      "One of the Char Dham pilgrimage sites, home of the famous Rath Yatra festival.",
    history:
      "The Jagannath Temple in Puri is one of the four sacred dhams (Char Dham), dedicated to Jagannath (a form of Vishnu). Built in the 12th century by King Anantavarman Chodaganga Deva, the main tower is 65 meters high. The temple is known for the annual Rath Yatra (chariot festival). The word 'Juggernaut' in English is derived from 'Jagannath.'",
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
  },
  {
    id: "temple-12",
    name: "Kedarnath Temple",
    city: "Rudraprayag",
    state: "Uttarakhand",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Char Dham · Jyotirlinga",
    description:
      "Located at 3,583 meters in the Himalayas, one of the twelve Jyotirlingas and part of the Char Dham Yatra.",
    history:
      "Kedarnath is one of the most important pilgrimage sites in Hinduism, situated at 3,583 meters in the Garhwal Himalayas. It is part of the Char Dham Yatra and one of the twelve Jyotirlingas. According to legend, the Pandavas sought Lord Shiva here after the Kurukshetra War. The main part of the temple is about 1,000 years old, with reconstruction attributed to Adi Shankaracharya. The site is only accessible during summer months (May to November).",
    timings: "Open only from May to November",
  },
  {
    id: "temple-13",
    name: "Badrinath Temple",
    city: "Chamoli",
    state: "Uttarakhand",
    deity: "Lord Vishnu",
    tradition: "Hindu",
    badge: "Char Dham",
    description:
      "One of the four sacred Char Dham sites, dedicated to Lord Vishnu, situated between Nar and Narayan mountain ranges.",
    history:
      "The Badrinath Temple is one of the four sacred Char Dham pilgrimage sites and one of the 108 Divya Desams (sacred Vishnu temples), located at 3,133 meters. Established by the Hindu philosopher Adi Shankaracharya in the 8th century CE, the presiding deity is Badrinarayan (Vishnu). The temple is open only from late April/May to November.",
    timings: "Open only from late April to November",
  },
  {
    id: "temple-14",
    name: "Mahakaleshwar Temple",
    city: "Ujjain",
    state: "Madhya Pradesh",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "One of the twelve Jyotirlingas, known for the unique swayambhu linga and the famous Bhasma Aarti.",
    history:
      "The Mahakaleshwar Temple is one of the twelve Jyotirlingas located in Ujjain on the banks of the holy Shipra river. The lingam here is a swayambhu (self-manifested), deriving energy from within. The temple is famous for its Bhasma Aarti performed early in the morning using sacred ash. Ujjain is one of the seven sacred cities of India and hosts the Kumbh Mela every 12 years.",
    timings: "3:00 AM - 11:00 PM (Bhasma Aarti at 4:00 AM)",
  },
  // ── NEW HINDU ───────────────────────────────────────────────────────────────
  {
    id: "temple-h15",
    name: "Rameshwaram Temple",
    city: "Ramanathapuram",
    state: "Tamil Nadu",
    deity: "Lord Shiva (Ramanathaswamy)",
    tradition: "Hindu",
    badge: "Char Dham · Jyotirlinga",
    description:
      "One of the Char Dham pilgrimage sites and a Jyotirlinga, connected to the legend of Lord Ram's bridge to Lanka.",
    history:
      "The Ramanathaswamy Temple at Rameshwaram is one of the twelve Jyotirlingas and one of the four Char Dhams. According to the Ramayana, Lord Ram worshipped Shiva here before crossing to Lanka. The temple is famous for its magnificent corridors — the longest temple corridor in India at 1,220 meters. The 22 sacred theerthams (wells) within the temple complex hold special significance, and devotees take ritual baths in these before darshan.",
    timings: "5:00 AM - 1:00 PM, 3:00 PM - 9:00 PM",
  },
  {
    id: "temple-h16",
    name: "Dwarkadhish Temple",
    city: "Dwarka",
    state: "Gujarat",
    deity: "Lord Krishna",
    tradition: "Hindu",
    badge: "Char Dham",
    description:
      "One of the sacred Char Dhams, built over the legendary city of Dwarka — Krishna's kingdom.",
    history:
      "The Dwarkadhish Temple (also called Jagat Mandir) is dedicated to Lord Krishna and is one of the four sacred Char Dham pilgrimage sites. The city of Dwarka is one of the seven sacred cities (Saptapuris) of Hinduism. According to legend, Lord Krishna established his kingdom here after leaving Mathura. The original temple is said to have been built by Krishna's grandson Vajranabha. The current 5-storey structure, crowned with a 78.3 m tall flag mast, is a magnificent specimen of Chalukya-style architecture.",
    timings: "6:30 AM - 1:00 PM, 5:00 PM - 9:30 PM",
  },
  {
    id: "temple-h17",
    name: "Omkareshwar Temple",
    city: "Khandwa",
    state: "Madhya Pradesh",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "A Jyotirlinga temple on an island in the Narmada river, shaped like the sacred Om symbol.",
    history:
      "Omkareshwar is one of the twelve Jyotirlingas of Lord Shiva, located on the Mandhata island in the Narmada River in Madhya Pradesh. The island is shaped like the Hindu sacred symbol Om. The temple complex consists of two shrines — Omkareshwar and Mamleshwar (Amareshwar). The island has 68 shrines, four maths (monasteries), and many sacred bathing ghats. The Narmada river flows around the island creating a natural parikrama (circumambulation path).",
    timings: "5:00 AM - 10:00 PM",
  },
  {
    id: "temple-h18",
    name: "Mahalakshmi Temple",
    city: "Kolhapur",
    state: "Maharashtra",
    deity: "Goddess Mahalakshmi",
    tradition: "Hindu",
    description:
      "One of the Shakti Peethas, considered the original seat of Goddess Lakshmi by Adi Shankaracharya.",
    history:
      "The Mahalakshmi Temple in Kolhapur is one of the most important Shakti Peethas in India. According to legend, this is the spot where the eyes of Sati fell. Adi Shankaracharya recognized this as the original seat of Goddess Lakshmi and performed special worship here. The temple dates back to about 700 CE and is built in the Hemadpanthi style. The idol of the goddess has a striking crown decorated with a cobra and is adorned with diamonds and gemstones.",
    timings: "4:00 AM - 10:30 PM",
  },
  {
    id: "temple-h19",
    name: "Akshardham Temple",
    city: "New Delhi",
    state: "Delhi",
    deity: "Swaminarayan (Vishnu)",
    tradition: "Hindu",
    description:
      "The world's largest Hindu temple complex, a modern marvel showcasing India's spiritual heritage.",
    history:
      "Swaminarayan Akshardham temple in New Delhi, inaugurated in 2005, is the world's largest comprehensive Hindu temple as per the Guinness World Records. Dedicated to Swaminarayan, a manifestation of God in Vaishnavism, the temple was built by BAPS volunteers in just 5 years. The main monument is carved from pink sandstone and Turkish limestone, embellished with 20,000 sculptures. The complex features an eternal flame, musical fountains, and an expansive 234-acre garden.",
    timings: "9:30 AM - 6:30 PM (closed Mondays)",
  },
  {
    id: "temple-h20",
    name: "Brihadeeswarar Temple",
    city: "Thanjavur",
    state: "Tamil Nadu",
    deity: "Lord Shiva (Brihadeeswara)",
    tradition: "Hindu",
    badge: "UNESCO Heritage",
    description:
      "A UNESCO World Heritage Site, this 1,000-year-old Dravidian masterpiece has the world's tallest temple vimana.",
    history:
      "The Brihadeeswarar Temple, also known as the 'Big Temple,' was built by the Chola emperor Rajaraja I in 1010 CE. It is a UNESCO World Heritage Site and one of the 'Great Living Chola Temples.' The vimana (tower) over the sanctum reaches 66 meters (216 feet), making it one of the tallest temple towers in the world. The temple was built without mortar — interlocking granite blocks support the entire structure. The complex features a massive Nandi (sacred bull) carved from a single stone.",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
  },
  {
    id: "temple-h21",
    name: "Padmanabhaswamy Temple",
    city: "Thiruvananthapuram",
    state: "Kerala",
    deity: "Lord Vishnu (Padmanabha)",
    tradition: "Hindu",
    description:
      "One of the wealthiest temples on earth, with vaults containing treasures worth over a trillion rupees.",
    history:
      "The Padmanabhaswamy Temple is one of the 108 Divya Desams (sacred Vishnu temples). The presiding deity is Vishnu in the Ananta Shayana posture — reclining on the serpent Ananta. The temple's six vaults, discovered in 2011, were found to contain gold, diamonds, and jewels worth over ₹1 trillion ($100+ billion), making it the wealthiest temple in the world. The temple follows strict Dravidian traditions: men must wear dhoti and women must wear saree for entry.",
    timings: "3:30 AM - 12:00 PM, 5:00 PM - 8:20 PM",
  },
  {
    id: "temple-h22",
    name: "Guruvayur Temple",
    city: "Thrissur",
    state: "Kerala",
    deity: "Lord Krishna (Guruvayurappan)",
    tradition: "Hindu",
    description:
      "The most important Vaishnava temple in Kerala, known as the 'Dwarka of the South.'",
    history:
      "The Guruvayur Temple is dedicated to Lord Krishna in the form of Guruvayurappan. According to legend, the idol was installed by Guru (the preceptor of the Gods) and Vayu (the wind god), hence the name Guruvayur. The four-armed idol of the deity is adorned with precious gems and jewels. The temple is known for its massive elephant pageant (Guruvayur Ekadasi) and has over 50 elephants consecrated to the deity. Non-Hindus are not permitted to enter.",
    timings: "3:00 AM - 1:00 PM, 4:30 PM - 9:15 PM",
  },
  {
    id: "temple-h23",
    name: "Chamundeshwari Temple",
    city: "Mysuru",
    state: "Karnataka",
    deity: "Chamundeshwari Devi",
    tradition: "Hindu",
    description:
      "Perched atop Chamundi Hills, this temple of the fierce goddess is the presiding deity of Mysore.",
    history:
      "The Chamundeshwari Temple is situated atop the Chamundi Hills, 13 km from Mysuru. Chamundeshwari is a fierce form of Goddess Parvati who slew the demon Mahishasura, from whose name Mysuru (Mahishmati) derives. The temple was built over many centuries, with the current 7-storey gopuram built by the Wadiyar kings of Mysore. The famous Mysore Dasara festival includes a grand procession from the Mysore Palace to the Chamundi Hills.",
    timings: "7:30 AM - 2:00 PM, 3:30 PM - 6:00 PM, 7:30 PM - 9:00 PM",
  },
  {
    id: "temple-h24",
    name: "Sankat Mochan Hanuman Temple",
    city: "Varanasi",
    state: "Uttar Pradesh",
    deity: "Lord Hanuman",
    tradition: "Hindu",
    description:
      "One of the most beloved Hanuman temples, said to have been established by the poet-saint Tulsidas.",
    history:
      "The Sankat Mochan Hanuman Temple in Varanasi is one of the most beloved temples of Hanuman. According to tradition, it was established by Goswami Tulsidas, the author of the Ramcharitmanas, in the 16th century. The temple is situated in the Durgakund area near the campus of Banaras Hindu University. The deity of Hanuman here is particularly venerated for resolving devotees' difficulties, as Hanuman is known as Sankat Mochan (the remover of troubles). The temple resonates with continuous chanting and bhajans.",
    timings: "5:00 AM - 10:00 PM",
  },
  {
    id: "temple-h25",
    name: "Murudeshwar Temple",
    city: "Bhatkal",
    state: "Karnataka",
    deity: "Lord Shiva",
    tradition: "Hindu",
    description:
      "Home to the world's second-tallest Shiva statue at 123 feet, dramatically set against the Arabian Sea.",
    history:
      "The Murudeshwar Temple is dedicated to Lord Shiva and is located on a peninsula on the coast of the Arabian Sea in Bhatkal, Karnataka. The temple is famous for the 123-foot (37.5 m) statue of Lord Shiva, the world's second-tallest Shiva statue. According to legend, this is the place where King Ravana got the Atma Linga from Lord Shiva and Vishnu disguised as a Brahmin boy convinced Ravana to place it down, after which it became permanent. The 20-storey gopuram offers a panoramic view of the Arabian Sea.",
    timings: "6:00 AM - 1:00 PM, 3:00 PM - 8:30 PM",
  },
  {
    id: "temple-h26",
    name: "Khajuraho Temples",
    city: "Chhatarpur",
    state: "Madhya Pradesh",
    deity: "Shiva, Vishnu, Jain Tirthankaras",
    tradition: "Hindu",
    badge: "UNESCO Heritage",
    description:
      "A UNESCO World Heritage Site, these medieval temples are masterpieces of Chandela dynasty art and architecture.",
    history:
      "The Khajuraho Group of Monuments is a UNESCO World Heritage Site consisting of Hindu and Jain temples built between 950 and 1050 CE by the Chandela dynasty. Originally 85 temples, only 25 remain today. The temples are famous for their nagara-style architectural symbolism and their erotic sculptures, which occupy only about 10% of the total carvings. The major temples are dedicated to Shiva, Vishnu, and Jain Tirthankaras. The sculptures depict various aspects of Hindu and Jain philosophy, including sensory pleasures as a gateway to moksha.",
    timings: "Sunrise to sunset",
  },
  {
    id: "temple-h27",
    name: "Trimbakeshwar Temple",
    city: "Nashik",
    state: "Maharashtra",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "A Jyotirlinga at the source of the sacred Godavari river, unique with three lingas representing Brahma, Vishnu, and Shiva.",
    history:
      "The Trimbakeshwar Temple is one of the twelve Jyotirlingas of Lord Shiva. The Jyotirlinga here has three faces embodying Brahma, Vishnu, and Shiva (Trimbak means 'three-eyed'). The temple is located at the source of the Godavari River, one of India's holiest rivers. The present temple was built by Peshwa Nana Saheb Peshwa in the 18th century on the site of an older temple. The Kumbh Mela is held in Nashik (Trimbak) every 12 years.",
    timings: "5:30 AM - 9:00 PM",
  },
  {
    id: "temple-h28",
    name: "Bhimashankar Temple",
    city: "Pune",
    state: "Maharashtra",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "A Jyotirlinga nestled in the Sahyadri hills, surrounded by a wildlife sanctuary.",
    history:
      "The Bhimashankar Temple is one of the twelve Jyotirlingas of Lord Shiva, located in the Sahyadri range of the Western Ghats. According to legend, Lord Shiva manifested here as Bhimashankar to slay the demon Tripurasura. The temple, built by Peshwa Chimanji Appo in the 18th century, is surrounded by the Bhimashankar Wildlife Sanctuary. The Bhima River originates near this temple. The shrine is visited by thousands of devotees, especially on Shivaratri.",
    timings: "4:30 AM - 9:30 PM",
  },
  {
    id: "temple-h29",
    name: "Nageshwar Temple",
    city: "Dwarka",
    state: "Gujarat",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "One of the twelve Jyotirlingas, near Dwarka, with a 25-meter Shiva statue in meditation posture.",
    history:
      "The Nageshwar Temple is one of the twelve Jyotirlingas, located on the route from Gomti Dwarka to Bet Dwarka in Gujarat. According to the Shiva Purana, Nageshwar (Lord of the Nagas/Serpents) appeared here to save a devotee named Supriya from a demon. The temple complex features a magnificent 25-meter tall statue of Lord Shiva in meditation posture. The lingam here is said to grant freedom from all poisons (nagam = serpent).",
    timings: "5:00 AM - 9:00 PM",
  },
  {
    id: "temple-h30",
    name: "Mallikarjuna Temple",
    city: "Srisailam",
    state: "Andhra Pradesh",
    deity: "Lord Shiva & Goddess Bhramaramba",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "A Jyotirlinga and Shakti Peetha combined in one complex, on the banks of the Krishna River.",
    history:
      "The Mallikarjuna Temple at Srisailam is unique as it combines both a Jyotirlinga (one of the twelve) and a Shakti Peetha. The presiding deities are Mallikarjuna (Shiva) and Bhramaramba (Shakti). The temple is situated in the Nallamala forests on the banks of the Krishna River. The Srisailam Dam, one of India's largest, is nearby. The temple was mentioned in epics and Puranas; it is associated with the legend of the Pandavas visiting Shiva here.",
    timings: "4:30 AM - 10:00 PM",
  },
  {
    id: "temple-h31",
    name: "Grishneshwar Temple",
    city: "Aurangabad",
    state: "Maharashtra",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "The twelfth and last of the Jyotirlingas, located near the Ellora Caves UNESCO World Heritage Site.",
    history:
      "The Grishneshwar (or Ghrishneshwar) Temple is the twelfth and last of the Jyotirlingas. Located near the Ellora Caves in Maharashtra, the temple is within a short distance of the UNESCO World Heritage Site. The current temple was built by Maharani Ahilyabai Holkar of Indore, the same patroness who rebuilt Kashi Vishwanath. The temple is made of red rock with beautifully sculptured walls. Pilgrims combine a visit here with the Ellora and Ajanta caves.",
    timings: "5:30 AM - 9:30 PM",
  },
  {
    id: "temple-h32",
    name: "Vaidyanath Temple",
    city: "Deoghar",
    state: "Jharkhand",
    deity: "Lord Shiva",
    tradition: "Hindu",
    badge: "Jyotirlinga",
    description:
      "One of the twelve Jyotirlingas (Vaidyanath Dham), a major pilgrimage of the Shravana month.",
    history:
      "The Vaidyanath Temple (also known as Baidyanath or Deoghar Jyotirlinga) is one of the twelve Jyotirlingas and is located in Deoghar, Jharkhand. During the Hindu month of Shravana (July–August), millions of devotees called Kanwariyas carry sacred water from the Ganges at Sultanganj (100 km away) to offer to the Jyotirlinga. This is one of the largest religious processions in the world. The temple complex has 21 other temples in addition to the main shrine.",
    timings: "4:00 AM - 3:30 PM, 6:00 PM - 9:00 PM",
  },
  {
    id: "temple-h33",
    name: "Kedareshwar Jyotirlinga (Bagnath)",
    city: "Bageshwar",
    state: "Uttarakhand",
    deity: "Lord Shiva",
    tradition: "Hindu",
    description:
      "Ancient Shiva temple at the confluence of Saryu and Gomati rivers in the Kumaon Himalayas.",
    history:
      "The Bagnath Temple in Bageshwar is dedicated to Lord Shiva in the form of Bagnath (the Lord of Tigers). The temple is situated at the confluence of the Saryu and Gomati rivers. According to legend, Lord Shiva once rested here in the form of a tiger. The town is an important pilgrimage centre in the Kumaon region of Uttarakhand. The temple dates to the 7th century, though the current structure was built in 1602 CE.",
    timings: "6:00 AM - 8:00 PM",
  },
  {
    id: "temple-h34",
    name: "Kamakhya Temple",
    city: "Guwahati",
    state: "Assam",
    deity: "Goddess Kamakhya",
    tradition: "Hindu",
    badge: "Shakti Peetha",
    description:
      "One of the most powerful Shakti Peethas, a tantric temple where the goddess is worshipped in her yoni form.",
    history:
      "The Kamakhya Temple atop the Nilachal Hill in Guwahati is one of the 51 Shakti Peethas and one of the most powerful tantric temples in India. The goddess here is worshipped in her yoni (womb) form — there is no idol; a cleft in the rock symbolizes the goddess. During the Ambubachi Mela festival in June, when the goddess 'menstruates', the temple is closed for three days and then reopened with elaborate celebrations. The Kamakhya Temple is the focal point of Tantric Hinduism.",
    timings: "5:30 AM - 10:00 PM",
  },
  {
    id: "temple-h35",
    name: "Konark Sun Temple",
    city: "Konark",
    state: "Odisha",
    deity: "Surya (Sun God)",
    tradition: "Hindu",
    badge: "UNESCO Heritage",
    description:
      "A 13th-century UNESCO World Heritage Site, built in the form of a colossal chariot of the Sun God.",
    history:
      "The Konark Sun Temple, built in the 13th century by King Narasimhadeva I of the Eastern Ganga dynasty, is a UNESCO World Heritage Site. The temple is designed as a giant chariot of the Sun God Surya with 12 pairs of intricately carved wheels pulled by 7 horses. The temple is one of the finest examples of Kalinga architecture. Though the main sanctum has collapsed, the structure that remains (the porch hall) is 39 meters tall. The temple is also known as the 'Black Pagoda' and was used as a navigational landmark by sailors.",
    timings: "6:00 AM - 8:00 PM",
  },
  {
    id: "temple-h36",
    name: "Vittala Temple",
    city: "Hampi",
    state: "Karnataka",
    deity: "Lord Vishnu (Vittala)",
    tradition: "Hindu",
    badge: "UNESCO Heritage",
    description:
      "A magnificent 15th-century temple at Hampi with the iconic musical pillars and the stone chariot.",
    history:
      "The Vittala Temple at Hampi is a 15th-century temple dedicated to Vittala, a form of Lord Vishnu. It is part of the Hampi Group of Monuments, a UNESCO World Heritage Site. The temple is famed for its musical pillars (called 'surya kanta' and 'chandra kanta') that produce musical notes when struck. The iconic stone chariot (ratha) in front of the temple has become the symbol of Karnataka. The temple was built during the reign of King Devaraya II of the Vijayanagara Empire.",
    timings: "8:30 AM - 5:30 PM",
  },
  // ── EXISTING JAIN ───────────────────────────────────────────────────────────
  {
    id: "temple-15",
    name: "Dilwara Jain Temples",
    city: "Mount Abu",
    state: "Rajasthan",
    deity: "Rishabhanatha & Neminatha",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "A complex of five Jain temples renowned for their extraordinary marble carvings and intricate craftsmanship.",
    history:
      "The Dilwara Temples at Mount Abu are considered the finest example of Jain temple architecture, built between the 11th and 13th centuries. There are five temples: the Vimal Vasahi (1031 CE) dedicated to Adinath and the Luna Vasahi (1231 CE) dedicated to Neminatha. The level of detail in the marble carvings is astounding — intricate lotus designs on ceilings, elaborate figures on pillars, and every surface carved with incredible precision. They are a UNESCO World Heritage site candidate.",
    timings: "12:00 PM - 6:00 PM (Non-Jains)",
  },
  {
    id: "temple-16",
    name: "Ranakpur Jain Temple",
    city: "Ranakpur",
    state: "Rajasthan",
    deity: "Adinath (Rishabhanatha)",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "A stunning 15th-century Jain temple with 1,444 intricately carved marble pillars, no two alike.",
    history:
      "The Ranakpur Jain Temple (Chaturmukha Dharana Vihara) built around 1437 CE is dedicated to Tirthankara Adinath. The complex covers 48,000 sq ft and took 50 years to build. Its 1,444 exquisitely carved marble pillars — no two alike — make it one of the most important and largest Jain temples in India. The temple has 24 pillared halls, each with domed ceilings, and is set in a valley surrounded by the Aravalli forests.",
    timings: "12:00 PM - 5:00 PM (Non-Jains)",
  },
  {
    id: "temple-17",
    name: "Palitana Jain Temples",
    city: "Palitana",
    state: "Gujarat",
    deity: "Adinath (First Tirthankar)",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "The holiest Jain pilgrimage site with over 900 temples on Shatrunjaya Hill, the world's largest temple city.",
    history:
      "Palitana's Shatrunjaya hill complex contains over 900 temples — the world's largest temple city. The main temple is dedicated to Adinath, the first Tirthankara. According to Jain tradition, Adinath meditated on this hill and attained nirvana here. The temples were built from the 11th century onwards. The pilgrimage involves climbing 3,500 steps on a 600-meter high hill. Palitana has been declared a vegetarian city by the local municipality.",
    timings: "First light to sunset (seasonal)",
  },
  {
    id: "temple-18",
    name: "Shravanabelagola",
    city: "Shravanabelagola",
    state: "Karnataka",
    deity: "Bahubali (Gomateshwara)",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "Home of the 57-foot monolithic statue of Bahubali (Gomateshwara), one of the largest free-standing statues in the world.",
    history:
      "Shravanabelagola is most famous for the monolithic statue of Bahubali (Gomateshwara), 57 feet (17.4 m) tall, carved from a single piece of granite in 981 CE by Chavundaraya. Bahubali, son of Adinath, renounced his kingdom and practiced extreme meditation until enlightenment. The statue is the site of Mahamastakabhisheka (head anointing ceremony), which occurs once every 12 years and is attended by millions of pilgrims.",
    timings: "6:30 AM - 6:30 PM",
  },
  // ── NEW JAIN ────────────────────────────────────────────────────────────────
  {
    id: "temple-j5",
    name: "Shikharji (Sammed Shikhar)",
    city: "Giridih",
    state: "Jharkhand",
    deity: "20 Tirthankaras (Moksha Site)",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "The most sacred Jain pilgrimage site — 20 of the 24 Tirthankaras attained nirvana on this hill.",
    history:
      "Shikharji, also known as Sammed Shikhar or Parasnath Hill, is the most sacred pilgrimage site for Jains. It is situated on the highest peak in Jharkhand. According to Jain tradition, 20 of the 24 Tirthankaras attained Moksha (salvation) on this hill, including Parshvanath, the 23rd Tirthankar. Jains from across the world undertake the 27 km barefoot parikrama (circumambulation) of the hill. The Government of India has declared it a Shikhar protected area. Jain organisations have been actively campaigning to have the site declared a Jain pilgrimage, restricting non-religious development.",
    timings: "Open daily (pilgrimage parikrama is dawn to dusk)",
  },
  {
    id: "temple-j6",
    name: "Girnar Jain Temples",
    city: "Junagadh",
    state: "Gujarat",
    deity: "Neminath (22nd Tirthankar)",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "A cluster of Jain temples on the sacred Girnar mountain, dedicated to Neminath who attained moksha here.",
    history:
      "The Girnar Jain Temples are located on the Girnar mountain near Junagadh in Gujarat. The most important is the temple of Neminath (the 22nd Tirthankar), who is believed to have attained moksha on this mountain. Neminath was a cousin of Lord Krishna. The main temple was built in 1128 CE by Vastupala and Tejapala, the famous Jain minister-brothers who also built the Dilwara Temples. The pilgrimage involves climbing approximately 9,999 steps. Lord Dattatreya's temple and other Hindu shrines are also on the mountain.",
    timings: "5:00 AM - 8:00 PM",
  },
  {
    id: "temple-j7",
    name: "Pavapuri Jalmandir",
    city: "Pavapuri",
    state: "Bihar",
    deity: "Mahavir Swami (Nirvana Site)",
    tradition: "Jain",
    badge: "Panch Kalyanak",
    description:
      "The spot where Tirthankara Mahavir attained nirvana in 527 BCE, featuring a white marble temple on a lotus pond.",
    history:
      "Pavapuri (also called Apapapuri — the sinless city) in Bihar is one of the most sacred Jain pilgrimage sites. This is where the 24th and last Tirthankara, Mahavira, attained nirvana (moksha) in 527 BCE. The Jalmandir is a magnificent white marble temple built on a lotus pond. According to Jain texts, after Mahavira's cremation, so many people took away handfuls of earth as a sacred relic that a large pond was created. The temple is connected to the land by a stone pathway. Rajgir and Nalanda are nearby.",
    timings: "6:00 AM - 6:00 PM",
  },
  {
    id: "temple-j8",
    name: "Vaishali Mahavir Janmabhoomi",
    city: "Vaishali",
    state: "Bihar",
    deity: "Mahavir Swami (Birthplace)",
    tradition: "Jain",
    badge: "Panch Kalyanak",
    description:
      "The birthplace of Tirthankara Mahavira, the 24th and last Tirthankar, in the ancient republic of Vaishali.",
    history:
      "Vaishali in Bihar is revered as the birthplace of Vardhamana Mahavira, who was born around 599 BCE to King Siddhartha and Queen Trishala in the Kshatriya Kundagram district. Vaishali was also one of the world's first republics. The Mahavir Janmabhoomi complex includes the Digambara and Shwetambara temples marking the exact birth spot. The nearby ruins of Vaishali reflect its importance in ancient Indian history as Buddha also frequently visited and delivered sermons here.",
    timings: "6:00 AM - 7:00 PM",
  },
  {
    id: "temple-j9",
    name: "Chandkheri Adinath Temple",
    city: "Kota",
    state: "Rajasthan",
    deity: "Adinath (First Tirthankar)",
    tradition: "Jain",
    description:
      "A 15th-century Digambara Jain temple famous for its golden-roofed sanctum and richly carved exterior.",
    history:
      "The Chandkheri Adinath Temple near Kota in Rajasthan is a magnificent Digambara Jain temple dedicated to Adinath, the first Tirthankar. The main idol of Adinath is made of Chandrakanta stone. The temple was built in the 15th century and has been subsequently renovated. The temple is particularly famous for its golden roof over the main sanctum and intricate carvings on the exterior walls depicting Jain mythology and cosmology. The site is managed by the local Digambara Jain community.",
    timings: "6:00 AM - 8:00 PM",
  },
  {
    id: "temple-j10",
    name: "Tijara Fort Jain Temple",
    city: "Alwar",
    state: "Rajasthan",
    deity: "Chandraprabhu (8th Tirthankar)",
    tradition: "Jain",
    description:
      "A historically significant Jain temple featuring a rare idol of Chandraprabhu discovered in the 19th century.",
    history:
      "The Tijara Fort Jain Temple near Alwar, Rajasthan, is dedicated to Chandraprabhu, the 8th Tirthankar. In 1864, a Jain priest dreamed of an idol buried near the Tijara fort. Excavations were carried out and a beautiful ancient idol of Chandraprabhu was found, establishing the temple's sacred significance. The temple complex, set within a restored fort, has become an important pilgrimage destination. The annual fair at Tijara draws thousands of Jain devotees.",
    timings: "7:00 AM - 7:00 PM",
  },
  {
    id: "temple-j11",
    name: "Muchhal Mahavir Temple",
    city: "Ghanerao",
    state: "Rajasthan",
    deity: "Mahavir Swami",
    tradition: "Jain",
    description:
      "Famous for the deity's golden-moustached face, this Shwetambara temple has extraordinary gold work.",
    history:
      "The Muchhal Mahavir Temple in Ghanerao village near Ranakpur, Rajasthan, is a Shwetambara Jain temple famous for the deity of Mahavira with a golden moustache (muchhal). According to legend, a local chieftain once pledged his moustache to Mahavira in gratitude for the god saving his life. Since then, the deity has been adorned with a golden moustache. The small but richly decorated temple draws pilgrims who come to fulfil their vows, especially young men before their weddings.",
    timings: "6:00 AM - 7:30 PM",
  },
  {
    id: "temple-j12",
    name: "Ahmedabad Hathisingh Temple",
    city: "Ahmedabad",
    state: "Gujarat",
    deity: "Dharmanath (15th Tirthankar)",
    tradition: "Jain",
    description:
      "A magnificent white marble Jain temple built in 1848 with 52 deheris (shrines) surrounding it.",
    history:
      "The Hathisingh Jain Temple in Ahmedabad was built in 1848 by a wealthy Jain merchant, Hathising Kesarising, in memory of his father. The temple is dedicated to Dharmanath, the 15th Jain Tirthankar. The main temple is surrounded by 52 smaller shrines, each housing an image of a Tirthankar. The temple is built entirely of white marble and features exquisite carvings on every surface. The main spire (shikhara) rises 24.5 meters. The temple is located near the Delhi Gate in old Ahmedabad.",
    timings: "9:00 AM - 12:30 PM, 3:30 PM - 7:00 PM",
  },
  {
    id: "temple-j13",
    name: "Ahinsa Sthal",
    city: "New Delhi",
    state: "Delhi",
    deity: "Mahavir Swami",
    tradition: "Jain",
    description:
      "A modern Jain monument in Delhi featuring a towering Mahavir statue and meditation gardens.",
    history:
      "Ahinsa Sthal is a Jain religious monument in Mehrauli, South Delhi. The monument features a large statue of Lord Mahavira in meditation posture. The complex promotes the Jain principles of non-violence (Ahimsa), non-possessiveness (Aparigraha), and many-sidedness (Anekantavada). The site is maintained by Digambara Jain institutions and serves as a spiritual and educational centre for Jainism in the capital. The complex is open to visitors of all faiths and promotes interfaith harmony.",
    timings: "8:00 AM - 8:00 PM",
  },
  // ── EXISTING SIKH ───────────────────────────────────────────────────────────
  {
    id: "temple-6",
    name: "Golden Temple (Harmandir Sahib)",
    city: "Amritsar",
    state: "Punjab",
    deity: "Waheguru",
    tradition: "Sikh",
    badge: "Akal Takht",
    description:
      "The holiest Gurdwara of Sikhism, built by Guru Arjan Dev Ji, sheathed in gold and reflecting in the sacred Amrit Sarovar.",
    history:
      "The Harmandir Sahib (abode of God), the Golden Temple, is the holiest Gurdwara of Sikhism in Amritsar. The foundation stone was laid by Guru Arjan Dev in 1588. The lower part is white marble; the upper part is covered in gold. Unlike most temples that face east, the Golden Temple faces all four directions to symbolize openness of the Sikh faith. The Langar (community kitchen) serves free meals to over 100,000 people daily without discrimination. Akal Takht, the highest seat of Sikh authority, is within the complex.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-19",
    name: "Hazur Sahib Gurdwara",
    city: "Nanded",
    state: "Maharashtra",
    deity: "Waheguru",
    tradition: "Sikh",
    badge: "Takht",
    description:
      "One of the five Takhts (holy seats of authority) of Sikhism, where the 10th Sikh Guru, Gobind Singh, passed away.",
    history:
      "Hazur Sahib (Sachkhand Sri Hazur Abchal Nagar Sahib) in Nanded is one of the five Takhts of Sikhism. The Gurdwara stands at the spot where Guru Gobind Singh passed away in 1708 after being stabbed by an assassin. The Guru conferred guruship on the Guru Granth Sahib here. The complex contains many shrines related to the Guru's life, including his weapons, personal effects, and the spot where he breathed his last.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-20",
    name: "Anandpur Sahib Gurdwara",
    city: "Anandpur Sahib",
    state: "Punjab",
    deity: "Waheguru",
    tradition: "Sikh",
    badge: "Takht",
    description:
      "The birthplace of the Khalsa and one of the holiest cities in Sikhism, founded by Guru Tegh Bahadur.",
    history:
      "Anandpur Sahib (City of Bliss) is the birthplace of the Khalsa on Vaisakhi 1699, when Guru Gobind Singh baptized the Panj Piaras. The city was founded by Guru Tegh Bahadur in 1665. Takht Sri Kesgarh Sahib, one of the five Takhts, is here. The city hosts one of the largest Sikh gatherings during Hola Mohalla festival (the Sikh version of Holi), initiated by Guru Gobind Singh in 1700.",
    timings: "Open 24 hours",
  },
  // ── ADDITIONAL HINDU: Missing Char Dham + Shakti Peethas + Others ───────────
  {
    id: "temple-h37",
    name: "Gangotri Temple",
    city: "Uttarkashi",
    state: "Uttarakhand",
    deity: "Goddess Ganga",
    tradition: "Hindu",
    badge: "Char Dham",
    description:
      "One of the four Char Dham sites, the origin of the sacred Ganga river, set amid the Garhwal Himalayas.",
    history:
      "Gangotri is one of the four sacred Char Dham pilgrimage sites and the origin of the holy Ganga River. Situated at 3,048 meters in the Garhwal Himalayan range, the temple is dedicated to Goddess Ganga. The original temple was built by Amar Singh Thapa, a Gorkha general, in the early 18th century. The current structure was rebuilt by Maharaja Mansingh of Jaipur. Gangotri Glacier, 19 km away, is the actual source of the Bhagirathi River (which becomes the Ganga). The temple is open only from Akshaya Tritiya (April/May) to Diwali (Oct/Nov).",
    timings: "Open May to November only",
  },
  {
    id: "temple-h38",
    name: "Yamunotri Temple",
    city: "Uttarkashi",
    state: "Uttarakhand",
    deity: "Goddess Yamuna",
    tradition: "Hindu",
    badge: "Char Dham",
    description:
      "The source of the sacred Yamuna river and the first of the four Char Dham pilgrimage sites.",
    history:
      "Yamunotri is the first of the four sacred Char Dham pilgrimage sites and the source of the Yamuna River. Situated at 3,293 meters in the Garhwal Himalayas, the temple is dedicated to Goddess Yamuna, daughter of the Sun God. The current temple was built by Maharani Guleria of Jaipur in the 19th century. The original temple was built by Narendar Shah of Tehri Garhwal. A natural hot spring (Surya Kund) near the temple is so hot that pilgrims cook rice and potatoes in it as prasad. The trek to Yamunotri from Janki Chatti base camp is 6 km.",
    timings: "Open May to November only",
  },
  {
    id: "temple-h39",
    name: "Kalighat Kali Temple",
    city: "Kolkata",
    state: "West Bengal",
    deity: "Goddess Kali",
    tradition: "Hindu",
    badge: "Shakti Peetha",
    description:
      "One of the 51 Shakti Peethas, where the toes of Sati fell, a powerful and ancient seat of the Mother Goddess.",
    history:
      "The Kalighat Kali Temple in Kolkata is one of the 51 Shakti Peethas, marking the spot where the toes of Goddess Sati are believed to have fallen when her body was dismembered by Lord Vishnu's Sudarshana Chakra. The temple is dedicated to Goddess Kali, the patron deity of Kolkata (named Kalikata after Kali). The current temple was built in 1809, though a temple has existed here for centuries. Kalighat is one of the most visited pilgrimage sites in eastern India, attracting thousands of devotees daily.",
    timings: "5:00 AM - 2:00 PM, 5:00 PM - 10:30 PM",
  },
  {
    id: "temple-h40",
    name: "Jwala Ji Temple",
    city: "Kangra",
    state: "Himachal Pradesh",
    deity: "Goddess Jwala Ji",
    tradition: "Hindu",
    badge: "Shakti Peetha",
    description:
      "A Shakti Peetha where the goddess manifests as eternal natural flames burning from the earth, with no idol.",
    history:
      "The Jwala Ji (Jwalamukhi) Temple in Kangra, Himachal Pradesh, is one of the 51 Shakti Peethas, where the tongue of Goddess Sati is believed to have fallen. Uniquely, there is no idol — the goddess manifests as nine eternal natural gas flames burning from the earth, symbolizing the nine forms of Devi. The temple has been revered since antiquity; Akbar is said to have tried to cap the flames with a golden canopy but failed. The blue gas flames are considered a miraculous manifestation of divine energy.",
    timings: "5:00 AM - 10:00 PM",
  },
  {
    id: "temple-h41",
    name: "Vindhyavasini Devi Temple",
    city: "Vindhyachal",
    state: "Uttar Pradesh",
    deity: "Goddess Vindhyavasini",
    tradition: "Hindu",
    badge: "Shakti Peetha",
    description:
      "One of the powerful Shakti Peethas, the presiding goddess of the Vindhya mountains, near Prayagraj.",
    history:
      "The Vindhyavasini Devi Temple in Vindhyachal, near Mirzapur, Uttar Pradesh, is one of the 51 Shakti Peethas. The goddess Vindhyavasini ('She who dwells in the Vindhyas') is a fierce form of Durga and is the presiding deity of the Vindhya mountains. According to legend, the goddess appeared here to protect the infant Krishna by disguising herself as the baby born to Nanda and Yashoda. The temple complex forms a divine triangle (triangle yatra) with two other goddess temples — Ashtabhuja and Kali Khoh.",
    timings: "5:00 AM - 10:00 PM",
  },
  {
    id: "temple-h42",
    name: "Chintapurni Temple",
    city: "Una",
    state: "Himachal Pradesh",
    deity: "Goddess Chintapurni (Chinnamastika)",
    tradition: "Hindu",
    badge: "Shakti Peetha",
    description:
      "A Shakti Peetha in Himachal Pradesh where the goddess fulfils devotees' wishes and removes their worries.",
    history:
      "The Chintapurni Temple in Una district, Himachal Pradesh, is one of the 51 Shakti Peethas. The goddess Chintapurni ('She who fulfils all wishes') is a form of Chinnamastika Devi. According to the Shakti Peetha tradition, the feet of Goddess Sati fell here. The temple is part of the Saptashringi group of shakti temples in Himachal Pradesh. Navratri festivals here draw enormous crowds from across Punjab, Haryana, and Himachal Pradesh.",
    timings: "5:00 AM - 10:30 PM",
  },
  {
    id: "temple-h43",
    name: "Naina Devi Temple",
    city: "Bilaspur",
    state: "Himachal Pradesh",
    deity: "Goddess Naina Devi",
    tradition: "Hindu",
    badge: "Shakti Peetha",
    description:
      "A Shakti Peetha atop a hilltop where the eyes of Goddess Sati fell, offering panoramic views of the Shivalik ranges.",
    history:
      "The Naina Devi Temple is situated on a hilltop in the Shivalik ranges of Bilaspur district, Himachal Pradesh. It is one of the 51 Shakti Peethas, marking the spot where the eyes (naina) of Goddess Sati fell. The temple is dedicated to Naina Devi, a fierce form of Goddess Durga. The hilltop is accessible by ropeway. According to legend, the temple was discovered by a Gujjar cowherd who noticed his cow shedding milk over a spot, where divine idols were subsequently unearthed.",
    timings: "6:00 AM - 9:00 PM",
  },
  {
    id: "temple-h44",
    name: "Ranganathaswamy Temple",
    city: "Srirangam",
    state: "Tamil Nadu",
    deity: "Lord Ranganatha (Vishnu)",
    tradition: "Hindu",
    description:
      "The largest functioning Hindu temple complex in the world, with 156 hectares and 21 ornate towers.",
    history:
      "The Sri Ranganathaswamy Temple at Srirangam is one of the largest functioning Hindu temples in the world, covering 156 hectares (631 acres). Dedicated to Ranganatha (a reclining form of Vishnu), it is the foremost of the 108 Divya Desams. The temple has 21 elaborately carved gopurams (gateway towers), the tallest being 73 meters. The temple complex is a town unto itself with streets, shops, and residences within its seven concentric walls. The Rajagopuram (main tower) was completed in 1987 after construction spanning several decades.",
    timings: "6:00 AM - 1:00 PM, 3:15 PM - 9:00 PM",
  },
  {
    id: "temple-h45",
    name: "Khatu Shyam Ji Temple",
    city: "Sikar",
    state: "Rajasthan",
    deity: "Shyam Ji (Barbarika / Krishna)",
    tradition: "Hindu",
    description:
      "One of the most popular temples in Rajasthan, dedicated to Khatu Shyam Ji, worshipped as an avatar of Lord Krishna.",
    history:
      "The Khatu Shyam Ji Temple in Khatu village, Sikar district, Rajasthan, is one of the most visited temples in northern India. The presiding deity is Barbarika (grandson of Bhima), also known as Khatu Shyam, who offered his head to Lord Krishna before the Kurukshetra War. Krishna was moved by this devotion and blessed him saying he would be worshipped in Kaliyuga as 'Shyam.' The idol's head was found buried in Khatu. The temple draws millions of devotees, especially on Phalguna Ekadashi, when a massive 3-day fair is held.",
    timings: "5:30 AM - 1:00 PM, 5:00 PM - 9:00 PM",
  },
  {
    id: "temple-h46",
    name: "Hanumangarhi Temple",
    city: "Ayodhya",
    state: "Uttar Pradesh",
    deity: "Lord Hanuman",
    tradition: "Hindu",
    description:
      "A famous Hanuman temple in the heart of Ayodhya, perched on a hill with 76 steps, said to be Hanuman's residence.",
    history:
      "Hanumangarhi is a famous Hanuman temple situated on a hillock in the heart of Ayodhya, Uttar Pradesh. The temple is said to be built on the site where Hanuman lived in a cave and guarded the Ram Janmabhoomi. According to legend, Hanuman lived here in a cave to protect Lord Ram's birthplace. The main idol is that of Anjani (Hanuman's mother) with Hanuman as a child on her lap. The temple is approached by 76 steep stairs. Devotees visit this temple first before proceeding to the Ram Janmabhoomi, as it is believed Hanuman grants permission for darshan.",
    timings: "4:00 AM - 10:00 PM",
  },
  // ── ADDITIONAL JAIN: Muktagiri + Kundalpur ───────────────────────────────────
  {
    id: "temple-j14",
    name: "Muktagiri Jain Tirth",
    city: "Betul",
    state: "Madhya Pradesh",
    deity: "Chandraprabhu & Multiple Tirthankaras",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "A stunning Jain pilgrimage site in the Satpura forests with 52 ancient temples carved into rocky cliffs.",
    history:
      "Muktagiri is a beautiful Jain pilgrimage site in the Satpura mountain ranges of Betul district, Madhya Pradesh. The site has 52 Jain temples of varying ages, many carved directly into the rocky hillside near a scenic waterfall. The main temple is dedicated to Chandraprabhu (8th Tirthankar). The site is considered a place of liberation (mukti/moksha), hence the name. The natural waterfall, lush forests, and rocky terrain make it one of the most picturesque Jain pilgrimage sites in central India. The site is managed by Digambara Jain institutions.",
    timings: "6:00 AM - 7:00 PM",
  },
  {
    id: "temple-j15",
    name: "Kundalpur Jain Tirth",
    city: "Damoh",
    state: "Madhya Pradesh",
    deity: "Bade Baba (Adinath)",
    tradition: "Jain",
    badge: "Panch Tirth",
    description:
      "A major Digambara Jain pilgrimage with 63 temples on a hill, famous for the 'Bade Baba' Adinath idol.",
    history:
      "Kundalpur is a major Digambara Jain pilgrimage site near Damoh in Madhya Pradesh. The hilltop complex has 63 temples, the most significant being the Bade Baba temple housing a large and ancient idol of Adinath (first Tirthankar). The site is believed to be 5,000 years old. The annual Kundalpur Mela (fair) is one of the largest Jain religious gatherings in India, attracting hundreds of thousands of devotees from across the country. The serene hilltop setting and the row of white temples make it a spiritually charged destination.",
    timings: "6:00 AM - 8:00 PM",
  },
  // ── NEW SIKH ────────────────────────────────────────────────────────────────
  {
    id: "temple-s3",
    name: "Patna Sahib (Takht Sri Harmandir Ji)",
    city: "Patna",
    state: "Bihar",
    deity: "Waheguru",
    tradition: "Sikh",
    badge: "Takht",
    description:
      "The birthplace of Guru Gobind Singh, the 10th Sikh Guru, one of the five holy Takhts.",
    history:
      "Takht Sri Patna Sahib (also called Takht Sri Harmandir Ji Patna Sahib) is one of the five Takhts of Sikhism, marking the birthplace of Guru Gobind Singh in 1666. The Gurdwara contains several sacred relics of Guru Gobind Singh including his iron arrows, steel sword, pair of sandals, and the Hukumnamas (letters) written by him. The complex also contains the cradle where the infant Guru was kept. Patna City (Patna) is a major pilgrimage destination for Sikhs, especially on Guru Gobind Singh's Prakash Purab.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-s4",
    name: "Damdama Sahib",
    city: "Talwandi Sabo",
    state: "Punjab",
    deity: "Waheguru",
    tradition: "Sikh",
    badge: "Takht",
    description:
      "The fifth Takht of Sikhism, known as 'Guru ki Kashi' — where Guru Gobind Singh recited the Guru Granth Sahib.",
    history:
      "Takht Sri Damdama Sahib in Talwandi Sabo, Bathinda, Punjab, is the fifth and most recently recognized Takht of Sikhism (recognized in 1966). It is called 'Guru ki Kashi' (Kashi of the Guru) because Guru Gobind Singh stayed here for over 9 months in 1706 CE. During this stay, he recited the entire Guru Granth Sahib from memory to Bhai Mani Singh, who wrote it. The Gurdwara complex includes a sarovar (sacred tank) and a library containing rare manuscripts.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-s5",
    name: "Manikaran Sahib",
    city: "Kullu",
    state: "Himachal Pradesh",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "A Gurdwara and Hindu temple complex known for its natural hot springs — langar is cooked in the geothermal water.",
    history:
      "Manikaran Sahib Gurdwara is located in the Parvati Valley near Kullu, Himachal Pradesh. The name means 'ruby from the ear' — according to legend, Goddess Parvati's earring (manikar) fell here and was swallowed by the serpent Sheshnag, who released it through his nostrils with great force, creating the hot springs. The Gurdwara was established in memory of Guru Nanak Dev Ji's visit here. The Langar food is cooked in the boiling geothermal spring water, said to be radioactive yet considered sacred. The site is also important for Hindus.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-s6",
    name: "Hemkund Sahib",
    city: "Chamoli",
    state: "Uttarakhand",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "One of the highest Gurdwaras in the world at 4,329 m, accessible only in summer amidst Himalayan glaciers.",
    history:
      "Hemkund Sahib is one of the highest Gurdwaras in the world, situated at 4,329 meters above sea level in the Chamoli district of Uttarakhand. It is surrounded by seven snow-clad mountain peaks and a glacial lake (Hemkund, meaning 'lake of snow'). The Gurdwara is dedicated to the tenth Sikh Guru, Guru Gobind Singh, who meditated on the banks of this lake in a previous life as described in the Bachitra Natak. The shrine is open only from late May to October due to heavy snowfall. A Laxman temple (for Hindus) is also located nearby.",
    timings: "Open June to October only",
  },
  {
    id: "temple-s7",
    name: "Gurdwara Sis Ganj Sahib",
    city: "New Delhi",
    state: "Delhi",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "Built at the site of the martyrdom of Guru Tegh Bahadur, the ninth Sikh Guru, in 1675.",
    history:
      "Gurdwara Sis Ganj Sahib in Chandni Chowk, Old Delhi, is built on the site where the ninth Sikh Guru, Guru Tegh Bahadur, was beheaded by order of Mughal Emperor Aurangzeb on November 11, 1675. Guru Tegh Bahadur sacrificed his life to protect the freedom of religion of the Kashmiri Pandits. 'Sis Ganj' means 'place of the head.' His severed head was taken to Anandpur Sahib by a devoted Sikh named Jaita. The Gurdwara was built in 1783 by Bghel Singh and is one of the most historic Sikh shrines in Delhi.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-s8",
    name: "Gurdwara Bangla Sahib",
    city: "New Delhi",
    state: "Delhi",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "A prominent Delhi Gurdwara where Guru Har Krishan healed thousands during the smallpox epidemic of 1664.",
    history:
      "Gurdwara Bangla Sahib is one of the most prominent Sikh shrines in New Delhi, associated with the eighth Sikh Guru, Guru Har Krishan, who visited Delhi in 1664 at the invitation of Emperor Aurangzeb. While here, the young Guru (only 7 years old) tended to victims of a smallpox and cholera epidemic, and miraculously healed thousands by distributing holy water from the sarovar (sacred tank). The Guru himself contracted the disease and attained martyrdom in Delhi. The beautiful gilded dome and sarovar are landmarks of New Delhi.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-s9",
    name: "Gurdwara Rakab Ganj Sahib",
    city: "New Delhi",
    state: "Delhi",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "Built at the site where the body of Guru Tegh Bahadur was cremated by a devoted Sikh who set fire to his own home.",
    history:
      "Gurdwara Rakab Ganj Sahib in New Delhi is near the Parliament House. It is built on the site where the headless body of Guru Tegh Bahadur was cremated by Lakhi Shah Vanjara, a devoted Sikh. After the Guru was beheaded at Chandni Chowk, Lakhi Shah Vanjara brought the body to his village (Rakab Ganj) and set fire to his own house to cremate the Guru respectfully. The Gurdwara was built in 1783 by Bghel Singh. The complex is situated beside the Indian Parliament building.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-s10",
    name: "Fatehgarh Sahib",
    city: "Fatehgarh Sahib",
    state: "Punjab",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "Memorial Gurdwara at the site of martyrdom of the two younger Sahibzadas (sons) of Guru Gobind Singh.",
    history:
      "Gurdwara Fatehgarh Sahib in the Fatehgarh Sahib district of Punjab commemorates the martyrdom of the two younger sons of Guru Gobind Singh — Sahibzada Zorawar Singh (age 9) and Sahibzada Fateh Singh (age 7) — who were bricked alive on the orders of the Mughal governor Wazir Khan in December 1705 for refusing to convert to Islam. The Gurdwara was built on the site of the tower where they were immured. The Shaheedi Jor Mela (martyrdom fair) is held every December attracting hundreds of thousands of pilgrims.",
    timings: "Open 24 hours",
  },
];

// Build a lookup map: normalized name → enriched entry
const ENRICHED_MAP = new Map(
  TEMPLES_DATA.map((e) => [e.name.toLowerCase(), e]),
);

function getEnriched(name: string) {
  return ENRICHED_MAP.get(name.toLowerCase()) ?? null;
}

type TraditionFilter = "All" | "Hindu" | "Jain" | "Sikh";
type ViewMode = "faith" | "state";

const TRADITION_COLORS: Record<
  string,
  { bg: string; text: string; border: string; accent: string }
> = {
  Hindu: {
    bg: "oklch(0.68 0.20 48 / 0.12)",
    text: "oklch(0.72 0.18 48)",
    border: "oklch(0.68 0.20 48 / 0.35)",
    accent: "oklch(0.68 0.20 48)",
  },
  Jain: {
    bg: "oklch(0.55 0.18 145 / 0.12)",
    text: "oklch(0.55 0.16 145)",
    border: "oklch(0.55 0.18 145 / 0.35)",
    accent: "oklch(0.55 0.18 145)",
  },
  Sikh: {
    bg: "oklch(0.45 0.15 250 / 0.12)",
    text: "oklch(0.60 0.16 250)",
    border: "oklch(0.45 0.15 250 / 0.35)",
    accent: "oklch(0.55 0.18 250)",
  },
};

const BADGE_LABELS: Record<string, string> = {
  Jyotirlinga: "Jyotirlinga",
  "Char Dham": "Char Dham",
  "Char Dham · Jyotirlinga": "Char Dham · Jyotirlinga",
  Takht: "Takht",
  "Akal Takht": "Akal Takht",
  "Panch Tirth": "Panch Tirth",
  "Panch Kalyanak": "Panch Kalyanak",
  "Shakti Peetha": "Shakti Peetha",
  "UNESCO Heritage": "UNESCO",
};

function MustVisitBadge({ badge }: { badge: string }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[9px] font-heading font-bold px-1.5 py-0.5 rounded-full"
      style={{
        background: "oklch(0.78 0.14 75 / 0.15)",
        color: "oklch(0.78 0.14 75)",
        border: "1px solid oklch(0.78 0.14 75 / 0.3)",
      }}
    >
      <Star className="h-2 w-2 fill-current" />
      {BADGE_LABELS[badge] ?? badge}
    </span>
  );
}

export default function TempleDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [traditionFilter, setTraditionFilter] =
    useState<TraditionFilter>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("faith");
  const [selectedTemple, setSelectedTemple] = useState<TempleItem | null>(null);
  const { data: backendTemples = [] } = useGetAllTemples();

  const backendTempleItems: TempleItem[] = backendTemples.map((t) => ({
    id: t.id,
    name: t.name,
    city: t.location.split(",")[0]?.trim() || t.location,
    state: t.location.split(",")[1]?.trim() || "",
    deity: t.deity,
    tradition: "Hindu" as const,
    description: t.description,
    history: t.description,
  }));

  const allTemples = useMemo(() => {
    const combined = [...SEED_TEMPLES, ...backendTempleItems];
    const unique = new Map(combined.map((t) => [t.id, t]));
    return Array.from(unique.values());
  }, [backendTempleItems]);

  const filtered = useMemo(() => {
    return allTemples.filter((t) => {
      const matchesTradition =
        traditionFilter === "All" || t.tradition === traditionFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.state.toLowerCase().includes(q) ||
        t.deity.toLowerCase().includes(q);
      return matchesTradition && matchesSearch;
    });
  }, [allTemples, traditionFilter, searchQuery]);

  const hinduCount = allTemples.filter((t) => t.tradition === "Hindu").length;
  const jainCount = allTemples.filter((t) => t.tradition === "Jain").length;
  const sikhCount = allTemples.filter((t) => t.tradition === "Sikh").length;

  // Group by state when viewMode === "state"
  const groupedByState = useMemo(() => {
    if (viewMode !== "state") return null;
    const groups: Record<string, TempleItem[]> = {};
    for (const t of filtered) {
      const key = t.state || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered, viewMode]);

  const renderTempleCard = (temple: TempleItem, idx: number) => {
    const tradStyle = TRADITION_COLORS[temple.tradition];
    const enriched = getEnriched(temple.name);
    return (
      <button
        type="button"
        key={temple.id}
        data-ocid={`temples.item.${idx + 1}`}
        onClick={() => setSelectedTemple(temple)}
        className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer flex flex-col"
        style={{
          background: "oklch(0.20 0.07 24)",
          borderColor: "oklch(0.78 0.14 75 / 0.15)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = tradStyle.border;
          (e.currentTarget as HTMLElement).style.boxShadow =
            `0 0 18px ${tradStyle.bg}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "oklch(0.78 0.14 75 / 0.15)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-3 gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
            style={{
              background: tradStyle.bg,
              border: `1px solid ${tradStyle.border}`,
            }}
          >
            {temple.tradition === "Sikh"
              ? "🪯"
              : temple.tradition === "Jain"
                ? "☸️"
                : "🛕"}
          </div>
          <span
            className="text-xs font-heading font-semibold px-2 py-0.5 rounded-full border"
            style={{
              background: tradStyle.bg,
              color: tradStyle.text,
              borderColor: tradStyle.border,
            }}
          >
            {temple.tradition}
          </span>
        </div>

        {/* Temple name + Hindi name */}
        <h3
          className="font-heading font-bold text-sm mb-0.5 group-hover:underline leading-tight"
          style={{ color: "oklch(0.90 0.06 70)" }}
        >
          {temple.name}
        </h3>
        {enriched?.nameHindi && (
          <p
            className="font-body text-[11px] mb-1"
            style={{
              color: "oklch(0.68 0.08 60)",
              fontFamily: "var(--font-devanagari, serif)",
            }}
          >
            {enriched.nameHindi}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center gap-1 mb-2">
          <MapPin
            className="h-3 w-3 shrink-0"
            style={{ color: "oklch(0.55 0.05 55)" }}
          />
          <p
            className="font-body text-xs truncate"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            {temple.city}
            {temple.state ? `, ${temple.state}` : ""}
          </p>
        </div>

        {/* Deity badge */}
        <Badge
          variant="outline"
          className="text-xs mb-2 font-body w-fit max-w-full truncate"
          style={{
            borderColor: "oklch(0.68 0.20 48 / 0.25)",
            color: "oklch(0.72 0.16 55)",
          }}
        >
          {temple.deity}
        </Badge>

        {/* Must-visit badge */}
        {temple.badge && (
          <div className="mb-2">
            <MustVisitBadge badge={temple.badge} />
          </div>
        )}

        {/* Description */}
        <p
          className="font-body text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: "oklch(0.58 0.04 55)" }}
        >
          {enriched?.shortDescription ?? temple.description}
        </p>

        {/* Benefits tags */}
        {enriched?.benefits && enriched.benefits.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {enriched.benefits.slice(0, 3).map((b) => (
              <span
                key={b}
                className="text-[9px] font-heading font-medium px-1.5 py-0.5 rounded-full"
                style={{
                  background: tradStyle.bg,
                  color: tradStyle.text,
                  border: `1px solid ${tradStyle.border}`,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          {temple.timings && (
            <span
              className="text-[10px] font-body"
              style={{ color: "oklch(0.55 0.05 60)" }}
            >
              🕐 {temple.timings.split("(")[0].trim().split(",")[0]}
            </span>
          )}
          <span
            className="text-xs font-heading font-semibold ml-auto"
            style={{ color: tradStyle.accent }}
          >
            Details →
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-14 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 30) 0%, oklch(0.26 0.10 50) 50%, oklch(0.20 0.08 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-5xl mb-3">🛕</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Temple Directory
          </h1>
          <p
            className="font-body text-xl mb-4"
            style={{ color: "oklch(0.85 0.07 65)", fontFamily: "serif" }}
          >
            मंदिर निर्देशिका
          </p>

          {/* Global stats bar */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-3"
            style={{
              background: "oklch(0.78 0.14 75 / 0.10)",
              borderColor: "oklch(0.78 0.14 75 / 0.35)",
            }}
          >
            <span className="text-xl">🛕</span>
            <span
              className="font-heading font-bold text-sm tracking-wide"
              style={{ color: "oklch(0.88 0.12 72)" }}
            >
              {allTemples.length}+ Sacred Temples
            </span>
            <span style={{ color: "oklch(0.55 0.05 55)" }}>·</span>
            <span
              className="font-heading font-semibold text-xs"
              style={{ color: "oklch(0.78 0.10 65)" }}
            >
              3 Faiths
            </span>
            <span style={{ color: "oklch(0.55 0.05 55)" }}>·</span>
            <span
              className="font-heading font-semibold text-xs"
              style={{ color: "oklch(0.78 0.10 65)" }}
            >
              All India
            </span>
          </div>

          {/* Stats Banner */}
          <div className="inline-flex gap-1 flex-wrap justify-center mt-2">
            {[
              {
                label: "Hindu Temples",
                count: hinduCount,
                color: "oklch(0.72 0.18 48)",
              },
              {
                label: "Jain Temples",
                count: jainCount,
                color: "oklch(0.55 0.16 145)",
              },
              {
                label: "Sikh Gurdwaras",
                count: sikhCount,
                color: "oklch(0.60 0.16 250)",
              },
            ].map(({ label, count, color }) => (
              <span
                key={label}
                className="font-heading font-semibold text-xs px-3 py-1.5 rounded-full border"
                style={{
                  background: `${color.replace(")", " / 0.12)")}`,
                  borderColor: `${color.replace(")", " / 0.3)")}`,
                  color,
                }}
              >
                {count} {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section
        className="sticky top-16 z-30 py-3 px-4 border-b"
        style={{
          background: "oklch(0.17 0.06 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.55 0.05 55)" }}
              />
              <Input
                data-ocid="temples.search_input"
                type="text"
                placeholder="Search by name, city, state, deity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border font-body text-sm"
                style={{
                  background: "oklch(0.20 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.88 0.04 70)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  <X
                    className="h-4 w-4"
                    style={{ color: "oklch(0.55 0.05 55)" }}
                  />
                </button>
              )}
            </div>

            {/* Faith filters */}
            <div className="flex gap-1.5 flex-wrap justify-center">
              {(["All", "Hindu", "Jain", "Sikh"] as TraditionFilter[]).map(
                (t) => (
                  <button
                    type="button"
                    key={t}
                    data-ocid={`temples.${t.toLowerCase()}.tab`}
                    onClick={() => setTraditionFilter(t)}
                    className="px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                    style={{
                      background:
                        traditionFilter === t
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.22 0.07 24)",
                      color:
                        traditionFilter === t ? "white" : "oklch(0.72 0.05 60)",
                      border: "1px solid",
                      borderColor:
                        traditionFilter === t
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.78 0.14 75 / 0.18)",
                    }}
                  >
                    {t}
                  </button>
                ),
              )}
            </div>

            {/* View mode toggle */}
            <div
              className="flex rounded-lg border overflow-hidden shrink-0"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.18)" }}
            >
              {(["faith", "state"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  data-ocid={`temples.view.${mode}`}
                  onClick={() => setViewMode(mode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-medium transition-colors"
                  style={{
                    background:
                      viewMode === mode
                        ? "oklch(0.28 0.09 35)"
                        : "oklch(0.20 0.07 24)",
                    color:
                      viewMode === mode
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.60 0.04 60)",
                  }}
                >
                  <Building2 className="h-3 w-3" />
                  {mode === "faith" ? "By Faith" : "By State"}
                </button>
              ))}
            </div>
          </div>

          <p
            className="text-center mt-2 text-xs font-body"
            style={{ color: "oklch(0.52 0.04 55)" }}
          >
            {filtered.length} temples found
          </p>
        </div>
      </section>

      {/* Temple Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div data-ocid="temples.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🛕</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.55 0.05 55)" }}
              >
                No temples found for your search.
              </p>
              <Button
                variant="outline"
                className="mt-4 font-heading text-sm"
                onClick={() => {
                  setSearchQuery("");
                  setTraditionFilter("All");
                }}
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.3)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : viewMode === "state" && groupedByState ? (
            <div className="space-y-10">
              {groupedByState.map(([state, temples]) => (
                <div key={state}>
                  <div className="flex items-center gap-3 mb-5">
                    <MapPin
                      className="h-4 w-4 shrink-0"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    />
                    <h2
                      className="font-heading font-bold text-base"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {state}
                    </h2>
                    <span
                      className="text-xs font-body px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.22 0.07 24)",
                        color: "oklch(0.55 0.04 55)",
                      }}
                    >
                      {temples.length}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: "oklch(0.78 0.14 75 / 0.1)" }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {temples.map((temple, idx) =>
                      renderTempleCard(temple, idx),
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((temple, idx) => renderTempleCard(temple, idx))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedTemple}
        onOpenChange={(open) => !open && setSelectedTemple(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="temples.dialog"
          style={{
            background: "oklch(0.18 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.22)",
          }}
        >
          {selectedTemple &&
            (() => {
              const tradStyle = TRADITION_COLORS[selectedTemple.tradition];
              return (
                <>
                  <DialogHeader>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{
                          background: tradStyle.bg,
                          border: `1px solid ${tradStyle.border}`,
                        }}
                      >
                        {selectedTemple.tradition === "Sikh"
                          ? "🪯"
                          : selectedTemple.tradition === "Jain"
                            ? "☸️"
                            : "🛕"}
                      </div>
                      <div className="min-w-0">
                        <DialogTitle
                          className="font-decorative text-xl leading-tight"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          {selectedTemple.name}
                        </DialogTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin
                            className="h-3 w-3 shrink-0"
                            style={{ color: "oklch(0.55 0.04 55)" }}
                          />
                          <p
                            className="font-body text-sm"
                            style={{ color: "oklch(0.60 0.04 55)" }}
                          >
                            {selectedTemple.city}
                            {selectedTemple.state
                              ? `, ${selectedTemple.state}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Badges row */}
                    <div className="flex gap-2 flex-wrap mt-3">
                      <Badge
                        className="font-body text-xs"
                        style={{
                          background: tradStyle.bg,
                          color: tradStyle.text,
                          border: `1px solid ${tradStyle.border}`,
                        }}
                      >
                        {selectedTemple.tradition}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="font-body text-xs"
                        style={{
                          borderColor: "oklch(0.68 0.20 48 / 0.35)",
                          color: "oklch(0.68 0.20 48)",
                        }}
                      >
                        {selectedTemple.deity}
                      </Badge>
                      {selectedTemple.badge && (
                        <MustVisitBadge badge={selectedTemple.badge} />
                      )}
                    </div>
                  </DialogHeader>

                  {selectedTemple.timings && (
                    <div
                      className="p-3 rounded-lg border mt-3"
                      style={{
                        background: "oklch(0.21 0.07 26)",
                        borderColor: "oklch(0.68 0.20 48 / 0.2)",
                      }}
                    >
                      <p
                        className="font-heading text-xs font-semibold mb-1"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      >
                        🕐 Darshan Timings
                      </p>
                      <p
                        className="font-body text-sm"
                        style={{ color: "oklch(0.78 0.04 65)" }}
                      >
                        {selectedTemple.timings}
                      </p>
                    </div>
                  )}

                  <div
                    className="mt-4 p-5 rounded-xl border"
                    style={{
                      background: "oklch(0.21 0.07 26)",
                      borderColor: "oklch(0.78 0.14 75 / 0.1)",
                    }}
                  >
                    <h4
                      className="font-heading font-semibold text-sm mb-3"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      History & Significance
                    </h4>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "oklch(0.78 0.04 65)" }}
                    >
                      {selectedTemple.history}
                    </p>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button
                      data-ocid="temples.close_button"
                      variant="outline"
                      onClick={() => setSelectedTemple(null)}
                      className="font-heading text-sm"
                      style={{
                        borderColor: "oklch(0.78 0.14 75 / 0.3)",
                        color: "oklch(0.78 0.14 75)",
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
