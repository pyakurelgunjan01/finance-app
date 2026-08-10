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

export default function AddTransactionDialog() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        amount,
        type,
        description,
        date: new Date(),
      }),
    });

    if (res.ok) {
      setOpen(false);
      router.refresh();

      setCategory("");
      setAmount("");
      setDescription("");
      setType("Expense");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        + Add Transaction
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
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
            Save Transaction
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}