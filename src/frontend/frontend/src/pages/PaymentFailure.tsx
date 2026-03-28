import { Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";

export default function PaymentFailure() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <div className="ornamental-border rounded-2xl p-10 bg-card">
        <XCircle
          className="h-20 w-20 mx-auto mb-6"
          style={{ color: "oklch(0.55 0.22 25)" }}
        />
        <h1
          className="font-decorative font-bold text-3xl mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Payment Failed
        </h1>
        <p className="font-body text-muted-foreground mb-2">
          Your payment was not completed or was cancelled.
        </p>
        <p className="font-body text-sm text-muted-foreground mb-8">
          No charges have been made to your account. Please try again or contact
          support.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/shop"
            className="px-6 py-3 rounded-full font-heading font-bold text-sm transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            Return to Shop
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full font-heading font-bold text-sm border transition-all hover:scale-105"
            style={{
              borderColor: "oklch(0.68 0.20 48)",
              color: "oklch(0.68 0.20 48)",
            }}
          >
            My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
