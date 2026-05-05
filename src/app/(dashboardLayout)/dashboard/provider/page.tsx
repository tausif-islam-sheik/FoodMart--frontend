import ProviderDashboardClient from "@/components/dashboard/providerDashboard/ProviderDashboardClient";
import { providerService } from "@/services/provider.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

const ProviderDashboardPage = async () => {
  const { data: sessionData } = await userService.getSession();
  const user = sessionData?.user;

  if (!user) redirect("/login");
  if (user.role !== "PROVIDER") redirect("/dashboard");

  // Fetch provider's orders
  const response = await providerService.getProviderOrders();
  const ordersData = response.data;
  
  const orders = ordersData 
    ? ordersData.map((order: { id: string; customer?: { name?: string }; items?: { meal?: { name?: string } }[]; total?: number; status: string; createdAt: string }) => ({
        id: order.id,
        customerName: order.customer?.name || "Unknown",
        items: order.items?.map((i) => i.meal?.name).join(", ") || "-",
        total: order.total || 0,
        status: order.status,
        date: new Date(order.createdAt).toLocaleDateString(),
      }))
    : [];

  return (
    <ProviderDashboardClient 
      user={{ name: user.name, email: user.email }}
      orders={orders}
    />
  );
};

export default ProviderDashboardPage;