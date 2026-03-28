import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreatePujaBooking, useGetAllTemples } from "../hooks/useQueries";

const PUJA_TYPES = [
  "Ganesh Puja",
  "Lakshmi Puja",
  "Shiva Abhishek",
  "Satyanarayan Katha",
  "Navgraha Puja",
  "Rudrabhishek",
  "Sunderkand Path",
  "Hanuman Puja",
  "Durga Puja",
  "Kali Puja",
  "Saraswati Puja",
  "Vishnu Puja",
  "Ram Puja",
  "Krishna Puja",
  "Vastu Puja",
  "Griha Pravesh Puja",
];

export default function PujaBookingForm() {
  const { identity } = useInternetIdentity();
  const { data: temples = [] } = useGetAllTemples();
  const createBooking = useCreatePujaBooking();

  const [form, setForm] = useState({
    templeId: "",
    devoteeName: "",
    gotra: "",
    pujaType: "",
    preferredDate: "",
    specialWishes: "",
  });
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to book a puja");
      return;
    }
    if (
      !form.templeId ||
      !form.devoteeName ||
      !form.pujaType ||
      !form.preferredDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const id = `puja-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      await createBooking.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        templeId: form.templeId,
        devoteeName: form.devoteeName,
        gotra: form.gotra,
        pujaType: form.pujaType,
        preferredDate: form.preferredDate,
        specialWishes: form.specialWishes,
        status: "pending",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed(id);
      toast.success("Puja booked successfully!");
    } catch {
      toast.error("Failed to book puja. Please try again.");
    }
  };

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <CheckCircle
          className="h-16 w-16 mx-auto mb-4"
          style={{ color: "oklch(0.65 0.16 140)" }}
        />
        <h2
          className="font-heading text-2xl font-bold mb-2"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Puja Booked Successfully!
        </h2>
        <p className="font-body text-muted-foreground mb-4">
          Your booking ID:{" "}
          <span
            className="font-heading font-bold"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            {confirmed.slice(0, 20)}...
          </span>
        </p>
        <p className="font-body text-sm text-muted-foreground mb-6">
          You will receive confirmation once the temple processes your booking.
          Track it in your Dashboard.
        </p>
        <button
          type="button"
          onClick={() => {
            setConfirmed(null);
            setForm({
              templeId: "",
              devoteeName: "",
              gotra: "",
              pujaType: "",
              preferredDate: "",
              specialWishes: "",
            });
          }}
          className="px-6 py-2 rounded-full font-heading font-semibold text-sm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
        >
          Book Another Puja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 md:p-8 bg-card">
        <h2
          className="font-heading text-2xl font-bold mb-6 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          🙏 Book a Puja
        </h2>
        {!identity && (
          <div
            className="mb-4 p-3 rounded-lg text-sm font-body text-center"
            style={{
              background: "oklch(0.78 0.14 75 / 0.1)",
              color: "oklch(0.55 0.16 60)",
            }}
          >
            Please login to book a puja
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="puja-temple"
              className="block text-sm font-heading font-semibold mb-1"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Select Temple *
            </label>
            <select
              id="puja-temple"
              value={form.templeId}
              onChange={(e) => setForm({ ...form, templeId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
              required
            >
              <option value="">-- Select a Temple --</option>
              {temples.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} — {t.location}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="puja-devotee"
                className="block text-sm font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Devotee Name *
              </label>
              <input
                id="puja-devotee"
                type="text"
                value={form.devoteeName}
                onChange={(e) =>
                  setForm({ ...form, devoteeName: e.target.value })
                }
                placeholder="Full name"
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="puja-gotra"
                className="block text-sm font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Gotra
              </label>
              <input
                id="puja-gotra"
                type="text"
                value={form.gotra}
                onChange={(e) => setForm({ ...form, gotra: e.target.value })}
                placeholder="e.g., Kashyap, Bharadwaj"
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="puja-type"
                className="block text-sm font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Puja Type *
              </label>
              <select
                id="puja-type"
                value={form.pujaType}
                onChange={(e) => setForm({ ...form, pujaType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                required
              >
                <option value="">-- Select Puja --</option>
                {PUJA_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="puja-date"
                className="block text-sm font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Preferred Date *
              </label>
              <input
                id="puja-date"
                type="date"
                value={form.preferredDate}
                onChange={(e) =>
                  setForm({ ...form, preferredDate: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="puja-wishes"
              className="block text-sm font-heading font-semibold mb-1"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Special Wishes
            </label>
            <textarea
              id="puja-wishes"
              value={form.specialWishes}
              onChange={(e) =>
                setForm({ ...form, specialWishes: e.target.value })
              }
              placeholder="Any specific prayers or wishes..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background resize-none"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            />
          </div>

          <button
            type="submit"
            disabled={createBooking.isPending || !identity}
            className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            {createBooking.isPending ? "Booking..." : "🙏 Book Puja"}
          </button>
        </form>
      </div>
    </div>
  );
}
