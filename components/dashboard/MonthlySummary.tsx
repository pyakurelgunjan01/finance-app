import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CalendarDays,
} from "lucide-react";


export default function MonthlySummary() {

  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Monthly Summary
        </CardTitle>
      </CardHeader>


      <CardContent>

        <div className="flex items-center gap-4">

          <div className="rounded-full bg-primary/10 p-3">

            <CalendarDays
              className="h-6 w-6 text-primary"
            />

          </div>


          <div>

            <p className="text-sm text-muted-foreground">
              This Month Spending
            </p>


            <h2 className="text-2xl font-bold">
              £1,250
            </h2>


          </div>

        </div>


      </CardContent>

    </Card>
  );
}