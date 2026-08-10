import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteButton from "@/components/transactions/DeleteButton";
import EditButton from "@/components/transactions/EditButton";

interface Transaction {
  id: number;
  amount: number;
  category: string;
  type: string;
  description?: string;
  date: Date;
}

export default function RecentTransactions({
  transactions = [],
}: {
  transactions?: Transaction[];
}) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b"
                  >
                    <td className="py-3">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>

                    <td>{transaction.category}</td>

                    <td>£{transaction.amount}</td>

                    <td>
                      <span
                        className={
                          transaction.type === "Income"
                            ? "text-green-600 font-medium"
                            : "text-red-600 font-medium"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td>
  <div className="flex gap-2">
    <EditButton transaction={transaction} />
    <DeleteButton id={transaction.id} />
  </div>
</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}