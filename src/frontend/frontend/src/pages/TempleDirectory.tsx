import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPin, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
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
}

const SEED_TEMPLES: TempleItem[] = [
  {
    id: "temple-1",
    name: "Kashi Vishwanath Temple",
    city: "Varanasi",
    state: "Uttar Pradesh",
    deity: "Lord Shiva",
    tradition: "Hindu",
    description:
      "One of the most sacred temples of Lord Shiva, situated on the western bank of the holy River Ganga.",
    history:
      "The Kashi Vishwanath Temple is one of the twelve Jyotirlingas, considered the holiest of all shrines dedicated to Lord Shiva. The original temple was destroyed by Mughal ruler Aurangzeb in 1669 and a mosque was built on its ruins. The present temple was built in 1780 by Maratha monarch Ahilyabai Holkar. The temple stands on the western bank of the holy river Ganga, and is made up of a series of smaller shrines. The main deity, Shivalingam, is 60 cm tall and 90 cm in circumference, and is housed in a silver altar. The temple is visited by thousands of devotees daily, and is believed that a pilgrimage to Kashi and a darshan of Lord Vishwanath ensures moksha (liberation).",
    timings: "4:00 AM - 11:00 PM (Darshan hours vary by season)",
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
      "Ram Janmabhoomi in Ayodhya is considered the birthplace of Lord Ram, the seventh avatar of Vishnu. The site has immense religious significance for Hindus worldwide. After a prolonged legal battle spanning decades, the Supreme Court of India in November 2019 ruled in favor of the construction of a Ram Temple at the disputed site. The foundation stone was laid by Prime Minister Narendra Modi in August 2020. The magnificent new Ram Mandir was consecrated on January 22, 2024. The temple is built in Nagara style architecture with three floors, reaching a height of 161 feet. It is one of the largest Hindu temples in the world.",
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
      "Sri Krishna Janmabhoomi in Mathura marks the exact spot where Lord Krishna was born over 5,000 years ago. The site has a prison cell (kara griha) where Vasudeva and Devaki were imprisoned by Kansa when Krishna was born. The temple complex includes the main shrine of Krishna, Rangabhoomi, and the historic Keshava Dev temple. The area was repeatedly desecrated and rebuilt through history. The current complex was built and managed by the Sri Krishna Janmabhoomi Trust. Mathura is one of the seven sacred cities (Saptapuris) of Hinduism and is thronged by millions of pilgrims, especially during Janmashtami.",
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:30 PM",
  },
  {
    id: "temple-4",
    name: "Somnath Temple",
    city: "Prabhas Patan",
    state: "Gujarat",
    deity: "Lord Shiva",
    tradition: "Hindu",
    description:
      "The first and foremost among the twelve Jyotirlingas, rebuilt 17 times after destruction by invaders.",
    history:
      "The Somnath Temple, also called the Shrine Eternal, stands on the western coast of Gujarat at Prabhas Patan (Veraval). It is the first of the twelve Jyotirlinga shrines of Shiva. Mentioned in ancient texts like the Skanda Purana, Shiva Purana, and Dwarka Mahatmya, the temple has a legendary origin. According to legend, the Moon God (Chandra) built the original Somnath temple in gold, then Ravana rebuilt it in silver, Krishna in wood, and finally Bhimdev in stone. The temple was looted 17 times by various invaders, most famously by Mahmud of Ghazni in 1026 CE, but was rebuilt each time by Hindu kings. The current temple was rebuilt after India's independence, with the construction beginning in 1947 under Sardar Vallabhbhai Patel.",
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
      "The Sri Venkateswara Temple, located on the seventh peak (Venkatachalam) of the Tirumala hills, is the most visited place of worship in the world with over 50,000–100,000 visitors daily. The temple is dedicated to Sri Venkateswara, a form of Vishnu. The presiding deity is also known as Balaji, Govinda, and Srinivasa. The temple is managed by the Tirumala Tirupati Devasthanams (TTD). The main tower (Gopuram) is 53 meters high. The temple is known for the practice of devotees offering their hair (tonsure) as an act of gratitude. The temple receives one of the highest donations in the world, making it the wealthiest religious institution.",
    timings: "2:30 AM - 1:30 AM (almost 24 hours)",
  },
  {
    id: "temple-6",
    name: "Golden Temple (Harmandir Sahib)",
    city: "Amritsar",
    state: "Punjab",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "The holiest Gurdwara of Sikhism, built by Guru Arjan Dev Ji, sheathed in gold and reflecting in the sacred Amrit Sarovar.",
    history:
      "The Harmandir Sahib (abode of God), colloquially known as the Golden Temple, is the holiest Gurdwara of Sikhism. It is located in Amritsar, Punjab, India. The temple is built in the middle of the sacred tank called Amrit Sarovar (Pool of Nectar). The foundation stone was laid by the fifth Sikh Guru, Guru Arjan Dev, in 1588. The lower part of the temple is made of white marble while the upper part is covered in gold. Unlike most Hindu and Sikh temples that face east, the Golden Temple faces all four directions to symbolize the openness of the Sikh faith. The temple houses the Guru Granth Sahib (the holy book). The Langar (community kitchen) serves free meals to over 100,000 people daily without discrimination.",
    timings: "Open 24 hours",
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
      "Sai Baba of Shirdi was an Indian spiritual master who was and is regarded by his devotees as a saint. He is worshipped by people of both Hindu and Muslim faith. The Sai Baba temple in Shirdi, Maharashtra, is one of the most visited pilgrimage sites in India with thousands of devotees visiting daily. Sai Baba lived in Shirdi for most of his life, from around 1858 to 1918. The temple complex encompasses the Samadhi Mandir (where Sai Baba's tomb is located), the Dwarkamai mosque where Sai Baba lived, the Chawdi where he slept alternately, and the Lendi Baug garden where he tended plants. The trust that manages the temple is one of the wealthiest religious trusts in India.",
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
      "The Shri Mata Vaishno Devi Temple is a Hindu temple dedicated to Mata Vaishno Devi, a manifestation of the Hindu Goddess Shakti. It is located in the Trikuta Mountains within the Reasi district of the Union Territory of Jammu and Kashmir, India, at an altitude of 5,200 feet. The temple is one of the most popular Hindu pilgrimages, attracting about 8 million visitors annually. The trek from the base camp at Katra to the main shrine is approximately 14 km. According to legend, Mata Vaishno Devi appeared in a cave and pursued a demon (Bhairon Nath) for several years. The shrine inside the cave contains three naturally occurring rock formations representing the three aspects of the Goddess: Mahakali, Mahalakshmi, and Mahasaraswati.",
    timings: "Darshan available 24 hours",
  },
  {
    id: "temple-9",
    name: "Siddhivinayak Temple",
    city: "Prabhadevi, Mumbai",
    state: "Maharashtra",
    deity: "Lord Ganesha",
    tradition: "Hindu",
    description:
      "One of the most visited temples in Mumbai, dedicated to Siddhivinayak Ganesha who grants all wishes.",
    history:
      "The Siddhivinayak Temple in Prabhadevi, Mumbai is one of the most important religious and historic temples in Mumbai, Maharashtra, India. The temple was originally built by Laxman Vithu and Deubai Patil in 1801. The main deity is Lord Ganesha, known as Siddhivinayak (the Lord who grants wishes and fulfills desires). The idol of Ganesha in this temple is unique in that his trunk is turned to the right, unlike most Ganesha idols. The temple was renovated multiple times. The current structure was built in 1991 with a golden dome. It is one of the richest temples in India and attracts millions of devotees including celebrities, politicians, and businesspeople who seek Ganesha's blessings before important ventures.",
    timings: "5:30 AM - 10:00 PM (Tuesdays have special extended hours)",
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
      "The Meenakshi Sundareswarar Temple is a historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu, India. It is dedicated to Goddess Meenakshi (a form of Parvati) and her consort Sundareswarar (Lord Shiva). The temple forms the heart and lifeline of Madurai. According to legend, Shiva came down to Earth to marry Meenakshi. The temple was originally built by Kulasekara Pandya, but the main complex was built and expanded by the Nayak kings during the 16th-17th centuries. The temple complex has 14 gateway towers (gopurams), the highest being about 52 meters tall and decorated with thousands of sculptures. The Hall of Thousand Pillars (Ayiram Kaal Mandapam) and the Golden Lotus Tank are major attractions within the complex.",
    timings: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
  },
  {
    id: "temple-11",
    name: "Jagannath Temple",
    city: "Puri",
    state: "Odisha",
    deity: "Lord Jagannath (Vishnu)",
    tradition: "Hindu",
    description:
      "One of the Char Dham pilgrimage sites, home of the famous Rath Yatra festival.",
    history:
      'The Jagannath Temple in Puri, Odisha, is one of the most celebrated pilgrimage sites in India, and one of the four sacred dhams (Char Dham). It is dedicated to Jagannath (a form of Vishnu), along with his siblings Balabhadra and Subhadra. The temple was built in the 12th century by King Anantavarman Chodaganga Deva. The main tower (Shikhara) is 65 meters high. The temple is known for the annual Rath Yatra (chariot festival) in which the deities are placed in large chariots and pulled by devotees through the town. The word "Juggernaut" in English is derived from "Jagannath." Non-Hindus are not allowed inside the main temple, though they can view it from a rooftop nearby.',
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
  },
  {
    id: "temple-12",
    name: "Kedarnath Temple",
    city: "Kedarnath",
    state: "Uttarakhand",
    deity: "Lord Shiva",
    tradition: "Hindu",
    description:
      "Located at 3,583 meters in the Himalayas, one of the twelve Jyotirlingas and part of the Char Dham Yatra.",
    history:
      "Kedarnath is one of the most important pilgrimage sites in Hinduism. Situated at an altitude of 3,583 meters in the Garhwal Himalayas, it is part of the sacred Char Dham Yatra. The temple is one of the twelve Jyotirlingas of Lord Shiva. According to legend, the Pandavas sought Lord Shiva for his blessings after the Kurukshetra War, and Shiva evaded them by taking the form of a bull. When discovered, Shiva dived underground leaving his back visible, which is what is now worshipped at Kedarnath. The main part of the temple is believed to be about 1,000 years old, with a reconstruction attributed to Adi Shankaracharya. In June 2013, a massive flood severely damaged the surrounding town, but the main temple structure remained largely intact. The site is only accessible during summer months (May to November) as it remains buried under snow in winter.",
    timings: "Open only from May to November (weather dependent)",
  },
  {
    id: "temple-13",
    name: "Badrinath Temple",
    city: "Badrinath",
    state: "Uttarakhand",
    deity: "Lord Vishnu",
    tradition: "Hindu",
    description:
      "One of the four sacred Char Dham sites, dedicated to Lord Vishnu, situated between Nar and Narayan mountain ranges.",
    history:
      "The Badrinath Temple is one of the four sacred Char Dham pilgrimage sites, and one of the 108 Divya Desams (sacred Vishnu temples). It is located at an altitude of 3,133 meters in the Chamoli district of Uttarakhand, India, on the banks of the Alaknanda River. The presiding deity is Badrinarayan, a form of Vishnu. The temple is believed to have been established by the Hindu philosopher Adi Shankaracharya in the 8th century CE. According to legend, Lord Vishnu meditated here (in the form of a child) under a Badri tree while Goddess Lakshmi protected him from snow and rain. The current structure dates to the 17th century, when the King of Garhwal rebuilt the temple after it was destroyed by an avalanche. Like Kedarnath, the temple is open only from late April/May to November.",
    timings: "Open only from late April to November",
  },
  {
    id: "temple-14",
    name: "Mahakaleshwar Temple",
    city: "Ujjain",
    state: "Madhya Pradesh",
    deity: "Lord Shiva",
    tradition: "Hindu",
    description:
      "One of the twelve Jyotirlingas, known for the unique swayambhu (self-manifested) linga and the famous Bhasma Aarti.",
    history:
      "The Mahakaleshwar Temple is one of the twelve Jyotirlingas of Lord Shiva. It is located in Ujjain, Madhya Pradesh, India, on the banks of the holy Shipra (Kshipra) river. The presiding deity, Mahakaleshwar, is one of the important Shiva shrines in India. The temple is unique in that the lingam here is a swayambhu (self-manifested), deriving energy from within rather than being ritually installed. The temple is famous for its Bhasma Aarti performed early in the morning using sacred ash (bhasma). According to legend, this is where Lord Shiva saved Ujjain from evil forces. The five-story temple complex includes shrines to Ganesh, Parvati, Kartikay, and Nandi. Ujjain is one of the seven sacred cities of India and hosts the Kumbh Mela every 12 years.",
    timings: "3:00 AM - 11:00 PM (Bhasma Aarti at 4:00 AM)",
  },
  {
    id: "temple-15",
    name: "Dilwara Jain Temples",
    city: "Mount Abu",
    state: "Rajasthan",
    deity: "Rishabhanatha & Neminatha",
    tradition: "Jain",
    description:
      "A complex of five Jain temples renowned for their extraordinary marble carvings and intricate craftsmanship.",
    history:
      "The Dilwara Temples are located at Mount Abu, Rajasthan, and are considered the finest example of Jain temple architecture. Built between the 11th and 13th centuries, these temples are renowned for their extraordinary marble carvings. There are five temples in the complex. The Vimal Vasahi temple (built in 1031 CE) is dedicated to Adinath (Rishabhanatha), the first Tirthankar, and was built by Vimal Shah. The Luna Vasahi temple (built in 1231 CE) is dedicated to Neminatha, the 22nd Tirthankar. The level of detail in the marble carvings is astounding — the ceilings have intricate lotus designs, the pillars have elaborate figures of deities and dancers, and every surface is carved with incredible precision. The temples are a UNESCO World Heritage site candidate.",
    timings: "12:00 PM - 6:00 PM (Non-Jains)",
  },
  {
    id: "temple-16",
    name: "Ranakpur Jain Temple",
    city: "Ranakpur",
    state: "Rajasthan",
    deity: "Adinath (Rishabhanatha)",
    tradition: "Jain",
    description:
      "A stunning 15th-century Jain temple with 1,444 intricately carved marble pillars, no two alike.",
    history:
      'The Ranakpur Jain Temple, also known as Chaturmukha Dharana Vihara, is a Jain temple located near Ranakpur village in the Pali district of Rajasthan, India. Built in the 15th century (around 1437 CE), it is dedicated to Tirthankara Adinath (Rishabhanatha). The complex is considered one of the most important and largest Jain temples in India. The temple is most notable for its 1,444 exquisitely carved marble pillars — no two are alike. The complex covers an area of about 48,000 square feet and took 50 years to build. The architecture is unique in that the main temple is on two levels and has 24 pillared halls, each with domed ceilings. The temple is called "Dharna Vihar" because it is set in a valley surrounded by forests of the Aravalli hills.',
    timings: "12:00 PM - 5:00 PM (Non-Jains)",
  },
  {
    id: "temple-17",
    name: "Palitana Jain Temples",
    city: "Palitana",
    state: "Gujarat",
    deity: "Adinath (First Tirthankar)",
    tradition: "Jain",
    description:
      "The holiest Jain pilgrimage site with over 900 temples on Shatrunjaya Hill, the world's largest temple city.",
    history:
      'Palitana, in the Bhavnagar district of Gujarat, is considered one of the most important sacred pilgrimage sites in Jainism. The Shatrunjaya hill complex contains over 900 temples, making it the largest temple city in the world. The name Palitana comes from "Palittana," meaning "city of temples." The hill is considered so sacred that no one is allowed to live on it permanently. The main temple is dedicated to Adinath, the first Tirthankara. According to Jain tradition, Adinath meditated on this hill and attained nirvana here. The temples were built over many centuries, from the 11th century onwards. The pilgrimage involves climbing 3,500 steps on a 600-meter high hill. Palitana has been declared a vegetarian city by the local municipality.',
    timings: "First light to sunset (seasonal)",
  },
  {
    id: "temple-18",
    name: "Shravanabelagola",
    city: "Shravanabelagola",
    state: "Karnataka",
    deity: "Bahubali (Gomateshwara)",
    tradition: "Jain",
    description:
      "Home of the 57-foot monolithic statue of Bahubali (Gomateshwara), one of the largest free-standing statues in the world.",
    history:
      "Shravanabelagola is a Jain pilgrimage site in the Hassan district of Karnataka, India. It is most famous for the monolithic statue of Bahubali (also known as Gomateshwara), which stands 57 feet (17.4 meters) tall on the top of Vindhyagiri Hill. The statue was carved out of a single piece of granite rock in 981 CE by the Ganga minister and military commander Chavundaraya. Bahubali was a legendary figure in Jainism, the son of Adinath (the first Tirthankara), who renounced his kingdom and practiced extreme meditation for a year, standing motionless while vines and anthills grew around him, until he attained enlightenment. The statue is the site of Mahamastakabhisheka (head anointing ceremony), which occurs once every 12 years and is attended by millions.",
    timings: "6:30 AM - 6:30 PM",
  },
  {
    id: "temple-19",
    name: "Hazur Sahib Gurdwara",
    city: "Nanded",
    state: "Maharashtra",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "One of the five Takhts (holy seats of authority) of Sikhism, where the 10th Sikh Guru, Gobind Singh, passed away.",
    history:
      "Hazur Sahib (also known as Nanded Sahib or Sachkhand Sri Hazur Abchal Nagar Sahib) is a Gurdwara located in Nanded, Maharashtra, India. It is one of the five Takhts (seat of temporal and religious authority) of Sikhism and is considered one of the most sacred Sikh sites. The Gurdwara stands at the spot where the tenth Sikh Guru, Guru Gobind Singh, passed away in 1708 after being stabbed by an assassin. The Guru is believed to have given his final benediction here and conferred guruship on the Guru Granth Sahib. The complex contains many shrines related to the Guru's life, including his weapons, personal effects, and the spot where he breathed his last. The Gurdwara complex is also known as Sachkhand because Guru Gobind Singh is believed to have merged with the Infinite (Waheguru) here.",
    timings: "Open 24 hours",
  },
  {
    id: "temple-20",
    name: "Anandpur Sahib Gurdwara",
    city: "Anandpur Sahib",
    state: "Punjab",
    deity: "Waheguru",
    tradition: "Sikh",
    description:
      "The birthplace of the Khalsa and one of the holiest cities in Sikhism, founded by Guru Tegh Bahadur.",
    history:
      "Anandpur Sahib (City of Bliss) is a city in the Rupnagar district of Punjab, India. It is one of the most sacred places in Sikhism as it is the birthplace of the Khalsa (the Sikh community of initiated people) on Vaisakhi of 1699, when the 10th Sikh Guru, Guru Gobind Singh, baptized the Panj Piaras (Five Beloved Ones) and established the Khalsa order. The city was founded by the ninth Sikh Guru, Guru Tegh Bahadur, in 1665. The most notable Gurdwara in Anandpur Sahib is Takht Sri Kesgarh Sahib, which is one of the five Takhts. The city hosts one of the largest gatherings in the world during the Hola Mohalla festival (the Sikh version of Holi), initiated by Guru Gobind Singh in 1700.",
    timings: "Open 24 hours",
  },
];

