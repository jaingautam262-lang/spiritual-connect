import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetVirtualTempleConfig, useSaveVirtualTempleConfig } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

const DEITIES = ['Ganesha', 'Shiva', 'Vishnu', 'Durga', 'Lakshmi', 'Saraswati', 'Krishna', 'Ram', 'Hanuman'];
const DECOR_STYLES = ['Simple', 'Traditional', 'Grand'];
const BACKGROUNDS = ['Mountains', 'River', 'Forest', 'Temple Hall'];
const ITEMS = ['Diya', 'Flowers', 'Incense', 'Bell', 'Coconut', 'Fruits'];

const DEITY_EMOJIS: Record<string, string> = {
  Ganesha: '🐘', Shiva: '🔱', Vishnu: '🪷', Durga: '⚔️', Lakshmi: '🌸',
  Saraswati: '🎵', Krishna: '🪈', Ram: '🏹', Hanuman: '🐒',
};

const BG_EMOJIS: Record<string, string> = {
  Mountains: '🏔️', River: '🌊', Forest: '🌳', 'Temple Hall': '🛕',
};

const ITEM_EMOJIS: Record<string, string> = {
  Diya: '🪔', Flowers: '🌸', Incense: '🕯️', Bell: '🔔', Coconut: '🥥', Fruits: '🍎',
};

