import { Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Star, ArrowRight, Shield, Users, FileText, Gem, Home as HomeIcon, Hash, Music, BookOpen, ScrollText } from 'lucide-react';
import { useGetAllTemples, useGetAllProducts } from '../hooks/useQueries';
import { DEVOTIONAL_QUOTES } from '../data/devotionalQuotes';
import { RASHIS } from '../data/rashifalData';

export default function Home() {
  const { data: temples = [] } = useGetAllTemples();
  const { data: products = [] } = useGetAllProducts();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    setQuoteIndex(dayOfYear % DEVOTIONAL_QUOTES.length);
  }, []);

  const quote = DEVOTIONAL_QUOTES[quoteIndex];
  const featuredTemples = temples.slice(0, 6);
  const featuredProducts = products.slice(0, 4);

  const features = [
    { icon: Users, title: 'Authentic Astrologers', desc: 'Verified experts with years of experience in Vedic astrology, numerology, and more.' },
    { icon: HomeIcon, title: 'Verified Temples', desc: '50+ renowned temples across India for puja bookings and virtual offerings.' },
    { icon: Shield, title: 'Secure Payments', desc: 'Stripe-powered secure checkout for all transactions and wallet recharges.' },
    { icon: FileText, title: 'Personalized Reports', desc: '16+ detailed astrological reports tailored to your birth chart.' },
    { icon: Gem, title: 'Energized Products', desc: 'Certified gemstones, Rudraksha, yantras and Nav Grah murtis.' },
    { icon: Hash, title: 'Numerology Tools', desc: 'Chaldean numerology, Lo Shu Grid, and business name analysis.' },
  ];

  const devotionalCTAs = [
    {
      to: '/bhajan-library',
      icon: '🎵',
      title: 'Bhajan Library',
      desc: 'Full music player with 12+ bhajans, voice search, and playlist',
      color: 'oklch(0.68 0.20 48)',
    },
    {
      to: '/vrat-katha',
      icon: '📿',
      title: 'Vrat Katha',
      desc: 'Sacred stories for major vrats & festivals with audio playback',
      color: 'oklch(0.58 0.18 140)',
    },
    {
      to: '/holy-books',
      icon: '📖',
      title: 'Holy Books Audio',
      desc: 'All major Hindu scriptures with chapter-by-chapter audio player',
      color: 'oklch(0.55 0.18 260)',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: '520px' }}>
        <img
          src="/assets/generated/hero-banner.dim_1400x600.png"
          alt="SpiritualConnect Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.55) 0%, oklch(0.12 0.04 20 / 0.80) 100%)',
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 min-h-[520px]">
          <div className="animate-om-glow mb-4">
            <span className="text-6xl md:text-8xl font-decorative" style={{ color: 'oklch(0.78 0.14 75)' }}>
              ॐ
            </span>
          </div>
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: 'oklch(0.95 0.01 80)' }}
          >
            Your Complete Spiritual Companion
          </h1>
          <p
            className="font-body text-lg md:text-xl mb-8 max-w-2xl"
            style={{ color: 'oklch(0.85 0.04 75)' }}
          >
            Book pujas at 50+ temples, consult astrologers, explore your kundli, and shop sacred items — all in one divine platform.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { to: '/temple-services', label: '🛕 Book Puja' },
              { to: '/horoscope', label: '🔭 Horoscope' },
              { to: '/astrologer', label: '🧘 Consult Astrologer' },
              { to: '/shop', label: '💎 Sacred Shop' },
            ].map((cta) => (
              <Link
                key={cta.to}
                to={cta.to}
                className="px-6 py-3 rounded-full font-heading font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))',
                  color: 'white',
                  border: '1px solid oklch(0.78 0.14 75 / 0.4)',
                  boxShadow: '0 4px 16px oklch(0.62 0.18 48 / 0.3)',
                }}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lotus Divider */}
      <div className="w-full overflow-hidden" style={{ maxHeight: '60px' }}>
        <img
          src="/assets/generated/divider-lotus.dim_1200x80.png"
          alt=""
          className="w-full object-cover opacity-50"
        />
      </div>

      {/* Devotional Quote */}
      <section
        className="py-10 px-4"
        style={{ background: 'linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.28 0.08 28))' }}
      >
        <div className="container mx-auto max-w-3xl text-center">
          <p
            className="font-heading text-xl md:text-2xl italic leading-relaxed mb-3"
            style={{ color: 'oklch(0.88 0.06 75)' }}
          >
            "{quote.text}"
          </p>
          {quote.translation && (
            <p className="font-body text-sm mb-2" style={{ color: 'oklch(0.70 0.06 65)' }}>
              {quote.translation}
            </p>
          )}
          <p className="font-heading text-xs tracking-widest uppercase" style={{ color: 'oklch(0.78 0.14 75)' }}>
            — {quote.source}
          </p>
        </div>
      </section>

      {/* New Devotional Sections CTA */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="section-title">🎵 Devotional Content</h2>
          <p className="section-subtitle">Immerse yourself in sacred music, stories, and scriptures</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devotionalCTAs.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="temple-card p-6 group hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3
                  className="font-heading font-bold text-lg mb-2 group-hover:underline"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-sm font-heading font-semibold" style={{ color: item.color }}>
                  Explore <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Temples */}
      {featuredTemples.length > 0 && (
        <section
          className="py-16 px-4"
          style={{ background: 'oklch(0.94 0.025 80)' }}
        >
          <div className="container mx-auto">
            <h2 className="section-title">🛕 Featured Temples</h2>
            <p className="section-subtitle">Book pujas at India's most sacred temples</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {featuredTemples.map((temple) => (
                <Link
                  key={temple.id}
                  to="/temple-services"
                  className="temple-card p-4 text-center group cursor-pointer"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    🛕
                  </div>
                  <p
                    className="font-heading font-semibold text-xs leading-tight"
                    style={{ color: 'oklch(0.35 0.12 25)' }}
                  >
                    {temple.name}
                  </p>
                  <p className="text-xs font-body text-muted-foreground mt-1">{temple.location}</p>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/temple-services"
                className="inline-flex items-center gap-2 font-heading font-semibold text-sm"
                style={{ color: 'oklch(0.68 0.20 48)' }}
              >
                View All 50+ Temples <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Zodiac Quick Selector */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="section-title">✨ Your Rashifal</h2>
          <p className="section-subtitle">Select your zodiac sign for today's predictions</p>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
            {RASHIS.map((rashi) => (
              <Link
                key={rashi.id}
                to="/horoscope"
                search={{ rashi: rashi.id } as Record<string, string>}
                className="flex flex-col items-center p-3 rounded-xl border transition-all duration-200 hover:scale-105 cursor-pointer group"
                style={{
                  borderColor: 'oklch(0.78 0.14 75 / 0.2)',
                  background: 'oklch(0.99 0.008 80)',
                }}
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {rashi.symbol}
                </span>
                <span
                  className="font-heading text-xs font-semibold text-center leading-tight"
                  style={{ color: 'oklch(0.35 0.12 25)' }}
                >
                  {rashi.hindiName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section
          className="py-16 px-4"
          style={{ background: 'oklch(0.94 0.025 80)' }}
        >
          <div className="container mx-auto">
            <h2 className="section-title">💎 Sacred Shop</h2>
            <p className="section-subtitle">Energized gemstones, Rudraksha, yantras & Nav Grah murtis</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to="/shop/$id"
                  params={{ id: product.id }}
                  className="temple-card p-4 group"
                >
                  <div
                    className="h-32 rounded-lg mb-3 flex items-center justify-center text-4xl"
                    style={{ background: 'oklch(0.94 0.025 80)' }}
                  >
                    {product.category === 'Gemstones' ? '💎'
                      : product.category === 'Yantras' ? '🔯'
                      : product.category === 'Bracelets' ? '📿'
                      : product.category === 'Rudraksha' ? '🟤'
                      : product.category === 'Nav Grah Murti' ? '🪐'
                      : product.category === 'Nav Grah Yatra' ? '🛕'
                      : product.category === 'Devi Devta Yatra' ? '🌸'
                      : '🪔'}
                  </div>
                  <p
                    className="font-heading font-semibold text-sm mb-1"
                    style={{ color: 'oklch(0.22 0.08 22)' }}
                  >
                    {product.name}
                  </p>
                  <p className="text-xs font-body text-muted-foreground mb-2">{product.category}</p>
                  <p className="font-heading font-bold" style={{ color: 'oklch(0.68 0.20 48)' }}>
                    ₹{product.price.toFixed(0)}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-heading font-semibold text-sm"
                style={{ color: 'oklch(0.68 0.20 48)' }}
              >
                Browse All Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section
        className="py-16 px-4"
        style={{ background: 'linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.28 0.08 28))' }}
      >
        <div className="container mx-auto">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: 'oklch(0.78 0.14 75)' }}
          >
            Why Choose SpiritualConnect?
          </h2>
          <p className="text-center mb-10 font-body" style={{ color: 'oklch(0.70 0.04 60)' }}>
            Your trusted platform for all spiritual needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border"
                style={{
                  background: 'oklch(0.25 0.07 26)',
                  borderColor: 'oklch(0.78 0.14 75 / 0.15)',
                }}
              >
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'oklch(0.78 0.14 75 / 0.15)' }}
                >
                  <f.icon className="h-6 w-6" style={{ color: 'oklch(0.78 0.14 75)' }} />
                </div>
                <h3
                  className="font-heading font-bold text-base mb-2"
                  style={{ color: 'oklch(0.88 0.06 75)' }}
                >
                  {f.title}
                </h3>
                <p className="font-body text-sm" style={{ color: 'oklch(0.65 0.04 55)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background text-center">
        <div className="container mx-auto max-w-2xl">
          <div className="text-5xl mb-4 animate-float">🙏</div>
          <h2 className="section-title mb-4">Begin Your Spiritual Journey</h2>
          <p className="section-subtitle mb-8">
            Join thousands of devotees who have found peace, guidance, and blessings through SpiritualConnect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))',
                color: 'white',
              }}
            >
              Get Started
            </Link>
            <Link
              to="/astrologer"
              className="px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wide border transition-all hover:scale-105"
              style={{
                borderColor: 'oklch(0.68 0.20 48)',
                color: 'oklch(0.68 0.20 48)',
              }}
            >
              Talk to Astrologer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
