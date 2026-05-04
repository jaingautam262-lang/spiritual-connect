import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import NewsletterPopup from "./components/NewsletterPopup";

import AIInsights from "./pages/AIInsights";
import Aarti from "./pages/Aarti";
// ALL pages are imported EAGERLY — no React.lazy() anywhere.
// Lazy imports inside Suspense cause the entire app to hang forever
// if ANY import fails (circular deps, missing exports, etc.)
import AdminCMS from "./pages/AdminCMS";
import AshtakamLibrary from "./pages/AshtakamLibrary";
import AskKrishna from "./pages/AskKrishna";
import AstroScore from "./pages/AstroScore";
import AstrologerBookingPage from "./pages/AstrologerBookingPage";
import AstrologerCity from "./pages/AstrologerCity";
import AstrologerConsultation from "./pages/AstrologerConsultation";
import AstrologerDashboard from "./pages/AstrologerDashboard";
import AstrologerLanding from "./pages/AstrologerLanding";
import AstrologerProfile from "./pages/AstrologerProfile";
import AstrologersIndia from "./pages/AstrologersIndia";
import AstrologyCalculatorsPage from "./pages/AstrologyCalculatorsPage";
import AuspiciousTimes from "./pages/AuspiciousTimes";
import AyurvedaSection from "./pages/AyurvedaSection";
import BabyNameReport from "./pages/BabyNameReport";
import BhagavadGita from "./pages/BhagavadGita";
import BhagavadGitaChapter from "./pages/BhagavadGitaChapter";
import BhajanLibrary from "./pages/BhajanLibrary";
import BirthdayRituals from "./pages/BirthdayRituals";
import BlogDetail from "./pages/BlogDetail";
import BlogSection from "./pages/BlogSection";
import BlueSapphireStonePage from "./pages/BlueSapphireStonePage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import BusinessNumerology from "./pages/BusinessNumerology";
import CalculatorFAQPage from "./pages/CalculatorFAQPage";
import CalculatorIndex from "./pages/CalculatorIndex";
import CaratRattiCalculator from "./pages/CaratRattiCalculator";
import CareerPathCalculator from "./pages/CareerPathCalculator";
import ChadhavaPage from "./pages/ChadhavaPage";
import ChakraAssessment from "./pages/ChakraAssessment";
import Chalisa from "./pages/Chalisa";
import ChartRectification from "./pages/ChartRectification";
import CombinedVedicReading from "./pages/CombinedVedicReading";
import ConsultExpertPage from "./pages/ConsultExpertPage";
import CurrentTransits from "./pages/CurrentTransits";
import DaanSeva from "./pages/DaanSeva";
import DanSevaPage from "./pages/DanSevaPage";
import Dashboard from "./pages/Dashboard";
import DevotionalLibrary from "./pages/DevotionalLibrary";
import DhwaniProductDetail from "./pages/DhwaniProductDetail";
import DhwaniShop from "./pages/DhwaniShop";
import DivineInfo from "./pages/DivineInfo";
import DivisionalCharts from "./pages/DivisionalCharts";
import DoorstepPandit from "./pages/DoorstepPandit";
import EmeraldStonePage from "./pages/EmeraldStonePage";
import EnergizedProductDetail from "./pages/EnergizedProductDetail";
import EnergizedProducts from "./pages/EnergizedProducts";
import FestivalCalendar from "./pages/FestivalCalendar";
import FestivalCalendarPage from "./pages/FestivalCalendarPage";
import FreeKundli from "./pages/FreeKundli";
import GemstoneLibrary from "./pages/GemstoneLibrary";
import GemstoneShop from "./pages/GemstoneShop";
import GrihaPravesh2026Page from "./pages/GrihaPravesh2026Page";
import GurugDirectory from "./pages/GurugDirectory";
import HerbDirectoryPage from "./pages/HerbDirectoryPage";
import HinduCalendar from "./pages/HinduCalendar";
import HolyBooksAudio from "./pages/HolyBooksAudio";
import HolyBooksOverview from "./pages/HolyBooksOverview";
import HolyBooksReader from "./pages/HolyBooksReader";
import Home from "./pages/Home";
import HoroscopeComparison from "./pages/HoroscopeComparison";
import HoroscopePanchang from "./pages/HoroscopePanchang";
import JainBalVikas from "./pages/JainBalVikas";
import JainBhajanDetail from "./pages/JainBhajanDetail";
import JainBooksLibrary from "./pages/JainBooksLibrary";
import JainContentIndex from "./pages/JainContentIndex";
import JainDevShastraGuruPuja from "./pages/JainDevShastraGuruPuja";
import JainDharmaJnana from "./pages/JainDharmaJnana";
import JainEncyclopedia from "./pages/JainEncyclopediaFull";
import JainKathayen from "./pages/JainKathayen";
import JainKnowledgeBase from "./pages/JainKnowledgeBase";
import JainMeriBhavna from "./pages/JainMeriBhavna";
import JainNewStotraDetail from "./pages/JainNewStotraDetail";
import JainOriginalAartiPage from "./pages/JainOriginalAartiPage";
import JainParvCalendar from "./pages/JainParvCalendar";
import JainPathshala from "./pages/JainPathshala";
import JainPoojasSangreh from "./pages/JainPoojasSangreh";
import JainPujan from "./pages/JainPujan";
import JainStavan from "./pages/JainStavan";
import JainStoriesLibrary from "./pages/JainStoriesLibrary";
import JainStotraSangrah from "./pages/JainStotraSangrah";
import JainStutiSangrah from "./pages/JainStutiSangrah";
import JainVichaar from "./pages/JainVichaar";
import JainVicharQuoteDetail from "./pages/JainVicharQuoteDetail";
import JainVrat144List from "./pages/JainVrat144List";
import JainVratKathaDetail from "./pages/JainVratKathaDetail";
import JainVratKathas from "./pages/JainVratKathas";
import Jainipedia from "./pages/Jainipedia";
import KartikJewelsShop from "./pages/KartikJewelsShop";
import KartikProductDetail from "./pages/KartikProductDetail";
import KavachLibrary from "./pages/KavachLibrary";
import KundaliMatchingPage from "./pages/KundaliMatchingPage";
import KundliReportPage from "./pages/KundliReportPage";
import LifeGuidance from "./pages/LifeGuidance";
import LifeGuidanceTopic from "./pages/LifeGuidanceTopic";
import LifeReceipt from "./pages/LifeReceipt";
import LivePanchang from "./pages/LivePanchang";
import LoShuGrid from "./pages/LoShuGrid";
import LogoCreator from "./pages/LogoCreator";
import Mantra from "./pages/Mantra";
import MediaPlayerPage from "./pages/MediaPlayerPage";
import MehndiCollection from "./pages/MehndiCollection";
import MoolankOilStore from "./pages/MoolankOilStore";
import MurtiPage from "./pages/MurtiPage";
import MyFavourites from "./pages/MyFavourites";
import NadiCollection from "./pages/NadiCollection";
import NadiDetail from "./pages/NadiDetail";
import NameSelection from "./pages/NameSelection";
import NavgrahMantraCounter from "./pages/NavgrahMantraCounter";
import Newsletter from "./pages/Newsletter";
import Numerology from "./pages/Numerology";
import NumerologyReportPage from "./pages/NumerologyReportPage";
import NumerologyWatchesPage from "./pages/NumerologyWatchesPage";
import PadmavatiVratKatha from "./pages/PadmavatiVratKatha";
import PaintingsGreetings from "./pages/PaintingsGreetings";
import PalmPhotoReading from "./pages/PalmPhotoReading";
import PalmistryReading from "./pages/PalmistryReading";
import PanchangPage from "./pages/PanchangPage";
import PanchangTimingsPage from "./pages/PanchangTimingsPage";
import Pathshala from "./pages/Pathshala";
import PaymentFailure from "./pages/PaymentFailure";
import PaymentSuccess from "./pages/PaymentSuccess";
import PersonalisedProducts from "./pages/PersonalisedProducts";
import PlanetaryStrength from "./pages/PlanetaryStrength";
import PredictionServices from "./pages/PredictionServices";
import Pricing from "./pages/Pricing";
import ProductDetail from "./pages/ProductDetail";
import PujaBooking from "./pages/PujaBooking";
import PujaBookingPage from "./pages/PujaBookingPage";
import PujaDetail from "./pages/PujaDetail";
import PujaReports from "./pages/PujaReports";
import PujaStore from "./pages/PujaStore";
import PujaTypesList from "./pages/PujaTypesList";
import PujasCatalog from "./pages/PujasCatalog";
import ReportOutput from "./pages/ReportOutput";
import Reports from "./pages/Reports";
import RubyStonePage from "./pages/RubyStonePage";
import SahasranamLibrary from "./pages/SahasranamLibrary";
import SahasranamSangrah from "./pages/SahasranamSangrah";
import ShadowPlanets from "./pages/ShadowPlanets";
import ShopByPurpose from "./pages/ShopByPurpose";
import ShopSpecialCollections from "./pages/ShopSpecialCollections";
import SikhKirtans from "./pages/SikhKirtans";
import SikhNitnemPage from "./pages/SikhNitnemPage";
import SikhOriginalAartiPage from "./pages/SikhOriginalAartiPage";
import SpiritualShop from "./pages/SpiritualShop";
import Stotra from "./pages/Stotra";
import StutiLibrary from "./pages/StutiLibrary";
import SuktamLibrary from "./pages/SuktamLibrary";
import SuryaDev from "./pages/SuryaDev";
import TantraRemedies from "./pages/TantraRemedies";
import TarotReading from "./pages/TarotReading";
import TattvarthaSutra from "./pages/TattvarthaSutra";
import TempleDirectory from "./pages/TempleDirectory";
import TempleDirectoryPage from "./pages/TempleDirectoryPage";
import TempleServices from "./pages/TempleServices";
import TempleToursYatra from "./pages/TempleToursYatra";
import Tirthankars from "./pages/Tirthankars";
import TopHinduFestivals from "./pages/TopHinduFestivals";
import TopHinduFestivalsTop10 from "./pages/TopHinduFestivalsTop10";
import TopHinduFestivalsTop20 from "./pages/TopHinduFestivalsTop20";
import UnifiedSearch from "./pages/UnifiedSearch";
import VastuRoomChecker from "./pages/VastuRoomChecker";
import VastuShastra from "./pages/VastuShastra";
import VedasSuktamLibrary from "./pages/VedasSuktamLibrary";
import VedicCharts from "./pages/VedicCharts";
import VedicCompatibility from "./pages/VedicCompatibility";
import VedicDashboard from "./pages/VedicDashboard";
import VedicRemedies from "./pages/VedicRemedies";
import VirtualTemple from "./pages/VirtualTemple";
import VivahMuhuratPage from "./pages/VivahMuhuratPage";
import VratKatha from "./pages/VratKatha";
import WebStoriesPage from "./pages/WebStoriesPage";
import YantraInfo from "./pages/YantraInfo";
import YantraInfoDetail from "./pages/YantraInfoDetail";
import YantraLibrary from "./pages/YantraLibrary";
import YantraShop from "./pages/YantraShop";
import YellowSapphireStonePage from "./pages/YellowSapphireStonePage";
import YogasInChart from "./pages/YogasInChart";
import AtmakarakaCalculator from "./pages/calculators/AtmakarakaCalculator";
import BirthChartCalculator from "./pages/calculators/BirthChartCalculator";
import BraceletCalculator from "./pages/calculators/BraceletCalculator";
import DashaCalculator from "./pages/calculators/DashaCalculator";
import FlamesCalculator from "./pages/calculators/FlamesCalculator";
import FriendshipCalculator from "./pages/calculators/FriendshipCalculator";
import GemstoneCalculator from "./pages/calculators/GemstoneCalculator";
import IshtaDevataCalculator from "./pages/calculators/IshtaDevataCalculator";
import KaalSarpDoshCalculator from "./pages/calculators/KaalSarpDoshCalculator";
import LoShuGridCalculator from "./pages/calculators/LoShuGridCalculator";
import LoveCalculator from "./pages/calculators/LoveCalculator";
import LuckyVehicleCalculator from "./pages/calculators/LuckyVehicleCalculator";
import MangalDoshaCalculator from "./pages/calculators/MangalDoshaCalculator";
import MoolankCalculator from "./pages/calculators/MoolankCalculator";
import MoonPhaseCalculator from "./pages/calculators/MoonPhaseCalculator";
import NakshatraFinderCalculator from "./pages/calculators/NakshatraFinderCalculator";
import NameNumerologyCalculator from "./pages/calculators/NameNumerologyCalculator";
import RashiCalculator from "./pages/calculators/RashiCalculator";
import RattiCalculator from "./pages/calculators/RattiCalculator";
import RisingAscendantCalculator from "./pages/calculators/RisingAscendantCalculator";
import RudrakshaCalculator from "./pages/calculators/RudrakshaCalculator";
import SadeSatiCalculator from "./pages/calculators/SadeSatiCalculator";
import SunSignCalculator from "./pages/calculators/SunSignCalculator";
import TransitChartCalculator from "./pages/calculators/TransitChartCalculator";

// Remove loading overlay ONLY after React has successfully rendered
// (useEffect runs after first paint — this is the safe, correct place)

const myFavouritesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/favourites",
  component: MyFavourites,
});
const bhagavadGitaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bhagavad-gita",
  component: BhagavadGita,
});
const bhagavadGitaChapterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bhagavad-gita/$chapterId",
  component: BhagavadGitaChapter,
});
const rudrakshaCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rudraksha-calculator",
  component: RudrakshaCalculator,
});
const gemstoneCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstone-calculator",
  component: GemstoneCalculator,
});
const moolankCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/moolank-calculator",
  component: MoolankCalculator,
});
const rattiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ratti-calculator",
  component: RattiCalculator,
});
const braceletCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bracelet-calculator",
  component: BraceletCalculator,
});
const askKrishnaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ask-krishna",
  component: AskKrishna,
});
const freeKundliRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/free-kundli",
  component: FreeKundli,
});
const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: Pricing,
});
const astrologersIndiaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologers-india",
  component: AstrologersIndia,
});
const astrologerCityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologers-india/$citySlug",
  component: AstrologerCity,
});
const rootRoute = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <Layout>
        <Outlet />
        <NewsletterPopup />
      </Layout>
    </ErrorBoundary>
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
  component: TempleServices,
});
const horoscopeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/horoscope",
  component: HoroscopePanchang,
});
const astrologerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologer",
  component: AstrologerConsultation,
});
const astrologerProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologer/$id",
  component: AstrologerProfile,
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: SpiritualShop,
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/$id",
  component: ProductDetail,
});
const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: Reports,
});
const reportOutputRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports/$id",
  component: ReportOutput,
});
const devotionalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/devotional",
  component: DevotionalLibrary,
});
const virtualTempleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/virtual-temple",
  component: VirtualTemple,
});
const numerologyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/numerology",
  component: Numerology,
});
const businessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/business-tools",
  component: BusinessNumerology,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});
const astrologerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrologer-dashboard",
  component: AstrologerDashboard,
});
const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: PaymentSuccess,
});
const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: PaymentFailure,
});
const bhajanLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bhajan-library",
  component: BhajanLibrary,
});
const vratKathaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vrat-katha",
  component: VratKatha,
});
const holyBooksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/holy-books",
  component: HolyBooksAudio,
});
const adminCMSRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-cms",
  component: AdminCMS,
});
const aartiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aarti",
  component: Aarti,
});
const chalisaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chalisa",
  component: Chalisa,
});
const mantraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mantra",
  component: Mantra,
});
const stotraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stotra",
  component: Stotra,
});
const tirthankarsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tirthankars",
  component: Tirthankars,
});
const divineInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/divine-info",
  component: DivineInfo,
});
const templeDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temples",
  component: TempleDirectory,
});
const jainPujanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-pujan",
  component: JainPujan,
});
const ashtakamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ashtakam",
  component: AshtakamLibrary,
});
const stutiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stuti",
  component: StutiLibrary,
});
const sahasranamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sahasranam",
  component: SahasranamLibrary,
});
const kavachRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kavach",
  component: KavachLibrary,
});
const kundaliMatchingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kundali-matching",
  component: KundaliMatchingPage,
});
const astrologyCalculatorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrology/calculators",
  component: AstrologyCalculatorsPage,
});
const sahasranamSangrahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sahasranam-sangrah",
  component: SahasranamSangrah,
});
const ayurvedaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ayurveda",
  component: AyurvedaSection,
});
const jainEncyclopediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-encyclopedia",
  component: JainEncyclopedia,
});
const jainEncyclopediaVolumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-encyclopedia/$volume",
  component: JainEncyclopedia,
});
const holyBooksOverviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/holy-books-overview",
  component: HolyBooksOverview,
});
const jainipediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jainipedia",
  component: Jainipedia,
});
const sikhKirtansRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sikh-kirtans",
  component: SikhKirtans,
});
const sikhNitnemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/library/sikh-nitnem",
  component: SikhNitnemPage,
});
const jainVratKathasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vrat-kathas",
  component: JainVratKathas,
});
const jainVratKathaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vrat-katha-detail/$id",
  component: JainVratKathaDetail,
});
const jainVrat144ListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vrat-144-list",
  component: JainVrat144List,
});
const padmavatiVratKathaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/padmavati-vrat-katha",
  component: PadmavatiVratKatha,
});
const holyBooksReaderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/holy-books-reader",
  component: HolyBooksReader,
});
const palmistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/palmistry",
  component: PalmistryReading,
});
const palmPhotoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/palm-photo",
  component: PalmPhotoReading,
});
const vastuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vastu",
  component: VastuShastra,
});
const vastuRoomCheckerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vastu-checker",
  component: VastuRoomChecker,
});
const horoscopeComparisonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/horoscope-comparison",
  component: HoroscopeComparison,
});
const calculatorIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator-index",
  component: CalculatorIndex,
});
const calculatorFAQRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator-faq/$calculatorId",
  component: CalculatorFAQPage,
});
const pujaTypesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-types",
  component: PujaTypesList,
});
const pujaReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-reports",
  component: PujaReports,
});
const vedasSuktamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedas-suktam",
  component: VedasSuktamLibrary,
});
const suktamLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/suktam-library",
  component: SuktamLibrary,
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: UnifiedSearch,
});
const festivalCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/festival-calendar",
  component: FestivalCalendar,
});
const mediaPlayerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/media-player",
  component: MediaPlayerPage,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogSection,
});
const blogDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: BlogDetail,
});
const webStoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/web-stories",
  component: WebStoriesPage,
});
const divisionalChartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/divisional-charts",
  component: DivisionalCharts,
});
const astroScoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astro-score",
  component: AstroScore,
});
const planetaryStrengthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/planetary-strength",
  component: PlanetaryStrength,
});
const yogasInChartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yogas-in-chart",
  component: YogasInChart,
});
const chartRectificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chart-rectification",
  component: ChartRectification,
});
const vedicCompatibilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-compatibility",
  component: VedicCompatibility,
});
const shopByPurposeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/by-purpose",
  component: ShopByPurpose,
});
const numerologyWatchesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/numerology-watches",
  component: NumerologyWatchesPage,
});
const jainPathshalaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-pathshala",
  component: JainPathshala,
});
const pathshalaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pathshala",
  component: Pathshala,
});
const jainDharmaJnanaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-dharma-jnana",
  component: JainDharmaJnana,
});
const jainKathayenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-kathayen",
  component: JainKathayen,
});
const jainStotraSangrahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stotra-sangrah",
  component: JainStotraSangrah,
});
const jainStutiSangrahRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stuti-sangrah",
  component: JainStutiSangrah,
});
const jainParvCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-parv-calendar",
  component: JainParvCalendar,
});
const auspiciousTimesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auspicious-times",
  component: AuspiciousTimes,
});
const bookConsultationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book-consultation",
  component: AstrologerBookingPage,
});
const bookingConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking-confirmation",
  component: BookingConfirmationPage,
});
const livePanchangRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/live-panchang",
  component: LivePanchang,
});
const panchangRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/panchang",
  component: PanchangPage,
});
const vivahMuhuratRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vivah-muhurat",
  component: VivahMuhuratPage,
});
const grihaPravesh2026Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/griha-pravesh-muhurat",
  component: GrihaPravesh2026Page,
});
const panchangTimingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/panchang/timings",
  component: PanchangTimingsPage,
});
const panchangFestivalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/panchang/festivals",
  component: FestivalCalendarPage,
});
const currentTransitsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/current-transits",
  component: CurrentTransits,
});
const shadowPlanetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shadow-planets",
  component: ShadowPlanets,
});
const pujasCatalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pujas-catalog",
  component: PujasCatalog,
});
const pujaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pujas-catalog/$id",
  component: PujaDetail,
});
const nadiCollectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nadi-collection",
  component: NadiCollection,
});
const nadiDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nadi/$nadiId",
  component: NadiDetail,
});
const loveCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/love",
  component: LoveCalculator,
});
const nameNumerologyCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/name-numerology",
  component: NameNumerologyCalculator,
});
const sunSignCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/sun-sign",
  component: SunSignCalculator,
});
const rashiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/rashi",
  component: RashiCalculator,
});
const risingAscendantCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/rising-ascendant",
  component: RisingAscendantCalculator,
});
const birthChartCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/birth-chart",
  component: BirthChartCalculator,
});
const mangalDoshaCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/mangal-dosha",
  component: MangalDoshaCalculator,
});
const sadeSatiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/sade-sati",
  component: SadeSatiCalculator,
});
const ishtaDevataCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/ishta-devata",
  component: IshtaDevataCalculator,
});
const nakshatraFinderCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/nakshatra",
  component: NakshatraFinderCalculator,
});
const flamesCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/flames",
  component: FlamesCalculator,
});
const kaalSarpDoshCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/kaal-sarp-dosh",
  component: KaalSarpDoshCalculator,
});
const loShuGridCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/lo-shu-grid",
  component: LoShuGridCalculator,
});
const friendshipCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/friendship",
  component: FriendshipCalculator,
});
const transitChartCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/transit-chart",
  component: TransitChartCalculator,
});
const moonPhaseCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/moon-phase",
  component: MoonPhaseCalculator,
});
const atmakarakaCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/atmakaraka",
  component: AtmakarakaCalculator,
});
const dashaCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/dasha",
  component: DashaCalculator,
});
const luckyVehicleCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator/lucky-vehicle",
  component: LuckyVehicleCalculator,
});
const predictionServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prediction-services",
  component: PredictionServices,
});
const vedicRemediesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-remedies",
  component: VedicRemedies,
});
const suryaDevRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/surya-dev",
  component: SuryaDev,
});
const hinduCalendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hindu-calendar",
  component: HinduCalendar,
});
const topHinduFestivalsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-hindu-festivals",
  component: TopHinduFestivals,
});
const topHinduFestivalsTop20Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-hindu-festivals-20",
  component: TopHinduFestivalsTop20,
});
const topHinduFestivalsTop10Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-hindu-festivals-10",
  component: TopHinduFestivalsTop10,
});
const doorstepPanditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/doorstep-pandit",
  component: DoorstepPandit,
});
const birthdayRitualsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/birthday-rituals",
  component: BirthdayRituals,
});
const loShuGridRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lo-shu-grid",
  component: LoShuGrid,
});
const templeToursYatraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temple-tours-yatra",
  component: TempleToursYatra,
});
const vedicChartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-charts",
  component: VedicCharts,
});
const energizedProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/energized-products",
  component: EnergizedProducts,
});
const energizedProductDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/energized-products/$productId",
  component: EnergizedProductDetail,
});
const vedicDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vedic-dashboard",
  component: VedicDashboard,
});
const chadhavaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chadhava",
  component: ChadhavaPage,
});
const logoCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logo-creator",
  component: LogoCreator,
});
const nameSelectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/name-selection",
  component: NameSelection,
});
const aiInsightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-insights",
  component: AIInsights,
});
const combinedVedicReadingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/combined-vedic-reading",
  component: CombinedVedicReading,
});
const pujaBookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-booking",
  component: PujaBookingPage,
});
const bookingHistoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking-history",
  component: BookingHistoryPage,
});
const careerPathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/career-path",
  component: CareerPathCalculator,
});
const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/newsletter",
  component: Newsletter,
});
const yantraShopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yantra-shop",
  component: YantraShop,
});
const lifeReceiptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/life-receipt",
  component: LifeReceipt,
});
const yantraInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yantra-info",
  component: YantraInfo,
});
const yantraInfoDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yantra-info/$category",
  component: YantraInfoDetail,
});
const jainStavanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stavan",
  component: JainStavan,
});
const jainContentIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-content-index",
  component: JainContentIndex,
});
const tattvarthaSutraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tattvartha-sutra",
  component: TattvarthaSutra,
});
const jainNewStotraDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-new-stotra/$id",
  component: JainNewStotraDetail,
});
const jainMeriBhavnaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-meri-bhavna",
  component: JainMeriBhavna,
});
const jainStoriesLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-stories",
  component: JainStoriesLibrary,
});
const jainVichaarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vichaar",
  component: JainVichaar,
});
const jainBooksLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-books",
  component: JainBooksLibrary,
});
const jainPoojasSangrehRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-poojas-sangreh",
  component: JainPoojasSangreh,
});
const jainBalVikasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-bal-vikas",
  component: JainBalVikas,
});
const emeraldStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/emerald",
  component: EmeraldStonePage,
});
const caratRattiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tools/carat-ratti-calculator",
  component: CaratRattiCalculator,
});
const rubyStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/ruby",
  component: RubyStonePage,
});
const blueSapphireStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/blue-sapphire",
  component: BlueSapphireStonePage,
});
const yellowSapphireStoneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones/yellow-sapphire",
  component: YellowSapphireStonePage,
});
const jainBhajanDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-bhajan/$id",
  component: JainBhajanDetail,
});
const jainKnowledgeBaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-knowledge-base",
  component: JainKnowledgeBase,
});
const jainDevShastraGuruPujaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-dev-shastra-guru-puja",
  component: JainDevShastraGuruPuja,
});
const jainVicharQuoteDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-vichaar/$person",
  component: JainVicharQuoteDetail,
});
const tantraRemediesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tantra-remedies",
  component: TantraRemedies,
});
const gemstoneLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstones",
  component: GemstoneLibrary,
});
const yantraLibraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yantras",
  component: YantraLibrary,
});
const pujaBookingNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-booking-new",
  component: PujaBooking,
});
const guruDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/guru-directory",
  component: GurugDirectory,
});
const herbDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/herb-directory",
  component: HerbDirectoryPage,
});
const mehndiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mehndi",
  component: MehndiCollection,
});
const paintingsGreetingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/paintings-greetings",
  component: PaintingsGreetings,
});
const daanSevaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/daan-seva",
  component: DaanSeva,
});
const danSevaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dan-seva",
  component: DanSevaPage,
});
const templeDirectoryPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temple-directory",
  component: TempleDirectoryPage,
});
const navgrahMantraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/navgrah-mantra",
  component: NavgrahMantraCounter,
});
const dhwaniShopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dhwani-shop",
  component: DhwaniShop,
});
const dhwaniProductDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dhwani-shop/$id",
  component: DhwaniProductDetail,
});
const kartikShopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kartik-shop",
  component: KartikJewelsShop,
});
const kartikProductDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kartik-shop/$id",
  component: KartikProductDetail,
});

const pujaStoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/puja-store",
  component: PujaStore,
});

const moolankOilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/moolank-oil",
  component: MoolankOilStore,
});

const personalisedProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/personalised-products",
  component: PersonalisedProducts,
});

const shopSpecialCollectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop/special-collections",
  component: ShopSpecialCollections,
});
const gemstoneShopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gemstone-shop",
  component: GemstoneShop,
});

const consultExpertRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/consult-expert",
  component: ConsultExpertPage,
});

const jainAartisOriginalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jain-aartis-original",
  component: JainOriginalAartiPage,
});

const sikhAartisOriginalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sikh-aartis-original",
  component: SikhOriginalAartiPage,
});

const chakraAssessmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chakra-assessment",
  component: ChakraAssessment,
});
const astrologerLandingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astrology-landing",
  component: AstrologerLanding,
});
const numerologyReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/numerology-report",
  component: NumerologyReportPage,
});
const kundliReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kundli-report",
  component: KundliReportPage,
});
const murtiPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/murti",
  component: MurtiPage,
});
const babyNameReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/baby-name-report",
  component: BabyNameReport,
});
const tarotReadingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tarot-reading",
  component: TarotReading,
});
const lifeGuidanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/life-guidance",
  component: LifeGuidance,
});
const lifeGuidanceTopicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/life-guidance/$topic",
  component: LifeGuidanceTopic,
});
// freeKundliRoute defined above
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
  astrologyCalculatorsRoute,
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
  sikhNitnemRoute,
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
  numerologyWatchesRoute,
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
  panchangRoute,
  panchangTimingsRoute,
  panchangFestivalsRoute,
  vivahMuhuratRoute,
  grihaPravesh2026Route,
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
  lifeReceiptRoute,
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
  gemstoneLibraryRoute,
  yantraLibraryRoute,
  pujaBookingNewRoute,
  tantraRemediesRoute,
  guruDirectoryRoute,
  herbDirectoryRoute,
  mehndiRoute,
  paintingsGreetingsRoute,
  daanSevaRoute,
  danSevaRoute,
  templeDirectoryPageRoute,
  navgrahMantraRoute,
  dhwaniShopRoute,
  dhwaniProductDetailRoute,
  kartikShopRoute,
  kartikProductDetailRoute,
  shopSpecialCollectionsRoute,
  pujaStoreRoute,
  chakraAssessmentRoute,
  astrologerLandingRoute,
  numerologyReportRoute,
  kundliReportRoute,
  murtiPageRoute,
  babyNameReportRoute,
  gemstoneShopRoute,
  moolankOilRoute,
  personalisedProductsRoute,
  consultExpertRoute,
  jainAartisOriginalRoute,
  sikhAartisOriginalRoute,
  freeKundliRoute,
  rudrakshaCalculatorRoute,
  gemstoneCalculatorRoute,
  moolankCalculatorRoute,
  rattiCalculatorRoute,
  braceletCalculatorRoute,
  askKrishnaRoute,
  tarotReadingRoute,
  lifeGuidanceRoute,
  lifeGuidanceTopicRoute,
  myFavouritesRoute,
  bhagavadGitaRoute,
  bhagavadGitaChapterRoute,
  pricingRoute,
  astrologersIndiaRoute,
  astrologerCityRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  // Remove loading overlay AFTER first render — this is the ONLY place it should be removed.
  // Running it at module-load time (before useEffect) means React hasn't rendered yet.
  useEffect(() => {
    const el = document.getElementById("loading-overlay");
    if (el) {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.3s ease";
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 350);
    }
  }, []); // empty deps = runs once after first render

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
