import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import BirthChartWheel from "../components/BirthChartWheel";
import { REPORT_CATALOG } from "../data/reportCatalogData";
import {
  DETAILED_REPORTS,
  SAMPLE_PLANETARY_POSITIONS,
} from "../data/reportOutputData";

export default function ReportOutput() {
  const { id } = useParams({ from: "/reports/$id" });
  const report = DETAILED_REPORTS[id];
  const catalogItem = REPORT_CATALOG.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Link
          to="/reports"
          className="inline-flex items-center gap-2 text-sm font-heading mb-6 hover:underline"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Reports
        </Link>
        <div className="ornamental-border rounded-2xl p-8 bg-card text-center">
          <div className="text-5xl mb-4">{catalogItem?.icon || "📋"}</div>
          <h1
            className="font-heading font-bold text-2xl mb-3"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            {catalogItem?.name || "Report"}
          </h1>
          <p className="font-body text-muted-foreground mb-6">
            This report is being prepared by our expert astrologers. You will be
            notified once it's ready.
          </p>
          <div
            className="p-4 rounded-xl"
            style={{
              background: "oklch(0.78 0.14 75 / 0.08)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <p
              className="font-heading font-semibold text-sm"
              style={{ color: "oklch(0.55 0.16 60)" }}
            >
              📍 Sample report — Request this report from the Reports page to
              receive your personalized analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Link
        to="/reports"
        className="inline-flex items-center gap-2 text-sm font-heading mb-6 hover:underline"
        style={{ color: "oklch(0.68 0.20 48)" }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Reports
      </Link>

      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl">{catalogItem?.icon || "📋"}</span>
          <div>
            <h1
              className="font-heading font-bold text-2xl"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {report.title}
            </h1>
            <p
              className="text-xs font-body mt-1 px-3 py-1 rounded-full inline-block"
              style={{
                background: "oklch(0.78 0.14 75 / 0.1)",
                color: "oklch(0.55 0.16 60)",
              }}
            >
              📍 Sample report for demonstration
            </p>
          </div>
        </div>
      </div>

      {/* Birth Chart Wheel for birth-chart report */}
      {id === "birth-chart" && (
        <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
          <h2
            className="font-heading font-bold text-lg mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Birth Chart Wheel
          </h2>
          <BirthChartWheel />
        </div>
      )}

      {/* Planetary Positions */}
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading font-bold text-lg mb-4"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Planetary Positions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr
                style={{ borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)" }}
              >
                {["Planet", "Sign", "Degree", "House", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 px-3 font-heading font-semibold text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SAMPLE_PLANETARY_POSITIONS.map((p) => (
                <tr
                  key={p.planet}
                  style={{
                    borderBottom: "1px solid oklch(0.78 0.14 75 / 0.1)",
                  }}
                >
                  <td
                    className="py-2 px-3 font-heading font-semibold"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {p.planet}
                  </td>
                  <td className="py-2 px-3">{p.sign}</td>
                  <td className="py-2 px-3">{p.degree}</td>
                  <td className="py-2 px-3">{p.house}</td>
                  <td className="py-2 px-3">
                    {p.retrograde ? (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "oklch(0.55 0.22 25 / 0.1)",
                          color: "oklch(0.55 0.22 25)",
                        }}
                      >
                        Retrograde
                      </span>
                    ) : (
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.65 0.16 140)" }}
                      >
                        Direct
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Sections */}
      <div className="space-y-4">
        {report.sections.map((section) => (
          <div
            key={section.title}
            className="ornamental-border rounded-2xl p-6 bg-card"
          >
            <h3
              className="font-heading font-bold text-base mb-3"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {section.title}
            </h3>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.30 0.06 30)" }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
