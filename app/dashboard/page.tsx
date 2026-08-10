import StatsCard from "@/components/dashboard/StatsCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import QuickActions from "@/components/dashboard/QuickActions";
import MonthlySummary from "@/components/dashboard/MonthlySummary";
import IncomeExpenseChart from "@/components/dashboard/IncomeExpenseChart";
import AddTransactionButton from "@/components/transactions/AddTransactionButton";

export default async function DashboardPage() {
const res = await fetch("http://localhost:3000/api/dashboard", {
  cache: "no-store",
});

  if (!res.ok) {
    throw new Error("Failed to load dashboard");
  }

  const data = await res.json();

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Balance"
          value={`£${data.balance}`}
          type="balance"
        />

        <StatsCard
          title="Income"
          value={`£${data.income}`}
          type="income"
        />

        <StatsCard
          title="Expenses"
          value={`£${data.expense}`}
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
        <IncomeExpenseChart transactions={data.transactions} />
        <ExpenseChart transactions={data.transactions} />
      </div>




      <AddTransactionButton />




      <div className="mt-6">
        <RecentTransactions transactions={data.transactions} />
      </div>
    </>
    
  );
}