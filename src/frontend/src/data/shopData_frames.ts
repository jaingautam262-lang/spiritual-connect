// Sacred photo frames and wall art for home altars and puja rooms

export interface FrameProduct {
  id: string;
  name: string;
  category: "frames";
  price: number;
  mrp: number;
  discountPercent: number;
  description: string;
  material: string;
  dimensions: string;
  image: string;
  inStock: boolean;
  cashback: boolean;
}

export const FRAME_PRODUCTS: FrameProduct[] = [
  {
    id: "frm-001",
    name: "Lakshmi-Ganesha Brass Photo Frame 8x10 inch",
    category: "frames",
    price: 2200,
    mrp: 3200,
    discountPercent: 31,
    description:
      "Intricately engraved brass photo frame featuring Goddess Lakshmi and Lord Ganesha in traditional South Indian style. Gold-polished finish with velvet backing. Perfect for home altar, puja room, or gifting.",
    material: "Brass",
    dimensions: "8 x 10 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-002",
    name: "Shri Ram Parivar Brass Frame 12x16 inch",
    category: "frames",
    price: 3500,
    mrp: 5000,
    discountPercent: 30,
    description:
      "Majestic brass frame depicting the complete Ram Parivar \u2014 Shri Ram, Sita Mata, Lakshmana, and Hanuman Ji. Hand-engraved with devotional motifs and lotus border. A divine centerpiece for your puja room.",
    material: "Brass",
    dimensions: "12 x 16 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-003",
    name: "Shri Yantra Copper Frame 8x8 inch",
    category: "frames",
    price: 1800,
    mrp: 2600,
    discountPercent: 31,
    description:
      "Shri Yantra copper frame \u2014 sacred geometry of Goddess Tripura Sundari engraved on pure copper with 3D relief effect. Suitable for east-facing walls. Energized during Navratri with Vedic mantras for wealth and prosperity.",
    material: "Pure Copper",
    dimensions: "8 x 8 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-004",
    name: "Vastu Purush Frame 10x12 inch",
    category: "frames",
    price: 2500,
    mrp: 3600,
    discountPercent: 31,
    description:
      "Vastu Purush brass frame with directional mapping and Vastu Purush diagram. Ideal for homes following Vastu Shastra principles. Helps correct Vastu doshas and brings harmony to the household when placed at the entrance.",
    material: "Brass",
    dimensions: "10 x 12 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-005",
    name: "Navgraha Photo Frame Brass 12x12 inch",
    category: "frames",
    price: 2800,
    mrp: 4000,
    discountPercent: 30,
    description:
      "Navgraha brass frame featuring all nine planetary deities arranged in traditional Vedic order. Engraved with each graha's bija mantra and symbol. Recommended for puja rooms to pacify malefic planetary influences.",
    material: "Brass",
    dimensions: "12 x 12 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-006",
    name: "Om Symbol Silver Wall Frame 10x10 inch",
    category: "frames",
    price: 3200,
    mrp: 4800,
    discountPercent: 33,
    description:
      "Premium silver-finish Om (\u0950) wall frame with diamond-cut detailing and backlit acrylic base. The sacred Om symbol radiates cosmic vibrations. A modern-meets-traditional d\u00e9cor piece for living rooms and meditation spaces.",
    material: "Silver-finish Metal",
    dimensions: "10 x 10 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-007",
    name: "Durga Mata Photo Frame Antique Finish 8x10 inch",
    category: "frames",
    price: 1500,
    mrp: 2200,
    discountPercent: 32,
    description:
      "Durga Mata antique-finish photo frame featuring Maa Durga in her Mahishasura Mardini form. Hand-painted borders with traditional motifs. Antique copper finish gives a temple-like sacred feel to any space.",
    material: "Metal with Antique Finish",
    dimensions: "8 x 10 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-008",
    name: "Tirupati Balaji Tanjore Art Frame 12x16 inch",
    category: "frames",
    price: 4500,
    mrp: 6500,
    discountPercent: 31,
    description:
      "Tirupati Balaji Tanjore Art Frame \u2014 authentic Tanjore-style painting of Sri Venkateswara with traditional gold leaf work, precious stones, and vibrant colors on hardboard. A collector-quality devotional art piece.",
    material: "Tanjore Art on Hardboard, Gold Leaf",
    dimensions: "12 x 16 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-009",
    name: "Crystal Shri Yantra Frame 8x8 inch",
    category: "frames",
    price: 3800,
    mrp: 5500,
    discountPercent: 31,
    description:
      "Crystal Shri Yantra frame with clear quartz crystal-embedded Shri Yantra on premium brass base. The crystals amplify the yantra's energy field. Ideal for home office or meditation room for manifesting abundance.",
    material: "Brass with Clear Quartz Crystal",
    dimensions: "8 x 8 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "frm-010",
    name: "Wooden Carved Temple Frame 10x14 inch",
    category: "frames",
    price: 2000,
    mrp: 2900,
    discountPercent: 31,
    description:
      "Hand-carved wooden temple frame with intricate South Indian temple gopuram motifs. Crafted from seasoned rosewood by traditional artisans. Features a mini-temple arch design perfect for deity photos and blessings.",
    material: "Seasoned Rosewood",
    dimensions: "10 x 14 inches",
    image: "/images/frame-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
];
