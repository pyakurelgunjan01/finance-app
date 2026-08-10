import { prisma } from "@/lib/prisma";
import AddTransactionDialog from "@/components/transactions/AddTransactionDialog";
import TransactionList from "@/components/transactions/TransactionList";

export default async function TransactionsPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-muted-foreground">
            Manage your income and expenses.
          </p>
        </div>

        <AddTransactionDialog />
      </div>

      <TransactionList transactions={transactions} />
    </div>
  );
}