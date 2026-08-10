"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Transaction = {
  id: number;
  category: string;
  amount: number;
  type: string;
  description?: string | null;
  date: Date;
};

export default function EditTransactionDialog({
  transaction,
}: {
  transaction: Transaction;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState(transaction.category);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [type, setType] = useState(transaction.type);
  const [description, setDescription] = useState(
    transaction.description || ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/transactions/${transaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        amount,
        type,
        description,
        date: transaction.date,
      }),
    });

    if (res.ok) {
      setOpen(false);
      router.refresh();

      alert("Transaction updated successfully!");
    } else {
      alert("Failed to update transaction.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
        Edit
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded border p-2"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            className="w-full rounded border p-2"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="w-full rounded border p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          <textarea
            className="w-full rounded border p-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
          >
            Save Changes
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}