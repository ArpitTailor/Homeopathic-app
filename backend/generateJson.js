const fs = require('fs');

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

  // Add Cosmetics (Face Wash & Soap)
  const cosmetics = [
    { name: 'Neem & Aloe Vera Face Wash', form: 'Face Wash', category: 'Skin Care', price: 450 },
    { name: 'Tea Tree & Basil Face Wash', form: 'Face Wash', category: 'Skin Care', price: 499 },
    { name: 'Sandalwood & Turmeric Face Wash', form: 'Face Wash', category: 'Skin Care', price: 550 },
    { name: 'Calendula & Honey Soap', form: 'Soap', category: 'Skin Care', price: 150 },
    { name: 'Activated Charcoal Soap', form: 'Soap', category: 'Skin Care', price: 199 },
    { name: 'Berberis Aquifolium Clear Skin Soap', form: 'Soap', category: 'Skin Care', price: 180 }
  ];

  for (const c of cosmetics) {
    let slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    slug = `${slug}-${idCounter}`;
    
    let image = c.form === 'Face Wash' ? '/images/homeopathy_facewash.png' : '/images/homeopathy_soap.png';
    const rating = (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1);
    
    products.push({
      id: idCounter,
      name: c.name,
      slug,
      description: `Premium luxury ${c.form.toLowerCase()} infused with organic homeopathic ingredients. ${c.name} cleanses deeply, removing impurities while maintaining natural moisture balance. Free from harsh chemicals, parabens, and sulfates.`,
      price: c.price,
      category: c.category,
      stock: Math.floor(Math.random() * 100) + 20,
      image,
      rating: parseFloat(rating)
    });
    idCounter++;
  }

  for (const base of baseMedicines) {
    for (const potency of potencies) {
      for (const form of forms) {
        if (products.length >= 500) return products; // Stop exactly at 500

        const name = `${base} ${potency} ${form}`;
        
        let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        slug = `${slug}-${idCounter}`;

        const category = categories[base] || 'General Wellness';
        
        const price = Math.floor(Math.random() * (900 - 150 + 1)) + 150;
        const rating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
        const stock = Math.floor(Math.random() * 100) + 10;
        
        let image = '';
        if (form === 'Dilution') {
          image = '/images/homeopathy_dilution.png';
        } else if (form === 'Globules') {
          image = '/images/homeopathy_globules.png';
        } else if (form === 'Ointment') {
          image = '/images/homeopathy_ointment.png';
        } else {
          image = '/images/homeopathy_tablets.png';
        }

        const description = `Premium homeopathic formulation of ${name}. Highly effective for conditions related to ${category.toLowerCase()}. Manufactured using the finest grade organic ingredients according to traditional pharmacopeia standards. \n\nKey Ingredients: ${base}\nForm: ${form}\nPotency: ${potency}\n\nDirections for Use: Take as directed by a homeopathic physician. Keep out of reach of children. Store in a cool, dry place away from direct sunlight.`;

        products.push({
          id: idCounter,
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

const productsToSeed = generateProducts();
fs.writeFileSync('products.json', JSON.stringify(productsToSeed, null, 2));
console.log('Successfully generated products.json with 500 products.');
