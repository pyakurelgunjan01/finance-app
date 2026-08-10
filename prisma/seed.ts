import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.createMany({
    data: [
      {
        category: "Salary",
        amount: 3000,
        type: "Income",
      },
      {
        category: "Food",
        amount: 40,
        type: "Expense",
      },
      {
        category: "Transport",
        amount: 25,
        type: "Expense",
      },
      {
        category: "Shopping",
        amount: 120,
        type: "Expense",
      },
    ],
  });

  console.log("Seed completed!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });