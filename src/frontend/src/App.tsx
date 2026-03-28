import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import Aarti from "./pages/Aarti";
import AdminCMS from "./pages/AdminCMS";
import AshtakamLibrary from "./pages/AshtakamLibrary";
import AstrologerConsultation from "./pages/AstrologerConsultation";
import AstrologerDashboard from "./pages/AstrologerDashboard";
import AstrologerProfile from "./pages/AstrologerProfile";
import BhajanLibrary from "./pages/BhajanLibrary";
import BusinessNumerology from "./pages/BusinessNumerology";
import Chalisa from "./pages/Chalisa";
import Dashboard from "./pages/Dashboard";
import DevotionalLibrary from "./pages/DevotionalLibrary";
import DivineInfo from "./pages/DivineInfo";
import HolyBooksAudio from "./pages/HolyBooksAudio";
import Home from "./pages/Home";
import HoroscopePanchang from "./pages/HoroscopePanchang";
import JainPujan from "./pages/JainPujan";
import KavachLibrary from "./pages/KavachLibrary";
import Mantra from "./pages/Mantra";
import Numerology from "./pages/Numerology";
import PaymentFailure from "./pages/PaymentFailure";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetail from "./pages/ProductDetail";
import ReportOutput from "./pages/ReportOutput";
import Reports from "./pages/Reports";
import SpiritualShop from "./pages/SpiritualShop";
import Stotra from "./pages/Stotra";
import StutiLibrary from "./pages/StutiLibrary";
import TempleDirectory from "./pages/TempleDirectory";
import TempleServices from "./pages/TempleServices";
import Tirthankars from "./pages/Tirthankars";
import VirtualTemple from "./pages/VirtualTemple";
import VratKatha from "./pages/VratKatha";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
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
const kavachRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/kavach",
  component: KavachLibrary,
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
  ashtakamRoute,
  stutiRoute,
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
