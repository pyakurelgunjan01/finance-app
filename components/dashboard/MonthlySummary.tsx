import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react";

interface Props {
  income?: number;
  expense?: number;
}

export default function MonthlySummary({
  income = 0,
  expense = 0,
}: Props) {
  const saved = income - expense;
  const savingsRate =
    income === 0 ? 0 : Math.round((saved / income) * 100);

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold">Monthly Summary</h2>
          <p className="text-sm text-muted-foreground">
            Your financial story for this month
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-green-700">
              <ArrowUpRight className="h-4 w-4" />
              <span className="text-sm font-medium">Earned</span>
            </div>
            <p className="text-2xl font-bold">£{income.toFixed(2)}</p>
          </div>

          <div className="rounded-lg bg-red-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-red-700">
              <ArrowDownRight className="h-4 w-4" />
              <span className="text-sm font-medium">Spent</span>
            </div>
            <p className="text-2xl font-bold">£{expense.toFixed(2)}</p>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-blue-700">
              <PiggyBank className="h-4 w-4" />
              <span className="text-sm font-medium">Saved</span>
            </div>
            <p className="text-2xl font-bold">£{saved.toFixed(2)}</p>
            <p className="mt-1 text-xs text-blue-600">
              {savingsRate}% savings rate
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">
            This month you earned{" "}
            <span className="font-semibold text-green-600">
              £{income.toFixed(2)}
            </span>{" "}
            and spent{" "}
            <span className="font-semibold text-red-600">
              £{expense.toFixed(2)}
            </span>
            , leaving you with{" "}
            <span className="font-semibold">£{saved.toFixed(2)}</span> in savings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}