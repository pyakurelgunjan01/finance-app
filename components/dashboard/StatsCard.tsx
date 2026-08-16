import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const icons = {
  balance: Wallet,
  income: TrendingUp,
  expense: TrendingDown,
};

const descriptions = {
  balance: "Your current treasury",
  income: "This month's earnings",
  expense: "This month's spending",
};

interface Props {
  title: string;
  value: string;
  type: "balance" | "income" | "expense";
}

export default function StatsCard({
  title,
  value,
  type,
}: Props) {
  const Icon = icons[type];

  return (
    <Card className="border shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              {value}
            </h2>

            <p className="mt-2 text-xs text-muted-foreground">
              {descriptions[type]}
            </p>
          </div>

          <div className="rounded-full bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}