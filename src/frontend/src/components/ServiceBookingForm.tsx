import { CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "../stores/cartStore";

interface ServiceBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  price: number;
  serviceType: string;
  showLocation?: boolean;
  showParticipants?: boolean;
  onSubmitSuccess?: () => void;
  language?: "en" | "hi";
}

interface FormState {
  devoteeName: string;
  email: string;
  phone: string;
  preferredDate: string;
  location: string;
  specialRequests: string;
  participantCount: string;
}

const INITIAL_FORM: FormState = {
  devoteeName: "",
  email: "",
  phone: "",
  preferredDate: "",
  location: "",
  specialRequests: "",
  participantCount: "1",
};

export default function ServiceBookingForm({
  isOpen,
  onClose,
  serviceName,
  price,
  serviceType,
  showLocation = false,
  showParticipants = false,
  onSubmitSuccess,
  language = "en",
}: ServiceBookingFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const isHi = language === "hi";

  const t = {
    devoteeName: isHi ? "भक्त का नाम" : "Devotee Name",
    email: isHi ? "ईमेल" : "Email",
    phone: isHi ? "फोन" : "Phone",
    preferredDate: isHi ? "पसंदीदा तारीख" : "Preferred Date",
    participants: isHi ? "प्रतिभागियों की संख्या" : "Number of Participants",
    location: isHi ? "स्थान / पता" : "Location / Address",
    specialRequests: isHi ? "विशेष अनुरोध" : "Special Requests",
    serviceTotal: isHi ? "सेवा कुल" : "Service Total",
    cancel: isHi ? "रद्द करें" : "Cancel",
    addToCart: isHi ? "🙏 कार्ट में जोड़ें" : "🙏 Add to Cart",
    addedToCart: isHi ? "🙏 कार्ट में जोड़ा गया!" : "🙏 Added to Cart!",
    viewCart: isHi ? "कार्ट देखें 🛒" : "View Cart 🛒",
    close: isHi ? "बंद करें" : "Close",
    fillRequired: isHi
      ? "कृपया सभी आवश्यक फ़ील्ड भरें"
      : "Please fill all required fields",
    addedMsg: isHi
      ? "आपकी बुकिंग कार्ट में जोड़ी गई। चेकआउट करने के लिए आगे बढ़ें।"
      : "has been added to your cart. Proceed to checkout to complete your booking.",
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.devoteeName ||
      !form.email ||
      !form.phone ||
      !form.preferredDate
    ) {
      toast.error(t.fillRequired);
      return;
    }

    const itemId = `svc-${serviceType}-${Date.now()}`;
    addItem({
      id: itemId,
      name: serviceName,
      price,
      category: serviceType,
      type: "service",
      bookingDetails: {
        devoteeName: form.devoteeName,
        email: form.email,
        phone: form.phone,
        preferredDate: form.preferredDate,
        location: showLocation ? form.location : undefined,
        specialRequests: form.specialRequests || undefined,
      },
    });

    toast.success(
      `${serviceName} ${isHi ? "कार्ट में जोड़ा गया! 🙏" : "added to cart! 🙏"}`,
    );
    setSubmitted(true);
    onSubmitSuccess?.();
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border text-sm font-body focus:outline-none focus:ring-2 bg-background transition-colors";
  const inputStyle = {
    borderColor: "oklch(0.78 0.14 75 / 0.3)",
    "--tw-ring-color": "oklch(0.68 0.20 48 / 0.3)",
  } as React.CSSProperties;
  const labelClass = "block text-sm font-heading font-semibold mb-1.5";
  const labelStyle = { color: "oklch(0.35 0.12 25)" };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "oklch(0.10 0.05 20 / 0.75)" }}
      data-ocid="service.booking_form.dialog"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "oklch(0.99 0.008 80)" }}
      >
        {/* Modal Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.16 35))",
          }}
        >
          <div>
            <h2 className="font-heading text-lg font-bold text-white leading-tight">
              Book: {serviceName}
            </h2>
            <p className="text-xs text-white/70 font-body mt-0.5">
              ₹{price.toLocaleString("en-IN")} • {serviceType}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
            data-ocid="service.booking_form.close_button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success State */}
        {submitted ? (
          <div
            className="p-8 text-center"
            data-ocid="service.booking_form.success_state"
          >
            <CheckCircle
              className="h-16 w-16 mx-auto mb-4"
              style={{ color: "oklch(0.55 0.18 145)" }}
            />
            <h3
              className="font-heading text-xl font-bold mb-2"
              style={{ color: "oklch(0.25 0.10 25)" }}
            >
              {t.addedToCart}
            </h3>
            <p
              className="text-sm font-body mb-6"
              style={{ color: "oklch(0.50 0.06 50)" }}
            >
              <strong>{serviceName}</strong> {t.addedMsg}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-full font-heading font-semibold text-sm border transition-all hover:scale-105"
                style={{
                  borderColor: "oklch(0.68 0.20 48 / 0.4)",
                  color: "oklch(0.45 0.14 40)",
                }}
                data-ocid="service.booking_form.cancel_button"
              >
                {t.close}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-full font-heading font-bold text-sm text-white transition-all hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                }}
                data-ocid="service.booking_form.confirm_button"
              >
                {t.viewCart}
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="sb-name"
                  className={labelClass}
                  style={labelStyle}
                >
                  {t.devoteeName} *
                </label>
                <input
                  id="sb-name"
                  type="text"
                  value={form.devoteeName}
                  onChange={(e) =>
                    setForm({ ...form, devoteeName: e.target.value })
                  }
                  placeholder="Your full name"
                  required
                  className={inputClass}
                  style={inputStyle}
                  data-ocid="service.booking_form.devotee_name_input"
                />
              </div>

              <div>
                <label
                  htmlFor="sb-email"
                  className={labelClass}
                  style={labelStyle}
                >
                  {t.email} *
                </label>
                <input
                  id="sb-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                  style={inputStyle}
                  data-ocid="service.booking_form.email_input"
                />
              </div>

              <div>
                <label
                  htmlFor="sb-phone"
                  className={labelClass}
                  style={labelStyle}
                >
                  {t.phone} *
                </label>
                <input
                  id="sb-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className={inputClass}
                  style={inputStyle}
                  data-ocid="service.booking_form.phone_input"
                />
              </div>

              <div className={showParticipants ? "" : "sm:col-span-2"}>
                <label
                  htmlFor="sb-date"
                  className={labelClass}
                  style={labelStyle}
                >
                  {t.preferredDate} *
                </label>
                <input
                  id="sb-date"
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) =>
                    setForm({ ...form, preferredDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className={inputClass}
                  style={inputStyle}
                  data-ocid="service.booking_form.date_input"
                />
              </div>

              {showParticipants && (
                <div>
                  <label
                    htmlFor="sb-participants"
                    className={labelClass}
                    style={labelStyle}
                  >
                    {t.participants}
                  </label>
                  <input
                    id="sb-participants"
                    type="number"
                    min="1"
                    max="50"
                    value={form.participantCount}
                    onChange={(e) =>
                      setForm({ ...form, participantCount: e.target.value })
                    }
                    className={inputClass}
                    style={inputStyle}
                    data-ocid="service.booking_form.participants_input"
                  />
                </div>
              )}

              {showLocation && (
                <div className="sm:col-span-2">
                  <label
                    htmlFor="sb-location"
                    className={labelClass}
                    style={labelStyle}
                  >
                    {t.location}
                  </label>
                  <input
                    id="sb-location"
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="Your address for doorstep service"
                    className={inputClass}
                    style={inputStyle}
                    data-ocid="service.booking_form.location_input"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label
                  htmlFor="sb-requests"
                  className={labelClass}
                  style={labelStyle}
                >
                  {t.specialRequests}
                </label>
                <textarea
                  id="sb-requests"
                  value={form.specialRequests}
                  onChange={(e) =>
                    setForm({ ...form, specialRequests: e.target.value })
                  }
                  placeholder="Any specific prayers, wishes, or requirements..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                  data-ocid="service.booking_form.special_requests_textarea"
                />
              </div>
            </div>

            {/* Price summary */}
            <div
              className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{
                background: "oklch(0.68 0.20 48 / 0.06)",
                border: "1px solid oklch(0.68 0.20 48 / 0.2)",
              }}
            >
              <span
                className="text-sm font-heading font-semibold"
                style={{ color: "oklch(0.40 0.12 40)" }}
              >
                {t.serviceTotal}
              </span>
              <span
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.35 0.14 35)" }}
              >
                ₹{price.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-full font-heading font-semibold text-sm border transition-all"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.35)",
                  color: "oklch(0.50 0.06 50)",
                }}
                data-ocid="service.booking_form.cancel_button"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-full font-heading font-bold text-sm text-white transition-all hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                }}
                data-ocid="service.booking_form.submit_button"
              >
                {t.addToCart}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
