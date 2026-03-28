import { CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { REPORT_CATALOG } from "../data/reportCatalogData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCreateReportRequest } from "../hooks/useQueries";

export default function Reports() {
  const { identity } = useInternetIdentity();
  const createReport = useCreateReportRequest();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", dob: "", tob: "", pob: "" });
  const [confirmed, setConfirmed] = useState(false);

  const report = REPORT_CATALOG.find((r) => r.id === selectedReport);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) {
      toast.error("Please login to request a report");
      return;
    }
    if (!form.name || !form.dob) {
      toast.error("Please fill required fields");
      return;
    }

    const id = `report-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      await createReport.mutateAsync({
        id,
        userId: identity.getPrincipal(),
        reportType: selectedReport!,
        name: form.name,
        dob: form.dob,
        tob: form.tob,
        pob: form.pob,
        status: "pending",
        content: "",
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setConfirmed(true);
      toast.success("Report requested successfully!");
    } catch {
      toast.error("Failed to request report");
    }
  };

  const categories = [...new Set(REPORT_CATALOG.map((r) => r.category))];

  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/panchang-banner.dim_1200x400.png"
          alt="Reports"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📋 Astrological Reports
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            Detailed personalized reports by expert astrologers
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <h2
              className="font-heading font-bold text-xl mb-4"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {cat} Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {REPORT_CATALOG.filter((r) => r.category === cat).map((r) => (
                <div key={r.id} className="temple-card p-5 flex flex-col">
                  <div className="text-3xl mb-3">{r.icon}</div>
                  <h3
                    className="font-heading font-bold text-sm mb-2"
                    style={{ color: "oklch(0.22 0.08 22)" }}
                  >
                    {r.name}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mb-3 flex-1">
                    {r.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-heading font-bold"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      ₹{r.price}
                    </span>
                    <span className="text-xs font-body text-muted-foreground">
                      {r.deliveryDays} day{r.deliveryDays > 1 ? "s" : ""}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReport(r.id);
                      setConfirmed(false);
                    }}
                    className="w-full py-2 rounded-full font-heading font-semibold text-xs transition-all hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                  >
                    Request Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Report Request Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{
              background: "oklch(0.97 0.015 85)",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {confirmed ? "Report Requested!" : `Request: ${report?.name}`}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedReport(null);
                  setConfirmed(false);
                }}
                className="p-1 rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {confirmed ? (
              <div className="text-center py-6">
                <CheckCircle
                  className="h-12 w-12 mx-auto mb-3"
                  style={{ color: "oklch(0.65 0.16 140)" }}
                />
                <p className="font-body text-sm text-muted-foreground">
                  Your report has been requested. Our astrologers will prepare
                  it within {report?.deliveryDays} day(s). Check your Dashboard
                  for updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {!identity && (
                  <div
                    className="p-3 rounded-lg text-sm font-body text-center"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.1)",
                      color: "oklch(0.55 0.16 60)",
                    }}
                  >
                    Please login to request a report
                  </div>
                )}
                <div>
                  <label
                    htmlFor="report-name"
                    className="block text-sm font-heading font-semibold mb-1"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="report-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="report-dob"
                      className="block text-sm font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Date of Birth *
                    </label>
                    <input
                      id="report-dob"
                      type="date"
                      value={form.dob}
                      onChange={(e) =>
                        setForm({ ...form, dob: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="report-tob"
                      className="block text-sm font-heading font-semibold mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Time of Birth
                    </label>
                    <input
                      id="report-tob"
                      type="time"
                      value={form.tob}
                      onChange={(e) =>
                        setForm({ ...form, tob: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="report-pob"
                    className="block text-sm font-heading font-semibold mb-1"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    Place of Birth
                  </label>
                  <input
                    id="report-pob"
                    type="text"
                    value={form.pob}
                    onChange={(e) => setForm({ ...form, pob: e.target.value })}
                    placeholder="City, Country"
                    className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span
                    className="font-heading font-bold"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    ₹{report?.price}
                  </span>
                  <button
                    type="submit"
                    disabled={createReport.isPending || !identity}
                    className="px-6 py-2 rounded-full font-heading font-bold text-sm transition-all disabled:opacity-50"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                  >
                    {createReport.isPending
                      ? "Submitting..."
                      : "Request Report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
