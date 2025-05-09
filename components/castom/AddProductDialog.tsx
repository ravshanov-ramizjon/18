"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductDialog({
  onProductCreated,
}: {
  onProductCreated: (product: any) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !description || !price || !imageUrl) {
      alert("Заполните все поля");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          images: [imageUrl],
        }),
      });

      if (!res.ok) throw new Error("Ошибка при создании продукта");

      const product = await res.json();
      onProductCreated(product);

      setName("");
      setDescription("");
      setPrice("");
      setImageUrl(null);

      window.location.reload();
    } catch (err) {
      alert("Не удалось сохранить продукт");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setDescription(e.target.value);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Добавить продукт</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить продукт</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Название</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название продукта"
            />
          </div>

          <div className="space-y-2">
            <Label>Описание</Label>
            <Textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Введите описание продукта"
              maxLength={500}
              rows={4}
              className="resize-none"
            />
            <div className="text-sm text-right">
              <span
                className={description.length >= 480 ? "text-red-500" : "text-muted-foreground"}
              >
                {description.length}/500
              </span>
            </div>
            {description.length === 500 && (
              <div className="text-red-500 text-sm mt-1">Лимит символов достигнут!</div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Цена</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Введите цену"
            />
          </div>

          <div className="space-y-2">
            <Label>Изображение</Label>
            <UploadButton
              className="w-full bg-gray-500"
              endpoint="productImage"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  setImageUrl(res[0].url);
                }
              }}
              onUploadError={(error) => {
                console.error("Ошибка загрузки:", error);
                alert("Ошибка при загрузке изображения");
              }}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Превью"
                className="w-full rounded-md shadow mt-2"
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddProduct}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Загрузка..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
