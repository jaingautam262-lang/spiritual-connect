import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import NewsletterPopup from "./components/NewsletterPopup";

import AdminCMS from "./pages/AdminCMS";
import Dashboard from "./pages/Dashboard";
// Eagerly loaded (lightweight, frequently visited)
import Home from "./pages/Home";

// Lazily loaded (heavy data pages)
const Aarti = lazy(() => import("./pages/Aarti"));
const AshtakamLibrary = lazy(() => import("./pages/AshtakamLibrary"));
const AstrologerConsultation = lazy(
  () => import("./pages/AstrologerConsultation"),
);
const AstrologerDashboard = lazy(() => import("./pages/AstrologerDashboard"));
const AstrologerProfile = lazy(() => import("./pages/AstrologerProfile"));
const AyurvedaSection = lazy(() => import("./pages/AyurvedaSection"));
const BhajanLibrary = lazy(() => import("./pages/BhajanLibrary"));
const BusinessNumerology = lazy(() => import("./pages/BusinessNumerology"));
const Chalisa = lazy(() => import("./pages/Chalisa"));
const DevotionalLibrary = lazy(() => import("./pages/DevotionalLibrary"));
const DivineInfo = lazy(() => import("./pages/DivineInfo"));
const HolyBooksAudio = lazy(() => import("./pages/HolyBooksAudio"));
const HolyBooksOverview = lazy(() => import("./pages/HolyBooksOverview"));
const HolyBooksReader = lazy(() => import("./pages/HolyBooksReader"));
const HoroscopePanchang = lazy(() => import("./pages/HoroscopePanchang"));
const JainEncyclopedia = lazy(() => import("./pages/JainEncyclopediaFull"));
const Jainipedia = lazy(() => import("./pages/Jainipedia"));
const JainPujan = lazy(() => import("./pages/JainPujan"));
const KavachLibrary = lazy(() => import("./pages/KavachLibrary"));
const KundaliMatchingPage = lazy(() => import("./pages/KundaliMatchingPage"));
const Mantra = lazy(() => import("./pages/Mantra"));
const Numerology = lazy(() => import("./pages/Numerology"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ReportOutput = lazy(() => import("./pages/ReportOutput"));
const Reports = lazy(() => import("./pages/Reports"));
const SahasranamLibrary = lazy(() => import("./pages/SahasranamLibrary"));
const SahasranamSangrah = lazy(() => import("./pages/SahasranamSangrah"));
const SpiritualShop = lazy(() => import("./pages/SpiritualShop"));
const Stotra = lazy(() => import("./pages/Stotra"));
const StutiLibrary = lazy(() => import("./pages/StutiLibrary"));
const TempleDirectory = lazy(() => import("./pages/TempleDirectory"));
const TempleServices = lazy(() => import("./pages/TempleServices"));
const Tirthankars = lazy(() => import("./pages/Tirthankars"));
const VirtualTemple = lazy(() => import("./pages/VirtualTemple"));
const VratKatha = lazy(() => import("./pages/VratKatha"));
const SikhKirtans = lazy(() => import("./pages/SikhKirtans"));
const JainVratKathas = lazy(() => import("./pages/JainVratKathas"));
const JainVratKathaDetail = lazy(() => import("./pages/JainVratKathaDetail"));
const JainVrat144List = lazy(() => import("./pages/JainVrat144List"));
const PadmavatiVratKatha = lazy(() => import("./pages/PadmavatiVratKatha"));
const PalmistryReading = lazy(() => import("./pages/PalmistryReading"));
const PalmPhotoReading = lazy(() => import("./pages/PalmPhotoReading"));
const VastuShastra = lazy(() => import("./pages/VastuShastra"));
const VastuRoomChecker = lazy(() => import("./pages/VastuRoomChecker"));
const HoroscopeComparison = lazy(() => import("./pages/HoroscopeComparison"));
const CalculatorIndex = lazy(() => import("./pages/CalculatorIndex"));
const CalculatorFAQPage = lazy(() => import("./pages/CalculatorFAQPage"));
const PujaTypesList = lazy(() => import("./pages/PujaTypesList"));
const PujaReports = lazy(() => import("./pages/PujaReports"));
const VedasSuktamLibrary = lazy(() => import("./pages/VedasSuktamLibrary"));
const SuktamLibrary = lazy(() => import("./pages/SuktamLibrary"));
const UnifiedSearch = lazy(() => import("./pages/UnifiedSearch"));
const FestivalCalendar = lazy(() => import("./pages/FestivalCalendar"));
const MediaPlayerPage = lazy(() => import("./pages/MediaPlayerPage"));
const BlogSection = lazy(() => import("./pages/BlogSection"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const WebStoriesPage = lazy(() => import("./pages/WebStoriesPage"));
const DivisionalCharts = lazy(() => import("./pages/DivisionalCharts"));
const AstroScore = lazy(() => import("./pages/AstroScore"));
const PlanetaryStrength = lazy(() => import("./pages/PlanetaryStrength"));
const YogasInChart = lazy(() => import("./pages/YogasInChart"));
const ChartRectification = lazy(() => import("./pages/ChartRectification"));
const VedicCompatibility = lazy(() => import("./pages/VedicCompatibility"));
const ShopByPurpose = lazy(() => import("./pages/ShopByPurpose"));
const JainPathshala = lazy(() => import("./pages/JainPathshala"));
const Pathshala = lazy(() => import("./pages/Pathshala"));
const JainDharmaJnana = lazy(() => import("./pages/JainDharmaJnana"));
const JainKathayen = lazy(() => import("./pages/JainKathayen"));
const JainStotraSangrah = lazy(() => import("./pages/JainStotraSangrah"));
const JainStutiSangrah = lazy(() => import("./pages/JainStutiSangrah"));
const JainParvCalendar = lazy(() => import("./pages/JainParvCalendar"));
const PujasCatalog = lazy(() => import("./pages/PujasCatalog"));
const PujaDetail = lazy(() => import("./pages/PujaDetail"));
const DoorstepPandit = lazy(() => import("./pages/DoorstepPandit"));
const TempleToursYatra = lazy(() => import("./pages/TempleToursYatra"));
const NadiCollection = lazy(() => import("./pages/NadiCollection"));
const NadiDetail = lazy(() => import("./pages/NadiDetail"));
const VedicCharts = lazy(() => import("./pages/VedicCharts"));
const VedicDashboard = lazy(() => import("./pages/VedicDashboard"));
const ChadhavaPage = lazy(() => import("./pages/ChadhavaPage"));
const EnergizedProducts = lazy(() => import("./pages/EnergizedProducts"));
const EnergizedProductDetail = lazy(
  () => import("./pages/EnergizedProductDetail"),
);
const PujaBookingPage = lazy(() => import("./pages/PujaBookingPage"));
const BookingHistoryPage = lazy(() => import("./pages/BookingHistoryPage"));
const CareerPathCalculator = lazy(() => import("./pages/CareerPathCalculator"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const YantraShop = lazy(() => import("./pages/YantraShop"));
const YantraInfo = lazy(() => import("./pages/YantraInfo"));
const YantraInfoDetail = lazy(() => import("./pages/YantraInfoDetail"));

// New Jain pages
const JainStavan = lazy(() => import("./pages/JainStavan"));
const JainContentIndex = lazy(() => import("./pages/JainContentIndex"));
const TattvarthaSutra = lazy(() => import("./pages/TattvarthaSutra"));
const JainNewStotraDetail = lazy(() => import("./pages/JainNewStotraDetail"));
const JainMeriBhavna = lazy(() => import("./pages/JainMeriBhavna"));
const JainStoriesLibrary = lazy(() => import("./pages/JainStoriesLibrary"));
const JainVichaar = lazy(() => import("./pages/JainVichaar"));
const JainBooksLibrary = lazy(() => import("./pages/JainBooksLibrary"));
const JainPoojasSangreh = lazy(() => import("./pages/JainPoojasSangreh"));
const JainBalVikas = lazy(() => import("./pages/JainBalVikas"));
const JainBhajanDetail = lazy(() => import("./pages/JainBhajanDetail"));
const JainKnowledgeBase = lazy(() => import("./pages/JainKnowledgeBase"));
const JainDevShastraGuruPuja = lazy(
  () => import("./pages/JainDevShastraGuruPuja"),
);
const JainVicharQuoteDetail = lazy(
  () => import("./pages/JainVicharQuoteDetail"),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return function SuspenseWrapper() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  };
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <NewsletterPopup />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const templeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temple-services",
  component: withSuspense(TempleServices),
});
const horoscopeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/horoscope",
  component: withSuspense(HoroscopePanchang),
});
const astrologerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologer",
  component: withSuspense(AstrologerConsultation),
});
const astrologerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologer/$id",
  component: withSuspense(AstrologerProfile),
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: withSuspense(SpiritualShop),
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/$id",
  component: withSuspense(ProductDetail),
});
const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: withSuspense(Reports),
});
const reportOutputRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports/$id",
  component: withSuspense(ReportOutput),
});
const devotionalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/devotional",
  component: withSuspense(DevotionalLibrary),
});
const virtualTempleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/virtual-temple",
  component: withSuspense(VirtualTemple),
});
const numerologyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/numerology",
  component: withSuspense(Numerology),
});
const businessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/business-tools",
  component: withSuspense(BusinessNumerology),
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});
const astrologerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologer-dashboard",
  component: withSuspense(AstrologerDashboard),
});
const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: withSuspense(PaymentSuccess),
});
const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: withSuspense(PaymentFailure),
});
const bhajanLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bhajan-library",
  component: withSuspense(BhajanLibrary),
});
const vratKathaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vrat-katha",
  component: withSuspense(VratKatha),
});
const holyBooksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/holy-books",
  component: withSuspense(HolyBooksAudio),
});
const adminCMSRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-cms",
  component: AdminCMS,
});
const aartiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aarti",
  component: withSuspense(Aarti),
});
const chalisaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chalisa",
  component: withSuspense(Chalisa),
});
const mantraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mantra",
  component: withSuspense(Mantra),
});
const stotraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stotra",
  component: withSuspense(Stotra),
});
const tirthankarsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tirthankars",
  component: withSuspense(Tirthankars),
});
const divineInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/divine-info",
  component: withSuspense(DivineInfo),
});
const templeDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temples",
  component: withSuspense(TempleDirectory),
});
const jainPujanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-pujan",
  component: withSuspense(JainPujan),
});
const ashtakamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ashtakam",
  component: withSuspense(AshtakamLibrary),
});
const stutiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stuti",
  component: withSuspense(StutiLibrary),
});
const sahasranamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sahasranam",
  component: withSuspense(SahasranamLibrary),
});
const kavachRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kavach",
  component: withSuspense(KavachLibrary),
});
const kundaliMatchingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kundali-matching",
  component: withSuspense(KundaliMatchingPage),
});
const sahasranamSangrahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sahasranam-sangrah",
  component: withSuspense(SahasranamSangrah),
});
const ayurvedaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ayurveda",
  component: withSuspense(AyurvedaSection),
});

const jainEncyclopediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-encyclopedia",
  component: withSuspense(JainEncyclopedia),
});
const jainEncyclopediaVolumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-encyclopedia/$volume",
  component: withSuspense(JainEncyclopedia),
});
const holyBooksOverviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/holy-books-overview",
  component: withSuspense(HolyBooksOverview),
});

const jainipediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jainipedia",
  component: withSuspense(Jainipedia),
});

const sikhKirtansRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sikh-kirtans",
  component: withSuspense(SikhKirtans),
});

const jainVratKathasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vrat-kathas",
  component: withSuspense(JainVratKathas),
});

const jainVratKathaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vrat-katha-detail/$id",
  component: withSuspense(JainVratKathaDetail),
});

const jainVrat144ListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vrat-144-list",
  component: withSuspense(JainVrat144List),
});

const padmavatiVratKathaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/padmavati-vrat-katha",
  component: withSuspense(PadmavatiVratKatha),
});

const holyBooksReaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/holy-books-reader",
  component: withSuspense(HolyBooksReader),
});

const palmistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/palmistry",
  component: withSuspense(PalmistryReading),
});

const palmPhotoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/palm-photo",
  component: withSuspense(PalmPhotoReading),
});

const vastuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vastu",
  component: withSuspense(VastuShastra),
});

const vastuRoomCheckerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vastu-checker",
  component: withSuspense(VastuRoomChecker),
});

const horoscopeComparisonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/horoscope-comparison",
  component: withSuspense(HoroscopeComparison),
});

const calculatorIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator-index",
  component: withSuspense(CalculatorIndex),
});

const calculatorFAQRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator-faq/$calculatorId",
  component: withSuspense(CalculatorFAQPage),
});

const pujaTypesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-types",
  component: withSuspense(PujaTypesList),
});

const pujaReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-reports",
  component: withSuspense(PujaReports),
});

const vedasSuktamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedas-suktam",
  component: withSuspense(VedasSuktamLibrary),
});

const suktamLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/suktam-library",
  component: withSuspense(SuktamLibrary),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: withSuspense(UnifiedSearch),
});

const festivalCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/festival-calendar",
  component: withSuspense(FestivalCalendar),
});

const mediaPlayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/media-player",
  component: withSuspense(MediaPlayerPage),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: withSuspense(BlogSection),
});

const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: withSuspense(BlogDetail),
});

const webStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/web-stories",
  component: withSuspense(WebStoriesPage),
});

const divisionalChartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/divisional-charts",
  component: withSuspense(DivisionalCharts),
});

const astroScoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astro-score",
  component: withSuspense(AstroScore),
});

const planetaryStrengthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/planetary-strength",
  component: withSuspense(PlanetaryStrength),
});

const yogasInChartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yogas-in-chart",
  component: withSuspense(YogasInChart),
});

const chartRectificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chart-rectification",
  component: withSuspense(ChartRectification),
});

const vedicCompatibilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-compatibility",
  component: withSuspense(VedicCompatibility),
});

const shopByPurposeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/by-purpose",
  component: withSuspense(ShopByPurpose),
});

const jainPathshalaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-pathshala",
  component: withSuspense(JainPathshala),
});

const pathshalaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pathshala",
  component: withSuspense(Pathshala),
});

const jainDharmaJnanaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-dharma-jnana",
  component: withSuspense(JainDharmaJnana),
});

const jainKathayenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-kathayen",
  component: withSuspense(JainKathayen),
});

const jainStotraSangrahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stotra-sangrah",
  component: withSuspense(JainStotraSangrah),
});

const jainStutiSangrahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stuti-sangrah",
  component: withSuspense(JainStutiSangrah),
});

const jainParvCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-parv-calendar",
  component: withSuspense(JainParvCalendar),
});

const AuspiciousTimes = lazy(() => import("./pages/AuspiciousTimes"));
const AstrologerBookingPage = lazy(
  () => import("./pages/AstrologerBookingPage"),
);
const BookingConfirmationPage = lazy(
  () => import("./pages/BookingConfirmationPage"),
);
const LivePanchang = lazy(() => import("./pages/LivePanchang"));
const CurrentTransits = lazy(() => import("./pages/CurrentTransits"));

const auspiciousTimesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auspicious-times",
  component: withSuspense(AuspiciousTimes),
});

const bookConsultationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book-consultation",
  component: withSuspense(AstrologerBookingPage),
});

const bookingConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking-confirmation",
  component: withSuspense(BookingConfirmationPage),
});

const livePanchangRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live-panchang",
  component: withSuspense(LivePanchang),
});

const currentTransitsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/current-transits",
  component: withSuspense(CurrentTransits),
});

const ShadowPlanets = lazy(() => import("./pages/ShadowPlanets"));
const shadowPlanetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shadow-planets",
  component: withSuspense(ShadowPlanets),
});

const pujasCatalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pujas-catalog",
  component: withSuspense(PujasCatalog),
});

const pujaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pujas-catalog/$id",
  component: withSuspense(PujaDetail),
});

const nadiCollectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nadi-collection",
  component: withSuspense(NadiCollection),
});

const nadiDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nadi/$nadiId",
  component: withSuspense(NadiDetail),
});

const LoveCalculator = lazy(() => import("./pages/calculators/LoveCalculator"));
const NameNumerologyCalculator = lazy(
  () => import("./pages/calculators/NameNumerologyCalculator"),
);
const SunSignCalculator = lazy(
  () => import("./pages/calculators/SunSignCalculator"),
);
const RashiCalculator = lazy(
  () => import("./pages/calculators/RashiCalculator"),
);
const RisingAscendantCalculator = lazy(
  () => import("./pages/calculators/RisingAscendantCalculator"),
);
const BirthChartCalculator = lazy(
  () => import("./pages/calculators/BirthChartCalculator"),
);
const MangalDoshaCalculator = lazy(
  () => import("./pages/calculators/MangalDoshaCalculator"),
);
const SadeSatiCalculator = lazy(
  () => import("./pages/calculators/SadeSatiCalculator"),
);
const IshtaDevataCalculator = lazy(
  () => import("./pages/calculators/IshtaDevataCalculator"),
);
const NakshatraFinderCalculator = lazy(
  () => import("./pages/calculators/NakshatraFinderCalculator"),
);
const FlamesCalculator = lazy(
  () => import("./pages/calculators/FlamesCalculator"),
);
const KaalSarpDoshCalculator = lazy(
  () => import("./pages/calculators/KaalSarpDoshCalculator"),
);
const LoShuGridCalculator = lazy(
  () => import("./pages/calculators/LoShuGridCalculator"),
);
const FriendshipCalculator = lazy(
  () => import("./pages/calculators/FriendshipCalculator"),
);
const TransitChartCalculator = lazy(
  () => import("./pages/calculators/TransitChartCalculator"),
);
const MoonPhaseCalculator = lazy(
  () => import("./pages/calculators/MoonPhaseCalculator"),
);
const AtmakarakaCalculator = lazy(
  () => import("./pages/calculators/AtmakarakaCalculator"),
);
const DashaCalculator = lazy(
  () => import("./pages/calculators/DashaCalculator"),
);
const LuckyVehicleCalculator = lazy(
  () => import("./pages/calculators/LuckyVehicleCalculator"),
);

const loveCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/love",
  component: withSuspense(LoveCalculator),
});

const nameNumerologyCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/name-numerology",
  component: withSuspense(NameNumerologyCalculator),
});

const sunSignCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/sun-sign",
  component: withSuspense(SunSignCalculator),
});

const rashiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/rashi",
  component: withSuspense(RashiCalculator),
});

const risingAscendantCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/rising-ascendant",
  component: withSuspense(RisingAscendantCalculator),
});

const birthChartCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/birth-chart",
  component: withSuspense(BirthChartCalculator),
});

const mangalDoshaCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/mangal-dosha",
  component: withSuspense(MangalDoshaCalculator),
});

const sadeSatiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/sade-sati",
  component: withSuspense(SadeSatiCalculator),
});

const ishtaDevataCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/ishta-devata",
  component: withSuspense(IshtaDevataCalculator),
});

const nakshatraFinderCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/nakshatra",
  component: withSuspense(NakshatraFinderCalculator),
});

const flamesCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/flames",
  component: withSuspense(FlamesCalculator),
});

const kaalSarpDoshCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/kaal-sarp-dosh",
  component: withSuspense(KaalSarpDoshCalculator),
});

const loShuGridCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/lo-shu-grid",
  component: withSuspense(LoShuGridCalculator),
});

const friendshipCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/friendship",
  component: withSuspense(FriendshipCalculator),
});

const transitChartCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/transit-chart",
  component: withSuspense(TransitChartCalculator),
});

const moonPhaseCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/moon-phase",
  component: withSuspense(MoonPhaseCalculator),
});

const atmakarakaCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/atmakaraka",
  component: withSuspense(AtmakarakaCalculator),
});

const dashaCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/dasha",
  component: withSuspense(DashaCalculator),
});

const luckyVehicleCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/lucky-vehicle",
  component: withSuspense(LuckyVehicleCalculator),
});

const PredictionServices = lazy(() => import("./pages/PredictionServices"));
const VedicRemedies = lazy(() => import("./pages/VedicRemedies"));
const SuryaDev = lazy(() => import("./pages/SuryaDev"));
const HinduCalendar = lazy(() => import("./pages/HinduCalendar"));
const TopHinduFestivals = lazy(() => import("./pages/TopHinduFestivals"));
const TopHinduFestivalsTop20 = lazy(
  () => import("./pages/TopHinduFestivalsTop20"),
);
const TopHinduFestivalsTop10 = lazy(
  () => import("./pages/TopHinduFestivalsTop10"),
);

const predictionServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prediction-services",
  component: withSuspense(PredictionServices),
});

const vedicRemediesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-remedies",
  component: withSuspense(VedicRemedies),
});

const suryaDevRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/surya-dev",
  component: withSuspense(SuryaDev),
});

const hinduCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hindu-calendar",
  component: withSuspense(HinduCalendar),
});

const topHinduFestivalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-hindu-festivals",
  component: withSuspense(TopHinduFestivals),
});

const topHinduFestivalsTop20Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-hindu-festivals-20",
  component: withSuspense(TopHinduFestivalsTop20),
});

const topHinduFestivalsTop10Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-hindu-festivals-10",
  component: withSuspense(TopHinduFestivalsTop10),
});

const doorstepPanditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/doorstep-pandit",
  component: withSuspense(DoorstepPandit),
});

const BirthdayRituals = lazy(() => import("./pages/BirthdayRituals"));
const LoShuGrid = lazy(() => import("./pages/LoShuGrid"));

const birthdayRitualsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/birthday-rituals",
  component: withSuspense(BirthdayRituals),
});

const loShuGridRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lo-shu-grid",
  component: withSuspense(LoShuGrid),
});

const templeToursYatraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temple-tours-yatra",
  component: withSuspense(TempleToursYatra),
});

const vedicChartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-charts",
  component: withSuspense(VedicCharts),
});

const energizedProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/energized-products",
  component: withSuspense(EnergizedProducts),
});

const energizedProductDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/energized-products/$productId",
  component: withSuspense(EnergizedProductDetail),
});

const vedicDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-dashboard",
  component: withSuspense(VedicDashboard),
});

const chadhavaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chadhava",
  component: withSuspense(ChadhavaPage),
});

const LogoCreator = lazy(() => import("./pages/LogoCreator"));
const NameSelection = lazy(() => import("./pages/NameSelection"));
const AIInsights = lazy(() => import("./pages/AIInsights"));
const CombinedVedicReading = lazy(() => import("./pages/CombinedVedicReading"));

const logoCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logo-creator",
  component: withSuspense(LogoCreator),
});

const nameSelectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/name-selection",
  component: withSuspense(NameSelection),
});

const aiInsightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-insights",
  component: withSuspense(AIInsights),
});

const combinedVedicReadingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/combined-vedic-reading",
  component: withSuspense(CombinedVedicReading),
});

const pujaBookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-booking",
  component: withSuspense(PujaBookingPage),
});

const bookingHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking-history",
  component: withSuspense(BookingHistoryPage),
});

const careerPathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career-path",
  component: withSuspense(CareerPathCalculator),
});

const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/newsletter",
  component: withSuspense(Newsletter),
});

const yantraShopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yantra-shop",
  component: withSuspense(YantraShop),
});

const yantraInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yantra-info",
  component: withSuspense(YantraInfo),
});

const yantraInfoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yantra-info/$category",
  component: withSuspense(YantraInfoDetail),
});

const jainStavanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stavan",
  component: withSuspense(JainStavan),
});

const jainContentIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-content-index",
  component: withSuspense(JainContentIndex),
});

const tattvarthaSutraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tattvartha-sutra",
  component: withSuspense(TattvarthaSutra),
});

const jainNewStotraDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-new-stotra/$id",
  component: withSuspense(JainNewStotraDetail),
});

const jainMeriBhavnaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-meri-bhavna",
  component: withSuspense(JainMeriBhavna),
});

const jainStoriesLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stories",
  component: withSuspense(JainStoriesLibrary),
});

const jainVichaarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vichaar",
  component: withSuspense(JainVichaar),
});

const jainBooksLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-books",
  component: withSuspense(JainBooksLibrary),
});

const jainPoojasSangrehRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-poojas-sangreh",
  component: withSuspense(JainPoojasSangreh),
});

const jainBalVikasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-bal-vikas",
  component: withSuspense(JainBalVikas),
});

const EmeraldStonePage = lazy(() => import("./pages/EmeraldStonePage"));
const CaratRattiCalculator = lazy(() => import("./pages/CaratRattiCalculator"));
const RubyStonePage = lazy(() => import("./pages/RubyStonePage"));
const BlueSapphireStonePage = lazy(
  () => import("./pages/BlueSapphireStonePage"),
);
const YellowSapphireStonePage = lazy(
  () => import("./pages/YellowSapphireStonePage"),
);

const emeraldStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/emerald",
  component: withSuspense(EmeraldStonePage),
});

const caratRattiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/carat-ratti-calculator",
  component: withSuspense(CaratRattiCalculator),
});

const rubyStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/ruby",
  component: withSuspense(RubyStonePage),
});

const blueSapphireStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/blue-sapphire",
  component: withSuspense(BlueSapphireStonePage),
});

const yellowSapphireStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/yellow-sapphire",
  component: withSuspense(YellowSapphireStonePage),
});

const jainBhajanDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-bhajan/$id",
  component: withSuspense(JainBhajanDetail),
});

const jainKnowledgeBaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-knowledge-base",
  component: withSuspense(JainKnowledgeBase),
});

const jainDevShastraGuruPujaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-dev-shastra-guru-puja",
  component: withSuspense(JainDevShastraGuruPuja),
});

const jainVicharQuoteDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vichaar/$person",
  component: withSuspense(JainVicharQuoteDetail),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  templeRoute,
  horoscopeRoute,
  astrologerRoute,
  astrologerProfileRoute,
  shopRoute,
  productDetailRoute,
  reportsRoute,
  reportOutputRoute,
  devotionalRoute,
  virtualTempleRoute,
  numerologyRoute,
  businessRoute,
  dashboardRoute,
  astrologerDashboardRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  bhajanLibraryRoute,
  vratKathaRoute,
  holyBooksRoute,
  adminCMSRoute,
  aartiRoute,
  chalisaRoute,
  mantraRoute,
  stotraRoute,
  templeDirectoryRoute,
  tirthankarsRoute,
  divineInfoRoute,
  jainPujanRoute,
  kavachRoute,
  kundaliMatchingRoute,
  ashtakamRoute,
  stutiRoute,
  sahasranamRoute,
  sahasranamSangrahRoute,
  ayurvedaRoute,
  holyBooksOverviewRoute,
  jainEncyclopediaRoute,
  jainEncyclopediaVolumeRoute,
  jainipediaRoute,
  sikhKirtansRoute,
  jainVratKathasRoute,
  jainVratKathaDetailRoute,
  jainVrat144ListRoute,
  holyBooksReaderRoute,
  palmistryRoute,
  palmPhotoRoute,
  vastuRoute,
  vastuRoomCheckerRoute,
  horoscopeComparisonRoute,
  calculatorIndexRoute,
  calculatorFAQRoute,
  pujaTypesRoute,
  pujaReportsRoute,
  vedasSuktamRoute,
  suktamLibraryRoute,
  searchRoute,
  festivalCalendarRoute,
  mediaPlayerRoute,
  blogRoute,
  blogDetailRoute,
  webStoriesRoute,
  divisionalChartsRoute,
  astroScoreRoute,
  planetaryStrengthRoute,
  yogasInChartRoute,
  chartRectificationRoute,
  vedicCompatibilityRoute,
  shopByPurposeRoute,
  jainPathshalaRoute,
  pathshalaRoute,
  jainDharmaJnanaRoute,
  jainKathayenRoute,
  jainStotraSangrahRoute,
  jainStutiSangrahRoute,
  jainParvCalendarRoute,
  auspiciousTimesRoute,
  bookConsultationRoute,
  bookingConfirmationRoute,
  livePanchangRoute,
  currentTransitsRoute,
  shadowPlanetsRoute,
  pujasCatalogRoute,
  pujaDetailRoute,
  nadiCollectionRoute,
  nadiDetailRoute,
  doorstepPanditRoute,
  templeToursYatraRoute,
  vedicChartsRoute,
  birthdayRitualsRoute,
  suryaDevRoute,
  hinduCalendarRoute,
  topHinduFestivalsRoute,
  topHinduFestivalsTop20Route,
  topHinduFestivalsTop10Route,
  predictionServicesRoute,
  vedicRemediesRoute,
  loShuGridRoute,
  loveCalculatorRoute,
  nameNumerologyCalculatorRoute,
  sunSignCalculatorRoute,
  rashiCalculatorRoute,
  risingAscendantCalculatorRoute,
  birthChartCalculatorRoute,
  mangalDoshaCalculatorRoute,
  sadeSatiCalculatorRoute,
  ishtaDevataCalculatorRoute,
  nakshatraFinderCalculatorRoute,
  flamesCalculatorRoute,
  kaalSarpDoshCalculatorRoute,
  loShuGridCalculatorRoute,
  friendshipCalculatorRoute,
  transitChartCalculatorRoute,
  moonPhaseCalculatorRoute,
  atmakarakaCalculatorRoute,
  dashaCalculatorRoute,
  luckyVehicleCalculatorRoute,
  energizedProductsRoute,
  energizedProductDetailRoute,
  vedicDashboardRoute,
  chadhavaRoute,
  logoCreatorRoute,
  nameSelectionRoute,
  aiInsightsRoute,
  combinedVedicReadingRoute,
  pujaBookingRoute,
  bookingHistoryRoute,
  careerPathRoute,
  emeraldStoneRoute,
  caratRattiCalculatorRoute,
  rubyStoneRoute,
  blueSapphireStoneRoute,
  yellowSapphireStoneRoute,
  newsletterRoute,
  yantraShopRoute,
  yantraInfoRoute,
  yantraInfoDetailRoute,
  jainStavanRoute,
  jainContentIndexRoute,
  tattvarthaSutraRoute,
  jainNewStotraDetailRoute,
  jainMeriBhavnaRoute,
  jainStoriesLibraryRoute,
  jainVichaarRoute,
  jainBooksLibraryRoute,
  jainPoojasSangrehRoute,
  jainBalVikasRoute,
  jainBhajanDetailRoute,
  jainKnowledgeBaseRoute,
  jainDevShastraGuruPujaRoute,
  jainVicharQuoteDetailRoute,
  padmavatiVratKathaRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
