import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Bell className="h-5 w-5 cursor-pointer" />

        <Avatar>
          <AvatarFallback>GP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}