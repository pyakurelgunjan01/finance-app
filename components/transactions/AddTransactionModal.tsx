"use client";

import { useState } from "react";

type AddTransactionModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddTransactionModal({
  open,
  onClose,
}: AddTransactionModalProps) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSave() {
    if (!amount || !category || !date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          type,
          category,
          description,
          date,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save transaction");
      }

      alert("Transaction added successfully!");

      // Clear form
      setAmount("");
      setType("Expense");
      setCategory("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);

      onClose();

      // Refresh dashboard
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          Add Transaction
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border p-3"
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}