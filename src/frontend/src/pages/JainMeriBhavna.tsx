import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import {
  mahaArghyaData,
  meriBhavnaData,
  nandishwarVratVidhiData,
  navgrahVratPujaData,
} from "../data/jainPujaNewData";

function BhavnaCard({ verse }: { verse: (typeof meriBhavnaData)[0] }) {
  return (
    <Card
      className="p-5 border-border bg-card hover:border-primary/30 transition-colors"
      data-ocid={`bhavna.verse.${verse.number}`}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.52 0.15 45))",
            color: "oklch(0.97 0.01 80)",
          }}
        >
          {verse.number}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-base leading-loose text-foreground mb-2"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {verse.hindi}
          </p>
          <p className="text-xs text-muted-foreground italic mb-2">
            {verse.roman}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-2">
            {verse.english}
          </p>
        </div>
        <span className="text-xl flex-shrink-0">🌸</span>
      </div>
    </Card>
  );
}

function MeriBhavnaTab() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <Card className="p-6 border-border bg-card">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">🙏</span>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              मेरी भावना
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "मेरी भावना" जैन भक्ति का एक अत्यंत महत्त्वपूर्ण पाठ है। इसमें 11 भावनाओं के
              माध्यम से साधक अपनी आत्मा की शुद्धि, अहिंसा, मैत्री, करुणा और मोक्षमार्ग पर
              चलने का संकल्प व्यक्त करता है। यह पाठ प्रतिदिन संध्या वंदना या भावना स्तवन के
              रूप में किया जाता है।
            </p>
          </div>
        </div>
      </Card>

      {/* Verses */}
      <div className="space-y-4" data-ocid="bhavna.verses.list">
        {meriBhavnaData.map((verse) => (
          <BhavnaCard key={verse.number} verse={verse} />
        ))}
      </div>
    </div>
  );
}

function MahaArghyaTab() {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <Card className="p-6 border-border bg-card">
        <div className="flex items-start gap-4">
          <span className="text-4xl flex-shrink-0">🏺</span>
          <div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              {mahaArghyaData.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {mahaArghyaData.intro}
            </p>
          </div>
        </div>
      </Card>

      {/* Main Mantra */}
      <Card
        className="p-6 text-center border-primary/30"
        style={{ background: "oklch(0.62 0.18 48 / 0.07)" }}
        data-ocid="maha-arghya.mantra.card"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
          महा अर्घ्य मंत्र
        </p>
        <p
          className="text-lg md:text-xl font-bold text-foreground leading-relaxed"
          style={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            color: "oklch(0.75 0.15 65)",
          }}
        >
          {mahaArghyaData.mainMantra}
        </p>
      </Card>

      {/* Tirthas Grid */}
      <div>
        <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <span>🗺️</span> 20 जैन तीर्थ
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          data-ocid="maha-arghya.tirthas.list"
        >
          {mahaArghyaData.tirthas.map((tirtha) => (
            <Card
              key={tirtha.number}
              className="p-4 border-border bg-card"
              data-ocid={`maha-arghya.tirtha.${tirtha.number}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: "oklch(0.62 0.18 48 / 0.15)",
                    color: "oklch(0.62 0.18 48)",
                  }}
                >
                  {tirtha.number}
                </span>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {tirtha.nameHindi}
                  </p>
                  <p className="text-xs text-muted-foreground italic mb-1">
                    {tirtha.name}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tirtha.significance}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Perform */}
      <Card
        className="p-5 border-border bg-muted/30"
        data-ocid="maha-arghya.procedure.card"
      >
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <span>📋</span> महा अर्घ्य कैसे करें
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {mahaArghyaData.procedureNote}
        </p>
      </Card>
    </div>
  );
}

function ComingSoonTab({
  data,
}: { data: { title: string; description: string } }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      data-ocid={`${data.title}.coming-soon`}
    >
      <div className="text-5xl mb-5">📿</div>
      <h3 className="text-xl font-display font-bold text-foreground mb-3">
        {data.title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-5 leading-relaxed">
        {data.description}
      </p>
      <Badge variant="outline" className="gap-1.5">
        <Clock className="h-3 w-3" />
        शीघ्र उपलब्ध होगा
      </Badge>
    </div>
  );
}

export default function JainMeriBhavna() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 35), oklch(0.22 0.08 45), oklch(0.18 0.05 30))",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🪷</div>
          <h1
            className="text-3xl md:text-5xl font-display font-bold mb-3"
            style={{ color: "oklch(0.88 0.12 75)" }}
          >
            जैन पूजा संग्रह
          </h1>
          <p className="text-muted-foreground">
            मेरी भावना, महा अर्घ्य और विशेष पूजा विधियाँ
          </p>
        </div>
      </div>

      <div
        className="max-w-4xl mx-auto px-4 py-10"
        data-ocid="jain-puja-new.page"
      >
        <Tabs defaultValue="bhavna">
          <TabsList
            className="grid grid-cols-4 w-full mb-8 h-auto"
            data-ocid="jain-puja-new.tabs"
          >
            <TabsTrigger
              value="bhavna"
              className="text-xs sm:text-sm py-2.5"
              data-ocid="jain-puja-new.tab.bhavna"
            >
              मेरी भावना
            </TabsTrigger>
            <TabsTrigger
              value="arghya"
              className="text-xs sm:text-sm py-2.5"
              data-ocid="jain-puja-new.tab.arghya"
            >
              महा अर्घ्य
            </TabsTrigger>
            <TabsTrigger
              value="navgrah"
              className="text-xs sm:text-sm py-2.5"
              data-ocid="jain-puja-new.tab.navgrah"
            >
              नवग्रह पूजा
            </TabsTrigger>
            <TabsTrigger
              value="nandishwar"
              className="text-xs sm:text-sm py-2.5"
              data-ocid="jain-puja-new.tab.nandishwar"
            >
              नंदीश्वर व्रत
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bhavna">
            <MeriBhavnaTab />
          </TabsContent>

          <TabsContent value="arghya">
            <MahaArghyaTab />
          </TabsContent>

          <TabsContent value="navgrah">
            <ComingSoonTab data={navgrahVratPujaData} />
          </TabsContent>

          <TabsContent value="nandishwar">
            <ComingSoonTab data={nandishwarVratVidhiData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