export default function VirtualTemple() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal() ?? null;
  const { data: savedConfig } = useGetVirtualTempleConfig(principal);
  const saveConfig = useSaveVirtualTempleConfig();

  const [deity, setDeity] = useState('Ganesha');
  const [decorStyle, setDecorStyle] = useState('Traditional');
  const [background, setBackground] = useState('Temple Hall');
  const [selectedItems, setSelectedItems] = useState<string[]>(['Diya', 'Flowers']);

  useEffect(() => {
    if (savedConfig) {
      setDeity(savedConfig.deity);
      setDecorStyle(savedConfig.decorStyle);
      setBackground(savedConfig.background);
      setSelectedItems(savedConfig.items);
    }
  }, [savedConfig]);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) => prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]);
  };

  const handleSave = async () => {
    if (!identity) { toast.error('Please login to save your temple'); return; }
    try {
      await saveConfig.mutateAsync({
        userId: identity.getPrincipal(),
        deity,
        decorStyle,
        background,
        items: selectedItems,
        updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      toast.success('Temple configuration saved!');
    } catch {
      toast.error('Failed to save temple');
    }
  };

  return (
    <div>
      <div className="relative w-full overflow-hidden" style={{ minHeight: '280px' }}>
        <img src="/assets/generated/virtual-temple-bg.dim_800x500.png" alt="Virtual Temple" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ background: 'linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))' }}>
          <h1 className="font-decorative text-3xl md:text-5xl font-bold mb-3" style={{ color: 'oklch(0.78 0.14 75)' }}>
            🏠 My Virtual Temple
          </h1>
          <p className="font-body text-lg" style={{ color: 'oklch(0.85 0.04 75)' }}>
            Create your personalized digital home temple
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Temple Preview */}
          <div className="ornamental-border rounded-2xl overflow-hidden bg-card">
            <div
              className="relative h-80 flex flex-col items-center justify-center"
              style={{
                background: background === 'Mountains' ? 'linear-gradient(to bottom, oklch(0.55 0.08 220), oklch(0.75 0.06 200))'
                  : background === 'River' ? 'linear-gradient(to bottom, oklch(0.65 0.10 220), oklch(0.55 0.12 200))'
                  : background === 'Forest' ? 'linear-gradient(to bottom, oklch(0.45 0.12 140), oklch(0.60 0.10 130))'
                  : 'linear-gradient(to bottom, oklch(0.22 0.08 22), oklch(0.35 0.10 30))',
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-2 animate-float">{DEITY_EMOJIS[deity]}</div>
                <p className="font-decorative font-bold text-lg mb-4" style={{ color: 'oklch(0.78 0.14 75)' }}>
                  {deity}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {selectedItems.map((item) => (
                    <span key={item} className="text-2xl animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                      {ITEM_EMOJIS[item]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-3 right-3 text-2xl opacity-50">{BG_EMOJIS[background]}</div>
              <div
                className="absolute bottom-0 left-0 right-0 py-2 text-center text-xs font-heading"
                style={{ background: 'oklch(0.18 0.06 22 / 0.7)', color: 'oklch(0.78 0.14 75)' }}
              >
                {decorStyle} Style • {background} Background
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-6">
            {!identity && (
              <div className="p-3 rounded-lg text-sm font-body text-center" style={{ background: 'oklch(0.78 0.14 75 / 0.1)', color: 'oklch(0.55 0.16 60)' }}>
                Please login to save your temple configuration
              </div>
            )}

            <div>
              <h3 className="font-heading font-bold text-sm mb-3" style={{ color: 'oklch(0.35 0.12 25)' }}>Choose Deity</h3>
              <div className="grid grid-cols-3 gap-2">
                {DEITIES.map((d) => (
                  <button key={d} onClick={() => setDeity(d)}
                    className="p-3 rounded-xl border text-center transition-all"
                    style={{ borderColor: deity === d ? 'oklch(0.68 0.20 48)' : 'oklch(0.78 0.14 75 / 0.2)', background: deity === d ? 'oklch(0.68 0.20 48 / 0.1)' : 'oklch(0.99 0.008 80)' }}>
                    <div className="text-xl mb-1">{DEITY_EMOJIS[d]}</div>
                    <p className="font-heading text-xs font-semibold" style={{ color: deity === d ? 'oklch(0.68 0.20 48)' : 'oklch(0.35 0.12 25)' }}>{d}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-sm mb-3" style={{ color: 'oklch(0.35 0.12 25)' }}>Decor Style</h3>
              <div className="flex gap-3">
                {DECOR_STYLES.map((s) => (
                  <button key={s} onClick={() => setDecorStyle(s)}
                    className="flex-1 py-2 rounded-full font-heading text-sm font-semibold border transition-all"
                    style={{ borderColor: decorStyle === s ? 'oklch(0.68 0.20 48)' : 'oklch(0.78 0.14 75 / 0.2)', background: decorStyle === s ? 'oklch(0.68 0.20 48 / 0.1)' : 'transparent', color: decorStyle === s ? 'oklch(0.68 0.20 48)' : 'oklch(0.35 0.12 25)' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-sm mb-3" style={{ color: 'oklch(0.35 0.12 25)' }}>Background</h3>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUNDS.map((bg) => (
                  <button key={bg} onClick={() => setBackground(bg)}
                    className="py-2 px-3 rounded-xl border font-heading text-sm font-semibold flex items-center gap-2 transition-all"
                    style={{ borderColor: background === bg ? 'oklch(0.68 0.20 48)' : 'oklch(0.78 0.14 75 / 0.2)', background: background === bg ? 'oklch(0.68 0.20 48 / 0.1)' : 'oklch(0.99 0.008 80)', color: background === bg ? 'oklch(0.68 0.20 48)' : 'oklch(0.35 0.12 25)' }}>
                    {BG_EMOJIS[bg]} {bg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-sm mb-3" style={{ color: 'oklch(0.35 0.12 25)' }}>Add Items</h3>
              <div className="grid grid-cols-3 gap-2">
                {ITEMS.map((item) => {
                  const selected = selectedItems.includes(item);
                  return (
                    <button key={item} onClick={() => toggleItem(item)}
                      className="p-2 rounded-xl border text-center transition-all"
                      style={{ borderColor: selected ? 'oklch(0.68 0.20 48)' : 'oklch(0.78 0.14 75 / 0.2)', background: selected ? 'oklch(0.68 0.20 48 / 0.1)' : 'oklch(0.99 0.008 80)' }}>
                      <div className="text-xl mb-0.5">{ITEM_EMOJIS[item]}</div>
                      <p className="font-heading text-xs font-semibold" style={{ color: selected ? 'oklch(0.68 0.20 48)' : 'oklch(0.35 0.12 25)' }}>{item}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <button onClick={handleSave} disabled={saveConfig.isPending || !identity}
              className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}>
              <Save className="h-4 w-4" />
              {saveConfig.isPending ? 'Saving...' : 'Save My Temple'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
