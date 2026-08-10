"use client";

import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({
  id,
}: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete transaction");
      }

      alert("Transaction deleted successfully!");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete transaction.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600"
    >
      Delete
    </button>
  );
}