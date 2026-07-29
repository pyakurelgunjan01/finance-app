type Props = {
  title: string;
  amount: string;
  date: string;
};

export default function TransactionItem({
  title,
  amount,
  date,
}: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="font-bold">{amount}</p>
    </div>
  );
}