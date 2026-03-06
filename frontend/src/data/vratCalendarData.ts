export interface VratDay {
  date: string; // YYYY-MM-DD
  name: string;
  type: 'ekadashi' | 'pradosh' | 'purnima' | 'amavasya' | 'festival' | 'navratri';
  description: string;
}

export const VRAT_CALENDAR_2026: VratDay[] = [
  { date: '2026-01-02', name: 'Paush Purnima', type: 'purnima', description: 'Full moon day of Paush month. Sacred for bathing in holy rivers.' },
  { date: '2026-01-10', name: 'Saphala Ekadashi', type: 'ekadashi', description: 'Fasting on this day fulfills all desires.' },
  { date: '2026-01-14', name: 'Makar Sankranti', type: 'festival', description: 'Sun enters Capricorn. Harvest festival celebrated across India.' },
  { date: '2026-01-17', name: 'Mauni Amavasya', type: 'amavasya', description: 'New moon day. Observe silence and perform ancestral rites.' },
  { date: '2026-01-25', name: 'Putrada Ekadashi', type: 'ekadashi', description: 'Fasting for blessings of children and family prosperity.' },
  { date: '2026-02-01', name: 'Magh Purnima', type: 'purnima', description: 'Full moon of Magh month. Holy dip in Triveni Sangam.' },
  { date: '2026-02-09', name: 'Jaya Ekadashi', type: 'ekadashi', description: 'Removes sins and grants liberation.' },
  { date: '2026-02-16', name: 'Magh Amavasya', type: 'amavasya', description: 'New moon of Magh. Perform Pitru Tarpan.' },
  { date: '2026-02-17', name: 'Maha Shivratri', type: 'festival', description: 'The great night of Lord Shiva. Night-long vigil and fasting.' },
  { date: '2026-02-24', name: 'Vijaya Ekadashi', type: 'ekadashi', description: 'Grants victory over enemies and obstacles.' },
  { date: '2026-03-03', name: 'Phalguna Purnima / Holi', type: 'festival', description: 'Festival of colors. Full moon of Phalguna month.' },
  { date: '2026-03-10', name: 'Amalaki Ekadashi', type: 'ekadashi', description: 'Worship of Amla tree. Grants moksha.' },
  { date: '2026-03-18', name: 'Phalguna Amavasya', type: 'amavasya', description: 'New moon. Perform ancestral rites.' },
  { date: '2026-03-25', name: 'Papamochani Ekadashi', type: 'ekadashi', description: 'Destroys all sins committed knowingly or unknowingly.' },
  { date: '2026-04-02', name: 'Chaitra Purnima / Ram Navami', type: 'festival', description: 'Birthday of Lord Rama. Grand celebrations at temples.' },
  { date: '2026-04-09', name: 'Kamada Ekadashi', type: 'ekadashi', description: 'Fulfills all wishes and removes sins.' },
  { date: '2026-04-17', name: 'Chaitra Amavasya', type: 'amavasya', description: 'New moon of Chaitra. Perform Pitru Puja.' },
  { date: '2026-04-24', name: 'Varuthini Ekadashi', type: 'ekadashi', description: 'Grants long life and removes poverty.' },
  { date: '2026-05-01', name: 'Vaishakha Purnima / Buddha Purnima', type: 'purnima', description: 'Full moon of Vaishakha. Birthday of Lord Buddha.' },
  { date: '2026-05-09', name: 'Mohini Ekadashi', type: 'ekadashi', description: 'Removes illusion and grants liberation.' },
  { date: '2026-05-16', name: 'Vaishakha Amavasya', type: 'amavasya', description: 'New moon. Sacred for ancestral worship.' },
  { date: '2026-06-08', name: 'Apara Ekadashi', type: 'ekadashi', description: 'Removes sins of many lifetimes.' },
  { date: '2026-06-15', name: 'Jyeshtha Amavasya', type: 'amavasya', description: 'New moon of Jyeshtha. Vat Savitri Vrat.' },
  { date: '2026-07-07', name: 'Devshayani Ekadashi', type: 'ekadashi', description: 'Lord Vishnu goes to sleep. Chaturmas begins.' },
  { date: '2026-08-09', name: 'Putrada Ekadashi', type: 'ekadashi', description: 'Grants blessings of children.' },
  { date: '2026-08-16', name: 'Shravan Amavasya', type: 'amavasya', description: 'New moon of Shravan. Hariyali Amavasya.' },
  { date: '2026-09-03', name: 'Ganesh Chaturthi', type: 'festival', description: 'Birthday of Lord Ganesha. 10-day festival begins.' },
  { date: '2026-10-02', name: 'Sharad Navratri Begins', type: 'navratri', description: 'Nine nights of Goddess Durga worship.' },
  { date: '2026-10-11', name: 'Dussehra / Vijayadashami', type: 'festival', description: 'Victory of good over evil. Rama\'s victory over Ravana.' },
  { date: '2026-11-01', name: 'Diwali / Deepavali', type: 'festival', description: 'Festival of lights. Lakshmi Puja on Amavasya night.' },
  { date: '2026-12-25', name: 'Mokshada Ekadashi', type: 'ekadashi', description: 'Grants liberation. Gita Jayanti celebrated.' },
];
