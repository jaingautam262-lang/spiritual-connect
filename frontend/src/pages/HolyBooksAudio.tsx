import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHolyBookEntries } from '../hooks/useQueries';
import type { HolyBookEntry } from '../backend';

interface BookDef {
  title: string;
  category: string;
  icon: string;
  chapters: { chapterTitle: string; shlokaText: string }[];
}

const HOLY_BOOKS: BookDef[] = [
  {
    title: 'Bhagavad Gita', category: 'Smriti', icon: '📖',
    chapters: [
      { chapterTitle: 'Chapter 1 - Arjuna Vishada Yoga', shlokaText: 'धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥\n\nDhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?' },
      { chapterTitle: 'Chapter 2 - Sankhya Yoga', shlokaText: 'श्रीभगवानुवाच\nकुतस्त्वा कश्मलमिदं विषमे समुपस्थितम्।\nअनार्यजुष्टमस्वर्ग्यमकीर्तिकरमर्जुन॥\n\nThe Supreme Personality of Godhead said: My dear Arjuna, how have these impurities come upon you? They are not at all befitting a man who knows the value of life.' },
      { chapterTitle: 'Chapter 18 - Moksha Sannyasa Yoga', shlokaText: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥\n\nAbandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.' },
    ]
  },
  {
    title: 'Ramcharitmanas', category: 'Kavya', icon: '🏹',
    chapters: [
      { chapterTitle: 'Bal Kand - Mangalacharan', shlokaText: 'वर्णानामर्थसंघानां रसानां छन्दसामपि।\nमङ्गलानां च कर्त्तारौ वन्दे वाणीविनायकौ॥\n\nI bow to Saraswati and Ganesha, the creators of letters, meanings, sentiments, metres and auspiciousness.' },
      { chapterTitle: 'Ayodhya Kand - Ram Vanvas', shlokaText: 'राम राम कहि राम कहि राम राम कहि राम।\nतनु परिहरि रघुपति बिरह राउ गयउ सुरधाम॥\n\nChanting Ram, Ram, Ram, Ram, Ram, Ram, Ram — King Dasharatha gave up his body in grief of separation from Rama and went to the abode of gods.' },
      { chapterTitle: 'Sundar Kand - Hanuman Lanka', shlokaText: 'जामवंत के बचन सुहाए। सुनि हनुमंत हृदय अति भाए॥\nतब लगि मोहि परिखेहु तुम भाई। सहि दुख कंद मूल फल खाई॥\n\nHearing the pleasing words of Jambavan, Hanuman was greatly pleased in his heart. He said, "Wait for me, brothers, bearing hardship and eating roots and fruits."' },
    ]
  },
  {
    title: 'Shrimad Bhagavatam', category: 'Purana', icon: '🌸',
    chapters: [
      { chapterTitle: 'Canto 1 - Creation', shlokaText: 'ॐ नमो भगवते वासुदेवाय\nजन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट्\n\nOm. I meditate upon Lord Sri Krishna, the son of Vasudeva, the all-pervading Lord, who is the primeval Lord, the first progenitor.' },
      { chapterTitle: 'Canto 10 - Krishna Lila', shlokaText: 'नन्द व्रज वासिनां नन्दनं\nसच्चिदानन्द विग्रहम्\nकृष्णं वन्दे जगद्गुरुम्\n\nI bow to Krishna, the son of Nanda, the resident of Vraja, whose form is eternal bliss and consciousness, the universal teacher.' },
    ]
  },
  {
    title: 'Rigveda', category: 'Veda', icon: '🔥',
    chapters: [
      { chapterTitle: 'Mandala 1 - Agni Sukta', shlokaText: 'अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्।\nहोतारं रत्नधातमम्॥\n\nI praise Agni, the household priest, the divine minister of the sacrifice, the invoker, the greatest bestower of treasure.' },
      { chapterTitle: 'Mandala 10 - Purusha Sukta', shlokaText: 'सहस्रशीर्षा पुरुषः सहस्राक्षः सहस्रपात्।\nस भूमिं विश्वतो वृत्वात्यतिष्ठद्दशाङ्गुलम्॥\n\nThe Purusha (Cosmic Being) has a thousand heads, a thousand eyes, a thousand feet. He pervades the earth on all sides and extends beyond it by ten fingers.' },
    ]
  },
  {
    title: 'Samaveda', category: 'Veda', icon: '🎵',
    chapters: [
      { chapterTitle: 'Agneya Kanda - Soma Hymns', shlokaText: 'ओम् अग्न आयाहि वीतये गृणानो हव्यदातये।\nनि होता सत्सि बर्हिषि॥\n\nO Agni, come for our welfare, being praised for the offering of oblations. Sit down as the Hotr priest on the sacred grass.' },
    ]
  },
  {
    title: 'Yajurveda', category: 'Veda', icon: '🌿',
    chapters: [
      { chapterTitle: 'Shukla Yajurveda - Ishopanishad', shlokaText: 'ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥\n\nAll this—whatever exists in this changing universe—should be covered by the Lord. Protect yourself through that detachment. Do not covet anybody\'s wealth.' },
    ]
  },
  {
    title: 'Atharvaveda', category: 'Veda', icon: '🌙',
    chapters: [
      { chapterTitle: 'Kanda 1 - Healing Hymns', shlokaText: 'ये त्रिषप्ताः परियन्ति विश्वा रूपाणि बिभ्रतः।\nवाचस्पतिर्बला तेषां तन्वो अद्य दधातु मे॥\n\nMay Vachaspati (Lord of Speech) bestow upon me today the strength of those twenty-one who go about bearing all forms.' },
    ]
  },
  {
    title: 'Hanuman Chalisa', category: 'Stotra', icon: '🐒',
    chapters: [
      { chapterTitle: 'Doha - Opening Verses', shlokaText: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥\n\nCleansing the mirror of my mind with the dust of the lotus feet of my Guru, I narrate the pure glory of Raghubar (Rama), which bestows the four fruits of life.' },
      { chapterTitle: 'Chaupai 1-10', shlokaText: 'जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥\nराम दूत अतुलित बल धामा। अञ्जनि पुत्र पवनसुत नामा॥\n\nVictory to Hanuman, the ocean of wisdom and virtue. Victory to the Lord of monkeys who illumines the three worlds. You are the messenger of Rama, the abode of incomparable strength, known as the son of Anjani and the son of the Wind.' },
      { chapterTitle: 'Chaupai 11-20', shlokaText: 'महावीर विक्रम बजरंगी। कुमति निवार सुमति के संगी॥\nकञ्चन बरन बिराज सुबेसा। कानन कुण्डल कुञ्चित केसा॥\n\nO great hero, mighty as a thunderbolt, remover of evil thoughts and companion of good sense. You shine with a golden complexion, dressed beautifully, with earrings and curly hair.' },
      { chapterTitle: 'Doha - Closing Verses', shlokaText: 'पवनतनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥\n\nO son of the Wind, remover of difficulties, embodiment of auspiciousness, dwell in my heart along with Rama, Lakshmana and Sita, O king of gods.' },
    ]
  },
  {
    title: 'Sundarkand', category: 'Kavya', icon: '🌺',
    chapters: [
      { chapterTitle: 'Hanuman Crosses the Ocean', shlokaText: 'जामवंत के बचन सुहाए। सुनि हनुमंत हृदय अति भाए॥\nतब लगि मोहि परिखेहु तुम भाई। सहि दुख कंद मूल फल खाई॥\n\nHearing the pleasing words of Jambavan, Hanuman was greatly pleased. He said, "Wait for me brothers, bearing hardship and eating roots and fruits."' },
      { chapterTitle: 'Hanuman Meets Sita', shlokaText: 'बिनती करउँ जोरि कर रावन। सुनहु मान तजि मोर सिखावन॥\nदेखहु तुम निज कुलहि बिचारी। भ्रम तजि भजहु भगत भय हारी॥\n\nI make a request with folded hands, O Ravana. Listen to my advice, giving up pride. Consider your own lineage and, abandoning delusion, worship the Lord who removes the fear of devotees.' },
    ]
  },
  {
    title: 'Durga Saptashati', category: 'Purana', icon: '⚔️',
    chapters: [
      { chapterTitle: 'Chapter 1 - Madhu Kaitabha Vadha', shlokaText: 'ॐ नमश्चण्डिकायै\nयया त्वया जगत्स्रष्टा जगत्पात्यत्ति यो जगत्।\nसोऽपि निद्रावशं नीतः कस्त्वां स्तोतुमिहेश्वरः॥\n\nOm, salutations to Chandika. By whom the creator of the universe, the sustainer of the universe, and the destroyer of the universe are all brought under the spell of sleep — who is capable of praising you here?' },
      { chapterTitle: 'Chapter 11 - Narayani Stuti', shlokaText: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥\n\nTo the Goddess who abides in all beings in the form of power, salutations to Her, salutations to Her, salutations to Her, salutations again and again.' },
    ]
  },
  {
    title: 'Vishnu Sahasranama', category: 'Stotra', icon: '🔱',
    chapters: [
      { chapterTitle: 'Phala Shruti - Introduction', shlokaText: 'विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः।\nभूतकृद्भूतभृद्भावो भूतात्मा भूतभावनः॥\n\nHe is the universe, He is Vishnu, He is the Vashatkar (the one who is invoked in sacrifices), He is the Lord of the past, present and future.' },
      { chapterTitle: 'Names 1-100', shlokaText: 'ॐ विश्वस्मै नमः। ॐ विष्णवे नमः। ॐ वषट्काराय नमः।\nॐ भूतभव्यभवत्प्रभवे नमः। ॐ भूतकृते नमः।\n\nOm, salutations to Vishwa. Om, salutations to Vishnu. Om, salutations to Vashatkar. Om, salutations to the Lord of past, present and future.' },
    ]
  },
  {
    title: 'Shiva Mahimna Stotram', category: 'Stotra', icon: '🌙',
    chapters: [
      { chapterTitle: 'Verses 1-10', shlokaText: 'महिम्नः पारं ते परमविदुषो यद्यसदृशी\nस्तुतिर्ब्रह्मादीनामपि तदवसन्नास्त्वयि गिरः।\nअथाऽवाच्यः सर्वः स्वमतिपरिणामावधि गृणन्\nममाप्येष स्तोत्रे हर निरपवादः परिकरः॥\n\nIf the praise of those who know the limits of your greatness is inadequate, and even the words of Brahma and others fall short — then all who praise you according to their own understanding are blameless. This is my justification too, O Hara, for composing this hymn.' },
    ]
  },
];

export default function HolyBooksAudio() {
  const [selectedBook, setSelectedBook] = useState<BookDef>(HOLY_BOOKS[0]);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set([HOLY_BOOKS[0].title]));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: backendEntries } = useHolyBookEntries(selectedBook.title);

  const currentChapter = selectedBook.chapters[selectedChapterIdx];

  const stopProgress = useCallback(() => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  }, []);

  useEffect(() => {
    return stopProgress;
  }, [stopProgress]);

  const handlePlayPause = () => {
    if (isPlaying) {
      stopProgress();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      progressRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            stopProgress();
            setIsPlaying(false);
            return 0;
          }
          return p + 0.4;
        });
      }, 200);
    }
  };

  const handleNext = () => {
    stopProgress();
    setIsPlaying(false);
    setProgress(0);
    if (selectedChapterIdx < selectedBook.chapters.length - 1) {
      setSelectedChapterIdx(i => i + 1);
    } else {
      const bookIdx = HOLY_BOOKS.findIndex(b => b.title === selectedBook.title);
      if (bookIdx < HOLY_BOOKS.length - 1) {
        const nextBook = HOLY_BOOKS[bookIdx + 1];
        setSelectedBook(nextBook);
        setSelectedChapterIdx(0);
        setExpandedBooks(prev => new Set([...prev, nextBook.title]));
      }
    }
  };

  const handlePrev = () => {
    stopProgress();
    setIsPlaying(false);
    setProgress(0);
    if (selectedChapterIdx > 0) {
      setSelectedChapterIdx(i => i - 1);
    } else {
      const bookIdx = HOLY_BOOKS.findIndex(b => b.title === selectedBook.title);
      if (bookIdx > 0) {
        const prevBook = HOLY_BOOKS[bookIdx - 1];
        setSelectedBook(prevBook);
        setSelectedChapterIdx(prevBook.chapters.length - 1);
        setExpandedBooks(prev => new Set([...prev, prevBook.title]));
      }
    }
  };

  const toggleBook = (title: string) => {
    setExpandedBooks(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const selectChapter = (book: BookDef, chapterIdx: number) => {
    stopProgress();
    setIsPlaying(false);
    setProgress(0);
    setSelectedBook(book);
    setSelectedChapterIdx(chapterIdx);
  };

  // Merge backend entries if available
  const displayChapters = (backendEntries && backendEntries.length > 0)
    ? backendEntries.map(e => ({ chapterTitle: e.chapterTitle, shlokaText: e.shlokaText }))
    : selectedBook.chapters;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src="/assets/generated/holy-books-banner.dim_1200x400.png"
          alt="Holy Books Audio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-amber-300" />
            <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">Holy Books Audio</h1>
          </div>
          <p className="text-amber-200 text-sm md:text-base">Sacred scriptures with shloka text — listen, read, and contemplate</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Book List */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-3 bg-muted/50 border-b border-border">
                <h2 className="font-semibold text-sm text-foreground">Sacred Scriptures</h2>
              </div>
              <div className="overflow-y-auto max-h-[600px]">
                {HOLY_BOOKS.map(book => (
                  <div key={book.title}>
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors border-b border-border/50 ${selectedBook.title === book.title ? 'bg-primary/10' : ''}`}
                      onClick={() => { toggleBook(book.title); setSelectedBook(book); setSelectedChapterIdx(0); }}
                    >
                      <span className="text-lg">{book.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${selectedBook.title === book.title ? 'text-primary' : 'text-foreground'}`}>
                          {book.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{book.category}</p>
                      </div>
                      {expandedBooks.has(book.title)
                        ? <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        : <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      }
                    </button>
                    {expandedBooks.has(book.title) && (
                      <div className="bg-muted/20">
                        {book.chapters.map((ch, idx) => (
                          <button
                            key={idx}
                            className={`w-full text-left px-6 py-2 text-xs hover:bg-muted/50 transition-colors border-b border-border/30 ${
                              selectedBook.title === book.title && selectedChapterIdx === idx
                                ? 'text-primary font-medium bg-primary/5'
                                : 'text-muted-foreground'
                            }`}
                            onClick={() => selectChapter(book, idx)}
                          >
                            {ch.chapterTitle}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Player Panel */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Book Header */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedBook.icon}</span>
                  <div>
                    <h2 className="font-bold text-foreground">{selectedBook.title}</h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{selectedBook.category}</Badge>
                      <span className="text-xs text-muted-foreground">{selectedBook.chapters.length} chapters</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter Title */}
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">{currentChapter?.chapterTitle}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Chapter {selectedChapterIdx + 1} of {displayChapters.length}
                </p>
              </div>

              {/* Audio Player */}
              <div className="p-4 bg-muted/20 border-b border-border">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={handlePrev} disabled={selectedChapterIdx === 0 && HOLY_BOOKS[0].title === selectedBook.title}>
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12 rounded-full bg-primary"
                    onClick={handlePlayPause}
                  >
                    {isPlaying
                      ? <Pause className="w-5 h-5 text-primary-foreground" />
                      : <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    }
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleNext}>
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <div className="flex-1">
                    <div
                      className="w-full bg-muted rounded-full h-2 cursor-pointer"
                      onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setProgress(((e.clientX - rect.left) / rect.width) * 100);
                      }}
                    >
                      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{isPlaying ? '▶ Playing...' : 'Paused'}</span>
                      <span>~8:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shloka Text */}
              <div className="p-4 overflow-y-auto max-h-80">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Shloka / Text</h4>
                <div className="space-y-3">
                  {currentChapter?.shlokaText.split('\n\n').map((block, i) => (
                    <div key={i} className={`p-3 rounded-lg ${i % 2 === 0 ? 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30' : 'bg-muted/30'}`}>
                      <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{block}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
