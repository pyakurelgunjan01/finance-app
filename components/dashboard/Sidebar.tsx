import Link from "next/link";
import {
  Home,
  Wallet,
  Receipt,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r bg-white">
      <div className="p-6 text-2xl font-bold">
        💰 The Royal Ledger
      </div>

      <nav className="space-y-2 px-4">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          href="/transactions"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Receipt size={18} />
          Transactions
        </Link>

        <Link
          href="/income"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Wallet size={18} />
          Income
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>
    </aside>
  );
}