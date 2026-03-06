import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetAllTemples, useAddPrasadDeliveryRequest } from '../hooks/useQueries';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

export default function PrasadDeliveryForm() {
  const { identity } = useInternetIdentity();
  const { data: temples = [] } = useGetAllTemples();
  const addRequest = useAddPrasadDeliveryRequest();
  const [form, setForm] = useState({ templeId: '', address: '', mobileNumber: '' });
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) { toast.error('Please login to request prasad delivery'); return; }
    if (!form.templeId || !form.address || !form.mobileNumber) { toast.error('Please fill all fields'); return; }

    const id = `prasad-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      await addRequest.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        templeId: form.templeId,
        address: form.address,
        mobileNumber: form.mobileNumber,
        status: 'pending',
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed(true);
      toast.success('Prasad delivery requested!');
    } catch {
      toast.error('Failed to submit request');
    }
  };

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="text-6xl mb-4">🍬</div>
        <CheckCircle className="h-12 w-12 mx-auto mb-4" style={{ color: 'oklch(0.65 0.16 140)' }} />
        <h2 className="font-heading text-2xl font-bold mb-2" style={{ color: 'oklch(0.35 0.12 25)' }}>
          Prasad Request Submitted!
        </h2>
        <p className="font-body text-muted-foreground mb-6">
          Sacred prasad will be delivered to your doorstep within 7-10 business days.
        </p>
        <button
          onClick={() => { setConfirmed(false); setForm({ templeId: '', address: '', mobileNumber: '' }); }}
          className="px-6 py-2 rounded-full font-heading font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}
        >
          Request Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 md:p-8 bg-card">
        <h2 className="font-heading text-2xl font-bold mb-6 text-center" style={{ color: 'oklch(0.35 0.12 25)' }}>
          🍬 Prasad Home Delivery
        </h2>
        {!identity && (
          <div className="mb-4 p-3 rounded-lg text-sm font-body text-center" style={{ background: 'oklch(0.78 0.14 75 / 0.1)', color: 'oklch(0.55 0.16 60)' }}>
            Please login to request prasad delivery
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
              Select Temple *
            </label>
            <select
              value={form.templeId}
              onChange={(e) => setForm({ ...form, templeId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
              style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
              required
            >
              <option value="">-- Select a Temple --</option>
              {temples.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
              Delivery Address *
            </label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Full address with pincode"
              rows={3}
              className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background resize-none"
              style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
              Mobile Number *
            </label>
            <input
              type="tel"
              value={form.mobileNumber}
              onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
              style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={addRequest.isPending || !identity}
            className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}
          >
            {addRequest.isPending ? 'Submitting...' : '🍬 Request Prasad Delivery'}
          </button>
        </form>
      </div>
    </div>
  );
}
