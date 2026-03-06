import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllTemples, useCreateChadhavaOffering } from '../hooks/useQueries';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

const OFFERING_ITEMS = [
  { id: 'flowers', label: '🌸 Flowers', desc: 'Fresh marigold garlands' },
  { id: 'fruits', label: '🍎 Fruits', desc: 'Seasonal fruits platter' },
  { id: 'coconut', label: '🥥 Coconut', desc: 'Sacred coconut offering' },
  { id: 'sweets', label: '🍬 Sweets', desc: 'Modak & laddoo' },
  { id: 'incense', label: '🪔 Incense', desc: 'Dhoop & agarbatti' },
  { id: 'milk', label: '🥛 Milk', desc: 'Panchamrit abhishek' },
  { id: 'tulsi', label: '🌿 Tulsi', desc: 'Sacred Tulsi leaves' },
  { id: 'sindoor', label: '🔴 Sindoor', desc: 'Vermillion offering' },
];

export default function VirtualChadhava() {
  const { identity } = useInternetIdentity();
  const { data: temples = [] } = useGetAllTemples();
  const createOffering = useCreateChadhavaOffering();
  const [templeId, setTempleId] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!identity) { toast.error('Please login to make offerings'); return; }
    if (!templeId) { toast.error('Please select a temple'); return; }
    if (selectedItems.length === 0) { toast.error('Please select at least one offering'); return; }

    const id = `chadhava-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      await createOffering.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        templeId,
        items: selectedItems,
        status: 'pending',
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed(true);
      toast.success('Offerings submitted! 🙏');
    } catch {
      toast.error('Failed to submit offerings');
    }
  };

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="text-6xl mb-4 animate-float">🌸</div>
        <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: 'oklch(0.65 0.16 140)' }} />
        <h2 className="font-heading text-2xl font-bold mb-2" style={{ color: 'oklch(0.35 0.12 25)' }}>
          Offerings Submitted!
        </h2>
        <p className="font-body text-muted-foreground mb-6">
          Your virtual chadhava has been offered at the temple. May the divine blessings be with you.
        </p>
        <button
          onClick={() => { setConfirmed(false); setSelectedItems([]); setTempleId(''); }}
          className="px-6 py-2 rounded-full font-heading font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}
        >
          Make More Offerings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 md:p-8 bg-card">
        <h2 className="font-heading text-2xl font-bold mb-6 text-center" style={{ color: 'oklch(0.35 0.12 25)' }}>
          🌸 Virtual Chadhava
        </h2>
        {!identity && (
          <div className="mb-4 p-3 rounded-lg text-sm font-body text-center" style={{ background: 'oklch(0.78 0.14 75 / 0.1)', color: 'oklch(0.55 0.16 60)' }}>
            Please login to make offerings
          </div>
        )}
        <div className="mb-6">
          <label className="block text-sm font-heading font-semibold mb-2" style={{ color: 'oklch(0.35 0.12 25)' }}>
            Select Temple
          </label>
          <select
            value={templeId}
            onChange={(e) => setTempleId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
          >
            <option value="">-- Select a Temple --</option>
            {temples.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-heading font-semibold mb-3" style={{ color: 'oklch(0.35 0.12 25)' }}>
            Select Offerings
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {OFFERING_ITEMS.map((item) => {
              const selected = selectedItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className="p-3 rounded-xl border text-center transition-all duration-200"
                  style={{
                    borderColor: selected ? 'oklch(0.68 0.20 48)' : 'oklch(0.78 0.14 75 / 0.2)',
                    background: selected ? 'oklch(0.68 0.20 48 / 0.1)' : 'oklch(0.99 0.008 80)',
                  }}
                >
                  <div className="text-2xl mb-1">{item.label.split(' ')[0]}</div>
                  <p className="font-heading text-xs font-semibold" style={{ color: selected ? 'oklch(0.68 0.20 48)' : 'oklch(0.35 0.12 25)' }}>
                    {item.label.split(' ').slice(1).join(' ')}
                  </p>
                  <p className="text-xs font-body text-muted-foreground">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={createOffering.isPending || !identity}
          className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}
        >
          {createOffering.isPending ? 'Submitting...' : '🌸 Submit Offerings'}
        </button>
      </div>
    </div>
  );
}
