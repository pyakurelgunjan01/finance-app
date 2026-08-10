type Transaction = {
  id: number;
  amount: number;
  type: String;
};

export default function TransactionSummary({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border bg-green-50 p-5 shadow">
        <h2 className="text-sm text-gray-500">
          Total Income
        </h2>

        <p className="mt-2 text-3xl font-bold text-green-600">
          £{income}
        </p>
      </div>

      <div className="rounded-xl border bg-red-50 p-5 shadow">
        <h2 className="text-sm text-gray-500">
          Total Expense
        </h2>

        <p className="mt-2 text-3xl font-bold text-red-600">
          £{expense}
        </p>
      </div>

      <div className="rounded-xl border bg-blue-50 p-5 shadow">
        <h2 className="text-sm text-gray-500">
          Total Transactions
        </h2>

        <p className="mt-2 text-3xl font-bold text-blue-600">
          {transactions.length}
        </p>
      </div>
    </div>
  );
}