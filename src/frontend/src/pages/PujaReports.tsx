import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle,
  ClipboardList,
  Download,
  Filter,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { pujaTypesData } from "../data/pujaTypesData";
import {
  useCreatePujaReport,
  useGetAllPujaReports,
  useGetUserPujaReports,
  useUpdatePujaReport,
} from "../hooks/useQueries";
import type { DaanItem, PujaReport } from "../types/backend-types";

const ADMIN_PASSWORD = "admin123";
const GUEST_USER_ID = "guest-user";

// ─── New Report Modal ─────────────────────────────────────────────────────────

interface NewReportModalProps {
  onClose: () => void;
  userId: string;
}

function NewReportModal({ onClose, userId }: NewReportModalProps) {
  const createReport = useCreatePujaReport();
  const [form, setForm] = useState({
    userName: "",
    pujaType: "",
    deity: "",
    intention: "",
    datePerformed: "",
    priestName: "",
    duration: "",
    completionNotes: "",
  });
  const [daanItems, setDaanItems] = useState<(DaanItem & { _key: string })[]>([
    { item: "", quantity: "", value: "", _key: "k0" },
  ]);

  const addDaanRow = () =>
    setDaanItems((prev) => [
      ...prev,
      { item: "", quantity: "", value: "", _key: `k${Date.now()}` },
    ]);

  const updateDaan = (key: string, field: keyof DaanItem, value: string) => {
    setDaanItems((prev) =>
      prev.map((row) => (row._key === key ? { ...row, [field]: value } : row)),
    );
  };

  const removeDaan = (key: string) =>
    setDaanItems((prev) => prev.filter((row) => row._key !== key));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userName || !form.pujaType || !form.datePerformed) {
      toast.error("कृपया सभी आवश्यक जानकारी भरें");
      return;
    }
    createReport.mutate(
      {
        userId,
        userName: form.userName,
        pujaType: form.pujaType,
        deity: form.deity,
        intention: form.intention,
        datePerformed: form.datePerformed,
        priestName: form.priestName,
        duration: form.duration,
        daanItems: daanItems
          .filter((d) => d.item)
          .map(({ item, quantity, value }) => ({ item, quantity, value })),
        completionNotes: form.completionNotes,
        status: "Pending",
      },
      {
        onSuccess: () => {
          toast.success("🙏 पूजा रिपोर्ट सफलतापूर्वक सहेजी गई!");
          onClose();
        },
        onError: () => toast.error("रिपोर्ट सहेजने में त्रुटि हुई"),
      },
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "oklch(0.10 0.04 20 / 0.7)" }}
      data-ocid="puja-reports.new_report_modal"
    >
      <div
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
        style={{
          background: "oklch(0.99 0.01 80)",
          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b"
          style={{
            background: "oklch(0.99 0.01 80)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <h2
            className="font-heading font-bold text-lg"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            📋 नई पूजा रिपोर्ट
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted/40"
            aria-label="Close"
            data-ocid="puja-reports.modal.close_button"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Sankalp Section */}
          <div>
            <h3
              className="font-heading font-semibold text-sm mb-3"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              🙏 संकल्प विवरण
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="rpt-name">भक्त का नाम *</Label>
                <Input
                  id="rpt-name"
                  value={form.userName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, userName: e.target.value }))
                  }
                  placeholder="पूरा नाम"
                  data-ocid="puja-reports.form.name_input"
                />
              </div>
              <div>
                <Label htmlFor="rpt-puja">पूजा प्रकार *</Label>
                <select
                  id="rpt-puja"
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground h-10"
                  value={form.pujaType}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, pujaType: e.target.value }))
                  }
                  data-ocid="puja-reports.form.puja_type_select"
                >
                  <option value="">— पूजा चुनें —</option>
                  {pujaTypesData.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.nameHindi} ({p.name})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="rpt-deity">देवता</Label>
                <Input
                  id="rpt-deity"
                  value={form.deity}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, deity: e.target.value }))
                  }
                  placeholder="जैसे: शिव, विष्णु"
                  data-ocid="puja-reports.form.deity_input"
                />
              </div>
              <div>
                <Label htmlFor="rpt-date">पूजा की तारीख *</Label>
                <Input
                  id="rpt-date"
                  type="date"
                  value={form.datePerformed}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, datePerformed: e.target.value }))
                  }
                  data-ocid="puja-reports.form.date_input"
                />
              </div>
              <div>
                <Label htmlFor="rpt-priest">पुजारी का नाम</Label>
                <Input
                  id="rpt-priest"
                  value={form.priestName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, priestName: e.target.value }))
                  }
                  placeholder="पुजारी जी का नाम"
                  data-ocid="puja-reports.form.priest_input"
                />
              </div>
              <div>
                <Label htmlFor="rpt-dur">अवधि</Label>
                <Input
                  id="rpt-dur"
                  value={form.duration}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, duration: e.target.value }))
                  }
                  placeholder="जैसे: 2 घंटे"
                  data-ocid="puja-reports.form.duration_input"
                />
              </div>
            </div>
            <div className="mt-3">
              <Label htmlFor="rpt-intention">संकल्प / मनोकामना</Label>
              <Textarea
                id="rpt-intention"
                value={form.intention}
                onChange={(e) =>
                  setForm((f) => ({ ...f, intention: e.target.value }))
                }
                placeholder="अपनी इच्छा या संकल्प यहाँ लिखें..."
                rows={2}
                data-ocid="puja-reports.form.intention_input"
              />
            </div>
          </div>

          {/* Daan Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3
                className="font-heading font-semibold text-sm"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                💰 दान सामग्री
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addDaanRow}
                className="text-xs"
                data-ocid="puja-reports.form.add_daan_button"
              >
                <Plus className="h-3 w-3 mr-1" /> पंक्ति जोड़ें
              </Button>
            </div>
            <div className="space-y-2">
              {daanItems.map((row, idx) => (
                <div
                  key={row._key}
                  className="grid grid-cols-[1fr_80px_80px_32px] gap-2 items-center"
                >
                  <Input
                    placeholder="वस्तु (Item)"
                    value={row.item}
                    onChange={(e) =>
                      updateDaan(row._key, "item", e.target.value)
                    }
                    className="text-sm"
                    data-ocid={`puja-reports.form.daan_item_${idx}`}
                  />
                  <Input
                    placeholder="मात्रा"
                    value={row.quantity}
                    onChange={(e) =>
                      updateDaan(row._key, "quantity", e.target.value)
                    }
                    className="text-sm"
                  />
                  <Input
                    placeholder="₹ मूल्य"
                    value={row.value}
                    onChange={(e) =>
                      updateDaan(row._key, "value", e.target.value)
                    }
                    className="text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeDaan(row._key)}
                    className="text-destructive hover:opacity-80"
                    aria-label="Remove row"
                    disabled={daanItems.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Notes */}
          <div>
            <Label htmlFor="rpt-notes">समापन टिप्पणी</Label>
            <Textarea
              id="rpt-notes"
              value={form.completionNotes}
              onChange={(e) =>
                setForm((f) => ({ ...f, completionNotes: e.target.value }))
              }
              placeholder="पूजा कैसे संपन्न हुई — कोई विशेष बात..."
              rows={3}
              data-ocid="puja-reports.form.notes_input"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              रद्द करें
            </Button>
            <Button
              type="submit"
              disabled={createReport.isPending}
              className="flex-1 font-heading font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
              data-ocid="puja-reports.form.submit_button"
            >
              {createReport.isPending ? "सहेज रहे हैं..." : "🙏 रिपोर्ट सहेजें"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Report Card ──────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<PujaReport["status"], string> = {
  Pending: "oklch(0.70 0.18 55)",
  Completed: "oklch(0.55 0.18 145)",
  Verified: "oklch(0.55 0.16 220)",
};

function ReportCard({
  report,
  isAdmin,
  onStatusChange,
}: {
  report: PujaReport;
  isAdmin: boolean;
  onStatusChange?: (id: string, status: PujaReport["status"]) => void;
}) {
  const totalDaan = report.daanItems
    .filter((d) => d.value)
    .reduce((sum, d) => sum + (Number(d.value) || 0), 0);

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "oklch(0.99 0.008 80)",
        border: "1px solid oklch(0.78 0.14 75 / 0.2)",
      }}
      data-ocid={`puja-reports.report_card.${report.id}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="font-heading font-bold text-base truncate"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {report.pujaType}
            </h3>
            <Badge
              className="text-xs shrink-0"
              style={{
                background: `${STATUS_COLORS[report.status]}/15`,
                color: STATUS_COLORS[report.status],
              }}
            >
              {report.status === "Pending"
                ? "⏳ Pending"
                : report.status === "Completed"
                  ? "✅ Completed"
                  : "🔵 Verified"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {report.userName} • {report.deity}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p
            className="text-xs font-body font-semibold"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            ID: {report.id}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-0.5">
            <Calendar className="h-3 w-3" />
            {report.datePerformed}
          </p>
        </div>
      </div>

      {report.intention && (
        <div
          className="rounded-lg p-3 mb-3 text-xs font-body"
          style={{
            background: "oklch(0.68 0.20 48 / 0.07)",
            color: "oklch(0.40 0.10 45)",
          }}
        >
          🙏 संकल्प: {report.intention}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-3">
        {report.priestName && (
          <div>
            <p className="text-xs text-muted-foreground">पुजारी</p>
            <p className="text-xs font-semibold font-heading text-foreground">
              {report.priestName}
            </p>
          </div>
        )}
        {report.duration && (
          <div>
            <p className="text-xs text-muted-foreground">अवधि</p>
            <p className="text-xs font-semibold font-heading text-foreground">
              {report.duration}
            </p>
          </div>
        )}
        {totalDaan > 0 && (
          <div>
            <p className="text-xs text-muted-foreground">दान</p>
            <p
              className="text-xs font-semibold font-heading"
              style={{ color: "oklch(0.55 0.18 145)" }}
            >
              ₹{totalDaan}
            </p>
          </div>
        )}
      </div>

      {report.daanItems.length > 0 && report.daanItems[0].item && (
        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">दान सामग्री:</p>
          <div className="flex flex-wrap gap-1">
            {report.daanItems
              .filter((d) => d.item)
              .map((d) => (
                <span
                  key={`daan-${d.item}-${d.quantity}`}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.1)",
                    color: "oklch(0.45 0.10 50)",
                  }}
                >
                  {d.item} ({d.quantity})
                </span>
              ))}
          </div>
        </div>
      )}

      {isAdmin && onStatusChange && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-border/40">
          {(["Pending", "Completed", "Verified"] as PujaReport["status"][]).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => onStatusChange(report.id, s)}
                disabled={report.status === s}
                className="flex-1 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all disabled:opacity-40"
                style={{
                  background:
                    report.status === s
                      ? `${STATUS_COLORS[s]}/20`
                      : "oklch(0.94 0.02 75)",
                  color: STATUS_COLORS[s],
                  border: `1px solid ${STATUS_COLORS[s]}/30`,
                }}
                data-ocid={`puja-reports.status.${s.toLowerCase()}_button`}
              >
                {s}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PujaReports() {
  const [showModal, setShowModal] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | PujaReport["status"]
  >("All");
  const [filterPuja, setFilterPuja] = useState("");

  const userId = GUEST_USER_ID;
  const { data: myReports = [] } = useGetUserPujaReports(userId);
  const { data: allReports = [] } = useGetAllPujaReports();
  const updateReport = useUpdatePujaReport();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === ADMIN_PASSWORD) {
      setAdminMode(true);
      setAdminError("");
    } else {
      setAdminError("गलत पासवर्ड");
    }
  };

  const handleStatusChange = (id: string, status: PujaReport["status"]) => {
    updateReport.mutate(
      { id, status },
      {
        onSuccess: () => toast.success(`Status updated to ${status}`),
        onError: () => toast.error("Update failed"),
      },
    );
  };

  const filteredAdminReports = allReports.filter((r) => {
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    const matchPuja =
      !filterPuja ||
      r.pujaType.toLowerCase().includes(filterPuja.toLowerCase());
    return matchStatus && matchPuja;
  });

  const exportReports = () => {
    const rows = [
      ["ID", "Name", "Puja Type", "Deity", "Date", "Priest", "Status", "Daan"],
      ...filteredAdminReports.map((r) => [
        r.id,
        r.userName,
        r.pujaType,
        r.deity,
        r.datePerformed,
        r.priestName,
        r.status,
        r.daanItems
          .filter((d) => d.item)
          .map((d) => `${d.item}(${d.quantity})`)
          .join("; "),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "puja-reports.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div
        className="relative py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
        }}
      >
        <h1
          className="font-decorative text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          📋 पूजा रिपोर्ट
        </h1>
        <p
          className="font-body text-sm"
          style={{ color: "oklch(0.70 0.04 60)" }}
        >
          Puja Reports — संकल्प, दान और पूर्ण विवरण
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="my-reports">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <TabsList
              className="flex h-auto p-1 rounded-xl"
              style={{ background: "oklch(0.22 0.08 22)" }}
            >
              <TabsTrigger
                value="my-reports"
                className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white"
                style={{ color: "oklch(0.70 0.04 60)" }}
                data-ocid="puja-reports.tab.my_reports"
              >
                <ClipboardList className="h-3.5 w-3.5 mr-1.5" />
                मेरी रिपोर्ट
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white"
                style={{ color: "oklch(0.70 0.04 60)" }}
                data-ocid="puja-reports.tab.admin"
              >
                🔐 Admin
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={() => setShowModal(true)}
              className="font-heading font-semibold rounded-full px-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
              data-ocid="puja-reports.new_report_button"
            >
              <Plus className="h-4 w-4 mr-1.5" /> नई रिपोर्ट
            </Button>
          </div>

          {/* My Reports Tab */}
          <TabsContent value="my-reports">
            {myReports.length === 0 ? (
              <div className="text-center py-20">
                <ClipboardList className="h-14 w-14 mx-auto mb-4 text-muted-foreground/40" />
                <h3
                  className="font-heading font-bold text-xl mb-2"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  अभी कोई रिपोर्ट नहीं
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  अपनी पहली पूजा रिपोर्ट बनाएं
                </p>
                <Button
                  onClick={() => setShowModal(true)}
                  className="font-heading font-semibold rounded-full px-8"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }}
                  data-ocid="puja-reports.empty.new_report_button"
                >
                  <Plus className="h-4 w-4 mr-1.5" /> पहली रिपोर्ट बनाएं
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {myReports.length} रिपोर्ट मिली
                </p>
                {myReports.map((r) => (
                  <ReportCard key={r.id} report={r} isAdmin={false} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin">
            {!adminMode ? (
              <div className="max-w-sm mx-auto py-12">
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: "oklch(0.99 0.008 80)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "oklch(0.68 0.20 48 / 0.12)" }}
                  >
                    <span className="text-2xl">🔐</span>
                  </div>
                  <h2
                    className="font-heading font-bold text-xl mb-1"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    Admin Access
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    सभी रिपोर्ट देखने के लिए पासवर्ड डालें
                  </p>
                  <form onSubmit={handleAdminLogin} className="space-y-3">
                    <Input
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="Admin password"
                      data-ocid="puja-reports.admin.password_input"
                    />
                    {adminError && (
                      <p className="text-xs text-destructive">{adminError}</p>
                    )}
                    <Button
                      type="submit"
                      className="w-full font-heading font-semibold"
                      data-ocid="puja-reports.admin.login_button"
                    >
                      🔓 Login
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6 items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                      className="border border-input rounded-md px-3 py-1.5 text-sm bg-background text-foreground"
                      value={filterStatus}
                      onChange={(e) =>
                        setFilterStatus(
                          e.target.value as "All" | PujaReport["status"],
                        )
                      }
                      data-ocid="puja-reports.admin.status_filter"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </div>
                  <Input
                    value={filterPuja}
                    onChange={(e) => setFilterPuja(e.target.value)}
                    placeholder="Filter by puja type..."
                    className="max-w-[220px] h-9 text-sm"
                    data-ocid="puja-reports.admin.puja_filter"
                  />
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {filteredAdminReports.length} रिपोर्ट
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportReports}
                      className="text-xs"
                      data-ocid="puja-reports.admin.export_button"
                    >
                      <Download className="h-3.5 w-3.5 mr-1" /> CSV Export
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAdminMode(false)}
                      className="text-xs text-muted-foreground"
                    >
                      Logout
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {(
                    [
                      "Pending",
                      "Completed",
                      "Verified",
                    ] as PujaReport["status"][]
                  ).map((s) => {
                    const count = allReports.filter(
                      (r) => r.status === s,
                    ).length;
                    return (
                      <div
                        key={s}
                        className="rounded-xl p-4 text-center"
                        style={{
                          background: `${STATUS_COLORS[s]}/10`,
                          border: `1px solid ${STATUS_COLORS[s]}/20`,
                        }}
                      >
                        <p
                          className="text-2xl font-bold font-heading"
                          style={{ color: STATUS_COLORS[s] }}
                        >
                          {count}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {s}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {filteredAdminReports.length === 0 ? (
                  <div className="text-center py-16">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
                    <p className="font-heading font-semibold text-foreground">
                      कोई रिपोर्ट नहीं
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAdminReports.map((r) => (
                      <ReportCard
                        key={r.id}
                        report={r}
                        isAdmin
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* New Report Modal */}
      {showModal && (
        <NewReportModal onClose={() => setShowModal(false)} userId={userId} />
      )}
    </div>
  );
}
