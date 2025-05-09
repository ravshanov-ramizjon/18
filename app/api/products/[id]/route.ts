import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

type Params = { params: { id: string } };

export async function DELETE(req: NextRequest, { params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, { params }: Params) {
  const id = parseInt(params.id);
  const data = await req.json();

  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

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
