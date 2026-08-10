"use client";

import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";

export default function AddTransactionButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        + Add Transaction
      </button>

      <AddTransactionModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}