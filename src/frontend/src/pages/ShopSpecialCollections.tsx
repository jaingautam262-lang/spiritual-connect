import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Gift, Package, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { COMBO_PACKS } from "../data/shopData_combos";
import { FRAME_PRODUCTS } from "../data/shopData_frames";
import { KAKA_PRODUCTS } from "../data/shopData_kaka";
import { KARUNGALI_INFO, KARUNGALI_PRODUCTS } from "../data/shopData_karungali";
import { MOTHERS_DAY_COLLECTION } from "../data/shopData_mothers_day";

// ─── Product Card ─────────────────────────────────────────────────────────────

interface SimpleProduct {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  discountPercent?: number;
  description: string;
  material?: string;
  dimensions?: string;
  benefits?: string;
  giftNote?: string;
  image?: string;
  inStock?: boolean;
  cashback?: boolean;
}

function ProductCard({ product }: { product: SimpleProduct }) {
  return (
    <div
      data-ocid={`special-collections.item.${product.id}`}
      className="bg-card rounded-xl border border-amber-200/40 overflow-hidden flex flex-col group hover:shadow-lg hover:border-amber-400/60 transition-all duration-200"
    >
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 flex items-center justify-center overflow-hidden">
        <span className="text-5xl opacity-50">\u0950</span>
        {product.discountPercent && product.discountPercent > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
            -{product.discountPercent}%
          </Badge>
        )}
        {product.cashback && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
            100% Cashback
          </Badge>
        )}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>

        {product.material && (
          <p className="text-xs text-muted-foreground">{product.material}</p>
        )}
        {product.dimensions && (
          <p className="text-xs text-muted-foreground">{product.dimensions}</p>
        )}

        {product.benefits && (
          <p className="text-xs text-amber-700 line-clamp-2">
            {product.benefits}
          </p>
        )}
        {product.giftNote && (
          <p className="text-xs text-pink-600 line-clamp-2 italic">
            <Gift className="inline w-3 h-3 mr-1" />
            {product.giftNote}
          </p>
        )}

        <div className="mt-auto pt-2 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-amber-700">
              \u20b9{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                \u20b9{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() =>
              toast.success(`${product.name} added to cart`, {
                description: `\u20b9${product.price.toLocaleString("en-IN")}`,
              })
            }
            data-ocid={`special-collections.add_to_cart.${product.id}`}
            disabled={product.inStock === false}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Combo Card ───────────────────────────────────────────────────────────────

function ComboCard({
  combo,
}: {
  combo: (typeof COMBO_PACKS)[0];
}) {
  return (
    <div
      data-ocid={`special-collections.combo.${combo.id}`}
      className="bg-card rounded-xl border border-amber-200/40 overflow-hidden flex flex-col group hover:shadow-lg hover:border-amber-400/60 transition-all duration-200"
    >
      <div className="relative h-44 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 flex items-center justify-center">
        <Package className="w-16 h-16 text-amber-400 opacity-60" />
        <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
          -{combo.discountPercent}%
        </Badge>
        {combo.cashback && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
            100% Cashback
          </Badge>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-foreground text-sm leading-snug">
          {combo.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {combo.description}
        </p>
        <div className="space-y-1">
          {combo.components.map((c) => (
            <div key={c} className="flex items-start gap-1">
              <CheckCircle className="w-3 h-3 text-amber-500 mt-0.5 shrink-0" />
              <span className="text-xs text-foreground/80">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-700 font-medium">{combo.purpose}</p>
        <div className="mt-auto pt-2 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-amber-700">
              \u20b9{combo.price.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              \u20b9{combo.totalMrp.toLocaleString("en-IN")}
            </span>
            <Badge className="text-xs bg-amber-100 text-amber-800 border-0">
              Save \u20b9{combo.savings.toLocaleString("en-IN")}
            </Badge>
          </div>
          <Button
            type="button"
            size="sm"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() =>
              toast.success(`${combo.name} added to cart`, {
                description: `\u20b9${combo.price.toLocaleString("en-IN")}`,
              })
            }
            data-ocid={`special-collections.add_to_cart.${combo.id}`}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopSpecialCollections() {
  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="special-collections.page"
    >
      {/* Hero header */}
      <div className="bg-gradient-to-br from-amber-700 via-orange-600 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-8 h-8 text-yellow-200" />
            <span className="text-yellow-200 font-medium tracking-widest uppercase text-sm">
              Rare Collections
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            <span className="text-yellow-200">\u0950</span> Special Collections
          </h1>
          <p className="text-amber-100 text-lg max-w-2xl">
            Curated spiritual items from rare traditions \u2014 Kaka tantric
            samagri, South Indian Karungali wood, sacred frames, combo packs,
            and exclusive Mother's Day divine gifts.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="kaka" data-ocid="special-collections.tab">
          <TabsList className="w-full flex-wrap h-auto gap-1 bg-amber-50 border border-amber-200 p-1 mb-8 rounded-xl">
            {[
              { value: "kaka", label: "\u{1F407} Kaka Items" },
              { value: "karungali", label: "\u{1FAB5} Karungali" },
              { value: "frames", label: "\u{1F5BC}\uFE0F Frames" },
              { value: "combo", label: "\u{1F381} Combo Packs" },
              { value: "mothers", label: "\u{1F3F5} Mother's Day" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-amber-800"
                data-ocid={`special-collections.tab.${tab.value}`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Kaka Tab ── */}
          <TabsContent
            value="kaka"
            data-ocid="special-collections.kaka.section"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-2">
                Kaka (Crow) Tantric Items
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Rare tantric samagri and sacred items of Kaka Bhushundi \u2014
                the divine crow sage who recited the Ramayana to Garuda. These
                items are used in traditional tantric practices for protection,
                wish fulfillment, and removal of negative energies.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {KAKA_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>

          {/* ── Karungali Tab ── */}
          <TabsContent
            value="karungali"
            data-ocid="special-collections.karungali.section"
          >
            {/* Info section */}
            <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-1">
                Karungali \u2014
                \u0b95\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bbe\u0bb2\u0bbf
              </h2>
              <p className="text-stone-300 text-sm mb-1">
                Origin: {KARUNGALI_INFO.origin}
              </p>
              <p className="text-stone-200 text-sm mb-4">
                {KARUNGALI_INFO.about}
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-amber-300 mb-2">
                    Benefits
                  </h4>
                  <ul className="space-y-1">
                    {KARUNGALI_INFO.benefits.map((b) => (
                      <li
                        key={b}
                        className="text-stone-300 flex items-start gap-1"
                      >
                        <span className="text-amber-400 mt-0.5">\u2022</span>{" "}
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-300 mb-2">
                    Care Instructions
                  </h4>
                  <p className="text-stone-300">{KARUNGALI_INFO.care}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-300 mb-2">
                    Authenticity
                  </h4>
                  <p className="text-stone-300">
                    {KARUNGALI_INFO.authenticity}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {KARUNGALI_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>

          {/* ── Frames Tab ── */}
          <TabsContent
            value="frames"
            data-ocid="special-collections.frames.section"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-2">
                Sacred Photo Frames & Wall Art
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Beautify your puja room and home with intricately crafted brass,
                copper, and Tanjore art frames. Each frame is a sacred piece of
                devotional art that transforms your space into a divine
                sanctuary.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {FRAME_PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>

          {/* ── Combo Packs Tab ── */}
          <TabsContent
            value="combo"
            data-ocid="special-collections.combo.section"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-2">
                Combo Packs & Bundle Deals
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Get the best of multiple spiritual products bundled together for
                maximum benefit and best value. Each combo is curated by our
                Vedic experts for synergistic spiritual impact.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {COMBO_PACKS.map((combo) => (
                <ComboCard key={combo.id} combo={combo} />
              ))}
            </div>
          </TabsContent>

          {/* ── Mother's Day Tab ── */}
          <TabsContent
            value="mothers"
            data-ocid="special-collections.mothers.section"
          >
            {/* Gift banner */}
            <div className="bg-gradient-to-r from-pink-500 via-rose-400 to-amber-500 text-white rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-8 h-8 text-pink-100" />
                <span className="text-pink-100 font-medium tracking-wider text-sm uppercase">
                  Special Gift Collection
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Gift the Divine</h2>
              <p className="text-pink-100 text-lg">
                Celebrate your Mother with Sacred Blessings
              </p>
              <p className="text-pink-200 mt-2 text-sm max-w-2xl">
                Every gift comes with special Mother's Day packaging and a
                personalized blessing card. Because the most sacred gift you can
                give your mother is the grace of the divine.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {MOTHERS_DAY_COLLECTION.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
