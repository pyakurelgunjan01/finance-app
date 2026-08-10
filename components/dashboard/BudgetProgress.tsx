import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const budgets = [
  {
    name: "Food",
    used: 800,
    total: 1000,
  },
  {
    name: "Transport",
    used: 300,
    total: 600,
  },
  {
    name: "Shopping",
    used: 450,
    total: 900,
  },
];

export default function BudgetProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {budgets.map((item) => {
          const percent = (item.used / item.total) * 100;

          return (
            <div key={item.name}>
              <div className="mb-2 flex justify-between">
                <span>{item.name}</span>

                <span>
                  £{item.used} / £{item.total}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}