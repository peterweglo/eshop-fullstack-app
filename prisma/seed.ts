import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'White Sports Shoes',
      price: 50,
      description:
        'White sports shoes, perfect for running and outdoor activities.',
      image: 'WhiteSportsShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17257',
      name: 'Black Running Shoes',
      price: 48,
      description:
        'Black running shoes, comfortable and lightweight, perfect for long workouts.',
      image: 'BlackRunningShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Trekking Shoes',
      price: 60,
      description:
        'Trekking shoes, water-resistant and comfortable for long hikes.',
      image: 'TrekkingShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Basketball Shoes',
      price: 70,
      description:
        'Basketball shoes, providing excellent cushioning and ankle support.',
      image: 'BasketballShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      name: 'Brown Dress Shoes',
      price: 80,
      description: 'Brown dress shoes, suitable for formal and casual wear.',
      image: 'BrownDressShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      name: 'Winter Boots',
      price: 90,
      description:
        'Winter boots, insulated and slip-resistant, perfect for snowy days.',
      image: 'WinterBoots.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      name: 'Trail Running Shoes',
      price: 55,
      description:
        'Trail running shoes, with extra joint support for uneven terrain.',
      image: 'TrailRunningShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17263',
      name: 'Skateboarding Shoes',
      price: 65,
      description: 'Skateboarding shoes, durable and stable on the board.',
      image: 'SkateboardingShoes.jpg',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map(async (product) => {
      try {
        await db.product.upsert({
          where: { id: product.id },
          update: product,
          create: product,
        });
      } catch (error) {
        console.error('Error', error);
      }
    }),
  );
}
seed();
