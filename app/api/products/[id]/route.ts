import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      category: body.category,
      price: parseFloat(body.price),
      description: body.description ?? "",
      image: body.image,
      sizes: body.sizes,
      stock: !!body.stock,
      tag: body.tag || null,
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  await prisma.product.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ ok: true });
}
