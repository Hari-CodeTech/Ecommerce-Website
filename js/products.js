// Comprehensive Product Catalog for Lumina Luxe E-Commerce
const PRODUCTS = [
  {
    id: 1,
    name: "Aura Pro ANC Wireless Headphones",
    category: "audio",
    categoryLabel: "Audio & Tech",
    price: 299,
    originalPrice: 359,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    badgeType: "primary",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
    ],
    description: "Engineered with 40mm beryllium drivers, active hybrid noise cancellation, and up to 45 hours of battery life with ultra-low latency.",
    features: [
      "Custom tuned 40mm Beryllium drivers",
      "Active Hybrid Noise Cancellation (40dB reduction)",
      "45-hour playback with fast-charge (15m = 5hrs)",
      "Ultra-soft memory foam protein leather earcups"
    ],
    colors: ["#1c1c1e", "#e5e5ea", "#a2845e"],
    sizes: ["Standard"],
    stock: 18,
    isFlashDeal: true,
    claimedPercent: 78
  },
  {
    id: 2,
    name: "Chronograph Matte Titanium Watch",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 450,
    originalPrice: 580,
    rating: 5.0,
    reviewsCount: 89,
    badge: "Luxury Edition",
    badgeType: "warning",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80"
    ],
    description: "Swiss automatic movement housed in aerospace-grade matte titanium with sapphire crystal glass and 100m water resistance.",
    features: [
      "Automatic self-winding Swiss Calibre movement",
      "Aerospace-grade Grade 5 titanium case",
      "Scratch-proof anti-reflective sapphire crystal",
      "10 ATM / 100 meters water resistance"
    ],
    colors: ["#2d3748", "#1a202c", "#a0aec0"],
    sizes: ["40mm", "44mm"],
    stock: 7,
    isFlashDeal: false
  },
  {
    id: 3,
    name: "Vortex Runner Carbon Fiber Sneakers",
    category: "footwear",
    categoryLabel: "Footwear",
    price: 185,
    originalPrice: 230,
    rating: 4.8,
    reviewsCount: 230,
    badge: "Trending",
    badgeType: "danger",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80"
    ],
    description: "Next-generation running shoes equipped with a responsive dual-density midsole, full-length carbon propulsion plate, and breathable knit upper.",
    features: [
      "Full-length curved carbon propulsion plate",
      "Nitrogen-infused ultra-rebound foam",
      "Breathable seamless circular knit mesh",
      "Vibram high-traction rubber outsole"
    ],
    colors: ["#e53e3e", "#1a202c", "#edf2f7"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    stock: 24,
    isFlashDeal: true,
    claimedPercent: 65
  },
  {
    id: 4,
    name: "Minimalist Oversized Cashmere Hoodie",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 135,
    originalPrice: 175,
    rating: 4.9,
    reviewsCount: 312,
    badge: "Popular",
    badgeType: "info",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80"
    ],
    description: "Crafted from ethically sourced 100% Mongolian grade-A cashmere. Designed with clean drop-shoulder drape and reinforced ribbed cuffs.",
    features: [
      "100% pure Grade-A sustainable Mongolian cashmere",
      "Double-layered relaxed structured hood",
      "Thermal regulating breathable fabric weave",
      "Pre-shrunk for enduring silhouette"
    ],
    colors: ["#e2e8f0", "#4a5568", "#1a202c"],
    sizes: ["S", "M", "L", "XL"],
    stock: 14,
    isFlashDeal: false
  },
  {
    id: 5,
    name: "Nebula Ultra Smartwatch Series 9",
    category: "audio",
    categoryLabel: "Audio & Tech",
    price: 379,
    originalPrice: 429,
    rating: 4.8,
    reviewsCount: 94,
    badge: "New Release",
    badgeType: "success",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
    ],
    description: "Brilliant 2.1-inch Always-On Retina AMOLED display, optical ECG biosensors, built-in dual GPS, and rugged 7-day battery life.",
    features: [
      "2.1\" Micro-OLED 2000-nits peak brightness",
      "Precision ECG, SpO2 & body temperature metrics",
      "Multiband dual-frequency GNSS positioning",
      "Wireless rapid-charging magnetic dock"
    ],
    colors: ["#1a202c", "#d69e2e", "#718096"],
    sizes: ["41mm", "45mm"],
    stock: 9,
    isFlashDeal: true,
    claimedPercent: 84
  },
  {
    id: 6,
    name: "Polarized Titanium Aviator Sunglasses",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 140,
    originalPrice: 190,
    rating: 4.7,
    reviewsCount: 88,
    badge: "Sale -26%",
    badgeType: "danger",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"
    ],
    description: "Ultra-featherlight Japanese beta-titanium frames fitted with scratch-resistant polarized CR-39 lenses delivering 100% UV400 defense.",
    features: [
      "Japanese flexible Beta-Titanium construction",
      "Multi-coat anti-glare polarized optics",
      "Self-adjusting soft silicone nose bridges",
      "Comes with magnetic protective hardcase"
    ],
    colors: ["#d69e2e", "#1a202c", "#718096"],
    sizes: ["Standard"],
    stock: 22,
    isFlashDeal: false
  },
  {
    id: 7,
    name: "SoundPulse 360 Spatial Speaker",
    category: "audio",
    categoryLabel: "Audio & Tech",
    price: 159,
    originalPrice: 199,
    rating: 4.7,
    reviewsCount: 167,
    badge: "Top Rated",
    badgeType: "primary",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"
    ],
    description: "Room-filling 360-degree acoustic staging powered by dual passive radiators and IPX7 submersible waterproof aluminum mesh.",
    features: [
      "Omnidirectional 360° stereo soundstage",
      "IPX7 waterproof and sandproof construction",
      "24 hours continuous playtime",
      "True Wireless Stereo (TWS) pairing support"
    ],
    colors: ["#1a202c", "#4a5568", "#2b6cb0"],
    sizes: ["Standard"],
    stock: 31,
    isFlashDeal: false
  },
  {
    id: 8,
    name: "Italian Full-Grain Leather Chelsea Boots",
    category: "footwear",
    categoryLabel: "Footwear",
    price: 220,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 115,
    badge: "Handcrafted",
    badgeType: "warning",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80"
    ],
    description: "Handcrafted in Florence using vegetable-tanned Tuscan calfskin leather, Goodyear welt construction, and cushioned cork insoles.",
    features: [
      "Artisanal vegetable-tanned full-grain leather",
      "Resoleable Goodyear welted stitch craft",
      "Elasticized twin gore for effortless slip-on",
      "Orthopedic memory foam and cork footbed"
    ],
    colors: ["#744210", "#1a202c"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    stock: 11,
    isFlashDeal: false
  },
  {
    id: 9,
    name: "Nordic Ceramic Ultrasonic Diffuser & Lamp",
    category: "living",
    categoryLabel: "Living & Home",
    price: 89,
    originalPrice: 119,
    rating: 4.8,
    reviewsCount: 76,
    badge: "Eco Choice",
    badgeType: "success",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
    ],
    description: "Sculpted stone-matte porcelain casing with whisper-quiet ultrasonic atomization and customizable warm candlelight ambiance.",
    features: [
      "Hand-finished matte porcelain exterior",
      "Ultra-fine 2.4MHz ultrasonic cool mist",
      "Ambient warm LED breathing light glow",
      "Automatic shut-off with 8-hour runtime"
    ],
    colors: ["#f7fafc", "#e2e8f0", "#2d3748"],
    sizes: ["500ml"],
    stock: 25,
    isFlashDeal: true,
    claimedPercent: 92
  },
  {
    id: 10,
    name: "Tailored Wool Blend Overcoat",
    category: "apparel",
    categoryLabel: "Apparel",
    price: 285,
    originalPrice: 360,
    rating: 4.9,
    reviewsCount: 64,
    badge: "Winter Edit",
    badgeType: "info",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
    ],
    description: "Structured double-breasted overcoat cut from an insulating heavy wool-blend with silky cupro inner lining and horn buttons.",
    features: [
      "80% Melton Wool / 20% Technical Cashmere",
      "Modern relaxed silhouette with peak lapel",
      "Internal discreet passport & phone pockets",
      "Genuine polished buffalo horn buttons"
    ],
    colors: ["#2d3748", "#744210", "#1a202c"],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    isFlashDeal: false
  },
  {
    id: 11,
    name: "AeroForm Minimalist Aluminum Desk Lamp",
    category: "living",
    categoryLabel: "Living & Home",
    price: 115,
    originalPrice: 145,
    rating: 4.7,
    reviewsCount: 52,
    badge: "Design Award",
    badgeType: "primary",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
    ],
    description: "Anodized sandblasted aluminum stem with touch-capacitive stepless dimming, 95+ CRI natural sunlight LEDs, and Qi charging base.",
    features: [
      "Ultra-slim anodized architectural aluminum",
      "Stepless touch slider brightness & warmth control",
      "High CRI 95+ flicker-free eye comfort LEDs",
      "Integrated 15W wireless smartphone fast charger"
    ],
    colors: ["#1a202c", "#e2e8f0"],
    sizes: ["Standard"],
    stock: 19,
    isFlashDeal: false
  },
  {
    id: 12,
    name: "Classic Italian Leather Bifold Wallet",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 68,
    originalPrice: 90,
    rating: 4.9,
    reviewsCount: 340,
    badge: "Bestseller",
    badgeType: "primary",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
    ],
    description: "Slim profile wallet crafted from vegetable-tanned Vachetta leather with integrated RFID-blocking shields and quick-draw card slot.",
    features: [
      "Handcrafted Vachetta pull-up patina leather",
      "Certified RFID shielding layer",
      "Holds 10-12 cards plus flat currency",
      "Reinforced waxed linen saddle stitching"
    ],
    colors: ["#744210", "#1a202c", "#2d3748"],
    sizes: ["Slim"],
    stock: 45,
    isFlashDeal: false
  }
];

// Available Promo Codes
const PROMO_CODES = {
  "NOVA25": { discountPercent: 25, label: "25% Off Storewide" },
  "SAVE10": { discountPercent: 10, label: "10% Welcome Discount" },
  "FREESHIP": { freeShipping: true, label: "Free Express Shipping" }
};

// Customer Reviews Data
const TESTIMONIALS = [
  {
    name: "Sophia Vance",
    role: "Verified Buyer • New York",
    rating: 5,
    text: "The Aura Pro headphones completely exceeded expectations. The build quality, soundstage, and active noise canceling easily beat my older Sony XM4s. Packaging felt like unboxing a bespoke luxury item!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80"
  },
  {
    name: "Marcus Sterling",
    role: "Verified Buyer • London",
    rating: 5,
    text: "Ordered the Titanium Chronograph watch and couldn't be happier. Exceptional weight distribution, pristine sapphire crystal, and arrived in under 48 hours. Lumina is my new go-to store.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Verified Buyer • Berlin",
    rating: 5,
    text: "The cashmere hoodie feels divine against the skin. True to size, gorgeous neutral tone, and washes effortlessly without pill or fuzz. Definitely buying another in slate black.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80"
  }
];
