"use client";

import { useState } from "react";
import EditTransactionModal from "./EditTransactionModal";

type Transaction = {
  id: number;
  amount: number;
  category: string;
  type: string;
  description: string | null;
  date: Date;
};

type EditButtonProps = {
  transaction: Transaction;
};

export default function EditButton({
  transaction,
}: EditButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-white hover:bg-yellow-600"
      >
        Edit
      </button>

      <EditTransactionModal
        open={open}
        onClose={() => setOpen(false)}
        transaction={transaction}
      />
    </>
  );
}