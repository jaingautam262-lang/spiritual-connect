import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllAppointments,
  useUpdateConsultationAppointment,
} from "../hooks/useQueries";
import type { ConsultationAppointment } from "../types/backend-types";

const ADMIN_PASSCODE = "om108";

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "confirmed"
      ? "status-badge-confirmed"
      : status === "cancelled"
        ? "status-badge-cancelled"
        : "status-badge-pending";
  return <span className={cls}>{status}</span>;
}

export default function AstrologerDashboard() {
  const { identity: _identity } = useInternetIdentity();
  const [passcode, setPasscode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >("all");
  const [notes, setNotes] = useState<Record<string, string>>({});

  const { data: appointments = [], isLoading } = useGetAllAppointments();
  const updateAppointment = useUpdateConsultationAppointment();

  const handlePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      setAuthenticated(true);
    } else {
      toast.error("Invalid passcode");
    }
  };

  const handleUpdate = async (
    appt: ConsultationAppointment,
    status: string,
  ) => {
    try {
      await updateAppointment.mutateAsync({
        id: appt.id,
        status,
        notes: notes[appt.id] || appt.notes,
      });
      toast.success(`Appointment ${status}`);
    } catch {
      toast.error("Failed to update appointment");
    }
  };

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  if (!authenticated) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-sm">
        <div className="ornamental-border rounded-2xl p-8 bg-card text-center">
          <div className="text-5xl mb-4">🔐</div>
          <h1
            className="font-heading font-bold text-2xl mb-2"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Astrologer Dashboard
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Enter admin passcode to access
          </p>
          <form onSubmit={handlePasscode} className="space-y-4">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="w-full px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background text-center tracking-widest"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full font-heading font-bold text-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="font-heading font-bold text-3xl"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            🧘 Astrologer Dashboard
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            Manage consultation appointments
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAuthenticated(false)}
          className="px-4 py-2 rounded-full font-heading text-sm border transition-all"
          style={{
            borderColor: "oklch(0.78 0.14 75 / 0.3)",
            color: "oklch(0.45 0.06 40)",
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total",
            count: appointments.length,
            color: "oklch(0.68 0.20 48)",
          },
          {
            label: "Pending",
            count: appointments.filter((a) => a.status === "pending").length,
            color: "oklch(0.78 0.14 75)",
          },
          {
            label: "Confirmed",
            count: appointments.filter((a) => a.status === "confirmed").length,
            color: "oklch(0.65 0.16 140)",
          },
          {
            label: "Cancelled",
            count: appointments.filter((a) => a.status === "cancelled").length,
            color: "oklch(0.55 0.22 25)",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="ornamental-border rounded-xl p-4 bg-card text-center"
          >
            <div
              className="font-decorative font-bold text-3xl mb-1"
              style={{ color: stat.color }}
            >
              {stat.count}
            </div>
            <p className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
          <button
            type="button"
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full font-heading text-xs font-semibold capitalize transition-all"
            style={{
              background:
                filter === f
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                  : "oklch(0.94 0.025 80)",
              color: filter === f ? "white" : "oklch(0.35 0.12 25)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => i).map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 font-body text-muted-foreground">
          No appointments found
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((appt) => (
            <div
              key={appt.id}
              className="ornamental-border rounded-2xl p-5 bg-card"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="font-heading font-bold text-sm"
                      style={{ color: "oklch(0.22 0.08 22)" }}
                    >
                      {appt.topic} Consultation
                    </h3>
                    <StatusBadge status={appt.status} />
                  </div>
                  <p className="text-xs font-body text-muted-foreground mb-1">
                    User: {appt.userId.toString().slice(0, 20)}...
                  </p>
                  <p className="text-xs font-body text-muted-foreground mb-1">
                    Requested: {appt.preferredDateTime}
                  </p>
                  {appt.specialQuestions && (
                    <p
                      className="text-xs font-body"
                      style={{ color: "oklch(0.30 0.06 30)" }}
                    >
                      Questions: {appt.specialQuestions}
                    </p>
                  )}
                  <div className="mt-3">
                    <input
                      type="text"
                      value={notes[appt.id] ?? appt.notes}
                      onChange={(e) =>
                        setNotes({ ...notes, [appt.id]: e.target.value })
                      }
                      placeholder="Add notes..."
                      className="w-full px-3 py-1.5 rounded-lg border text-xs font-body focus:outline-none bg-background"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                    />
                  </div>
                </div>
                {appt.status === "pending" && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleUpdate(appt, "confirmed")}
                      disabled={updateAppointment.isPending}
                      className="px-4 py-2 rounded-full font-heading font-semibold text-xs transition-all disabled:opacity-50"
                      style={{
                        background: "oklch(0.65 0.16 140 / 0.15)",
                        color: "oklch(0.45 0.14 140)",
                        border: "1px solid oklch(0.65 0.16 140 / 0.3)",
                      }}
                    >
                      ✓ Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate(appt, "cancelled")}
                      disabled={updateAppointment.isPending}
                      className="px-4 py-2 rounded-full font-heading font-semibold text-xs transition-all disabled:opacity-50"
                      style={{
                        background: "oklch(0.55 0.22 25 / 0.1)",
                        color: "oklch(0.55 0.22 25)",
                        border: "1px solid oklch(0.55 0.22 25 / 0.3)",
                      }}
                    >
                      ✗ Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
