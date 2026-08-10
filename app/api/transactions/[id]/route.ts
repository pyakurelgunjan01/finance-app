import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const transaction = await prisma.transaction.update({
      where: {
        id: Number(id),
      },
      data: {
        amount: Number(body.amount),
        category: body.category,
        type: body.type,
        description: body.description || null,
        date: new Date(body.date),
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("PUT transaction error:", error);

    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    await prisma.transaction.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("DELETE transaction error:", error);

    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}