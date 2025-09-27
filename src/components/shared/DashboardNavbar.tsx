import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Bell } from "lucide-react"; // notification icon
import Image from "next/image";
import Link from "next/link";

export default async function DashboardNavbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="w-full">
      <div className="flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="text-3xl font-bold">
          Blog<span className="text-blue-500">Bites</span>
        </Link>

        {/* Right: Notification + User */}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Bell className="w-6 h-6 text-gray-700" />
          </button>

          {/* User Avatar */}
          {user ? (
            <Image
              src={user.picture ?? "/default-avatar.png"}
              alt={user.given_name ?? "User"}
              width={36}
              height={36}
              className="rounded-full border cursor-pointer"
            />
          ) : (
            <Link
              href="/api/auth/login"
              className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
