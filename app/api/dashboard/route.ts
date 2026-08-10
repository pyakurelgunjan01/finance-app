import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        date: "desc",
      },
    });

    const incomeTransactions = transactions.filter(
      (t) => t.type === "Income"
    );

    const expenseTransactions = transactions.filter(
      (t) => t.type === "Expense"
    );

    const income = incomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const expense = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const balance = income - expense;

    const transactionCount = transactions.length;

    return NextResponse.json({
      balance,
      income,
      expense,
      transactionCount,
      transactions,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    return NextResponse.json(
      { error: "Failed to load dashboard analytics" },
      { status: 500 }
    );
  }
}