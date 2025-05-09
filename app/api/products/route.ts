import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, price, images, description } = await req.json();

    // Проверка входных данных
    if (!name || !price || !description || !Array.isArray(images)) {
      return new NextResponse("Invalid input data", { status: 400 });
    }

    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(parsedPrice)) {
      return new NextResponse("Invalid price value", { status: 400 });
    }

    // Создание продукта
    const product = await prisma.product.create({
      data: {
        name,
        price: parsedPrice,
        description,
        images,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка при создании продукта:", error.message, error.stack);
    } else {
      console.error("Ошибка при создании продукта:", error);
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