type TraditionFilter = "All" | "Hindu" | "Jain" | "Sikh";

const TRADITION_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Hindu: {
    bg: "oklch(0.68 0.20 48 / 0.15)",
    text: "oklch(0.68 0.20 48)",
    border: "oklch(0.68 0.20 48 / 0.4)",
  },
  Jain: {
    bg: "oklch(0.55 0.18 145 / 0.15)",
    text: "oklch(0.45 0.18 145)",
    border: "oklch(0.55 0.18 145 / 0.4)",
  },
  Sikh: {
    bg: "oklch(0.45 0.15 250 / 0.15)",
    text: "oklch(0.55 0.18 250)",
    border: "oklch(0.45 0.15 250 / 0.4)",
  },
};

export default function TempleDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [traditionFilter, setTraditionFilter] =
    useState<TraditionFilter>("All");
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

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 30) 0%, oklch(0.26 0.10 50) 50%, oklch(0.20 0.08 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">🛕</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Temple Directory
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)", fontFamily: "serif" }}
          >
            मंदिर निर्देशिका
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {filtered.length} Sacred Temples — Hindu · Jain · Sikh
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section
        className="sticky top-16 z-30 py-4 px-4 border-b"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.60 0.06 55)" }}
              />
              <Input
                data-ocid="temples.search_input"
                type="text"
                placeholder="Search by name, city, state, deity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border font-body"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.90 0.04 70)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X
                    className="h-4 w-4"
                    style={{ color: "oklch(0.60 0.06 55)" }}
                  />
                </button>
              )}
            </div>
            <div className="flex gap-1.5">
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
                        traditionFilter === t ? "white" : "oklch(0.78 0.06 60)",
                      border: "1px solid",
                      borderColor:
                        traditionFilter === t
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.78 0.14 75 / 0.2)",
                    }}
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div data-ocid="temples.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🛕</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                No temples found for your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((temple, idx) => {
                const tradStyle = TRADITION_COLORS[temple.tradition];
                return (
                  <button
                    type="button"
                    key={temple.id}
                    data-ocid={`temples.item.${idx + 1}`}
                    onClick={() => setSelectedTemple(temple)}
                    className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
                    style={{
                      background: "oklch(0.20 0.07 24)",
                      borderColor: "oklch(0.78 0.14 75 / 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.45)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 20px oklch(0.78 0.14 75 / 0.10)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.15)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-2xl">🛕</div>
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
                    <h3
                      className="font-heading font-bold text-base mb-1 group-hover:underline leading-tight"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      {temple.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin
                        className="h-3 w-3"
                        style={{ color: "oklch(0.60 0.06 55)" }}
                      />
                      <p
                        className="font-body text-xs"
                        style={{ color: "oklch(0.65 0.04 55)" }}
                      >
                        {temple.city}
                        {temple.state ? `, ${temple.state}` : ""}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs mb-3 font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.3)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {temple.deity}
                    </Badge>
                    <p
                      className="font-body text-xs leading-relaxed line-clamp-3"
                      style={{ color: "oklch(0.60 0.04 55)" }}
                    >
                      {temple.description}
                    </p>
                    {temple.timings && (
                      <div
                        className="mt-3 text-xs font-heading"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      >
                        🕐 {temple.timings.split("(")[0].trim()}
                      </div>
                    )}
                    <div
                      className="mt-3 text-xs font-heading font-semibold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      View Details →
                    </div>
                  </button>
                );
              })}
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
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          {selectedTemple && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">🛕</span>
                      <DialogTitle
                        className="font-decorative text-xl"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {selectedTemple.name}
                      </DialogTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin
                        className="h-3 w-3"
                        style={{ color: "oklch(0.65 0.04 55)" }}
                      />
                      <p
                        className="font-body text-sm"
                        style={{ color: "oklch(0.65 0.04 55)" }}
                      >
                        {selectedTemple.city}
                        {selectedTemple.state
                          ? `, ${selectedTemple.state}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      className="font-body"
                      style={{
                        background:
                          TRADITION_COLORS[selectedTemple.tradition].bg,
                        color: TRADITION_COLORS[selectedTemple.tradition].text,
                      }}
                    >
                      {selectedTemple.tradition}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.4)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {selectedTemple.deity}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              {selectedTemple.timings && (
                <div
                  className="p-3 rounded-lg border mt-3"
                  style={{
                    background: "oklch(0.22 0.07 24)",
                    borderColor: "oklch(0.68 0.20 48 / 0.25)",
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
                    style={{ color: "oklch(0.80 0.04 65)" }}
                  >
                    {selectedTemple.timings}
                  </p>
                </div>
              )}

              <div
                className="mt-4 p-5 rounded-xl border"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.12)",
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
                  style={{ color: "oklch(0.80 0.04 65)" }}
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
