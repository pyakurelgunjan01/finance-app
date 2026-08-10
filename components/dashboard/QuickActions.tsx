import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Plus,
  Minus,
  BarChart3,
} from "lucide-react";


export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Quick Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

        <Button className="w-full justify-start">
          <Plus className="mr-2 h-4 w-4" />
          Add Income
        </Button>


        <Button
          variant="outline"
          className="w-full justify-start"
        >
          <Minus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>


        <Button
          variant="outline"
          className="w-full justify-start"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          View Reports
        </Button>

      </CardContent>
    </Card>
  );
}