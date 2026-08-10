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

    // Total Income
    const income = incomeTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    // Total Expense
    const expense = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    // Balance
    const balance = income - expense;

    // Total Transactions
    const transactionCount = transactions.length;

    // Largest Expense
    const largestExpense =
      expenseTransactions.length > 0
        ? expenseTransactions.reduce((max, t) =>
            t.amount > max.amount ? t : max
          )
        : null;

    // Largest Income
    const largestIncome =
      incomeTransactions.length > 0
        ? incomeTransactions.reduce((max, t) =>
            t.amount > max.amount ? t : max
          )
        : null;

    // Average Expense
    const averageExpense =
      expenseTransactions.length > 0
        ? expense / expenseTransactions.length
        : 0;

    // Average Income
    const averageIncome =
      incomeTransactions.length > 0
        ? income / incomeTransactions.length
        : 0;

    // Savings Rate
    const savingsRate =
      income > 0 ? ((balance / income) * 100).toFixed(2) : 0;

    return NextResponse.json({
      balance,
      income,
      expense,
      transactionCount,
      averageIncome,
      averageExpense,
      savingsRate,
      largestIncome,
      largestExpense,
      transactions,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard analytics",
      },
      {
        status: 500,
      }
    );
  }
}