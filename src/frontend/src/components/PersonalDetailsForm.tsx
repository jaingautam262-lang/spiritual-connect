import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const STORAGE_KEY = "spiritualConnect_personalDetails";

interface PersonalDetails {
  profession: string;
  education: string;
  maritalStatus: string;
  children: string;
  healthIssues: string;
  majorEvents: string;
}

const EMPTY_DETAILS: PersonalDetails = {
  profession: "",
  education: "",
  maritalStatus: "",
  children: "",
  healthIssues: "",
  majorEvents: "",
};

function isProfileComplete(d: PersonalDetails): boolean {
  return !!(d.profession && d.education && d.maritalStatus);
}

export default function PersonalDetailsForm() {
  const [details, setDetails] = useState<PersonalDetails>(EMPTY_DETAILS);
  const [saved, setSaved] = useState<PersonalDetails | null>(null);
  const [editing, setEditing] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersonalDetails;
        setSaved(parsed);
        setDetails(parsed);
        if (isProfileComplete(parsed)) setEditing(false);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
    setSaved({ ...details });
    setEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEdit = () => {
    setEditing(true);
    setShowSuccess(false);
  };

  const setField = (field: keyof PersonalDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const profileFilled = saved && isProfileComplete(saved);

  return (
    <div className="space-y-5" data-ocid="profile.section">
      {/* Header card */}
      <Card
        style={{
          background: "oklch(0.16 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className="font-heading"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              👤 Personal Details — Life Context
            </CardTitle>
            {profileFilled && (
              <Badge
                style={{ background: "oklch(0.55 0.18 145)", color: "white" }}
              >
                Profile Complete ✓
              </Badge>
            )}
          </div>
          <p
            className="font-body text-sm mt-1"
            style={{ color: "oklch(0.65 0.04 60)" }}
          >
            This information helps personalize your astrological readings and
            predictions
          </p>
        </CardHeader>
      </Card>

      {/* Success message */}
      {showSuccess && (
        <div
          className="rounded-lg px-4 py-3 text-center"
          data-ocid="profile.success_state"
          style={{
            background: "oklch(0.55 0.18 145 / 0.15)",
            border: "1px solid oklch(0.55 0.18 145 / 0.4)",
          }}
        >
          <p
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.55 0.18 145)" }}
          >
            ✓ Profile saved successfully!
          </p>
        </div>
      )}

      {/* Saved summary (view mode) */}
      {!editing && saved && (
        <Card
          style={{
            background: "oklch(0.16 0.04 20)",
            border: "1px solid oklch(0.28 0.06 25)",
          }}
        >
          <CardContent className="pt-5 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(
                [
                  { label: "Profession", icon: "💼", value: saved.profession },
                  { label: "Education", icon: "🎓", value: saved.education },
                  {
                    label: "Marital Status",
                    icon: "💍",
                    value: saved.maritalStatus,
                  },
                  { label: "Children", icon: "👶", value: saved.children },
                  {
                    label: "Health Issues",
                    icon: "🌿",
                    value: saved.healthIssues || "None mentioned",
                  },
                ] as { label: string; icon: string; value: string }[]
              ).map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-lg p-3"
                  style={{ background: "oklch(0.20 0.05 20)" }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p
                      className="font-heading text-xs"
                      style={{ color: "oklch(0.60 0.04 60)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-body text-sm"
                      style={{ color: "oklch(0.85 0.04 60)" }}
                    >
                      {item.value || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {saved.majorEvents && (
              <div
                className="rounded-lg p-3"
                style={{ background: "oklch(0.20 0.05 20)" }}
              >
                <p
                  className="font-heading text-xs mb-1"
                  style={{ color: "oklch(0.60 0.04 60)" }}
                >
                  📅 Major Life Events
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(0.85 0.04 60)" }}
                >
                  {saved.majorEvents}
                </p>
              </div>
            )}
            <Button
              onClick={handleEdit}
              data-ocid="profile.edit_button"
              variant="outline"
              className="w-full font-heading"
              style={{
                borderColor: "oklch(0.35 0.08 25)",
                color: "oklch(0.78 0.14 75)",
              }}
            >
              ✏️ Edit Profile
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit form */}
      {editing && (
        <Card
          style={{
            background: "oklch(0.16 0.04 20)",
            border: "1px solid oklch(0.28 0.06 25)",
          }}
        >
          <CardContent className="pt-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  💼 Profession
                </Label>
                <Input
                  value={details.profession}
                  onChange={(e) => setField("profession", e.target.value)}
                  placeholder="e.g. Software Engineer, Teacher, Business Owner"
                  data-ocid="profile.profession.input"
                  style={{
                    background: "oklch(0.20 0.05 20)",
                    borderColor: "oklch(0.35 0.08 25)",
                    color: "oklch(0.90 0.04 60)",
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🎓 Education
                </Label>
                <Input
                  value={details.education}
                  onChange={(e) => setField("education", e.target.value)}
                  placeholder="e.g. Masters in CS, Graduate, PhD"
                  data-ocid="profile.education.input"
                  style={{
                    background: "oklch(0.20 0.05 20)",
                    borderColor: "oklch(0.35 0.08 25)",
                    color: "oklch(0.90 0.04 60)",
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  💍 Marital Status
                </Label>
                <Select
                  value={details.maritalStatus}
                  onValueChange={(v) => setField("maritalStatus", v)}
                >
                  <SelectTrigger
                    data-ocid="profile.marital.select"
                    style={{
                      background: "oklch(0.20 0.05 20)",
                      borderColor: "oklch(0.35 0.08 25)",
                      color: "oklch(0.90 0.04 60)",
                    }}
                  >
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.20 0.05 20)",
                      borderColor: "oklch(0.35 0.08 25)",
                    }}
                  >
                    {[
                      "Single",
                      "Married",
                      "Divorced",
                      "Widowed",
                      "In a relationship",
                    ].map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        style={{ color: "oklch(0.90 0.04 60)" }}
                      >
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  👶 Children
                </Label>
                <Input
                  value={details.children}
                  onChange={(e) => setField("children", e.target.value)}
                  placeholder="e.g. Two (ages 5 and 8), None, One adult son"
                  data-ocid="profile.children.input"
                  style={{
                    background: "oklch(0.20 0.05 20)",
                    borderColor: "oklch(0.35 0.08 25)",
                    color: "oklch(0.90 0.04 60)",
                  }}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🌿 Health Issues{" "}
                  <span style={{ color: "oklch(0.55 0.04 60)" }}>
                    (Optional)
                  </span>
                </Label>
                <Input
                  value={details.healthIssues}
                  onChange={(e) => setField("healthIssues", e.target.value)}
                  placeholder="e.g. Diabetes, Hypertension, None"
                  data-ocid="profile.health.input"
                  style={{
                    background: "oklch(0.20 0.05 20)",
                    borderColor: "oklch(0.35 0.08 25)",
                    color: "oklch(0.90 0.04 60)",
                  }}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label
                  className="font-heading text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  📅 Major Life Events{" "}
                  <span style={{ color: "oklch(0.55 0.04 60)" }}>
                    (Optional)
                  </span>
                </Label>
                <Textarea
                  value={details.majorEvents}
                  onChange={(e) => setField("majorEvents", e.target.value)}
                  placeholder="e.g. Job change in 2022, moved to new city, business started in 2020"
                  rows={3}
                  data-ocid="profile.events.textarea"
                  style={{
                    background: "oklch(0.20 0.05 20)",
                    borderColor: "oklch(0.35 0.08 25)",
                    color: "oklch(0.90 0.04 60)",
                  }}
                />
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={
                !details.profession ||
                !details.education ||
                !details.maritalStatus
              }
              data-ocid="profile.save.button"
              className="w-full font-heading font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              💾 Save Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
