import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useCreateCheckoutSession } from "../hooks/useQueries";
import { useCartStore } from "../stores/cartStore";

interface ShoppingCartPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ShoppingCartPanel({
  open,
  onClose,
}: ShoppingCartPanelProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const { identity } = useInternetIdentity();
  const checkoutMutation = useCreateCheckoutSession();

  const handleCheckout = async () => {
    if (!identity) {
      toast.error("Please login to proceed with checkout");
      return;
    }
    if (items.length === 0) return;

    const shoppingItems = items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: BigInt(item.quantity),
    }));

    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    try {
      const session = await checkoutMutation.mutateAsync({
        items: shoppingItems,
        successUrl: `${baseUrl}/payment-success`,
        cancelUrl: `${baseUrl}/payment-failure`,
      });
      if (!session?.url) throw new Error("Stripe session missing url");
      window.location.href = session.url;
    } catch {
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close cart"
      />
      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl"
        style={{ background: "oklch(0.97 0.015 85)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.28 0.08 28))",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag
              className="h-5 w-5"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <h2
              className="font-heading font-bold text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Your Cart ({items.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag
                className="h-16 w-16 opacity-20"
                style={{ color: "oklch(0.68 0.20 48)" }}
              />
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Your cart is empty
              </p>
              <p className="text-sm font-body text-muted-foreground">
                Add items from our spiritual shop
              </p>
              <Link to="/shop" onClick={onClose}>
                <Button className="btn-spiritual px-6 py-2 rounded-full">
                  Browse Shop
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-lg border"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  background: "oklch(0.99 0.008 80)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="font-heading font-semibold text-sm truncate"
                    style={{ color: "oklch(0.22 0.08 22)" }}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs font-body text-muted-foreground">
                    {item.category}
                  </p>
                  <p
                    className="font-heading font-bold text-sm mt-1"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-7 w-7 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center font-heading font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-7 w-7 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors ml-1"
                    style={{ color: "oklch(0.55 0.22 25)" }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-4 border-t space-y-3"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
              background: "oklch(0.94 0.025 80)",
            }}
          >
            <div className="flex justify-between items-center">
              <span
                className="font-heading font-semibold"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Total
              </span>
              <span
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                ₹{totalPrice().toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutMutation.isPending}
              className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              {checkoutMutation.isPending
                ? "Processing..."
                : "Proceed to Checkout"}
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="w-full py-2 text-sm font-heading text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
