import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreateCheckoutSession,
  useGetUserAppointments,
  useGetUserChadhavaOfferings,
  useGetUserOrders,
  useGetUserPrasadDeliveries,
  useGetUserPujaBookings,
  useGetUserReportRequests,
  useGetWalletBalance,
  useGetWalletTransactions,
} from "../hooks/useQueries";

const TABS = [
  { id: "bookings", label: "🙏 Puja Bookings" },
  { id: "appointments", label: "🧘 Appointments" },
  { id: "reports", label: "📋 Reports" },
  { id: "orders", label: "🛍️ Orders" },
  { id: "wallet", label: "💰 Wallet" },
  { id: "temple", label: "🏠 My Temple" },
  { id: "chadhava", label: "🌸 Chadhava & Prasad" },
];

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "confirmed" || status === "completed" || status === "paid"
      ? "status-badge-confirmed"
      : status === "cancelled" || status === "failed"
        ? "status-badge-cancelled"
        : "status-badge-pending";
  return <span className={cls}>{status}</span>;
}

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const [activeTab, setActiveTab] = useState("bookings");
  const principal = identity?.getPrincipal() ?? null;

  const { data: pujaBookings = [], isLoading: loadingPuja } =
    useGetUserPujaBookings(principal);
  const { data: appointments = [], isLoading: loadingAppts } =
    useGetUserAppointments(principal);
  const { data: reports = [], isLoading: loadingReports } =
    useGetUserReportRequests(principal);
  const { data: orders = [], isLoading: loadingOrders } =
    useGetUserOrders(principal);
  const { data: walletBalance = 0, isLoading: loadingWallet } =
    useGetWalletBalance(principal);
  const { data: transactions = [] } = useGetWalletTransactions(principal);
  const { data: chadhavaOfferings = [] } =
    useGetUserChadhavaOfferings(principal);
  const { data: prasadDeliveries = [] } = useGetUserPrasadDeliveries(principal);
  const checkoutMutation = useCreateCheckoutSession();

  if (!identity) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔐</div>
        <h2
          className="font-heading text-2xl font-bold mb-3"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Login Required
        </h2>
        <p className="font-body text-muted-foreground mb-6">
          Please login to access your personal dashboard.
        </p>
      </div>
    );
  }

  const handleWalletRecharge = async (amount: number) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    try {
      const session = await checkoutMutation.mutateAsync({
        items: [
          {
            productName: "Wallet Recharge",
            productDescription: `Add ₹${amount} to your SpiritualConnect wallet`,
            quantity: BigInt(1),
            priceInCents: BigInt(amount * 100),
            currency: "inr",
          },
        ],
        successUrl: `${baseUrl}/payment-success`,
        cancelUrl: `${baseUrl}/payment-failure`,
      });
      if (!session?.url) throw new Error("Missing session URL");
      window.location.href = session.url;
    } catch {
      toast.error("Failed to initiate wallet recharge");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1
          className="font-heading font-bold text-3xl mb-1"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          My Dashboard
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          Principal: {identity.getPrincipal().toString().slice(0, 20)}...
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="w-full text-left px-4 py-3 rounded-xl font-heading text-sm font-semibold transition-all"
                style={{
                  background:
                    activeTab === tab.id
                      ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.78 0.14 75 / 0.1))"
                      : "transparent",
                  color:
                    activeTab === tab.id
                      ? "oklch(0.68 0.20 48)"
                      : "oklch(0.45 0.06 40)",
                  border:
                    activeTab === tab.id
                      ? "1px solid oklch(0.68 0.20 48 / 0.3)"
                      : "1px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Puja Bookings */}
          {activeTab === "bookings" && (
            <div>
              <h2
                className="font-heading font-bold text-xl mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🙏 My Puja Bookings
              </h2>
              {loadingPuja ? (
                <Skeleton className="h-32 rounded-xl" />
              ) : pujaBookings.length === 0 ? (
                <div className="text-center py-12 font-body text-muted-foreground">
                  No puja bookings yet.{" "}
                  <Link
                    to="/temple-services"
                    className="underline"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Book a puja
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {pujaBookings.map((b) => (
                    <div
                      key={b.id}
                      className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between gap-4"
                    >
                      <div>
                        <p
                          className="font-heading font-bold text-sm"
                          style={{ color: "oklch(0.22 0.08 22)" }}
                        >
                          {b.pujaType}
                        </p>
                        <p className="text-xs font-body text-muted-foreground">
                          Temple: {b.templeId} • Date: {b.preferredDate}
                        </p>
                        <p className="text-xs font-body text-muted-foreground">
                          Devotee: {b.devoteeName}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Appointments */}
          {activeTab === "appointments" && (
            <div>
              <h2
                className="font-heading font-bold text-xl mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🧘 My Appointments
              </h2>
              {loadingAppts ? (
                <Skeleton className="h-32 rounded-xl" />
              ) : appointments.length === 0 ? (
                <div className="text-center py-12 font-body text-muted-foreground">
                  No appointments yet.{" "}
                  <Link
                    to="/astrologer"
                    className="underline"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Book a consultation
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((a) => (
                    <div
                      key={a.id}
                      className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between gap-4"
                    >
                      <div>
                        <p
                          className="font-heading font-bold text-sm"
                          style={{ color: "oklch(0.22 0.08 22)" }}
                        >
                          {a.topic}
                        </p>
                        <p className="text-xs font-body text-muted-foreground">
                          Astrologer: {a.astrologerId} • {a.preferredDateTime}
                        </p>
                        {a.notes && (
                          <p className="text-xs font-body text-muted-foreground">
                            Notes: {a.notes}
                          </p>
                        )}
                      </div>
                      <StatusBadge status={a.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reports */}
          {activeTab === "reports" && (
            <div>
              <h2
                className="font-heading font-bold text-xl mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                📋 My Reports
              </h2>
              {loadingReports ? (
                <Skeleton className="h-32 rounded-xl" />
              ) : reports.length === 0 ? (
                <div className="text-center py-12 font-body text-muted-foreground">
                  No reports yet.{" "}
                  <Link
                    to="/reports"
                    className="underline"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Request a report
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {reports.map((r) => (
                    <div
                      key={r.id}
                      className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between gap-4"
                    >
                      <div>
                        <p
                          className="font-heading font-bold text-sm"
                          style={{ color: "oklch(0.22 0.08 22)" }}
                        >
                          {r.reportType}
                        </p>
                        <p className="text-xs font-body text-muted-foreground">
                          Name: {r.name} • DOB: {r.dob}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={r.status} />
                        {r.status === "completed" && (
                          <Link
                            to="/reports/$id"
                            params={{ id: r.reportType }}
                            className="text-xs font-heading underline"
                            style={{ color: "oklch(0.68 0.20 48)" }}
                          >
                            View
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === "orders" && (
            <div>
              <h2
                className="font-heading font-bold text-xl mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🛍️ My Orders
              </h2>
              {loadingOrders ? (
                <Skeleton className="h-32 rounded-xl" />
              ) : orders.length === 0 ? (
                <div className="text-center py-12 font-body text-muted-foreground">
                  No orders yet.{" "}
                  <Link
                    to="/shop"
                    className="underline"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Browse the shop
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between gap-4"
                    >
                      <div>
                        <p
                          className="font-heading font-bold text-sm"
                          style={{ color: "oklch(0.22 0.08 22)" }}
                        >
                          Order #{o.id.slice(0, 12)}...
                        </p>
                        <p className="text-xs font-body text-muted-foreground">
                          {o.items.length} item(s) • Total: ₹
                          {o.total.toFixed(0)}
                        </p>
                      </div>
                      <StatusBadge status={o.paymentStatus} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wallet */}
          {activeTab === "wallet" && (
            <div>
              <h2
                className="font-heading font-bold text-xl mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                💰 My Wallet
              </h2>
              {loadingWallet ? (
                <Skeleton className="h-32 rounded-xl" />
              ) : (
                <>
                  <div className="ornamental-border rounded-2xl p-6 bg-card mb-6 text-center">
                    <p className="font-heading text-sm text-muted-foreground mb-1">
                      Current Balance
                    </p>
                    <p
                      className="font-decorative font-bold text-5xl mb-4"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      ₹{walletBalance.toFixed(2)}
                    </p>
                    <p
                      className="font-heading font-semibold text-sm mb-4"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      Recharge Wallet
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {[100, 500, 1000, 2000].map((amt) => (
                        <button
                          type="button"
                          key={amt}
                          onClick={() => handleWalletRecharge(amt)}
                          disabled={checkoutMutation.isPending}
                          className="px-5 py-2 rounded-full font-heading font-semibold text-sm border transition-all hover:scale-105 disabled:opacity-50"
                          style={{
                            borderColor: "oklch(0.68 0.20 48)",
                            color: "oklch(0.68 0.20 48)",
                          }}
                        >
                          +₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {transactions.length > 0 && (
                    <div>
                      <h3
                        className="font-heading font-semibold text-sm mb-3"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        Transaction History
                      </h3>
                      <div className="space-y-2">
                        {transactions.map((t) => (
                          <div
                            key={t.id}
                            className="flex items-center justify-between p-3 rounded-lg border"
                            style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
                          >
                            <div>
                              <p
                                className="font-heading text-sm font-semibold"
                                style={{ color: "oklch(0.22 0.08 22)" }}
                              >
                                {t.description}
                              </p>
                              <p className="text-xs font-body text-muted-foreground">
                                {t.transactionType}
                              </p>
                            </div>
                            <span
                              className="font-heading font-bold text-sm"
                              style={{
                                color:
                                  t.transactionType === "credit"
                                    ? "oklch(0.65 0.16 140)"
                                    : "oklch(0.55 0.22 25)",
                              }}
                            >
                              {t.transactionType === "credit" ? "+" : "-"}₹
                              {t.amount.toFixed(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* My Temple */}
          {activeTab === "temple" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-float">🏠</div>
              <h2
                className="font-heading font-bold text-xl mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                My Virtual Temple
              </h2>
              <p className="font-body text-muted-foreground mb-6">
                Visit and customize your personal digital temple.
              </p>
              <Link
                to="/virtual-temple"
                className="px-8 py-3 rounded-full font-heading font-bold text-sm inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                Visit My Temple
              </Link>
            </div>
          )}

          {/* Chadhava & Prasad */}
          {activeTab === "chadhava" && (
            <div>
              <h2
                className="font-heading font-bold text-xl mb-4"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                🌸 Chadhava & Prasad
              </h2>
              {chadhavaOfferings.length === 0 &&
              prasadDeliveries.length === 0 ? (
                <div className="text-center py-12 font-body text-muted-foreground">
                  No offerings or deliveries yet.{" "}
                  <Link
                    to="/temple-services"
                    className="underline"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Make an offering
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {chadhavaOfferings.length > 0 && (
                    <div>
                      <h3
                        className="font-heading font-semibold text-sm mb-2"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        Chadhava Offerings
                      </h3>
                      {chadhavaOfferings.map((o) => (
                        <div
                          key={o.id}
                          className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between gap-4 mb-2"
                        >
                          <div>
                            <p
                              className="font-heading font-bold text-sm"
                              style={{ color: "oklch(0.22 0.08 22)" }}
                            >
                              Temple: {o.templeId}
                            </p>
                            <p className="text-xs font-body text-muted-foreground">
                              Items: {o.items.join(", ")}
                            </p>
                          </div>
                          <StatusBadge status={o.status} />
                        </div>
                      ))}
                    </div>
                  )}
                  {prasadDeliveries.length > 0 && (
                    <div>
                      <h3
                        className="font-heading font-semibold text-sm mb-2"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        Prasad Deliveries
                      </h3>
                      {prasadDeliveries.map((d) => (
                        <div
                          key={d.id}
                          className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between gap-4 mb-2"
                        >
                          <div>
                            <p
                              className="font-heading font-bold text-sm"
                              style={{ color: "oklch(0.22 0.08 22)" }}
                            >
                              Temple: {d.templeId}
                            </p>
                            <p className="text-xs font-body text-muted-foreground">
                              {d.address}
                            </p>
                          </div>
                          <StatusBadge status={d.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
