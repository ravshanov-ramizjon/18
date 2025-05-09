"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
};

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const hasMultiple = product.images.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasMultiple, product.images.length]);

  const imageUrl =
    product.images[currentImage] ||
    "https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-14.jpg";

  return (
    <div className="bg-white dark:bg-muted rounded-xl shadow-lg p-4 border hover:shadow-xl transition-shadow flex flex-col justify-between group">
      <div className="flex flex-col h-[550px] items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">${product.price}</p>
          <p className="text-sm text-muted-foreground">
            {product.description?.split(" ").slice(0, 10).join(" ") +
              (product.description?.split(" ").length > 10 ? "..." : "")}
          </p>
        </div>

        <div className="relative w-full h-full overflow-hidden rounded-lg mb-2">
          <Image
            src={imageUrl}
            alt={product.name}
            width={500}
            height={500}
            unoptimized
            loading="lazy"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="icon" onClick={onEdit}>
            <FaEdit />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  );
}