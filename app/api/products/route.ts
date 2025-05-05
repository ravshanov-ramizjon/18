import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const product = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      images: data.image,
    },
  });

  return NextResponse.json(product);
}
