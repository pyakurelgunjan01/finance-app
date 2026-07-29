import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <Navbar />

      <section className="p-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <DashboardCard
            title="Total Balance"
            amount="£50,000"
          />

          <DashboardCard
            title="Income"
            amount="£80,000"
          />

          <DashboardCard
            title="Expenses"
            amount="£30,000"
          />

        </div>

      </section>

    </main>
  );
}
import TransactionItem from "../components/TransactionItem";