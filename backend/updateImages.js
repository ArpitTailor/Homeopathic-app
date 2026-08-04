const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating images for all products...');

  // Dilutions
  const updateDilutions = await prisma.product.updateMany({
    where: { name: { contains: 'Dilution' } },
    data: { image: '/images/dilution.png' }
  });
  console.log(`Updated ${updateDilutions.count} dilutions.`);

  // Globules
  const updateGlobules = await prisma.product.updateMany({
    where: { name: { contains: 'Globules' } },
    data: { image: '/images/globules.png' }
  });
  console.log(`Updated ${updateGlobules.count} globules.`);

  // Tablets
  const updateTablets = await prisma.product.updateMany({
    where: { name: { contains: 'Tablets' } },
    data: { image: '/images/tablets.png' }
  });
  console.log(`Updated ${updateTablets.count} tablets.`);

  // Ointment
  const updateOintment = await prisma.product.updateMany({
    where: { name: { contains: 'Ointment' } },
    data: { image: '/images/ointment.png' }
  });
  console.log(`Updated ${updateOintment.count} ointments.`);

  console.log('Finished updating all images.');
}

main()
  .catch((e) => {
    console.error('Error updating products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
