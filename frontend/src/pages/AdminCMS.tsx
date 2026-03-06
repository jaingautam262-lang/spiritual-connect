import React, { useState, useRef } from 'react';
import { Lock, Upload, Trash2, Plus, Music, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  useBhajans, useAddBhajan, useDeleteBhajan,
  useVratKathas, useAddVratKatha, useDeleteVratKatha,
  useHolyBookEntries, useAddHolyBookEntry, useDeleteHolyBookEntry,
} from '../hooks/useQueries';
import type { BhajanEntry, VratKathaEntry, HolyBookEntry } from '../backend';

const ADMIN_PASSWORD = 'admin2024';

const BOOK_OPTIONS = [
  'Bhagavad Gita', 'Ramcharitmanas', 'Shrimad Bhagavatam',
  'Rigveda', 'Samaveda', 'Yajurveda', 'Atharvaveda',
  'Hanuman Chalisa', 'Sundarkand', 'Durga Saptashati',
  'Vishnu Sahasranama', 'Shiva Mahimna Stotram',
];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1] ?? '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Bhajan Management Tab ────────────────────────────────────────────────────

function BhajanManagement() {
  const { data: bhajans = [], isLoading } = useBhajans();
  const addBhajan = useAddBhajan();
  const deleteBhajan = useDeleteBhajan();

  const [form, setForm] = useState({ title: '', deity: '', artist: '', lyricsText: '' });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.deity) { toast.error('Title and deity are required'); return; }
    let audioBase64 = '';
    if (audioFile) audioBase64 = await fileToBase64(audioFile);
    const entry: BhajanEntry = {
      id: `bhajan-${Date.now()}`,
      title: form.title,
      deity: form.deity,
      artist: form.artist,
      lyricsText: form.lyricsText,
      audioBase64,
      createdAt: BigInt(Date.now()),
    };
    addBhajan.mutate(entry, {
      onSuccess: () => {
        toast.success('Bhajan added successfully!');
        setForm({ title: '', deity: '', artist: '', lyricsText: '' });
        setAudioFile(null);
        if (fileRef.current) fileRef.current.value = '';
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add New Bhajan
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="b-title">Title *</Label>
              <Input
                id="b-title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Bhajan title"
              />
            </div>
            <div>
              <Label htmlFor="b-deity">Deity *</Label>
              <Input
                id="b-deity"
                value={form.deity}
                onChange={e => setForm(f => ({ ...f, deity: e.target.value }))}
                placeholder="e.g. Ganesh, Shiva"
              />
            </div>
            <div>
              <Label htmlFor="b-artist">Artist</Label>
              <Input
                id="b-artist"
                value={form.artist}
                onChange={e => setForm(f => ({ ...f, artist: e.target.value }))}
                placeholder="Artist name"
              />
            </div>
            <div>
              <Label htmlFor="b-audio">Audio File (MP3/WAV)</Label>
              <Input
                id="b-audio"
                type="file"
                accept="audio/*"
                ref={fileRef}
                onChange={e => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="b-lyrics">Lyrics Text</Label>
            <Textarea
              id="b-lyrics"
              value={form.lyricsText}
              onChange={e => setForm(f => ({ ...f, lyricsText: e.target.value }))}
              placeholder="Enter lyrics..."
              rows={4}
            />
          </div>
          <Button type="submit" disabled={addBhajan.isPending} className="w-full sm:w-auto">
            {addBhajan.isPending
              ? 'Adding...'
              : <><Upload className="w-4 h-4 mr-2" />Add Bhajan</>
            }
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Existing Bhajans ({bhajans.length})</h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2">
            {bhajans.length === 0 && (
              <p className="text-muted-foreground text-sm">No bhajans yet. Add one above.</p>
            )}
            {bhajans.map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-foreground">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.artist} • {b.deity}</p>
                </div>
                <div className="flex items-center gap-2">
                  {b.audioBase64 && (
                    <Badge variant="outline" className="text-xs">
                      <Music className="w-3 h-3 mr-1" />Audio
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteBhajan.mutate(b.id, {
                      onSuccess: () => toast.success('Bhajan deleted'),
                      onError: (err) => toast.error(err.message),
                    })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Vrat Katha Management Tab ────────────────────────────────────────────────

function VratKathaManagement() {
  const { data: kathas = [], isLoading } = useVratKathas();
  const addKatha = useAddVratKatha();
  const deleteKatha = useDeleteVratKatha();

  const [form, setForm] = useState({ title: '', festivalName: '', storyText: '' });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.festivalName) {
      toast.error('Title and festival name are required');
      return;
    }
    let audioBase64 = '';
    if (audioFile) audioBase64 = await fileToBase64(audioFile);
    const entry: VratKathaEntry = {
      id: `katha-${Date.now()}`,
      title: form.title,
      festivalName: form.festivalName,
      storyText: form.storyText,
      audioBase64,
      createdAt: BigInt(Date.now()),
    };
    addKatha.mutate(entry, {
      onSuccess: () => {
        toast.success('Vrat Katha added successfully!');
        setForm({ title: '', festivalName: '', storyText: '' });
        setAudioFile(null);
        if (fileRef.current) fileRef.current.value = '';
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add New Vrat Katha
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="vk-title">Title *</Label>
              <Input
                id="vk-title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Katha title"
              />
            </div>
            <div>
              <Label htmlFor="vk-festival">Festival Name *</Label>
              <Input
                id="vk-festival"
                value={form.festivalName}
                onChange={e => setForm(f => ({ ...f, festivalName: e.target.value }))}
                placeholder="e.g. Navratri, Ekadashi"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="vk-audio">Audio File (MP3/WAV)</Label>
              <Input
                id="vk-audio"
                type="file"
                accept="audio/*"
                ref={fileRef}
                onChange={e => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="vk-story">Story Text</Label>
            <Textarea
              id="vk-story"
              value={form.storyText}
              onChange={e => setForm(f => ({ ...f, storyText: e.target.value }))}
              placeholder="Enter the katha story..."
              rows={6}
            />
          </div>
          <Button type="submit" disabled={addKatha.isPending} className="w-full sm:w-auto">
            {addKatha.isPending
              ? 'Adding...'
              : <><Upload className="w-4 h-4 mr-2" />Add Katha</>
            }
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Existing Kathas ({kathas.length})</h3>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2">
            {kathas.length === 0 && (
              <p className="text-muted-foreground text-sm">No kathas yet. Add one above.</p>
            )}
            {kathas.map(k => (
              <div key={k.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-foreground">{k.title}</p>
                  <p className="text-xs text-muted-foreground">{k.festivalName}</p>
                </div>
                <div className="flex items-center gap-2">
                  {k.audioBase64 && (
                    <Badge variant="outline" className="text-xs">
                      <Music className="w-3 h-3 mr-1" />Audio
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteKatha.mutate(k.id, {
                      onSuccess: () => toast.success('Katha deleted'),
                      onError: (err) => toast.error(err.message),
                    })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Holy Books Management Tab ────────────────────────────────────────────────

function HolyBooksManagement() {
  const [selectedBook, setSelectedBook] = useState('Bhagavad Gita');
  const { data: entries = [], isLoading } = useHolyBookEntries(selectedBook);
  const addEntry = useAddHolyBookEntry();
  const deleteEntry = useDeleteHolyBookEntry();

  const [form, setForm] = useState({
    bookTitle: 'Bhagavad Gita',
    chapterTitle: '',
    shlokaText: '',
    bookCategory: '',
    trackNumber: '1',
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.bookTitle || !form.chapterTitle) {
      toast.error('Book title and chapter title are required');
      return;
    }
    let audioBase64 = '';
    if (audioFile) audioBase64 = await fileToBase64(audioFile);
    const entry: HolyBookEntry = {
      id: `holy-${Date.now()}`,
      bookTitle: form.bookTitle,
      chapterTitle: form.chapterTitle,
      shlokaText: form.shlokaText,
      audioBase64,
      bookCategory: form.bookCategory,
      trackNumber: BigInt(parseInt(form.trackNumber) || 1),
      createdAt: BigInt(Date.now()),
    };
    addEntry.mutate(entry, {
      onSuccess: () => {
        toast.success('Holy book entry added!');
        setForm(f => ({ ...f, chapterTitle: '', shlokaText: '', trackNumber: '1' }));
        setAudioFile(null);
        if (fileRef.current) fileRef.current.value = '';
      },
      onError: (err) => toast.error(`Error: ${err.message}`),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> Add Holy Book Chapter
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="hb-book">Book Title *</Label>
              <select
                id="hb-book"
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                value={form.bookTitle}
                onChange={e => {
                  setForm(f => ({ ...f, bookTitle: e.target.value }));
                  setSelectedBook(e.target.value);
                }}
              >
                {BOOK_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="hb-chapter">Chapter Title *</Label>
              <Input
                id="hb-chapter"
                value={form.chapterTitle}
                onChange={e => setForm(f => ({ ...f, chapterTitle: e.target.value }))}
                placeholder="Chapter/section title"
              />
            </div>
            <div>
              <Label htmlFor="hb-category">Book Category</Label>
              <Input
                id="hb-category"
                value={form.bookCategory}
                onChange={e => setForm(f => ({ ...f, bookCategory: e.target.value }))}
                placeholder="e.g. Veda, Purana, Stotra"
              />
            </div>
            <div>
              <Label htmlFor="hb-track">Track Number</Label>
              <Input
                id="hb-track"
                type="number"
                min="1"
                value={form.trackNumber}
                onChange={e => setForm(f => ({ ...f, trackNumber: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="hb-audio">Audio File (MP3/WAV)</Label>
              <Input
                id="hb-audio"
                type="file"
                accept="audio/*"
                ref={fileRef}
                onChange={e => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="hb-shloka">Shloka / Text</Label>
            <Textarea
              id="hb-shloka"
              value={form.shlokaText}
              onChange={e => setForm(f => ({ ...f, shlokaText: e.target.value }))}
              placeholder="Enter shloka or text content..."
              rows={5}
            />
          </div>
          <Button type="submit" disabled={addEntry.isPending} className="w-full sm:w-auto">
            {addEntry.isPending
              ? 'Adding...'
              : <><Upload className="w-4 h-4 mr-2" />Add Chapter</>
            }
          </Button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">
            Entries for: {selectedBook} ({entries.length})
          </h3>
          <select
            className="border border-input rounded-md px-2 py-1 text-xs bg-background text-foreground"
            value={selectedBook}
            onChange={e => setSelectedBook(e.target.value)}
          >
            {BOOK_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <div className="space-y-2">
            {entries.length === 0 && (
              <p className="text-muted-foreground text-sm">No entries for this book yet.</p>
            )}
            {entries.map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-foreground">{entry.chapterTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    Track {entry.trackNumber.toString()} • {entry.bookCategory}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {entry.audioBase64 && (
                    <Badge variant="outline" className="text-xs">
                      <Music className="w-3 h-3 mr-1" />Audio
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteEntry.mutate(entry.id, {
                      onSuccess: () => toast.success('Entry deleted'),
                      onError: (err) => toast.error(err.message),
                    })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main AdminCMS Page ───────────────────────────────────────────────────────

export default function AdminCMS() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm shadow-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin CMS</h1>
            <p className="text-sm text-muted-foreground mt-1">Content Management System</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="cms-password">Admin Password</Label>
              <div className="relative mt-1">
                <Input
                  id="cms-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(s => !s)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              <Lock className="w-4 h-4 mr-2" /> Access CMS
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <h1 className="font-bold text-foreground">Admin CMS — Content Management</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="bhajans">
          <TabsList className="mb-6 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="bhajans" className="flex items-center gap-1.5">
              <Music className="w-4 h-4" /> Bhajan Library
            </TabsTrigger>
            <TabsTrigger value="vrat-katha" className="flex items-center gap-1.5">
              📿 Vrat Katha
            </TabsTrigger>
            <TabsTrigger value="holy-books" className="flex items-center gap-1.5">
              📖 Holy Books
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bhajans">
            <BhajanManagement />
          </TabsContent>

          <TabsContent value="vrat-katha">
            <VratKathaManagement />
          </TabsContent>

          <TabsContent value="holy-books">
            <HolyBooksManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
