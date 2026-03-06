import { useState } from 'react';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetAllDevotionalContents } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { DevotionalContent } from '../backend';
import { X } from 'lucide-react';

const STATIC_CONTENT: DevotionalContent[] = [
  { id: 'dc1', title: 'Hanuman Chalisa', deity: 'Hanuman', contentType: 'chalisa', language: 'Hindi', createdAt: BigInt(0), lyrics: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि।।\n\nबुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार।।\n\nजय हनुमान ज्ञान गुन सागर।\nजय कपीस तिहुँ लोक उजागर।।\n\nराम दूत अतुलित बल धामा।\nअंजनि-पुत्र पवनसुत नामा।।' },
  { id: 'dc2', title: 'Ganesh Aarti', deity: 'Ganesha', contentType: 'aarti', language: 'Hindi', createdAt: BigInt(0), lyrics: 'जय गणेश जय गणेश जय गणेश देवा।\nमाता जाकी पार्वती पिता महादेवा।।\n\nएकदंत दयावंत चार भुजाधारी।\nमाथे सिंदूर सोहे मूसे की सवारी।।\n\nपान चढ़े फूल चढ़े और चढ़े मेवा।\nलड्डुअन का भोग लगे संत करें सेवा।।' },
  { id: 'dc3', title: 'Gayatri Mantra', deity: 'Surya', contentType: 'mantra', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'ॐ भूर्भुवः स्वः\nतत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि\nधियो यो नः प्रचोदयात्।।\n\nMeaning: We meditate on the glory of the Creator who has created the Universe, who is worthy of worship, who is the embodiment of knowledge and light, who is the remover of all sins and ignorance. May He enlighten our intellect.' },
  { id: 'dc4', title: 'Om Jai Jagdish Hare', deity: 'Vishnu', contentType: 'aarti', language: 'Hindi', createdAt: BigInt(0), lyrics: 'ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।\nभक्त जनों के संकट, दास जनों के संकट,\nक्षण में दूर करे।। ॐ जय जगदीश हरे।।\n\nजो ध्यावे फल पावे, दुख बिनसे मन का।\nसुख सम्पत्ति घर आवे, कष्ट मिटे तन का।।' },
  { id: 'dc5', title: 'Durga Chalisa', deity: 'Durga', contentType: 'chalisa', language: 'Hindi', createdAt: BigInt(0), lyrics: 'नमो नमो दुर्गे सुख करनी।\nनमो नमो अम्बे दुख हरनी।।\n\nनिरंकार है ज्योति तुम्हारी।\nतिहूँ लोक फैली उजियारी।।\n\nशशि ललाट मुख महाविशाला।\nनेत्र लाल भृकुटि विकराला।।' },
  { id: 'dc6', title: 'Mahamrityunjaya Mantra', deity: 'Shiva', contentType: 'mantra', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'ॐ त्र्यम्बकं यजामहे\nसुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्\nमृत्योर्मुक्षीय माऽमृतात्।।\n\nMeaning: We worship the three-eyed Lord Shiva who is fragrant and nourishes all beings. May He liberate us from death for the sake of immortality, even as the cucumber is severed from its bondage to the creeper.' },
  { id: 'dc7', title: 'Shiv Tandav Stotram', deity: 'Shiva', contentType: 'bhajan', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजंगतुंगमालिकाम्।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम्।।' },
  { id: 'dc8', title: 'Lakshmi Aarti', deity: 'Lakshmi', contentType: 'aarti', language: 'Hindi', createdAt: BigInt(0), lyrics: 'ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।\nतुमको निसदिन सेवत, हर विष्णु विधाता।।\n\nउमा रमा ब्रह्माणी, तुम ही जग-माता।\nसूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता।।' },
  { id: 'dc9', title: 'Saraswati Vandana', deity: 'Saraswati', contentType: 'mantra', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना।\nया ब्रह्माच्युत शंकरप्रभृतिभिर्देवैः सदा वन्दिता\nसा मां पातु सरस्वती भगवती निःशेषजाड्यापहा।।' },
  { id: 'dc10', title: 'Krishna Bhajan - Achyutam Keshavam', deity: 'Krishna', contentType: 'bhajan', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'अच्युतम् केशवम् कृष्ण दामोदरम्\nराम नारायणम् जानकी वल्लभम्।\nकौसल्या नन्दनम् रघुकुल नायकम्\nवासुदेव तनयम् नन्द के लालको।।' },
  { id: 'dc11', title: 'Vishnu Sahasranama (excerpt)', deity: 'Vishnu', contentType: 'mantra', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः।\nभूतकृद्भूतभृद्भावो भूतात्मा भूतभावनः।।\n\nपूतात्मा परमात्मा च मुक्तानां परमागतिः।\nअव्ययः पुरुषः साक्षी क्षेत्रज्ञोऽक्षर एव च।।' },
  { id: 'dc12', title: 'Ram Stuti', deity: 'Ram', contentType: 'bhajan', language: 'Hindi', createdAt: BigInt(0), lyrics: 'श्री रामचन्द्र कृपालु भजु मन\nहरण भव भय दारुणम्।\nनव कंज लोचन कंज मुख\nकर कंज पद कंजारुणम्।।\n\nकंदर्प अगणित अमित छवि\nनव नील नीरद सुन्दरम्।\nपट पीत मानहुँ तड़ित रुचि\nशुचि नौमि जनक सुतावरम्।।' },
  { id: 'dc13', title: 'Aditya Hridayam (excerpt)', deity: 'Surya', contentType: 'mantra', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम्।\nरावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम्।।\n\nदैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम्।\nउपागम्याब्रवीद्राममगस्त्यो भगवान् ऋषिः।।' },
  { id: 'dc14', title: 'Shri Suktam', deity: 'Lakshmi', contentType: 'mantra', language: 'Sanskrit', createdAt: BigInt(0), lyrics: 'हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।\nचन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह।।\n\nतां म आवह जातवेदो लक्ष्मीमनपगामिनीम्।\nयस्यां हिरण्यं विन्देयं गामश्वं पुरुषानहम्।।' },
  { id: 'dc15', title: 'Hanuman Ashtak', deity: 'Hanuman', contentType: 'bhajan', language: 'Hindi', createdAt: BigInt(0), lyrics: 'बाल समय रवि भक्षि लियो तब,\nतीनहुँ लोक भयो अँधियारो।\nताहि सों त्रास भयो जग को,\nयह संकट काहु सों जात न टारो।।\n\nदेवन आनि करी बिनती तब,\nछाँड़ि दियो रवि कष्ट निवारो।\nको नहिं जानत है जग में कपि,\nसंकटमोचन नाम तिहारो।।' },
];

export default function DevotionalLibrary() {
  const { data: contents = [], isLoading } = useGetAllDevotionalContents();
  const [search, setSearch] = useState('');
  const [selectedContent, setSelectedContent] = useState<DevotionalContent | null>(null);

  const displayContents = contents.length > 0 ? contents : STATIC_CONTENT;

  const filtered = displayContents.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.deity.toLowerCase().includes(search.toLowerCase())
  );

  const byType = (type: string) => filtered.filter((c) => c.contentType === type);

  return (
    <div>
      <div className="relative w-full overflow-hidden" style={{ minHeight: '280px' }}>
        <img src="/assets/generated/devotional-banner.dim_1200x400.png" alt="Devotional Library" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ background: 'linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))' }}>
          <h1 className="font-decorative text-3xl md:text-5xl font-bold mb-3" style={{ color: 'oklch(0.78 0.14 75)' }}>
            🎵 Devotional Library
          </h1>
          <p className="font-body text-lg" style={{ color: 'oklch(0.85 0.04 75)' }}>
            Bhajans, aartis, mantras & chalisas
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or deity..."
            className="w-full pl-10 pr-4 py-3 rounded-full border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
          />
        </div>

        <Tabs defaultValue="bhajan">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 mb-8 h-auto p-1 rounded-xl"
            style={{ background: 'oklch(0.22 0.08 22)' }}>
            {[
              { value: 'bhajan', label: '🎵 Bhajans' },
              { value: 'aarti', label: '🪔 Aartis' },
              { value: 'mantra', label: '🔔 Mantras' },
              { value: 'chalisa', label: '📖 Chalisas' },
            ].map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}
                className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white transition-all"
                style={{ color: 'oklch(0.70 0.04 60)' }}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {['bhajan', 'aarti', 'mantra', 'chalisa'].map((type) => (
            <TabsContent key={type} value={type}>
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
                </div>
              ) : byType(type).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground font-body">No {type}s found</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {byType(type).map((content) => (
                    <button
                      key={content.id}
                      onClick={() => setSelectedContent(content)}
                      className="temple-card p-4 text-left hover:scale-105 transition-transform"
                    >
                      <div className="text-2xl mb-2">
                        {type === 'bhajan' ? '🎵' : type === 'aarti' ? '🪔' : type === 'mantra' ? '🔔' : '📖'}
                      </div>
                      <h3 className="font-heading font-bold text-sm mb-1" style={{ color: 'oklch(0.22 0.08 22)' }}>
                        {content.title}
                      </h3>
                      <p className="text-xs font-body text-muted-foreground">{content.deity}</p>
                      <p className="text-xs font-body text-muted-foreground">{content.language}</p>
                    </button>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Content Modal */}
      {selectedContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col"
            style={{ background: 'oklch(0.97 0.015 85)', border: '1px solid oklch(0.78 0.14 75 / 0.3)' }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'oklch(0.78 0.14 75 / 0.2)' }}>
              <div>
                <h2 className="font-heading font-bold text-xl" style={{ color: 'oklch(0.35 0.12 25)' }}>{selectedContent.title}</h2>
                <p className="text-sm font-body text-muted-foreground">{selectedContent.deity} • {selectedContent.language}</p>
              </div>
              <button onClick={() => setSelectedContent(null)} className="p-2 rounded-full hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="font-body text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'oklch(0.25 0.06 30)', fontFamily: 'Lato, sans-serif' }}>
                {selectedContent.lyrics}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
