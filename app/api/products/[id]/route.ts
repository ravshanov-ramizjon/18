import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Встроенный тип для контекста
interface RouteContext {
  params: { id: string };
}

export async function DELETE(
  req: Request,
  context: RouteContext
) {
  const id = parseInt(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  context: RouteContext
) {
  const id = parseInt(context.params.id);
  const data = await req.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedProduct);
}
