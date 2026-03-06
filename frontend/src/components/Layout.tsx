import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Menu, X, ShoppingCart, ChevronDown, Heart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import ShoppingCartPanel from './ShoppingCartPanel';
import StripePaymentSetup from './StripePaymentSetup';

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { to: '/temple-services', label: 'Temple' },
  { to: '/horoscope', label: 'Horoscope' },
  { to: '/astrologer', label: 'Astrologers' },
  { to: '/shop', label: 'Shop' },
  { to: '/reports', label: 'Reports' },
  { to: '/devotional', label: 'Devotional' },
];

const moreLinks = [
  { to: '/bhajan-library', label: 'Bhajan Library' },
  { to: '/vrat-katha', label: 'Vrat Katha' },
  { to: '/holy-books', label: 'Holy Books' },
  { to: '/virtual-temple', label: 'My Temple' },
  { to: '/numerology', label: 'Numerology' },
  { to: '/business-tools', label: 'Business Tools' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/astrologer-dashboard', label: 'Admin Dashboard' },
];

const footerSections = [
  {
    title: 'Temple Services',
    links: [
      { to: '/temple-services', label: 'Puja Booking' },
      { to: '/temple-services', label: 'Virtual Chadhava' },
      { to: '/temple-services', label: 'Prasad Delivery' },
      { to: '/temple-services', label: 'Virtual Aarti' },
    ],
  },
  {
    title: 'Astrology',
    links: [
      { to: '/horoscope', label: 'Daily Panchang' },
      { to: '/horoscope', label: 'Rashifal' },
      { to: '/horoscope', label: 'Kundli Generator' },
      { to: '/astrologer', label: 'Consult Astrologer' },
    ],
  },
  {
    title: 'Devotional',
    links: [
      { to: '/devotional', label: 'Devotional Library' },
      { to: '/bhajan-library', label: 'Bhajan Library' },
      { to: '/vrat-katha', label: 'Vrat Katha' },
      { to: '/holy-books', label: 'Holy Books Audio' },
    ],
  },
  {
    title: 'Tools & More',
    links: [
      { to: '/shop', label: 'Spiritual Shop' },
      { to: '/numerology', label: 'Numerology' },
      { to: '/business-tools', label: 'Business Tools' },
      { to: '/dashboard', label: 'My Dashboard' },
      { to: '/admin-cms', label: 'Admin CMS' },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (e: unknown) {
        const err = e as Error;
        if (err.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const appId = encodeURIComponent(window.location.hostname || 'spiritual-connect');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Stripe Setup (admin only, shown when not configured) */}
      <StripePaymentSetup />

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)',
          borderColor: 'oklch(0.78 0.14 75 / 0.2)',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/generated/logo-om.dim_256x256.png"
                alt="SpiritualConnect"
                className="h-10 w-10 object-contain"
              />
              <div>
                <span
                  className="font-decorative text-lg font-bold block leading-tight"
                  style={{ color: 'oklch(0.78 0.14 75)' }}
                >
                  SpiritualConnect
                </span>
                <span className="text-xs font-body block" style={{ color: 'oklch(0.78 0.14 75 / 0.6)' }}>
                  Your Divine Companion
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="px-3 py-2 rounded-md text-xs font-heading font-medium tracking-wide transition-all duration-200 hover:bg-white/10"
                  style={{ color: 'oklch(0.88 0.06 75)' }}
                  activeProps={{
                    style: {
                      color: 'oklch(0.78 0.14 75)',
                      background: 'oklch(0.78 0.14 75 / 0.12)',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="relative group">
                <button
                  className="px-3 py-2 rounded-md text-xs font-heading font-medium tracking-wide flex items-center gap-1 hover:bg-white/10 transition-all"
                  style={{ color: 'oklch(0.88 0.06 75)' }}
                >
                  More <ChevronDown className="h-3 w-3" />
                </button>
                <div
                  className="absolute top-full right-0 mt-1 w-52 rounded-lg shadow-xl border py-1 hidden group-hover:block z-50"
                  style={{
                    background: 'oklch(0.20 0.08 22)',
                    borderColor: 'oklch(0.78 0.14 75 / 0.2)',
                  }}
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.to + link.label}
                      to={link.to}
                      className="flex items-center px-4 py-2 text-sm font-heading transition-colors hover:bg-white/10"
                      style={{ color: 'oklch(0.88 0.06 75)' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 rounded-full transition-colors hover:bg-white/10"
                style={{ color: 'oklch(0.88 0.06 75)' }}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems() > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center font-bold"
                    style={{ background: 'oklch(0.68 0.20 48)', color: 'white' }}
                  >
                    {totalItems()}
                  </span>
                )}
              </button>

              <button
                onClick={handleAuth}
                disabled={loginStatus === 'logging-in'}
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-heading font-semibold transition-all duration-200 disabled:opacity-50"
                style={{
                  background: isAuthenticated
                    ? 'oklch(0.78 0.14 75 / 0.15)'
                    : 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))',
                  color: 'oklch(0.95 0.01 80)',
                  border: '1px solid oklch(0.78 0.14 75 / 0.3)',
                }}
              >
                {loginStatus === 'logging-in'
                  ? 'Connecting...'
                  : isAuthenticated
                  ? 'Logout'
                  : 'Login'}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md transition-colors hover:bg-white/10"
                style={{ color: 'oklch(0.88 0.06 75)' }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t px-4 py-3 space-y-1"
            style={{
              background: 'oklch(0.18 0.07 22)',
              borderColor: 'oklch(0.78 0.14 75 / 0.15)',
            }}
          >
            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-heading transition-colors hover:bg-white/10"
                style={{ color: 'oklch(0.88 0.06 75)' }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { handleAuth(); setMobileOpen(false); }}
              disabled={loginStatus === 'logging-in'}
              className="w-full mt-2 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))',
                color: 'white',
              }}
            >
              {loginStatus === 'logging-in' ? 'Connecting...' : isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="border-t mt-16"
        style={{
          background: 'linear-gradient(135deg, oklch(0.18 0.07 22) 0%, oklch(0.14 0.05 20) 100%)',
          borderColor: 'oklch(0.78 0.14 75 / 0.2)',
        }}
      >
        {/* Lotus Divider */}
        <div className="w-full overflow-hidden" style={{ maxHeight: '60px' }}>
          <img
            src="/assets/generated/divider-lotus.dim_1200x80.png"
            alt=""
            className="w-full object-cover opacity-40"
          />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4
                  className="font-heading font-semibold text-sm mb-4 tracking-wider uppercase"
                  style={{ color: 'oklch(0.78 0.14 75)' }}
                >
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm font-body transition-colors hover:text-gold"
                        style={{ color: 'oklch(0.70 0.04 60)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'oklch(0.78 0.14 75 / 0.15)' }}
          >
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/logo-om.dim_256x256.png"
                alt="SpiritualConnect"
                className="h-8 w-8 object-contain opacity-80"
              />
              <span className="font-decorative text-sm" style={{ color: 'oklch(0.78 0.14 75)' }}>
                SpiritualConnect
              </span>
            </div>

            <p className="text-xs font-body text-center" style={{ color: 'oklch(0.55 0.04 50)' }}>
              © {new Date().getFullYear()} SpiritualConnect. All rights reserved.
            </p>

            <p className="text-xs font-body flex items-center gap-1" style={{ color: 'oklch(0.55 0.04 50)' }}>
              Built with{' '}
              <Heart className="h-3 w-3 inline" style={{ color: 'oklch(0.68 0.20 48)', fill: 'oklch(0.68 0.20 48)' }} />{' '}
              using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'oklch(0.78 0.14 75)' }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Panel */}
      <ShoppingCartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
