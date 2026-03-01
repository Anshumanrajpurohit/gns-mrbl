import heroMarble from "@/assets/hero-indian-marble.jpg";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryBathroom from "@/assets/gallery-bathroom.jpg";
import galleryLiving from "@/assets/gallery-living.jpg";
import galleryStaircase from "@/assets/gallery-staircase.jpg";
import poojaRoom from "@/assets/pooja-room.jpg";
import staircaseLuxury from "@/assets/staircase-luxury.jpg";
import kitchenGranite from "@/assets/kitchen-granite.jpg";
import livingFlooring from "@/assets/living-flooring.jpg";
import productGranite from "@/assets/product-granite.jpg";
import productMarble from "@/assets/product-marble.jpg";
import showroomImage from "@/assets/showroom.jpg";
import type { LucideIcon } from "lucide-react";
import { Gem, Hammer, Layers, Landmark, PenTool, ShieldCheck, Building2, Ruler } from "lucide-react";

export const companyDetails = {
  name: "Ganpati Marble Goa",
  owner: "Vishan Singh Rajpurohit",
  phone: "+91 98229 83752",
  phoneHref: "+919822983752",
  whatsappHref: "https://wa.me/919822983752",
  email: "ganpatimarblegoa@gmail.com",
  address: "72/2, Pilerne Industrial Estate, Pilerne, Saligao, Goa – 403511",
  experienceYears: 24,
  projectsDelivered: 1800,
  templesCrafted: 72,
  largeScaleClients: 140,
  heroImage: heroMarble,
  showroomImage,
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3837.383625792806!2d73.7966!3d15.5395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc0782fd60b0f%3A0x5c9fbbd5e6e36f54!2sPilerne%20Industrial%20Estate!5e0!3m2!1sen!2sin!4v1708343144000",
};

