import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Repeat, Shuffle,
  Search, Mic, MicOff, Music, Heart, ListMusic, Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBhajans } from '../hooks/useQueries';
import type { BhajanEntry } from '../backend';

const MOCK_BHAJANS: BhajanEntry[] = [
  { id: 'b1', title: 'Jai Ganesh Jai Ganesh Deva', deity: 'Ganesh', artist: 'Traditional', lyricsText: 'Jai Ganesh, Jai Ganesh, Jai Ganesh Deva\nMata Jaki Parvati, Pita Mahadeva\n\nEkdant Dayavant, Char Bhuja Dhari\nMaathey Sindoor Sohe, Muse Ki Savari', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b2', title: 'Om Jai Shiv Omkara', deity: 'Shiva', artist: 'Traditional', lyricsText: 'Om Jai Shiv Omkara, Swami Jai Shiv Omkara\nBrahma Vishnu Sadashiv, Ardhangi Dhara\n\nEkanan Chaturanan, Panchanana Raje\nHansanan Garudasan, Vrishabh Vahan Saje', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b3', title: 'Jai Ambe Gauri', deity: 'Durga', artist: 'Traditional', lyricsText: 'Jai Ambe Gauri, Maiya Jai Shyama Gauri\nTumko Nishidin Dhyavat, Hari Brahma Shivari\n\nMaang Sindoor Virajat, Tiko Mrigmad Ko\nUjjwal Se Dou Naina, Chandravadan Niko', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b4', title: 'Achyutam Keshavam', deity: 'Vishnu', artist: 'Traditional', lyricsText: 'Achyutam Keshavam Krishna Damodaram\nRama Narayanam Janaki Vallabham\n\nKamalanayanam Yogeeshwaram Bhaktapriyam\nSri Madhusudanam Bhaktapriyam', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b5', title: 'Hanuman Chalisa', deity: 'Hanuman', artist: 'Tulsidas', lyricsText: 'Shri Guru Charan Saroj Raj, Nij Man Mukur Sudhari\nVarnau Raghuvar Vimal Yash, Jo Dayaku Phal Chari\n\nBuddhi Heen Tanu Janike, Sumirau Pavan Kumar\nBal Buddhi Vidya Dehu Mohi, Harahu Kalesh Vikaar', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b6', title: 'Shri Ram Chandra Kripalu', deity: 'Ram', artist: 'Tulsidas', lyricsText: 'Shri Ram Chandra Kripalu Bhajman, Haran Bhav Bhay Darunam\nNav Kanj Lochan, Kanj Mukh, Kar Kanj Pad Kanjarunam\n\nKandarp Agunit Amit Chhavi, Nav Neel Neeraj Sundarum\nPat Peet Manahu Tadit Ruchi Shuchi, Naumi Janaka Sutavaram', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b7', title: 'Lakshmi Aarti', deity: 'Lakshmi', artist: 'Traditional', lyricsText: 'Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata\nTumko Nishidin Sevat, Har Vishnu Vidhata\n\nUma Rama Brahmani, Tum Hi Jag Mata\nSurya Chandrama Dhyavat, Narad Rishi Gata', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b8', title: 'Saraswati Vandana', deity: 'Saraswati', artist: 'Traditional', lyricsText: 'Ya Kundendu Tushar Hara Dhavala, Ya Shubhra Vastravrita\nYa Veena Varadanda Manditakara, Ya Shweta Padmasana\n\nYa Brahmaachyuta Shankara Prabhritibhir, Devai Sada Vandita\nSa Mam Patu Saraswati Bhagavati, Nihshesha Jadyapaha', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b9', title: 'Shiv Tandav Stotram', deity: 'Shiva', artist: 'Ravana', lyricsText: 'Jatatavigalajjala Pravahapavitasthale\nGaleavalambya Lambitam Bhujangatungamalikam\nDamad Damad Damad Damad Ninada Vadamarvayam\nChakara Chandtandavam Tanotu Nah Shivah Shivam', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b10', title: 'Govind Bolo Hari Gopal Bolo', deity: 'Krishna', artist: 'Traditional', lyricsText: 'Govind Bolo Hari Gopal Bolo\nRadha Raman Hari Govind Bolo\n\nVasudeva Nandan Hari Govind Bolo\nDevaki Nandan Hari Govind Bolo', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b11', title: 'Durga Chalisa', deity: 'Durga', artist: 'Traditional', lyricsText: 'Namo Namo Durge Sukh Karani\nNamo Namo Ambe Dukh Harani\n\nNirankaar Hai Jyoti Tumhari\nTihu Lok Pheli Ujiyari', audioBase64: '', createdAt: BigInt(0) },
  { id: 'b12', title: 'Shree Suktam', deity: 'Lakshmi', artist: 'Vedic', lyricsText: 'Hiranya Varnam Harinim Suvarna Rajata Srajam\nChandram Hiranmayim Lakshmi Jatavedo Ma Avaha\n\nTam Ma Avaha Jatavedo Lakshmi Manapagaminim\nYasyam Hiranyam Vindeyam Gam Ashvam Purushan Aham', audioBase64: '', createdAt: BigInt(0) },
];

// Use a type-safe approach for SpeechRecognition that works across browsers
type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function createSpeechRecognition(): SpeechRecognitionInstance | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!SR) return null;
  return new SR() as SpeechRecognitionInstance;
}

