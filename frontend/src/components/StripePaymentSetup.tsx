import { useState } from 'react';
import { Settings } from 'lucide-react';
import { useIsStripeConfigured, useSetStripeConfiguration, useIsCallerAdmin } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function StripePaymentSetup() {
  const { data: isConfigured } = useIsStripeConfigured();
  const { data: isAdmin } = useIsCallerAdmin();
  const setConfig = useSetStripeConfiguration();
  const [showSetup, setShowSetup] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('IN,US,GB,CA,AU');

  if (!isAdmin || isConfigured) return null;

  const handleSave = async () => {
    if (!secretKey.trim()) {
      toast.error('Please enter a Stripe secret key');
      return;
    }
    try {
      await setConfig.mutateAsync({
        secretKey: secretKey.trim(),
        allowedCountries: countries.split(',').map((c) => c.trim()).filter(Boolean),
      });
      toast.success('Stripe configured successfully!');
      setShowSetup(false);
    } catch {
      toast.error('Failed to configure Stripe');
    }
  };

  return (
    <>
      <div
        className="w-full py-2 px-4 text-center text-sm font-body flex items-center justify-center gap-2"
        style={{ background: 'oklch(0.78 0.14 75 / 0.15)', color: 'oklch(0.35 0.12 25)' }}
      >
        <Settings className="h-4 w-4" />
        Stripe payments not configured.{' '}
        <button
          onClick={() => setShowSetup(true)}
          className="underline font-semibold hover:no-underline"
          style={{ color: 'oklch(0.68 0.20 48)' }}
        >
          Configure now
        </button>
      </div>

      {showSetup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{ background: 'oklch(0.97 0.015 85)', border: '1px solid oklch(0.78 0.14 75 / 0.3)' }}
          >
            <h2 className="font-heading font-bold text-xl mb-4" style={{ color: 'oklch(0.35 0.12 25)' }}>
              Configure Stripe Payments
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
                  Stripe Secret Key
                </label>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="sk_live_..."
                  className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none focus:ring-2 focus:ring-saffron"
                  style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
                  Allowed Countries (comma-separated)
                </label>
                <input
                  type="text"
                  value={countries}
                  onChange={(e) => setCountries(e.target.value)}
                  placeholder="IN,US,GB"
                  className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none"
                  style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={setConfig.isPending}
                  className="flex-1 py-2 rounded-full font-heading font-semibold text-sm transition-all disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))',
                    color: 'white',
                  }}
                >
                  {setConfig.isPending ? 'Saving...' : 'Save Configuration'}
                </button>
                <button
                  onClick={() => setShowSetup(false)}
                  className="flex-1 py-2 rounded-full font-heading font-semibold text-sm border transition-all"
                  style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)', color: 'oklch(0.35 0.12 25)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
