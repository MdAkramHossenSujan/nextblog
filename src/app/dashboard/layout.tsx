import DashboardApp from "@/components/dashBoardClient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata = { title: "Dashboard" };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authed = await isAuthenticated();
  const user = authed ? await getUser() : null;

  return <DashboardApp user={user}>
    {children}
    </DashboardApp>;
}