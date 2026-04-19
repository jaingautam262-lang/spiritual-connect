import {
  TOP_25_FESTIVALS,
  TopHinduFestivalsLayout,
} from "../components/TopHinduFestivalsLayout";

export default function TopHinduFestivalsTop20() {
  return (
    <TopHinduFestivalsLayout
      count={20}
      festivals={TOP_25_FESTIVALS.slice(0, 20)}
    />
  );
}
