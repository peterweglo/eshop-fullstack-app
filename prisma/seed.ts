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
      longDescription:
        'Designed for both professional athletes and casual joggers, these shoes offer optimal comfort and performance in any outdoor conditions. The lightweight design and responsive cushioning help improve running efficiency while ensuring foot protection and comfort.',
      image: 'WhiteSportsShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17257',
      name: 'Black Running Shoes',
      price: 48,
      description:
        'Black running shoes, comfortable and lightweight, perfect for long workouts.',
      longDescription:
        'Featuring advanced cushioning technology, these running shoes reduce impact stress, supporting extended workout sessions and minimizing fatigue. The breathable mesh upper keeps feet cool and dry during intense exercise.',
      image: 'BlackRunningShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Trekking Shoes',
      price: 60,
      description:
        'Trekking shoes, water-resistant and comfortable for long hikes.',
      longDescription:
        'Built for durability and performance in rugged conditions, these trekking shoes offer excellent water resistance and superior grip. The supportive design ensures comfort during long hikes, while robust construction protects against rough terrain.',
      image: 'TrekkingShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Basketball Shoes',
      price: 70,
      description:
        'Basketball shoes, providing excellent cushioning and ankle support.',
      longDescription:
        'These basketball shoes are designed to maximize performance on the court, offering enhanced cushioning, excellent ankle support, and superior traction. The dynamic fit and responsive sole provide agility and speed during play.',
      image: 'BasketballShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      name: 'Brown Dress Shoes',
      price: 80,
      description: 'Brown dress shoes, suitable for formal and casual wear.',
      longDescription:
        'Crafted from high-quality leather, these brown dress shoes offer a perfect blend of style and comfort. Ideal for both formal events and everyday office wear, they feature a classic design with modern comfort enhancements.',
      image: 'BrownDressShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      name: 'Winter Boots',
      price: 90,
      description:
        'Winter boots, insulated and slip-resistant, perfect for snowy days.',
      longDescription:
        'Keep your feet warm and dry with these insulated winter boots, designed for comfort and durability in cold weather. The slip-resistant soles provide safe traction on ice and snow, making them ideal for winter adventures.',
      image: 'WinterBoots.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      name: 'Trail Running Shoes',
      price: 55,
      description:
        'Trail running shoes, with extra joint support for uneven terrain.',
      longDescription:
        'Specifically designed for trail running, these shoes feature enhanced joint support and rugged soles for uneven terrain. The lightweight construction and protective design ensure comfort and safety during off-road runs.',
      image: 'TrailRunningShoes.jpg',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17263',
      name: 'Skateboarding Shoes',
      price: 65,
      description: 'Skateboarding shoes, durable and stable on the board.',
      longDescription:
        'Optimized for skateboarding, these shoes provide exceptional board feel, grip, and durability, making them a top choice for skateboarders of all levels. The robust design withstands the rigors of skateboarding, enhancing performance and style.',
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
