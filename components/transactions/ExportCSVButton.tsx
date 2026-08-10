"use client";

import { saveAs } from "file-saver";

type Transaction = {
  category: string;
  description?: string | null;
  type: string;
  amount: number;
  date: Date;
};

export default function ExportCSVButton({
  transactions,
}: {
  transactions: Transaction[];
}) {
  function exportCSV() {
    const header =
      "Category,Description,Type,Amount,Date\n";

    const rows = transactions
      .map(
        (t) =>
          `${t.category},"${t.description ?? ""}",${t.type},${t.amount},${new Date(
            t.date
          ).toLocaleDateString()}`
      )
      .join("\n");

    const blob = new Blob([header + rows], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "transactions.csv");
  }

  return (
    <button
      onClick={exportCSV}
      className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
    >
      Export CSV
    </button>
  );
}