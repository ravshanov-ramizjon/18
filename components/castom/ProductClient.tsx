// components/ProductClient.tsx
"use client";

import { useState } from "react";
import AddProductDialog  from "./AddProductDialog";

export default function ProductClient({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div>
      <AddProductDialog onProductCreated={(product) => setProducts([...products, product])} />
    </div>
  );
}
