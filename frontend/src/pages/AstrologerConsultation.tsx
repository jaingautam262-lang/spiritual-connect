import { Link } from '@tanstack/react-router';
import { Star } from 'lucide-react';
import { useGetAllAstrologers } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { AstrologerProfile } from '../backend';

const PLACEHOLDER_ASTROLOGERS: AstrologerProfile[] = [
  { id: 'ast-1', name: 'Pandit Rajesh Sharma', specializations: ['Vedic Astrology', 'Kundli', 'Vastu'], bio: 'Expert in Vedic astrology with 20+ years of experience helping thousands find their life path.', experienceYears: BigInt(20), rating: 4.9, perMinuteRate: 25, languages: ['Hindi', 'English'], createdAt: BigInt(0) },
  { id: 'ast-2', name: 'Dr. Priya Nair', specializations: ['Tarot', 'Numerology', 'Palmistry'], bio: 'Certified tarot reader and numerologist with a modern approach to ancient wisdom.', experienceYears: BigInt(15), rating: 4.8, perMinuteRate: 20, languages: ['English', 'Malayalam'], createdAt: BigInt(0) },
  { id: 'ast-3', name: 'Acharya Suresh Joshi', specializations: ['Lal Kitab', 'Remedies', 'Gemology'], bio: 'Specialist in Lal Kitab remedies and gemstone therapy for life transformation.', experienceYears: BigInt(25), rating: 4.7, perMinuteRate: 30, languages: ['Hindi', 'Gujarati'], createdAt: BigInt(0) },
  { id: 'ast-4', name: 'Jyotishi Meera Devi', specializations: ['Nadi Astrology', 'Marriage', 'Career'], bio: 'Expert in Nadi astrology and marriage compatibility with 18 years of practice.', experienceYears: BigInt(18), rating: 4.9, perMinuteRate: 35, languages: ['Tamil', 'English'], createdAt: BigInt(0) },
  { id: 'ast-5', name: 'Pandit Vikram Singh', specializations: ['Vastu Shastra', 'Feng Shui', 'Numerology'], bio: 'Renowned Vastu consultant for homes and businesses across India.', experienceYears: BigInt(22), rating: 4.6, perMinuteRate: 28, languages: ['Hindi', 'Punjabi'], createdAt: BigInt(0) },
  { id: 'ast-6', name: 'Astro Kavita Rao', specializations: ['KP Astrology', 'Horary', 'Transit'], bio: 'Specialist in KP system and horary astrology for precise predictions.', experienceYears: BigInt(12), rating: 4.8, perMinuteRate: 22, languages: ['Telugu', 'English'], createdAt: BigInt(0) },
  { id: 'ast-7', name: 'Guru Anand Mishra', specializations: ['Vedic', 'Muhurta', 'Puja'], bio: 'Expert in auspicious timing and puja rituals with 30 years of experience.', experienceYears: BigInt(30), rating: 5.0, perMinuteRate: 40, languages: ['Hindi', 'Sanskrit'], createdAt: BigInt(0) },
  { id: 'ast-8', name: 'Ankit Batra', specializations: ['Numerology', 'Business Numerology', 'Lo Shu Grid'], bio: 'Specialist in Chaldean numerology and business name analysis using Lo Shu Grid.', experienceYears: BigInt(10), rating: 4.7, perMinuteRate: 18, languages: ['Hindi', 'English'], createdAt: BigInt(0) },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          style={{
            fill: i < Math.floor(rating) ? 'oklch(0.78 0.14 75)' : 'transparent',
            color: 'oklch(0.78 0.14 75)',
          }}
        />
      ))}
      <span className="text-xs font-heading font-semibold ml-1" style={{ color: 'oklch(0.55 0.16 60)' }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function AstrologerConsultation() {
  const { data: astrologers = [], isLoading } = useGetAllAstrologers();
  const displayAstrologers = astrologers.length > 0 ? astrologers : PLACEHOLDER_ASTROLOGERS;

  return (
    <div>
      <div className="relative w-full overflow-hidden" style={{ minHeight: '280px' }}>
        <img
          src="/assets/generated/consultation-banner.dim_1200x400.png"
          alt="Astrologer Consultation"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ background: 'linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))' }}
        >
          <h1 className="font-decorative text-3xl md:text-5xl font-bold mb-3" style={{ color: 'oklch(0.78 0.14 75)' }}>
            🧘 Consult an Astrologer
          </h1>
          <p className="font-body text-lg" style={{ color: 'oklch(0.85 0.04 75)' }}>
            Book appointments with verified spiritual experts
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="section-title">Our Expert Astrologers</h2>
          <p className="section-subtitle">Choose from our panel of verified spiritual experts</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayAstrologers.map((ast) => (
              <div key={ast.id} className="temple-card p-5 flex flex-col">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto"
                  style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48 / 0.2), oklch(0.78 0.14 75 / 0.2))' }}
                >
                  🧘
                </div>
                <h3 className="font-heading font-bold text-sm text-center mb-1" style={{ color: 'oklch(0.22 0.08 22)' }}>
                  {ast.name}
                </h3>
                <div className="flex justify-center mb-2">
                  <StarRating rating={ast.rating} />
                </div>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {ast.specializations.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-0.5 rounded-full font-heading"
                      style={{ background: 'oklch(0.68 0.20 48 / 0.1)', color: 'oklch(0.55 0.16 48)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-body text-muted-foreground text-center mb-3 flex-1 line-clamp-2">
                  {ast.bio}
                </p>
                <div className="flex items-center justify-between mb-3 text-xs font-body">
                  <span className="text-muted-foreground">{Number(ast.experienceYears)} yrs exp</span>
                  <span className="font-heading font-bold" style={{ color: 'oklch(0.68 0.20 48)' }}>
                    ₹{ast.perMinuteRate}/min
                  </span>
                </div>
                <Link
                  to="/astrologer/$id"
                  params={{ id: ast.id }}
                  className="w-full py-2 rounded-full text-center text-xs font-heading font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))',
                    color: 'white',
                  }}
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
