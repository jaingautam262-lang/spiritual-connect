import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { useGetProduct } from '../hooks/useQueries';
import { useCartStore } from '../stores/cartStore';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useState } from 'react';

const CATEGORY_ICONS: Record<string, string> = {
  Gemstones: '💎', Yantras: '🔯', Bracelets: '📿', 'Ritual Items': '🪔',
};

export default function ProductDetail() {
  const { id } = useParams({ from: '/shop/$id' });
  const { data: product, isLoading } = useGetProduct(id);
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="font-heading text-xl" style={{ color: 'oklch(0.35 0.12 25)' }}>Product not found</p>
        <Link to="/shop" className="mt-4 inline-block font-heading text-sm" style={{ color: 'oklch(0.68 0.20 48)' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, category: product.category });
    }
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-heading mb-6 hover:underline" style={{ color: 'oklch(0.68 0.20 48)' }}>
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="ornamental-border rounded-2xl overflow-hidden">
          <div className="h-72 flex items-center justify-center text-8xl" style={{ background: 'oklch(0.94 0.025 80)' }}>
            {CATEGORY_ICONS[product.category] || '✨'}
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-xs font-heading px-3 py-1 rounded-full" style={{ background: 'oklch(0.68 0.20 48 / 0.1)', color: 'oklch(0.55 0.16 48)' }}>
            {product.category}
          </span>
          <h1 className="font-heading font-bold text-2xl" style={{ color: 'oklch(0.22 0.08 22)' }}>{product.name}</h1>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4" style={{ fill: 'oklch(0.78 0.14 75)', color: 'oklch(0.78 0.14 75)' }} />
            ))}
            <span className="text-sm font-body text-muted-foreground ml-1">(108 reviews)</span>
          </div>
          <p className="font-heading font-bold text-3xl" style={{ color: 'oklch(0.68 0.20 48)' }}>₹{product.price.toFixed(0)}</p>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.30 0.06 30)' }}>{product.description}</p>

          {product.benefits && (
            <div className="p-3 rounded-lg" style={{ background: 'oklch(0.65 0.16 140 / 0.08)', border: '1px solid oklch(0.65 0.16 140 / 0.2)' }}>
              <p className="font-heading font-semibold text-xs mb-1" style={{ color: 'oklch(0.45 0.14 140)' }}>Benefits</p>
              <p className="font-body text-sm" style={{ color: 'oklch(0.30 0.06 30)' }}>{product.benefits}</p>
            </div>
          )}

          {product.astrologicalPurpose && (
            <div className="p-3 rounded-lg" style={{ background: 'oklch(0.78 0.14 75 / 0.08)', border: '1px solid oklch(0.78 0.14 75 / 0.2)' }}>
              <p className="font-heading font-semibold text-xs mb-1" style={{ color: 'oklch(0.55 0.16 60)' }}>Astrological Purpose</p>
              <p className="font-body text-sm" style={{ color: 'oklch(0.30 0.06 30)' }}>{product.astrologicalPurpose}</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-full overflow-hidden" style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted transition-colors font-heading">−</button>
              <span className="px-4 py-2 font-heading font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted transition-colors font-heading">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-heading font-bold text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
          </div>

          <p className="text-xs font-body text-muted-foreground">
            ✅ 108 hours energized by top astrologers • 🚚 Free delivery above ₹999
          </p>
        </div>
      </div>
    </div>
  );
}
