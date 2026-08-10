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
} from "recharts";


interface Transaction {
  id: number;
  date: string;
  category: string;
  amount: number;
  type: string;
}


export default function ExpenseChart({
  transactions = [],
}: {
  transactions?: Transaction[];
}) {


  const expenseData = transactions
    .filter(
      (item) => item.type === "Expense"
    )
    .map((item) => ({
      name: item.category,
      amount: item.amount,
    }));


  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Expense Overview
        </CardTitle>

      </CardHeader>


      <CardContent>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={expenseData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />


            <Bar
              dataKey="amount"
            />

          </BarChart>


        </ResponsiveContainer>


      </CardContent>

    </Card>

  );
}