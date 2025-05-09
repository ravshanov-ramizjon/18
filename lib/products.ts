// lib/products.ts
import { prisma } from "@/lib/prisma"

export async function getProducts() {
  return prisma.product.findMany()
}
