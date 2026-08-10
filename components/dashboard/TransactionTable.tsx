"use client";

type Transaction = {
  id: number;
  category: string;
  amount: number;
  type: string;
  description?: string | null;
  date: Date;
};

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  async function deleteTransaction(id: number) {
    const ok = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!ok) return;

    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete transaction.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="p-6 text-center text-slate-500"
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-3">
                  {transaction.category}
                </td>

                <td className="p-3">
                  {transaction.description || "-"}
                </td>

                <td className="p-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.type === "Income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td
                  className={`p-3 font-semibold ${
                    transaction.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}£
                  {transaction.amount}
                </td>

                <td className="p-3">
                  {new Date(
                    transaction.date
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteTransaction(transaction.id)
                      }
                      className="rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}