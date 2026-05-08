import { Link } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";

export default function PaymentSuccess() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Read query params from URL for order info
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id") ?? params.get("session_id");
  const product = params.get("product");

  function getDeliveryMessage() {
    if (product?.includes("book") || product?.includes("369")) {
      return "आपकी PDF पुस्तक 24 घंटे के अंदर आपके WhatsApp / Email पर भेजी जाएगी।";
    }
    if (
      product?.includes("report") ||
      product?.includes("kundli") ||
      product?.includes("life")
    ) {
      return "आपकी रिपोर्ट 24-48 घंटे में आपके WhatsApp नंबर पर भेजी जाएगी।";
    }
    if (product?.includes("puja") || product?.includes("booking")) {
      return "आपकी पूजा बुकिंग कन्फर्म हो गई। पंडित जी जल्द ही संपर्क करेंगे।";
    }
    return "आपका ऑर्डर प्रक्रिया में है। एक कन्फर्मेशन ईमेल / WhatsApp पर भेजा जाएगा।";
  }

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
          भुगतान सफल!
        </h1>
        <p className="font-body text-muted-foreground mb-2">
          🙏 धन्यवाद! आपका भुगतान सफलतापूर्वक हो गया है।
        </p>
        {orderId && (
          <p className="font-body text-xs text-muted-foreground mb-2">
            ऑर्डर ID: <span className="font-semibold">{orderId}</span>
          </p>
        )}
        <p className="font-body text-sm text-muted-foreground mb-8">
          {getDeliveryMessage()}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            data-ocid="payment-success.home_button"
            className="px-6 py-3 rounded-full font-heading font-bold text-sm transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            घर जाएं
          </Link>
          <Link
            to="/life-reports"
            data-ocid="payment-success.reports_button"
            className="px-6 py-3 rounded-full font-heading font-bold text-sm border transition-all hover:scale-105"
            style={{
              borderColor: "oklch(0.68 0.20 48)",
              color: "oklch(0.68 0.20 48)",
            }}
          >
            जीवन रिपोर्ट्स
          </Link>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="payment-success.support_button"
            className="px-6 py-3 rounded-full font-heading font-bold text-sm border transition-all hover:scale-105"
            style={{
              borderColor: "oklch(0.65 0.04 55)",
              color: "oklch(0.48 0.04 40)",
            }}
          >
            सहायता
          </a>
        </div>
      </div>
    </div>
  );
}
