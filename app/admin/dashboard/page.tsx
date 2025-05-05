import { prisma } from "@/lib/prisma";
import ProductList from "@/components/castom/product-list";
import ProductClient from "@/components/castom/ProductClient";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  const formattedProducts = products.map((product) => ({
    ...product,
    id: product.id.toString(),
    image: product.images,
    description: product.description ?? "",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-200 p-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          🛒 Наши Продукты
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Откройте для себя нашу коллекцию товаров. Мы предлагаем только лучшие продукты.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-12 flex justify-end">
        <ProductClient initialProducts={formattedProducts} />
      </div>

      <div>
        <ProductList products={formattedProducts} />
      </div>
    </div>
  );
}
