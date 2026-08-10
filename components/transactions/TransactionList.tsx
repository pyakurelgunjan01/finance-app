"use client";

import { useState } from "react";
import TransactionsTable from "./TransactionsTable";
import TransactionSummary from "./TransactionSummary";
import ExportCSVButton from "./ExportCSVButton";
type Transaction = {
  id: number;
  category: string;
  amount: number;
  type: string;
  description?: string | null;
  date: Date;
};

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const categories = [
    "All",
    ...new Set(transactions.map((t) => t.category)),
  ];

  function matchesDate(date: Date) {
    if (dateFilter === "All") return true;

    const transactionDate = new Date(date);
    const now = new Date();

    if (dateFilter === "Today") {
      return (
        transactionDate.toDateString() === now.toDateString()
      );
    }

    if (dateFilter === "This Week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return transactionDate >= weekAgo;
    }

    if (dateFilter === "This Month") {
      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
      );
    }

    if (dateFilter === "This Year") {
      return (
        transactionDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      transaction.category.toLowerCase().includes(keyword) ||
      transaction.type.toLowerCase().includes(keyword) ||
      (transaction.description ?? "")
        .toLowerCase()
        .includes(keyword);

    const matchesFilter =
      filter === "All" || transaction.type === filter;

    const matchesCategory =
      category === "All" ||
      transaction.category === category;

    return (
      matchesSearch &&
      matchesFilter &&
      matchesCategory &&
      matchesDate(transaction.date)
    );
  });

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => {
      switch (sortBy) {
        case "Newest":
          return (
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
          );

        case "Oldest":
          return (
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
          );

        case "Highest":
          return b.amount - a.amount;

        case "Lowest":
          return a.amount - b.amount;

        case "A-Z":
          return a.category.localeCompare(b.category);

        case "Z-A":
          return b.category.localeCompare(a.category);

        default:
          return 0;
      }
    }
  );

  return (
    <>
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Summary */}
      <TransactionSummary
        transactions={sortedTransactions}
      />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border p-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Date */}
        <select
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value)
          }
          className="rounded-lg border p-2"
        >
          <option>All</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border p-2"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Highest</option>
          <option>Lowest</option>
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>

      {/* Type Filter */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setFilter("All")}
          className={`rounded-lg px-4 py-2 ${
            filter === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Income")}
          className={`rounded-lg px-4 py-2 ${
            filter === "Income"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Income
        </button>

        <button
          onClick={() => setFilter("Expense")}
          className={`rounded-lg px-4 py-2 ${
            filter === "Expense"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Expense
        </button>
      </div>
<div className="mb-4 flex justify-end">
  <ExportCSVButton
    transactions={sortedTransactions}
  />
</div>
      {/* Table */}
      <TransactionsTable
        transactions={sortedTransactions}
      />
    </>
  );
}