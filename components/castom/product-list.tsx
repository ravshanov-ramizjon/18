"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaTrash, FaEdit } from "react-icons/fa";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
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
      {products.map((product) => {
        const isEditing = editingId === product.id;
        const imageUrl = Array.isArray(product.image) ? product.image[0] : "";

        return (
          <div
            key={product.id}
            className="bg-white dark:bg-muted rounded-xl shadow-lg p-4 border hover:shadow-xl transition-shadow flex flex-col justify-between group"
          >
            {isEditing ? (
              <div className="space-y-4">
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
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setEditedProduct((prev) => ({ ...prev, image: [url] }));
                    }
                  }}
                />
                {editedProduct.image && (
                  <img
                    src={editedProduct.image[0]}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                )}
                <Button onClick={() => updateProduct(product.id)} className="w-full">
                  💾 Сохранить
                </Button>
              </div>
            ) : (
              <div className="flex flex-col h-[550px] items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">${product.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.description.split(" ").slice(0, 10).join(" ") +
                      (product.description.split(" ").length > 10 ? "..." : "")}
                  </p>
                </div>

                <div className="relative w-full h-full overflow-hidden rounded-lg mb-2">
                  <Image
                    src={
                      imageUrl ||
                      "https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-14.jpg"
                    }
                    alt={product.name}
                    width={500}
                    height={500}
                    unoptimized
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingId(product.id);
                      setEditedProduct(product);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
