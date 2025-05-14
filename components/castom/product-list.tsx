"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { Label } from "../ui/label";
import ProductCard from "./ProductCard"; // отдельный компонент карточки

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
};

export default function ProductList({ products: formattedProducts }: { products: Product[] }) {
  const [products, setProducts] = useState<Product[]>(formattedProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});

  const deleteProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = async (id: string) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProduct),
    });
    setProducts(products.map((p) => (p.id === id ? { ...p, ...editedProduct } : p)));
    setEditingId(null);
    setEditedProduct({});
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product) =>
        editingId === product.id ? (
          <div
            key={product.id}
            className="bg-white dark:bg-muted rounded-xl shadow-lg p-4 border space-y-4"
          >
            <Input
              placeholder="Название"
              defaultValue={product.name}
              onChange={(e) => setEditedProduct((prev) => ({ ...prev, name: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Цена"
              defaultValue={product.price}
              onChange={(e) => setEditedProduct((prev) => ({ ...prev, price: +e.target.value }))}
            />
            <Input
              placeholder="Описание"
              defaultValue={product.description}
              onChange={(e) =>
                setEditedProduct((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <Label>Изображение</Label>
            <UploadButton
              className="w-full bg-gray-500"
              endpoint="productImage"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  setEditedProduct((prev) => ({ ...prev, images: [res[0].url] }));
                }
              }}
              onUploadError={(error) => {
                console.error("Ошибка загрузки:", error);
                alert("Ошибка при загрузке изображения");
              }}
            />
            {editedProduct.images?.[0] && (
              <img
                src={editedProduct.images[0]}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border mt-2"
              />
            )}
            <Button onClick={() => updateProduct(product.id)} className="w-full">
              💾 Сохранить
            </Button>
          </div>
        ) : (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => {
              setEditingId(product.id);
              setEditedProduct(product);
            }}
            onDelete={() => deleteProduct(product.id)}
          />
        )
      )}
    </div>
  );
}
