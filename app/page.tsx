import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Finance App
        </h1>

        <Link
          href="/dashboard"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}