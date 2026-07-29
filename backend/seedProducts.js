const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const baseMedicines = [
  'Arnica Montana', 'Nux Vomica', 'Bryonia Alba', 'Pulsatilla', 'Rhus Tox',
  'Arsenicum Album', 'Aconitum Napellus', 'Belladonna', 'Calcarea Carbonica', 'Ignatia Amara',
  'Lycopodium', 'Natrum Muriaticum', 'Sepia', 'Sulphur', 'Thuja Occidentalis',
  'Gelsemium', 'Ruta Graveolens', 'Calendula Officinalis', 'Apis Mellifica', 'Hypericum Perforatum',
  'Ledum Palustre', 'Symphytum Officinale', 'Chamomilla', 'Silicea', 'Phosphorus',
  'Hepar Sulphuris', 'Spongia Tosta', 'Drosera', 'Allium Cepa', 'Euphrasia',
  'Berberis Vulgaris', 'Cantharis', 'Sarsaparilla', 'Chelidonium Majus', 'Carduus Marianus'
];

const potencies = ['6CH', '30CH', '200CH', '1M', '10M', 'Q (Mother Tincture)', '3X', '6X', '12X'];
const forms = ['Dilution', 'Globules', 'Tablets', 'Ointment'];

const categories = {
  'Arnica Montana': 'Pain Relief',
  'Rhus Tox': 'Pain Relief',
  'Ruta Graveolens': 'Pain Relief',
  'Symphytum Officinale': 'Pain Relief',
  'Nux Vomica': 'Digestive Health',
  'Lycopodium': 'Digestive Health',
  'Pulsatilla': 'Cold & Cough',
  'Bryonia Alba': 'Cold & Cough',
  'Aconitum Napellus': 'Cold & Cough',
  'Spongia Tosta': 'Cold & Cough',
  'Drosera': 'Cold & Cough',
  'Calendula Officinalis': 'Skin Care',
  'Thuja Occidentalis': 'Skin Care',
  'Sulphur': 'Skin Care',
  'Berberis Vulgaris': 'General Wellness',
  'Chelidonium Majus': 'Digestive Health',
};

function generateProducts() {
  const products = [];
  let idCounter = 1;

  for (const base of baseMedicines) {
    for (const potency of potencies) {
      for (const form of forms) {
        if (products.length >= 500) return products; // Stop exactly at 500

        const name = `${base} ${potency} ${form}`;
        
        // Slug generation
        let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        // Append unique identifier to ensure strict uniqueness
        slug = `${slug}-${idCounter}`;

        const category = categories[base] || 'General Wellness';
        
        const price = Math.floor(Math.random() * (900 - 150 + 1)) + 150; // Random price between 150 and 900
        const rating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1); // 3.5 to 5.0
        const stock = Math.floor(Math.random() * 100) + 10;
        
        // Create a styled placeholder URL (Dark green bg, gold text)
        const encodedText = encodeURIComponent(base.split(' ')[0] + '\n' + potency);
        const image = `https://placehold.co/400x600/122a1f/d4af37?text=${encodedText}`;

        const description = `Premium homeopathic formulation of ${name}. Highly effective for conditions related to ${category.toLowerCase()}. Manufactured using the finest grade organic ingredients according to traditional pharmacopeia standards. \n\nKey Ingredients: ${base}\nForm: ${form}\nPotency: ${potency}\n\nDirections for Use: Take as directed by a homeopathic physician. Keep out of reach of children. Store in a cool, dry place away from direct sunlight.`;

        products.push({
          name,
          slug,
          description,
          price,
          category,
          stock,
          image,
          rating: parseFloat(rating)
        });

        idCounter++;
      }
    }
  }
  return products;
}

async function main() {
  console.log('Generating 500 products...');
  const productsToSeed = generateProducts();

  console.log(`Clearing existing products...`);
  await prisma.product.deleteMany({}); // Optional: clear existing to avoid dupes

  console.log(`Inserting ${productsToSeed.length} products...`);
  
  // Bulk insert using createMany
  const result = await prisma.product.createMany({
    data: productsToSeed,
    skipDuplicates: true,
  });

  console.log(`Successfully seeded ${result.count} products!`);
}

main()
  .catch((e) => {
    console.error('Error seeding products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
