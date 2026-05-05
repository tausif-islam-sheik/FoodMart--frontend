import Sidebar from "@/components/dashboard/Sidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={user?.role} />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardNavbar 
          user={{
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }} 
        />
        <main className="flex-1 p-4 md:p-6 pt-4 md:pt-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}