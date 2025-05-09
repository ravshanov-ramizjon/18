import { PrismaClient, Prisma } from '../lib/generated/prisma'

const prisma = new PrismaClient()

const productData: Prisma.ProductCreateInput[] = [
  {
    name: 'Apple',
    images: [
      'https://images.unsplash.com/photo-1584306670957-acf935f5033c?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'A sweet red fruit that is often eaten raw or used in desserts. Apples are a good source of fiber and vitamin C. They are also low in calories and can help with weight management.',
    price: 10.99,
  },
  {
    name: 'Banana',
    images: [
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe. Bananas are a good source of potassium and vitamin C. They are also low in calories and can help with digestion.',
    price: 5.99,
  },
  {
    name: 'Orange',
    images: [
      'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'A round citrus fruit with a tough bright reddish-yellow rind and juicy sweet flesh. Oranges are a good source of vitamin C and fiber. They are also low in calories and can help with hydration.',
    price: 7.99,
  },
  {
    name: 'Grapes',
    images: [
      'https://images.unsplash.com/photo-1603186741833-4a7cf699a8eb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'Small round fruit that grows in clusters on vines. Grapes can be eaten raw or used to make wine, juice, and raisins. They are a good source of antioxidants and vitamins.',
    price: 12.99,
  },
  {
    name: 'Pineapple',
    images: [
      'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'A tropical fruit with a tough spiky exterior and sweet juicy flesh. Pineapples are a good source of vitamin C and manganese. They are also low in calories and can help with digestion.',
    price: 15.99,
  },
]

export async function main() {
  for (const p of productData) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {
        description: p.description,
        price: p.price,
        images: p.images,
      },
      create: p,
    })
  }
}

main()
  .then(() => console.log('Seeding complete!'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
