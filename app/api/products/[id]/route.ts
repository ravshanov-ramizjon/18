import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE /api/products/[id]
export async function DELETE(
  req: Request,
  context: { params: Record<string, string> }
) {
  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

// PUT /api/products/[id]
export async function PUT(
  req: Request,
  context: { params: Record<string, string> }
) {
  const id = parseInt(context.params.id);
  const data = await req.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      images: data.images,
    },
  });

  return NextResponse.json(updatedProduct);
}