export default function BhajanLibrary() {
  const { data: backendBhajans } = useBhajans();
  const bhajans = (backendBhajans && backendBhajans.length > 0) ? backendBhajans : MOCK_BHAJANS;

  const [search, setSearch] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'playlist' | 'lyrics'>('playlist');

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const filtered = bhajans.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.deity.toLowerCase().includes(search.toLowerCase()) ||
    b.artist.toLowerCase().includes(search.toLowerCase())
  );

  const currentBhajan = filtered[currentIndex] ?? bhajans[0];

  const stopProgress = useCallback(() => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    stopProgress();
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          stopProgress();
          setIsPlaying(false);
          return 0;
        }
        return p + 0.5;
      });
    }, 150);
  }, [stopProgress]);

  useEffect(() => {
    if (isPlaying) {
      startProgress();
    } else {
      stopProgress();
    }
    return stopProgress;
  }, [isPlaying, startProgress, stopProgress]);

  const handlePlayPause = () => setIsPlaying(p => !p);

  const handleNext = () => {
    setProgress(0);
    setIsPlaying(false);
    if (isShuffle) {
      setCurrentIndex(Math.floor(Math.random() * filtered.length));
    } else {
      setCurrentIndex(i => (i + 1) % filtered.length);
    }
  };

  const handlePrev = () => {
    setProgress(0);
    setIsPlaying(false);
    setCurrentIndex(i => (i - 1 + filtered.length) % filtered.length);
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startVoiceSearch = () => {
    const recognition = createSpeechRecognition();
    if (!recognition) {
      alert('Voice search is not supported in your browser.');
      return;
    }
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSearch(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopVoiceSearch = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src="/assets/generated/bhajan-library-banner.dim_1200x400.png"
          alt="Bhajan Library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-3 mb-2">
            <Music className="w-8 h-8 text-amber-300" />
            <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">Bhajan Library</h1>
          </div>
          <p className="text-amber-200 text-sm md:text-base">Divine melodies for the soul — play, listen, and immerse</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search bhajans by title, deity, or artist..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant={isListening ? 'destructive' : 'outline'}
            size="icon"
            onClick={isListening ? stopVoiceSearch : startVoiceSearch}
            title={isListening ? 'Stop listening' : 'Voice search'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        </div>
        {isListening && (
          <p className="text-sm text-primary mb-4 animate-pulse">🎙️ Listening... speak the bhajan name or deity</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Panel */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg sticky top-4">
              {/* Album Art */}
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-800">
                <div className="text-center">
                  <div className="text-5xl mb-2">🕉️</div>
                  <p className="text-xs text-muted-foreground font-medium">{currentBhajan?.deity}</p>
                </div>
              </div>

              {/* Track Info */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-foreground leading-tight">{currentBhajan?.title}</h3>
                <p className="text-sm text-muted-foreground">{currentBhajan?.artist} • {currentBhajan?.deity}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div
                  className="w-full bg-muted rounded-full h-1.5 cursor-pointer"
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = ((e.clientX - rect.left) / rect.width) * 100;
                    setProgress(Math.max(0, Math.min(100, pct)));
                  }}
                >
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{Math.floor(progress * 3.6 / 60)}:{String(Math.floor(progress * 3.6 % 60)).padStart(2, '0')}</span>
                  <span>6:00</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isShuffle ? 'text-primary' : 'text-muted-foreground'}
                  onClick={() => setIsShuffle(s => !s)}
                >
                  <Shuffle className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handlePrev}>
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
                  onClick={handlePlayPause}
                >
                  {isPlaying
                    ? <Pause className="w-5 h-5 text-primary-foreground" />
                    : <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  }
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNext}>
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={isRepeat ? 'text-primary' : 'text-muted-foreground'}
                  onClick={() => setIsRepeat(r => !r)}
                >
                  <Repeat className="w-4 h-4" />
                </Button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1 bg-muted rounded-full h-1">
                  <div className="bg-muted-foreground h-1 rounded-full w-3/4" />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-4">
                <button
                  className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'playlist' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                  onClick={() => setActiveTab('playlist')}
                >
                  <ListMusic className="w-3 h-3 inline mr-1" />Playlist
                </button>
                <button
                  className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'lyrics' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                  onClick={() => setActiveTab('lyrics')}
                >
                  📜 Lyrics
                </button>
              </div>

              {activeTab === 'lyrics' && currentBhajan && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg max-h-40 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed">{currentBhajan.lyricsText}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-primary" />
                Playlist ({filtered.length} bhajans)
              </h2>
            </div>
            <div className="space-y-2">
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Music className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No bhajans found for "{search}"</p>
                </div>
              )}
              {filtered.map((bhajan, idx) => (
                <div
                  key={bhajan.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                    idx === currentIndex
                      ? 'bg-primary/10 border-primary/30 shadow-sm'
                      : 'bg-card border-border hover:bg-muted/50'
                  }`}
                  onClick={() => handleSelectTrack(idx)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    idx === currentIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {idx === currentIndex && isPlaying ? '▶' : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${idx === currentIndex ? 'text-primary' : 'text-foreground'}`}>
                      {bhajan.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{bhajan.artist} • {bhajan.deity}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="outline" className="text-xs hidden sm:flex">{bhajan.deity}</Badge>
                    <button
                      className={`p-1 rounded-full transition-colors ${favorites.has(bhajan.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
                      onClick={e => { e.stopPropagation(); toggleFavorite(bhajan.id); }}
                    >
                      <Heart className="w-4 h-4" fill={favorites.has(bhajan.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
