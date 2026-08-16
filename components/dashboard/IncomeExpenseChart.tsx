"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


interface Transaction {
  id: number;
  date: Date;
  category: string;
  amount: number;
  type: string;
}


export default function IncomeExpenseChart({
  transactions = [],
}: {
  transactions?: Transaction[];
}) {


  const income = transactions
    .filter(
      (item) => item.type === "Income"
    )
    .reduce(
      (sum, item) => sum + item.amount,
      0
    );


  const expense = transactions
    .filter(
      (item) => item.type === "Expense"
    )
    .reduce(
      (sum, item) => sum + item.amount,
      0
    );


  const chartData = [
    {
      name: "This Month",
      Income: income,
      Expense: expense,
    },
  ];


  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Income vs Expense
        </CardTitle>

      </CardHeader>


      <CardContent>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />


            <Bar
              dataKey="Income"
            />


            <Bar
              dataKey="Expense"
            />


          </BarChart>


        </ResponsiveContainer>


      </CardContent>


    </Card>

  );
}