export interface SpecializationCard {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const specializations: SpecializationCard[] = [
  {
    title: "Marble Supply & Installation",
    description: "Sourcing Italian and Indian marble with meticulous laying, mirror polishing, and waterproofing for luxury floors and walls.",
    icon: Gem,
    accent: "Signature marble floors",
  },
  {
    title: "Granite Platforms & Cladding",
    description: "Heat-resistant granite for kitchens, staircases, façades, and commercial projects with precise edge profiles.",
    icon: Layers,
    accent: "Daily-use durability",
  },
  {
    title: "Temple & Tulsi Crafting",
    description: "Custom Tulsi Vrindavan, mandirs, pillars, and deity platforms hand-finished by in-house artisans.",
    icon: Landmark,
    accent: "Sacred craftsmanship",
  },
  {
    title: "Custom Stone Detailing",
    description: "From designer steps to carved wall panels—we translate bespoke sketches into long-lasting stone.",
    icon: PenTool,
    accent: "Tailored to your plan",
  },
];

export const trustMetrics = [
  { label: "Years shaping stone", value: `${companyDetails.experienceYears}+` },
  { label: "Residential & resort projects", value: `${companyDetails.projectsDelivered}+` },
  { label: "Temples & Tulsi mandirs", value: `${companyDetails.templesCrafted}+` },
  { label: "Architect & builder partners", value: `${companyDetails.largeScaleClients}+` },
];

export interface ServiceShowcase {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  badge: string;
}

export const serviceShowcase: ServiceShowcase[] = [
  {
    id: "marble",
    title: "Marble Floors & Statement Walls",
    description:
      "Premium Italian and Makrana marble backed by careful grain matching, gradient polishing, and inlay-ready finishing.",
    bullets: ["Mirror-finish polishing", "Moisture-locked substrates", "Custom inlays & borders"],
    image: productMarble,
    badge: "Luxury interiors",
  },
  {
    id: "granite",
    title: "Granite Kitchens & Staircases",
    description:
      "Absolute Black, Tan Brown, and Steel Grey granite cut to millimeter accuracy for platforms, risers, and cladding.",
    bullets: ["Heat and stain resistant", "Edge profiles & sink cut-outs", "Site-ready sealing"],
    image: productGranite,
    badge: "Daily-use strength",
  },
  {
    id: "temple",
    title: "Temple, Tulsi & Custom Mandirs",
    description:
      "Handcrafted sacred work—from Tulsi Vrindavan to ornate sanctum pillars—sculpted by our temple artisans.",
    bullets: ["Traditional proportions", "Hand chiseled motifs", "On-site installation"],
    image: poojaRoom,
    badge: "Sacred craft",
  },
];

export const galleryItems = [
  {
    id: "gallery-1",
    title: "Tulsi Vrindavan Courtyard",
    category: "Temples",
    description: "Makrana marble Tulsi with gold-leaf etching and integrated lamp shelf.",
    image: poojaRoom,
    location: "Mapusa",
  },
  {
    id: "gallery-2",
    title: "Granite Chef's Kitchen",
    category: "Granite",
    description: "Black Galaxy platform with waterfall edge and concealed drainboard.",
    image: kitchenGranite,
    location: "Panjim",
  },
  {
    id: "gallery-3",
    title: "Marble Lobby Flooring",
    category: "Marble",
    description: "Italian Statuario laid in book-matched layout for boutique hotel lobby.",
    image: livingFlooring,
    location: "Candolim",
  },
  {
    id: "gallery-4",
    title: "Temple Pillar Detailing",
    category: "Temples",
    description: "Hand-carved deity platform with lotus base and stepped plinth.",
    image: staircaseLuxury,
    location: "Old Goa",
  },
  {
    id: "gallery-5",
    title: "Custom Bathroom Suite",
    category: "Custom Work",
    description: "Full-height marble cladding with integrated vanity and niches.",
    image: galleryBathroom,
    location: "Dona Paula",
  },
  {
    id: "gallery-6",
    title: "Vitrified Lobby Grid",
    category: "Custom Work",
    description: "Bookmatched GVT tiles laid with brass trims for resort lobby.",
    image: galleryLiving,
    location: "Baga",
  },
  {
    id: "gallery-7",
    title: "Garden Kota Steps",
    category: "Granite",
    description: "Sandblasted Kota stone staircase with brass inlay nosing for grip.",
    image: galleryStaircase,
    location: "Saligao",
  },
  {
    id: "gallery-8",
    title: "Chef's Pass Counter",
    category: "Marble",
    description: "Calacatta counter with curved edge built for luxury restaurant.",
    image: galleryKitchen,
    location: "Assagao",
  },
];

export const galleryCategories = ["All", "Marble", "Granite", "Temples", "Custom Work"];

export const craftsmanshipTimeline = [
  { year: "2002", title: "Ganpati Marble Goa opens", detail: "Started as a single-yard operation at Pilerne Industrial Estate." },
  { year: "2010", title: "Temple craft division", detail: "Dedicated artisans for Tulsi Vrindavan and mandir detailing." },
  { year: "2016", title: "Luxury hospitality", detail: "Partnered with architects for resort lobbies and villas across Goa." },
  { year: "2023", title: "Integrated installation", detail: "In-house project managers ensuring on-time, on-site delivery." },
];

export const processSteps = [
  { title: "Site & intent study", detail: "We understand vastu, lifestyle, and loads before suggesting a stone." },
  { title: "Material curation", detail: "Handpick slabs from our yard or quarries to match your palette." },
  { title: "Craft & finish", detail: "Precision cutting, chamfering, and polishing happen in controlled conditions." },
  { title: "Installation & care", detail: "On-site teams install, seal, and brief you on maintaining the finish." },
];

export const contactHighlights = [
  { label: "Phone", value: companyDetails.phone, href: `tel:${companyDetails.phoneHref}` },
  { label: "Email", value: companyDetails.email, href: `mailto:${companyDetails.email}` },
  { label: "Address", value: companyDetails.address },
];

export const ownerHighlights = [
  {
    icon: Hammer,
    title: "Hands-on leadership",
    description: "Vishan personally inspects every batch of marble and granite before dispatch.",
  },
  {
    icon: ShieldCheck,
    title: "Quality without shortcuts",
    description: "Moisture checks, epoxy backs, and proper curing prevent future cracks or stains.",
  },
  {
    icon: Building2,
    title: "Residential & resort expertise",
    description: "From boutique villas to high-traffic hospitality floors, we understand Goa's climate demands.",
  },
  {
    icon: Ruler,
    title: "Custom fabrication",
    description: "Edge profiles, water-fall counters, carved pillars, and Tulsi mandirs built to architect drawings.",
  },
];

export const serviceOptions = [
  "Marble installation",
  "Granite platform",
  "Temple or Tulsi",
  "Custom crafting",
  "Tile & Kota work",
];

export const heroCallouts = [
  { label: "Temple crafting", detail: "Tulsi, Mandir & deity work" },
  { label: "Granite kitchens", detail: "Precision-cut, heat-proof" },
  { label: "Resort flooring", detail: "Teams for large rollouts" },
];

export const gallerySpotlight = [
  { title: "Marble", image: livingFlooring },
  { title: "Granite", image: kitchenGranite },
  { title: "Temples", image: poojaRoom },
  { title: "Custom Work", image: galleryBathroom },
];

export const servicesPageSections = [
  {
    title: "Marble mastery",
    description: "Sourcing Carrara, Statuario, Makrana, and Indian greens with perfect laying, skirting, and protection.",
    bullets: ["Precision book-matching", "Moisture tested screeds", "Diamond polishing & sealing"],
    image: livingFlooring,
    badge: "Luxury interiors",
  },
  {
    title: "Granite confidence",
    description: "Kitchen, façade, and staircase granite with accurate cut-outs, nosing, and anti-slip finishes.",
    bullets: ["Waterfall counters", "Riser-tread kits", "Flamed & leather finishes"],
    image: kitchenGranite,
    badge: "Daily use",
  },
  {
    title: "Temple & Tulsi studio",
    description: "Tulsi Vrindavan, mandirs, deity bases, pillars, and custom carvings crafted by temple artists.",
    bullets: ["Makrana & Italian bases", "Inlay-ready platforms", "Custom shikhar & bells"],
    image: poojaRoom,
    badge: "Sacred craft",
  },
  {
    title: "Custom detailing",
    description: "Feature walls, reception counters, plinths, and stone furniture shaped to architect drawings.",
    bullets: ["3D templates", "Hidden joints", "On-site polishing"],
    image: staircaseLuxury,
    badge: "Bespoke",
  },
  {
    title: "Tiles, Kota & rough stone",
    description: "Double-charge vitrified, Kota stone, and foundation rubble—sourced and installed for longevity.",
    bullets: ["Anti-skid walkways", "Laser-level laying", "Post-install care"],
    image: galleryStaircase,
    badge: "Structural",
  },
];

export const testimonialSnippets = [
  {
    quote:
      "We trusted Vishan's team for our resort lobby. They sourced matching marble lots and finished the work before season start.",
    author: "Anjali S., Resort Owner",
  },
  {
    quote: "The Tulsi Vrindavan they crafted for our family home feels sacred and timeless.",
    author: "Rajesh & Pooja, Mapusa",
  },
  {
    quote: "Their granite platforms survive heavy-duty kitchen use and still look brand new.",
    author: "Chef Nikhil, Panjim",
  },
];

export const adminTableColumns = ["Name", "Phone", "Email", "Service", "Message", "Date", "Status", "Actions"];
