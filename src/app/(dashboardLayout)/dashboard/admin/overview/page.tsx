import AdminOverviewClient from "@/components/dashboard/adminPage/AdminOverviewClient";
import { adminService } from "@/services/admin.service";
import { orderService } from "@/services/order.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function AdminOverviewPage() {
  const { data: sessionData } = await userService.getSession();
  
  if (!sessionData?.user) redirect("/login");
  if (sessionData.user.role !== "ADMIN") redirect("/dashboard");

  const [{ data: users }, { data: orders }] = await Promise.all([
    adminService.getAllUsers(),
    orderService.getAllOrders(),
  ]);

  // Transform users for table
  const tableUsers = users?.map((user) => ({
    id: user.id || "",
    name: user.name || "",
    email: user.email || "",
    role: user.role || "",
    status: user.status || "",
  })) || [];

  // Calculate real stats from orders
  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((acc: number, o: { total?: number }) => acc + (o.total || 0), 0) || 0;
  const pendingOrders = orders?.filter((o: { status: string }) => o.status === "PENDING" || o.status === "PROCESSING").length || 0;

  const stats = {
    totalUsers: users?.length || 0,
    totalOrders,
    totalRevenue,
    totalProviders: users?.filter((u) => u.role === "PROVIDER").length || 0,
    activeUsers: users?.filter((u) => u.status === "ACTIVE").length || 0,
    pendingOrders,
  };

  return <AdminOverviewClient users={tableUsers} stats={stats} />;
}
