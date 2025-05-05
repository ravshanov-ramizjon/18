import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/components/ui/card'
import Image from 'next/image'

export default async function Home() {
  const products = await prisma.product.findMany()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 font-sans">
        🛍️ Product Showcase
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <Card key={product.id} className="cursor-pointer h-[550px] border-none shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">{product.name}</CardTitle>
              <CardAction>{product.price}$</CardAction>
              <CardDescription className="text-sm text-gray-500">
                <p className="text-sm text-gray-600">
                  {product.description
                    ? product.description.split(' ').slice(0, 8).join(' ') + '...'
                    : 'No description available.'}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={500}
                  height={100}
                  unoptimized
                  loading="lazy"
                  className="w-full max-h-100 h-full object-cover rounded-md mb-4"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}