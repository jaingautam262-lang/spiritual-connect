import {
  TOP_25_FESTIVALS,
  TopHinduFestivalsLayout,
} from "../components/TopHinduFestivalsLayout";

const top10Note = (
  <>
    <strong style={{ color: "oklch(0.78 0.14 75)" }}>Cultural Note:</strong>{" "}
    There are numerous Vrat, Upvas, Tyohar and Parva in Hinduism. The fasting
    and festivities go hand-in-hand. Top Hindu festivals have historically been
    tied with the social fabric of India — most textbooks in North Indian
    schools mention the top 4 as Deepavali, Holi, Raksha Bandhan, and Dasara. It
    is also mentioned that Rakhi is most significant for the Brahmin community,
    Diwali for the Vaishya community, Dasara for the Kshatriya community, and
    Holi for the Shudra community. In modern India, all festivals are celebrated
    universally across communities.
  </>
);

export default function TopHinduFestivalsTop10() {
  return (
    <TopHinduFestivalsLayout
      count={10}
      festivals={TOP_25_FESTIVALS.slice(0, 10)}
      extraNote={top10Note}
    />
  );
}
