import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateConsultationAppointment } from "../hooks/useQueries";

const TOPICS = [
  "Career",
  "Marriage",
  "Health",
  "Finance",
  "General",
  "Education",
  "Relationship",
  "Business",
  "Spirituality",
];
const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
];

interface Props {
  astrologerId: string;
  astrologerName: string;
  onSuccess?: () => void;
}

export default function AppointmentBookingForm({
  astrologerId,
  astrologerName,
  onSuccess,
}: Props) {
  const { identity } = useInternetIdentity();
  const createAppointment = useCreateConsultationAppointment();
  const [form, setForm] = useState({
    date: "",
    time: "",
    topic: "",
    specialQuestions: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to book an appointment");
      return;
    }
    if (!form.date || !form.time || !form.topic) {
      toast.error("Please fill all required fields");
      return;
    }

    const id = `appt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      await createAppointment.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        astrologerId,
        preferredDateTime: `${form.date} ${form.time}`,
        topic: form.topic,
        specialQuestions: form.specialQuestions,
        status: "pending",
        notes: "",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed(true);
      toast.success("Appointment requested!");
      onSuccess?.();
    } catch {
      toast.error("Failed to book appointment");
    }
  };

  if (confirmed) {
    return (
      <div className="text-center py-8">
        <CheckCircle
          className="h-12 w-12 mx-auto mb-3"
          style={{ color: "oklch(0.65 0.16 140)" }}
        />
        <h3
          className="font-heading font-bold text-lg mb-2"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Appointment Requested!
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Your appointment with {astrologerName} has been submitted. You will be
          notified once confirmed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!identity && (
        <div
          className="p-3 rounded-lg text-sm font-body text-center"
          style={{
            background: "oklch(0.78 0.14 75 / 0.1)",
            color: "oklch(0.55 0.16 60)",
          }}
        >
          Please login to book an appointment
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="apt-date"
            className="block text-sm font-heading font-semibold mb-1"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Preferred Date *
          </label>
          <input
            id="apt-date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            required
          />
        </div>
        <div>
          <label
            htmlFor="apt-time"
            className="block text-sm font-heading font-semibold mb-1"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Preferred Time *
          </label>
          <select
            id="apt-time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            required
          >
            <option value="">-- Select Time --</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="apt-topic"
          className="block text-sm font-heading font-semibold mb-1"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Consultation Topic *
        </label>
        <select
          id="apt-topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          required
        >
          <option value="">-- Select Topic --</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="apt-questions"
          className="block text-sm font-heading font-semibold mb-1"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Special Questions
        </label>
        <textarea
          id="apt-questions"
          value={form.specialQuestions}
          onChange={(e) =>
            setForm({ ...form, specialQuestions: e.target.value })
          }
          placeholder="Any specific questions or concerns..."
          rows={3}
          className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background resize-none"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
        />
      </div>
      <button
        type="submit"
        disabled={createAppointment.isPending || !identity}
        className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          color: "white",
        }}
      >
        {createAppointment.isPending ? "Booking..." : "📅 Request Appointment"}
      </button>
    </form>
  );
}
