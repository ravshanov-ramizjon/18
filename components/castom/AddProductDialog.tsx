"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddProductDialog({
  onProductAdded,
}: {
  onProductAdded: (product: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAddProduct = () => {
    if (!name || !price || !image) return;

    const newProduct = {
      name,
      price: parseFloat(price),
      imageUrl: previewUrl,
    };

    onProductAdded(newProduct);

    setName("");
    setPrice("");
    setImage(null);
    setPreviewUrl(null);
    setOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 transition-colors">
          ➕ Добавить продукт
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl shadow-xl border bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Новый продукт
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Название</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Банан"
              className="focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Цена</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Например: 199"
              className="focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Изображение</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer file:text-sm file:font-medium"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Превью"
                className="mt-3 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleAddProduct}
              className="bg-green-600 hover:bg-green-700 transition-colors"
            >
              💾 Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
