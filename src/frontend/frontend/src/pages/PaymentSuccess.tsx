import { Link } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";

export default function PaymentSuccess() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <div className="ornamental-border rounded-2xl p-10 bg-card">
        <CheckCircle
          className="h-20 w-20 mx-auto mb-6"
          style={{ color: "oklch(0.65 0.16 140)" }}
        />
        <h1
          className="font-decorative font-bold text-3xl mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Payment Successful!
        </h1>
        <p className="font-body text-muted-foreground mb-2">
          🙏 Thank you for your order. Your payment has been processed
          successfully.
        </p>
        <p className="font-body text-sm text-muted-foreground mb-8">
          You will receive a confirmation shortly. Track your order in the
          Dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full font-heading font-bold text-sm transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            View Dashboard
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 rounded-full font-heading font-bold text-sm border transition-all hover:scale-105"
            style={{
              borderColor: "oklch(0.68 0.20 48)",
              color: "oklch(0.68 0.20 48)",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
