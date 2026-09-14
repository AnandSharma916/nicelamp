import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import HomepageSection from '../models/HomepageSection.js';
import SiteSettings from '../models/SiteSettings.js';

dotenv.config();

const seedAll = async (isStandalone = false) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    console.log('[Seed] Clearing existing collections for fresh catalog setup...');
    await Admin.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await HomepageSection.deleteMany({});
    await SiteSettings.deleteMany({});

    // 1. Seed Single Admin
    console.log('[Seed] Seeding single administrative account...');
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@lighthut.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const adminName = process.env.ADMIN_NAME || 'LightHut Administrator';

    await Admin.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`[Seed] Admin created: ${adminEmail}`);

    // 2. Seed Categories
    console.log('[Seed] Seeding product categories...');
    const categoriesData = [
      {
        name: 'Wall Light',
        slug: 'wall-light',
        description: 'Architectural wall sconces, indirect ambient washes, and sculpted acrylic luminaires engineered for luxury interiors.',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
        sortOrder: 0,
        isActive: true,
        seoTitle: 'Modern Architectural Wall Lights & Sconces | LightHut',
        seoDescription: 'Explore our precision engineered wall sconces, acrylic luminaires, and gold finish accent fixtures.',
      },
      {
        name: 'Hanging Lights',
        slug: 'hanging-lights',
        description: 'Statement pendant fixtures, hand-blown glass chandeliers, and suspended linear luminaires for dining and atrium spaces.',
        image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
        sortOrder: 1,
        isActive: true,
        seoTitle: 'Luxury Hanging Lights & Pendant Luminaires | LightHut',
        seoDescription: 'Discover luxury glass pendants, suspended statement fixtures, and modern architectural chandeliers.',
      },
      {
        name: 'Table Lamp',
        slug: 'table-lamp',
        description: 'Sculptural desk luminaires, solid ceramic accents, and precision-machined brass task lamps.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
        sortOrder: 2,
        isActive: true,
        seoTitle: 'Architectural Table Lamps & Desk Luminaires | LightHut',
        seoDescription: 'Bespoke bedside and desk luminaires combining natural materials with high-efficiency LED warm dimming.',
      },
      {
        name: 'Italian Lights',
        slug: 'italian-lights',
        description: 'Artisanal Murano-style glass fixtures and avant-garde statement pieces inspired by Italian architectural heritage.',
        image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1000&q=80',
        sortOrder: 3,
        isActive: true,
        seoTitle: 'Artisanal Italian Lighting & Murano Glass Luminaires | LightHut',
        seoDescription: 'Hand-crafted Italian lighting fixtures blending artisanal European traditions with contemporary optical precision.',
      },
      {
        name: 'Magnetic Track Lights',
        slug: 'track-lights',
        description: 'Ultra-slim 48V magnetic architectural linear tracks, adjustable flood modules, and glare-free spotlight inserts.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        sortOrder: 4,
        isActive: true,
        seoTitle: '48V Magnetic Architectural Track Lighting Systems | LightHut',
        seoDescription: 'Precision architectural low-voltage magnetic track lighting systems for high-end residential and commercial galleries.',
      },
      {
        name: 'Exterior & Facade',
        slug: 'outdoor-lighting',
        description: 'IP65 waterproof architectural grazers, step lights, and dark-sky compliant landscape fixtures.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
        sortOrder: 5,
        isActive: true,
        seoTitle: 'IP65 Exterior Architectural & Facade Lighting | LightHut',
        seoDescription: 'Weatherproof high-performance outdoor architectural luminaires designed for facade grazing and landscape enhancement.',
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`[Seed] Created ${createdCategories.length} categories.`);

    const catMap = {};
    createdCategories.forEach((c) => {
      catMap[c.slug] = c._id;
    });

    // 3. Seed Products
    console.log('[Seed] Seeding architectural lighting catalog products...');
    const productsData = [
      {
        name: 'LH-6031W Acrylic Architectural Wall Lamp',
        slug: 'lh-6031w-acrylic-wall-lamp',
        sku: 'LH-6031W',
        category: catMap['wall-light'],
        shortDescription: 'Minimalist linear wall luminaire with edge-lit optical grade acrylic and brushed champagne gold finish.',
        description: 'The LH-6031W is designed for understated luxury, providing continuous glare-free illumination along corridors, living room feature walls, and master suites. Fabricated from precision-extruded aluminum and finished with a durable electroplated brushed gold coating, its micro-prismatic optical diffuser ensures uniform light output without visible diodes.',
        images: [
          { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80', alt: 'LH-6031W Front View', isCover: true },
          { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80', alt: 'LH-6031W Ambient Illumination', isCover: false },
        ],
        specifications: {
          dimensions: '600mm x 80mm x 55mm',
          material: 'Extruded Aluminum & Optical Grade Acrylic',
          finish: 'Brushed Champagne Gold (GD)',
          wattage: '16W Integrated Bridgelux LED',
          voltage: 'AC 100-240V 50/60Hz',
          colorTemperature: '3000K Warm White (CRI > 92)',
          ipRating: 'IP20 Indoor',
          installationType: 'Surface Wall Mounted (Vertical / Horizontal)',
          beamAngle: '120° Diffuse Spread',
          cri: 'Ra > 92',
          luminousFlux: '1450 Lumens',
        },
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        isFeatured: true,
        isPublished: true,
        sortOrder: 0,
      },
      {
        name: 'LH-3303-1W Dual-Emission Aluminum Wall Light',
        slug: 'lh-3303-1w-aluminum-wall-light',
        sku: 'LH-3303-1W',
        category: catMap['wall-light'],
        shortDescription: 'Dual up-and-down beam architectural wall sconce crafted from die-cast aluminum with adjustable shutter blades.',
        description: 'Featuring internal adjustable light beam flaps, the LH-3303-1W allows architects and interior designers to sculpt custom beam angles (from 0° to 120°) independently on both top and bottom apertures. Engineered for both interior accent walls and covered outdoor verandas.',
        images: [
          { url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80', alt: 'LH-3303-1W Wall Light', isCover: true },
          { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80', alt: 'LH-3303-1W Beam Angle Demonstration', isCover: false },
        ],
        specifications: {
          dimensions: '100mm x 100mm x 100mm (Cube)',
          material: 'Die-Cast Aluminum with Powder Coating',
          finish: 'Matte Deep Charcoal Black',
          wattage: '2x 6W COB LED (12W Total)',
          voltage: 'AC 100-240V 50/60Hz',
          colorTemperature: '3000K Warm White',
          ipRating: 'IP65 Weather Resistant',
          installationType: 'Surface Wall Mounted',
          beamAngle: '0° - 120° Adjustable Both Sides',
          cri: 'Ra > 90',
          luminousFlux: '980 Lumens',
        },
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        isFeatured: true,
        isPublished: true,
        sortOrder: 1,
      },
      {
        name: 'LH-SD102W Sculptural Minimalist Wall Light',
        slug: 'lh-sd102w-minimalist-wall-light',
        sku: 'LH-SD102W',
        category: catMap['wall-light'],
        shortDescription: 'Curved geometric accent fixture with indirect perimeter halo glow.',
        description: 'The LH-SD102W transforms vertical surfaces into kinetic planes of warm indirect light. Concealed high-CRI LED arrays wash the mounting surface smoothly, preventing any direct glare while creating a tranquil, sophisticated focal point.',
        images: [
          { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80', alt: 'LH-SD102W Indirect Glow', isCover: true },
        ],
        specifications: {
          dimensions: '350mm x 120mm x 45mm',
          material: 'Aerospace Grade Aluminum Alloy',
          finish: 'Brushed Rose Gold (RGD)',
          wattage: '10W Integrated LED',
          voltage: 'AC 110-240V',
          colorTemperature: '3-in-1 CCT Tunable (3000K / 4000K / 6000K)',
          ipRating: 'IP20 Indoor',
          installationType: 'Flush Wall Mount',
          beamAngle: 'Indirect 180° Halo',
          cri: 'Ra > 93',
          luminousFlux: '850 Lumens',
        },
        isFeatured: false,
        isPublished: true,
        sortOrder: 2,
      },
      {
        name: 'LH-B6002W GD Brushed Brass Wall Lamp',
        slug: 'lh-b6002w-gd-brushed-brass-wall-lamp',
        sku: 'LH-B6002W',
        category: catMap['wall-light'],
        shortDescription: 'Classic contemporary brass wall lamp featuring fluted white frosted glass diffuser.',
        description: 'A timeless luminaire for bedside illumination and powder rooms. The heavy-gauge brass base provides sturdy architectural presence while the custom-blown fluted glass delivers smooth, flattering 360-degree light.',
        images: [
          { url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=80', alt: 'LH-B6002W Brass Lamp', isCover: true },
        ],
        specifications: {
          dimensions: '420mm x 110mm x 90mm',
          material: 'Solid Brass & Fluted Opal Glass',
          finish: 'Hand-Brushed Satin Brass',
          wattage: '8W G9 LED Replaceable Capsule',
          voltage: 'AC 220-240V',
          colorTemperature: '2700K Ultra-Warm White',
          ipRating: 'IP44 Bathroom Zone 2 Rated',
          installationType: 'Vertical Surface Mount',
          beamAngle: '360° Omnidirectional',
          cri: 'Ra > 95',
          luminousFlux: '720 Lumens',
        },
        isFeatured: true,
        isPublished: true,
        sortOrder: 3,
      },
      {
        name: 'LH-G062-1L Ribbed Amber Glass Pendant',
        slug: 'lh-g062-1l-ribbed-amber-glass-pendant',
        sku: 'LH-G062-1L',
        category: catMap['hanging-lights'],
        shortDescription: 'Handcrafted ribbed amber blown-glass pendant with brushed gunmetal canopy and braided fabric cord.',
        description: 'Crafted by master glassmakers, the LH-G062-1L features fine vertical optical ribs that refract light into subtle undulating patterns across dining surfaces and kitchen islands. Includes a 2-meter braided textile suspension cord with micro-adjustment canopy.',
        images: [
          { url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80', alt: 'LH-G062-1L Pendant Light', isCover: true },
          { url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=80', alt: 'Glass Detail View', isCover: false },
        ],
        specifications: {
          dimensions: 'Diameter: 220mm, Height: 320mm (Cord 2000mm adj.)',
          material: 'Hand-Blown Borosilicate Glass & Machined Brass',
          finish: 'Smoked Amber Glass / Gunmetal Trim',
          wattage: 'E27 Filament LED Max 25W (Includes 6W 2200K vintage bulb)',
          voltage: 'AC 100-240V',
          colorTemperature: '2200K Sunset Warmth',
          ipRating: 'IP20 Indoor',
          installationType: 'Ceiling Pendant Suspended',
          beamAngle: '360° Ambient',
          cri: 'Ra > 90',
          luminousFlux: '600 Lumens',
        },
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        isFeatured: true,
        isPublished: true,
        sortOrder: 0,
      },
      {
        name: 'LH-G074A Smoked Crystal Linear Chandelier',
        slug: 'lh-g074a-smoked-crystal-linear-chandelier',
        sku: 'LH-G074A',
        category: catMap['hanging-lights'],
        shortDescription: 'Architectural horizontal linear fixture with precision-cut K9 smoked crystal prism arrays.',
        description: 'Engineered specifically for long 8-to-12 seater luxury dining tables and conference boardrooms. The LH-G074A balances crisp architectural lines with the mesmerizing optical refraction of optical-grade K9 crystal prisms.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: 'LH-G074A Dining Chandelier', isCover: true },
        ],
        specifications: {
          dimensions: '1200mm Length x 180mm Width x 220mm Height',
          material: 'K9 Smoked Crystal & Stainless Steel Frame',
          finish: 'Electroplated Matte Black & Titanium Gold',
          wattage: '48W Integrated High-Efficiency LED',
          voltage: 'AC 110-240V 50/60Hz',
          colorTemperature: '3000K Warm White (Triac Dimmable)',
          ipRating: 'IP20 Indoor',
          installationType: 'Dual Aircraft Cable Ceiling Suspension',
          beamAngle: 'Direct Downlight + Lateral Refraction',
          cri: 'Ra > 94',
          luminousFlux: '4200 Lumens',
        },
        isFeatured: true,
        isPublished: true,
        sortOrder: 1,
      },
      {
        name: 'LH-G150A Spherical Glass Cluster Chandelier',
        slug: 'lh-g150a-spherical-glass-cluster-chandelier',
        sku: 'LH-G150A',
        category: catMap['hanging-lights'],
        shortDescription: 'Cascading 7-light constellation chandelier with mouth-blown frosted and tinted globes.',
        description: 'The LH-G150A creates visual drama in double-height foyers, grand stairwells, and luxury living pavilions. Each glass orb hangs at customizable heights from an architectural round ceiling rose.',
        images: [
          { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80', alt: 'LH-G150A Cluster View', isCover: true },
        ],
        specifications: {
          dimensions: 'Canopy 600mm Diameter, Overall Drop up to 3500mm',
          material: 'Mouth-Blown Art Glass & Aircraft Grade Steel',
          finish: 'Champagne & Frosted White Dual Glass',
          wattage: '7x 5W G9 LED (35W Total)',
          voltage: 'AC 100-240V',
          colorTemperature: '2700K Warm Ambience',
          ipRating: 'IP20 Indoor',
          installationType: 'High Ceiling Canopy Mount',
          beamAngle: 'Omnidirectional Multi-Point',
          cri: 'Ra > 92',
          luminousFlux: '3150 Lumens',
        },
        isFeatured: false,
        isPublished: true,
        sortOrder: 2,
      },
      {
        name: 'LH-T2309 Solid American Walnut Table Lamp',
        slug: 'lh-t2309-solid-walnut-table-lamp',
        sku: 'LH-T2309',
        category: catMap['table-lamp'],
        shortDescription: 'Architectural desktop luminaire carved from certified solid walnut with knurled brass rotary dimmer.',
        description: 'Harmonizing warm organic timber with mechanical precision. The LH-T2309 features a custom hand-spun brass shade with a white reflective inner cavity that directs glare-free warm illumination downward onto your desk or bedside table.',
        images: [
          { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80', alt: 'LH-T2309 Walnut Lamp', isCover: true },
        ],
        specifications: {
          dimensions: 'Height: 480mm, Shade Dia: 280mm, Base: 160mm',
          material: 'American Walnut Timber & Solid Brass',
          finish: 'Natural Matte Oil Walnut / Satin Brass',
          wattage: '9W Integrated Warm-Dim LED',
          voltage: 'AC 100-240V with 24V DC Inline Transformer',
          colorTemperature: '2200K - 3000K Dim-to-Warm Curve',
          ipRating: 'IP20 Indoor',
          installationType: 'Freestanding Desktop (Textile Cord with Plug)',
          beamAngle: '90° Downward Task Wash',
          cri: 'Ra > 96 Museum Grade',
          luminousFlux: '750 Lumens',
        },
        isFeatured: true,
        isPublished: true,
        sortOrder: 0,
      },
      {
        name: 'LH-T828G Sculptural Metal Pillar Lamp',
        slug: 'lh-t828g-sculptural-metal-table-lamp',
        sku: 'LH-T828G',
        category: catMap['table-lamp'],
        shortDescription: 'Brutalist-inspired monolithic cast metal table sculpture with subtle ambient perimeter backlight.',
        description: 'An art object by day, an evocative light source by night. Hand-cast from raw aluminum alloy and bead-blasted to achieve a tactile architectural patina.',
        images: [
          { url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=80', alt: 'LH-T828G Pillar Lamp', isCover: true },
        ],
        specifications: {
          dimensions: 'Height: 380mm, Width: 140mm, Depth: 140mm',
          material: 'Sand-Cast Aluminum Alloy',
          finish: 'Brushed Graphite Titanium (BK)',
          wattage: '7W COB LED',
          voltage: 'AC 100-240V 50/60Hz',
          colorTemperature: '2700K Warm White',
          ipRating: 'IP20 Indoor',
          installationType: 'Freestanding Accent',
          beamAngle: 'Internal Diffuse Reflection',
          cri: 'Ra > 91',
          luminousFlux: '520 Lumens',
        },
        isFeatured: false,
        isPublished: true,
        sortOrder: 1,
      },
      {
        name: 'LH-TL029 Architect Counterbalance Task Lamp',
        slug: 'lh-tl029-architect-counterbalance-task-lamp',
        sku: 'LH-TL029',
        category: catMap['table-lamp'],
        shortDescription: 'Engineered counterbalance desk lamp with precision dual-pivot arms and touchless gesture dimming.',
        description: 'Built for designers, architects, and detail-oriented workspaces. The LH-TL029 balances effortlessly with engineered counterweights and delivers high-CRI, zero-flicker illumination that prevents eye strain during prolonged sessions.',
        images: [
          { url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80', alt: 'LH-TL029 Task Lamp', isCover: true },
        ],
        specifications: {
          dimensions: 'Reach: 850mm, Base Dia: 220mm, Head: 180mm',
          material: 'Precision Machined 6061-T6 Aluminum',
          finish: 'Anodized Space Silver / Matte Black Details',
          wattage: '12W High-Density LED Array',
          voltage: 'AC 100-240V',
          colorTemperature: '3000K - 5000K Stepless CCT Tuning',
          ipRating: 'IP20 Indoor',
          installationType: 'Weighted Desk Base or Edge Clamp',
          beamAngle: '65° Precision Task Spread',
          cri: 'Ra > 98 Ultra High Fidelity',
          luminousFlux: '1100 Lumens',
        },
        isFeatured: true,
        isPublished: true,
        sortOrder: 2,
      },
      {
        name: 'LH-2036 Italian Hand-Blown Murano Pendant',
        slug: 'lh-2036-italian-hand-blown-murano-pendant',
        sku: 'LH-2036',
        category: catMap['italian-lights'],
        shortDescription: 'Organic undulating glass pendant handcrafted following Venetian glassmaking traditions.',
        description: 'Every LH-2036 fixture is individually blown by master artisans in Italy. The fluid, asymmetrical form captures the essence of liquid light, offering a one-of-a-kind presence that elevates modern dining rooms and hotel lobbies.',
        images: [
          { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80', alt: 'LH-2036 Italian Glass Pendant', isCover: true },
        ],
        specifications: {
          dimensions: 'Dia: 450mm, Height: 380mm, Drop: 2500mm',
          material: 'Authentic Italian Murano-Style Art Glass',
          finish: 'Smoke Fade to Crystal Clear with Gold Flakes',
          wattage: '18W Custom LED Module',
          voltage: 'AC 220-240V',
          colorTemperature: '2700K Candle Warmth',
          ipRating: 'IP20 Indoor',
          installationType: 'Pendant Suspended',
          beamAngle: '360° Omnidirectional',
          cri: 'Ra > 94',
          luminousFlux: '1600 Lumens',
        },
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        isFeatured: true,
        isPublished: true,
        sortOrder: 0,
      },
      {
        name: 'LH-6036 Cascading Italian Art Glass Luminaire',
        slug: 'lh-6036-cascading-italian-art-glass-luminaire',
        sku: 'LH-6036',
        category: catMap['italian-lights'],
        shortDescription: 'Multi-tiered theatrical lighting sculpture composed of textured artisan glass ribbons.',
        description: 'Designed as a centerpiece for grand residential salons and luxury ballrooms. Interlocking sheets of mouth-blown textured glass capture and refract light in spectacular crystalline waves.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: 'LH-6036 Italian Chandelier', isCover: true },
        ],
        specifications: {
          dimensions: 'Dia: 800mm, Fixture Height: 950mm, Drop: 4000mm max',
          material: 'Venetian Art Glass & Polished Nickel Chassis',
          finish: 'Transparent Champagne Infusion & Mirror Nickel',
          wattage: '12x 5W G9 LED (60W Total)',
          voltage: 'AC 100-240V',
          colorTemperature: '2800K Warm Ambient',
          ipRating: 'IP20 Indoor',
          installationType: 'Reinforced Ceiling Mount',
          beamAngle: 'Omnidirectional Multi-Layered',
          cri: 'Ra > 92',
          luminousFlux: '5400 Lumens',
        },
        isFeatured: true,
        isPublished: true,
        sortOrder: 1,
      },
      {
        name: 'LH-TR48 Recessed 48V Magnetic Architectural Track',
        slug: 'lh-tr48-magnetic-architectural-track',
        sku: 'LH-TR48',
        category: catMap['track-lights'],
        shortDescription: 'Flush trimless 48V magnetic architectural track system with hot-swappable linear and spot modules.',
        description: 'The pinnacle of contemporary architectural lighting design. The LH-TR48 embeds seamlessly into plasterboard ceilings to deliver a razor-sharp 25mm continuous reveal. Magnetic modules click firmly into position with zero tools required.',
        images: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: 'LH-TR48 Magnetic Track Profile', isCover: true },
        ],
        specifications: {
          dimensions: 'Track Lengths: 1000mm / 2000mm / 3000mm, Reveal: 25mm',
          material: 'Extruded Architectural Aluminum Profile',
          finish: 'Powder-Coated Architectural Matte Black / Architectural White',
          wattage: '48V DC Low Voltage Busbar (Modules 10W - 30W each)',
          voltage: '48V DC Safe Extra Low Voltage (SELV)',
          colorTemperature: '3000K / 4000K / DALI-2 Tunable White',
          ipRating: 'IP20 Indoor',
          installationType: 'Trimless Recessed / Surface / Suspended',
          beamAngle: 'Modular (15°, 24°, 36°, 110° Linear Diffuser)',
          cri: 'Ra > 95',
          luminousFlux: 'Up to 3000 Lumens/meter',
        },
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        isFeatured: true,
        isPublished: true,
        sortOrder: 0,
      },
      {
        name: 'LH-OD501 Bi-Directional IP65 Facade Grazer',
        slug: 'lh-od501-bi-directional-ip65-facade-grazer',
        sku: 'LH-OD501',
        category: catMap['outdoor-lighting'],
        shortDescription: 'Heavy-duty marine grade architectural exterior wall fixture with sharp optical grazing lenses.',
        description: 'Built to endure harsh atmospheric conditions including coastal salt spray and heavy rainfall. Its dual optical glass lenses produce narrow, razor-sharp columns of light that accentuate architectural stone, brickwork, and textured concrete facades.',
        images: [
          { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', alt: 'LH-OD501 Exterior Illumination', isCover: true },
        ],
        specifications: {
          dimensions: '220mm x 90mm x 90mm',
          material: 'Marine Grade Die-Cast Aluminum with AkzoNobel Powder Coating',
          finish: 'Textured Anthracite Grey / Sanded Bronze',
          wattage: '2x 10W High-Power Cree LED (20W Total)',
          voltage: 'AC 100-277V 50/60Hz Surge Protected (4kV)',
          colorTemperature: '3000K Architectural Amber',
          ipRating: 'IP65 Dust & Water Jet Proof / IK08 Impact Rated',
          installationType: 'Exterior Surface Wall Mount',
          beamAngle: '15° Narrow Architectural Graze',
          cri: 'Ra > 85',
          luminousFlux: '1800 Lumens',
        },
        isFeatured: true,
        isPublished: true,
        sortOrder: 0,
      },
    ];

    const createdProducts = await Product.insertMany(productsData);
    console.log(`[Seed] Created ${createdProducts.length} architectural lighting products.`);

    // 4. Seed Homepage Sections (Editable and Reorderable via Admin CMS)
    console.log('[Seed] Seeding homepage CMS sections...');
    const homepageSectionsData = [
      {
        sectionKey: 'hero',
        name: 'Hero Banner Section',
        title: 'Illuminating Architectural Masterpieces',
        subtitle: 'Decorative Solutions & Technical Precision',
        description: 'Pioneering contemporary architectural lighting fixtures, precision engineered wall luminaires, and bespoke statement chandeliers designed for world-class residential and commercial spaces.',
        images: [
          'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1920&q=85',
        ],
        buttonText: 'Explore Catalog',
        buttonLink: '/catalog',
        secondaryButtonText: 'Company Profile',
        secondaryButtonLink: '/about',
        isEnabled: true,
        order: 0,
        metadata: {
          badge: '2026 Architectural Catalog Edition',
          features: [
            'Die-Cast Aluminum Engineering',
            'Museum-Grade CRI > 95 Optics',
            'Bespoke Specifier Support',
          ],
        },
      },
      {
        sectionKey: 'categories',
        name: 'Curated Categories Showcase',
        title: 'Explore By Architectural Category',
        subtitle: 'Engineered For Every Space & Elevation',
        description: 'Navigate our comprehensive range of interior sconces, suspended pendants, sculptural task lamps, and exterior facade luminaires.',
        buttonText: 'View All Categories',
        buttonLink: '/catalog',
        isEnabled: true,
        order: 1,
      },
      {
        sectionKey: 'about',
        name: 'Company Profile & Craftsmanship',
        title: 'Precision Craftsmanship Meets Optical Mastery',
        subtitle: 'About LightHut Decorative Solutions',
        description: 'With decades of dedicated expertise in architectural illumination, LightHut manufactures and supplies premier lighting fixtures engineered for high-performance residential estates, boutique hotels, and landmark commercial pavilions. Our in-house engineering adheres to the highest standards of optical physics, thermal management, and timeless aesthetics.',
        images: [
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
        ],
        buttonText: 'Read Full Company Profile',
        buttonLink: '/about',
        isEnabled: true,
        order: 2,
        metadata: {
          experienceYears: '25+',
          projectsCompleted: '1,200+',
          specifiers: '850+',
          gstNumber: '07BSYPK8425N1ZP',
        },
      },
      {
        sectionKey: 'featured_products',
        name: 'Featured Luminaires Showcase',
        title: 'Curated Signature Fixtures',
        subtitle: 'Spotlight On Architectural Highlights',
        description: 'Hand-selected luminaires representing our highest echelon of optical engineering, material purity, and timeless form factor.',
        buttonText: 'Browse Full Catalog',
        buttonLink: '/catalog',
        isEnabled: true,
        order: 3,
      },
      {
        sectionKey: 'projects',
        name: 'Projects & Installation Showcase',
        title: 'Architectural Lighting In Practice',
        subtitle: 'Global Portfolios & Installed Excellence',
        description: 'From luxury seaside villas to prestigious hotel atriums, discover how our luminaires transform spatial aesthetics into immersive environments.',
        buttonText: 'View Portfolio',
        buttonLink: '/projects',
        isEnabled: true,
        order: 4,
        metadata: {
          portfolioItems: [
            {
              title: 'The Amanora Residence',
              location: 'New Delhi, India',
              category: 'Luxury Villa',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
            },
            {
              title: 'Meridian Atrium & Spa',
              location: 'Mumbai, India',
              category: 'Hospitality',
              image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
            },
            {
              title: 'Horizon Business Pavilion',
              location: 'Bengaluru, India',
              category: 'Commercial Headquarters',
              image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
            },
          ],
        },
      },
      {
        sectionKey: 'cta',
        name: 'Specification & Trade Inquiries CTA',
        title: 'Consult With An Architectural Lighting Specialist',
        subtitle: 'Tailored Luminaire Solutions For Your Project',
        description: 'Have a bespoke requirement or need comprehensive photometric spec sheets, IES files, or commercial volume pricing? Our engineering team is ready to assist.',
        buttonText: 'Request Technical Consultation',
        buttonLink: '/contact',
        secondaryButtonText: 'Download Complete Catalog PDF',
        secondaryButtonLink: '/catalog',
        isEnabled: true,
        order: 5,
      },
      {
        sectionKey: 'contact',
        name: 'Showroom & Contact Details',
        title: 'Showroom & Headquarters',
        subtitle: 'Experience Our Luminaires In Person',
        description: 'Visit our flagship architectural lighting experience center to inspect fixtures, evaluate color temperatures, and discuss custom engineering with our specialists.',
        buttonText: 'Send Direct Message',
        buttonLink: '/contact',
        isEnabled: true,
        order: 6,
      },
    ];

    await HomepageSection.insertMany(homepageSectionsData);
    console.log('[Seed] Created initial homepage CMS sections.');

    // 5. Seed Site Settings
    console.log('[Seed] Seeding site-wide settings...');
    await SiteSettings.create({
      companyName: 'LightHut Decorative Solutions',
      tagline: 'Architectural & Luxury Decorative Luminaires',
      logo: '',
      favicon: '/favicon.svg',
      email: 'info@lighthutcatalog.com',
      phone: '+91 8045811438',
      address: 'Plot No. 42, Industrial Area Phase II, Delhi, 110020, India',
      whatsapp: '+91 9811000000',
      socialLinks: {
        instagram: 'https://instagram.com/lighthut',
        facebook: 'https://facebook.com/lighthut',
        linkedin: 'https://linkedin.com/company/lighthut',
        pinterest: 'https://pinterest.com/lighthut',
      },
      footerContent: {
        copyrightText: '© 2026 LightHut Decorative Solutions. All Rights Reserved.',
        aboutText: 'Leading manufacturer and supplier of architectural wall lamps, custom pendant chandeliers, and high-performance luminaire systems across India and global destinations.',
        gstNumber: '07BSYPK8425N1ZP',
      },
      defaultSeoTitle: 'LightHut | Premium Architectural & Decorative Lighting Manufacturer',
      defaultSeoDescription: 'Discover precision architectural wall lights, statement pendants, designer table lamps, and custom luminaires at LightHut Decorative Solutions.',
    });
    console.log('[Seed] Site settings created.');

    console.log('[Seed] Complete catalog seeded successfully!');
    if (isStandalone) {
      await mongoose.connection.close();
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seed Error]:', error);
    if (isStandalone) process.exit(1);
    throw error;
  }
};

export const seedDatabase = seedAll;

const isDirectRun = process.argv[1] && (process.argv[1].endsWith('seedData.js') || process.argv[1].includes('seedData'));
if (isDirectRun) {
  seedAll(true);
}
