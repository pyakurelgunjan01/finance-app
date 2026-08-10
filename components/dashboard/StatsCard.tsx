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
    <Card className="shadow-sm">

      <CardContent className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-muted-foreground">
              {title}
            </p>


            <h2 className="mt-2 text-3xl font-bold">
              {value}
            </h2>

          </div>


          <div className="rounded-full bg-primary/10 p-3">

            <Icon
              className="h-6 w-6 text-primary"
            />

          </div>


        </div>

      </CardContent>

    </Card>
  );
}