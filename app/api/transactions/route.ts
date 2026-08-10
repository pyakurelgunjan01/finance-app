import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("GET transactions error:", error);

    return NextResponse.json(
      { error: "Failed to load transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Creating transaction:", body);

    const transaction = await prisma.transaction.create({
      data: {
        amount: Number(body.amount),
        category: body.category,
        type: body.type,
        description: body.description || null,
        date: new Date(body.date),
      },
    });

    return NextResponse.json(transaction, {
      status: 201,
    });
  } catch (error) {
    console.error("POST transactions error:", error);

    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}