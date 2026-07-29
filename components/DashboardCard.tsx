type Props = {
  title: string;
  amount: string;
};

export default function DashboardCard({ title, amount }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-gray-500">{title}</h2>
      <p className="mt-2 text-3xl font-bold">{amount}</p>
    </div>
  );
}