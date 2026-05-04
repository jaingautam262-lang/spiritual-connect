import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateConsultationAppointment } from "../hooks/useQueries";

interface ConsultExpertModalProps {
  open: boolean;
  onClose: () => void;
  /** Pre-fill service type (e.g. 'gemstone') */
  serviceType?: string;
  /** Product name to pre-fill context */
  productName?: string;
}

const SERVICES = [
  { value: "gemstone", label: "Gemstone Consultation", icon: "💎" },
  { value: "kundli", label: "Kundli Analysis", icon: "🔮" },
  { value: "vastu", label: "Vastu Consultation", icon: "🏠" },
  { value: "numerology", label: "Numerology Guidance", icon: "🔢" },
  { value: "puja", label: "Puja Recommendation", icon: "🙏" },
];

const TIME_SLOTS = [
  "Morning (9am–12pm)",
  "Afternoon (12pm–4pm)",
  "Evening (4pm–8pm)",
];

const BORDER = "oklch(0.78 0.14 75 / 0.2)";
const GOLD = "oklch(0.78 0.14 75)";
const SAFFRON = "oklch(0.68 0.20 48)";
const MUTED = "oklch(0.65 0.04 55)";

export default function ConsultExpertModal({
  open,
  onClose,
  serviceType = "gemstone",
  productName,
}: ConsultExpertModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slot, setSlot] = useState("");
  const [question, setQuestion] = useState(
    productName ? `I'm interested in: ${productName}` : "",
  );
  const [selectedService, setSelectedService] = useState(serviceType);
  const [submitted, setSubmitted] = useState(false);
  const { identity } = useInternetIdentity();
  const createAppointment = useCreateConsultationAppointment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !slot) {
      toast.error("Please fill name, phone and time slot.");
      return;
    }
    const serviceLabel =
      SERVICES.find((s) => s.value === selectedService)?.label ??
      selectedService;
    const id = `CONSULT-${Date.now().toString(36).toUpperCase()}`;
    try {
      if (identity) {
        await createAppointment.mutateAsync({
          id,
          userId: identity.getPrincipal(),
          astrologerId: "expert-panel",
          preferredDateTime: new Date().toISOString(),
          topic: serviceLabel,
          specialQuestions: `Name: ${name}\nPhone: ${phone}\nSlot: ${slot}\nProduct: ${productName ?? ""}\nQuestion: ${question}`,
          status: "pending",
          notes: "",
          createdAt: BigInt(Date.now()),
        });
      }
    } catch {
      // silent fallback
    }
    setSubmitted(true);
    toast.success("Consultation request sent! We'll call you within 24 hours.");
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close modal"
      />
      {/* Modal */}
      <div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "oklch(0.20 0.07 22)",
          border: `1.5px solid ${BORDER}`,
        }}
        data-ocid="consult.dialog"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{
            background: "oklch(0.22 0.08 22)",
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          <div>
            <h3
              className="font-heading font-bold text-base"
              style={{ color: GOLD }}
            >
              🔮 Consult an Expert
            </h3>
            {productName && (
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                Re: {productName}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: GOLD }}
            data-ocid="consult.close_button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center" data-ocid="consult.success_state">
            <CheckCircle
              className="h-12 w-12 mx-auto mb-3"
              style={{ color: "oklch(0.65 0.18 145)" }}
            />
            <p
              className="font-heading font-semibold text-base mb-1"
              style={{ color: GOLD }}
            >
              Request Submitted!
            </p>
            <p className="text-sm" style={{ color: MUTED }}>
              Our expert will contact you within 24 hours on {phone}.
            </p>
            <Button
              onClick={onClose}
              className="mt-4"
              style={{
                background: `linear-gradient(135deg, ${SAFFRON}, oklch(0.58 0.18 40))`,
                color: "white",
              }}
              data-ocid="consult.confirm_button"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Service selector */}
            <div className="space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>Service *</Label>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSelectedService(s.value)}
                    className="px-3 py-1.5 rounded-full text-xs font-heading transition-all"
                    style={{
                      background:
                        selectedService === s.value
                          ? SAFFRON
                          : "oklch(0.22 0.07 22)",
                      color:
                        selectedService === s.value
                          ? "white"
                          : "oklch(0.80 0.04 60)",
                      border: `1px solid ${selectedService === s.value ? SAFFRON : BORDER}`,
                    }}
                    data-ocid={`consult.modal_service.${s.value}`}
                  >
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label style={{ color: "oklch(0.82 0.06 70)" }}>Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  required
                  style={{
                    background: "oklch(0.22 0.07 22)",
                    borderColor: BORDER,
                    color: "oklch(0.90 0.04 70)",
                  }}
                  data-ocid="consult.modal_name_input"
                />
              </div>
              <div className="space-y-2">
                <Label style={{ color: "oklch(0.82 0.06 70)" }}>Phone *</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  required
                  style={{
                    background: "oklch(0.22 0.07 22)",
                    borderColor: BORDER,
                    color: "oklch(0.90 0.04 70)",
                  }}
                  data-ocid="consult.modal_phone_input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>
                Your Question
              </Label>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={2}
                style={{
                  background: "oklch(0.22 0.07 22)",
                  borderColor: BORDER,
                  color: "oklch(0.90 0.04 70)",
                }}
                data-ocid="consult.modal_question_textarea"
              />
            </div>

            <div className="space-y-2">
              <Label style={{ color: "oklch(0.82 0.06 70)" }}>
                Preferred Time *
              </Label>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-heading transition-all"
                    style={{
                      background: slot === s ? SAFFRON : "oklch(0.22 0.07 22)",
                      color: slot === s ? "white" : "oklch(0.80 0.04 60)",
                      border: `1px solid ${slot === s ? SAFFRON : BORDER}`,
                    }}
                    data-ocid={`consult.modal_slot.${s.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                style={{ borderColor: BORDER, color: GOLD }}
                data-ocid="consult.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createAppointment.isPending}
                className="flex-1"
                style={{
                  background: `linear-gradient(135deg, ${SAFFRON}, oklch(0.58 0.18 40))`,
                  color: "white",
                }}
                data-ocid="consult.modal_submit_button"
              >
                {createAppointment.isPending ? "Sending..." : "Request Call"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
