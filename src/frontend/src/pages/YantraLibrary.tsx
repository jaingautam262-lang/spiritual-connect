import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { type YantraEntry, yantraList } from "../data/yantraData";

const MATERIAL_EMOJI: Record<string, string> = {
  Copper: "🟤",
  Silver: "⚪",
  Gold: "🟡",
  Paper: "📄",
  Iron: "⚫",
};

function YantraCard({
  yantra,
  onClick,
}: { yantra: YantraEntry; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border rounded-xl p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg w-full"
      style={{
        background: "oklch(0.20 0.07 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.2)",
      }}
      data-ocid={`yantra.item.${yantra.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{yantra.emoji}</span>
          <div>
            <h3
              className="font-heading font-bold text-base leading-tight"
              style={{ color: "oklch(0.92 0.06 75)" }}
            >
              {yantra.name}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {yantra.hindi_name}
            </p>
          </div>
        </div>
        <Badge
          className="text-[10px] shrink-0"
          style={{
            background:
              yantra.faith === "Hindu"
                ? "oklch(0.68 0.20 48 / 0.2)"
                : "oklch(0.58 0.18 200 / 0.2)",
            color:
              yantra.faith === "Hindu"
                ? "oklch(0.88 0.10 70)"
                : "oklch(0.78 0.10 200)",
            border: `1px solid ${yantra.faith === "Hindu" ? "oklch(0.68 0.20 48 / 0.3)" : "oklch(0.58 0.18 200 / 0.3)"}`,
          }}
        >
          {yantra.faith}
        </Badge>
      </div>

      <p
        className="text-xs mb-3 line-clamp-2"
        style={{ color: "oklch(0.65 0.04 55)" }}
      >
        Deity: {yantra.deity}
      </p>

      <ul className="space-y-1 mb-4">
        {yantra.benefits.slice(0, 2).map((b) => (
          <li
            key={b.slice(0, 30)}
            className="flex items-start gap-2 text-xs"
            style={{ color: "oklch(0.75 0.04 60)" }}
          >
            <span style={{ color: "oklch(0.68 0.20 48)" }}>◆</span>
            <span className="line-clamp-1">{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "oklch(0.65 0.04 55)" }}
        >
          <span>{MATERIAL_EMOJI[yantra.material] || "🔯"}</span>
          <span>{yantra.material}</span>
          <span>·</span>
          <span>{yantra.price_range}</span>
        </div>
      </div>
    </button>
  );
}

function YantraModal({
  yantra,
  onClose,
}: { yantra: YantraEntry; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto border"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.25)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-3 text-xl"
            style={{ color: "oklch(0.92 0.06 75)" }}
          >
            <span className="text-4xl">{yantra.emoji}</span>
            <div>
              <div>{yantra.name}</div>
              <div
                className="text-sm font-normal mt-0.5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {yantra.hindi_name}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Key info */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {[
            { label: "Deity / देवता", value: yantra.deity },
            { label: "Faith / धर्म", value: yantra.faith },
            {
              label: "Material / सामग्री",
              value: `${MATERIAL_EMOJI[yantra.material]} ${yantra.material}`,
            },
            { label: "Category / श्रेणी", value: yantra.category },
            { label: "Price Range / मूल्य", value: yantra.price_range },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg p-3"
              style={{ background: "oklch(0.22 0.07 22)" }}
            >
              <p
                className="text-[10px] uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.68 0.12 65)" }}
              >
                {item.label}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Shape Description */}
        <div
          className="rounded-lg p-4 mt-2"
          style={{
            background: "oklch(0.22 0.07 22)",
            borderLeft: "3px solid oklch(0.78 0.14 75)",
          }}
        >
          <p
            className="text-xs uppercase tracking-wider mb-2"
            style={{ color: "oklch(0.68 0.12 65)" }}
          >
            🔯 Sacred Geometry Description
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.82 0.04 65)" }}
          >
            {yantra.shape_description}
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-2">
          <h4
            className="font-heading font-semibold text-sm mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ Benefits / लाभ
          </h4>
          <ul className="space-y-2">
            {yantra.benefits.map((b) => (
              <li
                key={b.slice(0, 30)}
                className="flex items-start gap-2 text-sm"
                style={{ color: "oklch(0.80 0.04 60)" }}
              >
                <span
                  className="mt-0.5 text-xs"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  ◆
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Placement */}
        <div
          className="rounded-lg p-4 mt-2"
          style={{
            background: "oklch(0.20 0.06 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h4
            className="font-heading font-semibold text-sm mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🏠 Placement / स्थापना स्थान
          </h4>
          <p className="text-sm" style={{ color: "oklch(0.75 0.04 60)" }}>
            {yantra.placement}
          </p>
        </div>

        {/* Activation Mantra */}
        <div
          className="rounded-lg p-4 mt-2"
          style={{
            background: "oklch(0.22 0.07 22)",
            borderLeft: "3px solid oklch(0.68 0.20 48)",
          }}
        >
          <p
            className="text-xs uppercase tracking-wider mb-2"
            style={{ color: "oklch(0.68 0.12 65)" }}
          >
            🕉️ Activation Mantra / सिद्धि मंत्र
          </p>
          <p
            className="font-heading text-sm leading-relaxed"
            style={{ color: "oklch(0.90 0.06 75)" }}
          >
            {yantra.activation_mantra}
          </p>
        </div>

        {/* Puja Procedure */}
        <div className="mt-2">
          <h4
            className="font-heading font-semibold text-sm mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🙏 Puja Procedure / पूजा विधि
          </h4>
          <ol className="space-y-2">
            {yantra.puja_procedure.map((step, i) => (
              <li
                key={step.slice(0, 20)}
                className="flex items-start gap-2 text-sm"
                style={{ color: "oklch(0.80 0.04 60)" }}
              >
                <span
                  className="font-bold text-xs mt-0.5 shrink-0 w-5"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {i + 1}.
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-4">
          <Link to="/shop" className="flex-1">
            <Button
              className="w-full"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
              data-ocid="yantra.buy_button"
            >
              🛒 Buy Now
            </Button>
          </Link>
          <Link to="/astrologer" className="flex-1">
            <Button
              variant="outline"
              className="w-full"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.3)",
                color: "oklch(0.88 0.06 75)",
              }}
              data-ocid="yantra.consult_button"
            >
              🔮 Consult Expert
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={onClose}
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.88 0.06 75)",
            }}
            data-ocid="yantra.close_button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function YantraLibrary() {
  const [search, setSearch] = useState("");
  const [selectedYantra, setSelectedYantra] = useState<YantraEntry | null>(
    null,
  );

  const hinduYantras = yantraList.filter((y) => y.faith === "Hindu");
  const jainYantras = yantraList.filter((y) => y.faith === "Jain");

  const filterYantras = (list: YantraEntry[]) =>
    search
      ? list.filter(
          (y) =>
            y.name.toLowerCase().includes(search.toLowerCase()) ||
            y.hindi_name.includes(search) ||
            y.deity.toLowerCase().includes(search.toLowerCase()) ||
            y.category.toLowerCase().includes(search.toLowerCase()),
        )
      : list;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.16 0.06 20) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔯 Yantra Library
          </h1>
          <p className="text-lg mb-1" style={{ color: "oklch(0.88 0.06 75)" }}>
            यंत्र पुस्तकालय — Hindu & Jain Sacred Geometry
          </p>
          <p
            className="text-sm max-w-2xl mx-auto mb-8"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            Explore 20 sacred yantras with complete installation rituals,
            activation mantras, and placement guidance. Each yantra is a divine
            energy matrix for specific cosmic blessings.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.60 0.05 55)" }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by yantra name, deity, or category..."
              className="pl-10 border"
              style={{
                background: "oklch(0.22 0.07 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.90 0.04 70)",
              }}
              data-ocid="yantra.search_input"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <Tabs defaultValue="hindu">
          <TabsList
            className="mb-8 w-full max-w-sm mx-auto grid grid-cols-2"
            style={{
              background: "oklch(0.20 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <TabsTrigger
              value="hindu"
              style={{ color: "oklch(0.88 0.06 75)" }}
              data-ocid="yantra.hindu_tab"
            >
              🕉️ Hindu (17)
            </TabsTrigger>
            <TabsTrigger
              value="jain"
              style={{ color: "oklch(0.88 0.06 75)" }}
              data-ocid="yantra.jain_tab"
            >
              🙏 Jain (3)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hindu">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="yantra.hindu_list"
            >
              {filterYantras(hinduYantras).map((y) => (
                <YantraCard
                  key={y.id}
                  yantra={y}
                  onClick={() => setSelectedYantra(y)}
                />
              ))}
              {filterYantras(hinduYantras).length === 0 && (
                <div
                  className="col-span-3 text-center py-16"
                  data-ocid="yantra.empty_state"
                >
                  <p
                    className="text-lg"
                    style={{ color: "oklch(0.65 0.04 55)" }}
                  >
                    No yantras found for "{search}"
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearch("")}
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="jain">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="yantra.jain_list"
            >
              {filterYantras(jainYantras).map((y) => (
                <YantraCard
                  key={y.id}
                  yantra={y}
                  onClick={() => setSelectedYantra(y)}
                />
              ))}
              {filterYantras(jainYantras).length === 0 && (
                <div
                  className="col-span-3 text-center py-16"
                  data-ocid="yantra.empty_state"
                >
                  <p
                    className="text-lg"
                    style={{ color: "oklch(0.65 0.04 55)" }}
                  >
                    No yantras found for "{search}"
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setSearch("")}
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Buy section */}
        <div
          className="mt-12 rounded-xl p-8 text-center"
          style={{
            background: "oklch(0.20 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h3
            className="font-decorative text-xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Purchase Energized Yantras
          </h3>
          <p className="text-sm mb-4" style={{ color: "oklch(0.65 0.04 55)" }}>
            All yantras in our shop are energized (abhimantrit) by qualified
            priests before dispatch.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/yantra-shop">
              <Button
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
                data-ocid="yantra.shop_button"
              >
                🛒 Browse Yantra Shop
              </Button>
            </Link>
            <Link to="/astrologer">
              <Button
                variant="outline"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.3)",
                  color: "oklch(0.88 0.06 75)",
                }}
                data-ocid="yantra.consult_expert_button"
              >
                🔮 Expert Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {selectedYantra && (
        <YantraModal
          yantra={selectedYantra}
          onClose={() => setSelectedYantra(null)}
        />
      )}
    </div>
  );
}
