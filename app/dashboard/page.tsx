import StatsCard from "@/components/dashboard/StatsCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import QuickActions from "@/components/dashboard/QuickActions";
import MonthlySummary from "@/components/dashboard/MonthlySummary";
import IncomeExpenseChart from "@/components/dashboard/IncomeExpenseChart";
import AddTransactionButton from "@/components/transactions/AddTransactionButton";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const income = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expense;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Balance"
          value={`£${balance.toFixed(2)}`}
          type="balance"
        />

        <StatsCard
          title="Income"
          value={`£${income.toFixed(2)}`}
          type="income"
        />

        <StatsCard
          title="Expenses"
          value={`£${expense.toFixed(2)}`}
          type="expense"
        />
      </div>

      <div className="mt-6">
        <MonthlySummary />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <BudgetProgress />
        <QuickActions />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <IncomeExpenseChart transactions={transactions} />
        <ExpenseChart transactions={transactions} />
      </div>

      <AddTransactionButton />

      <div className="mt-6">
        <RecentTransactions transactions={transactions} />
      </div>
    </>
  );
}