import CustomerDashboardClient from "@/components/dashboard/customerPage/CustomerDashboardClient";
import { userService } from "@/services/user.service";
import { orderService } from "@/services/order.service";
import { redirect } from "next/navigation";

const CustomerDashboard = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) redirect("/login");

  // Fetch user's orders
  const { data: orders } = await orderService.getMyOrders();
  
  const formattedOrders = orders?.map((order: any) => ({
    id: order.id,
    orderId: `#${order.id.slice(-6)}`,
    restaurant: order.provider?.restaurantName || "Unknown",
    items: order.items?.length || 0,
    total: order.total || 0,
    status: order.status,
    date: new Date(order.createdAt).toLocaleDateString(),
  })) || [];

  return (
    <CustomerDashboardClient 
      user={user} 
      orders={formattedOrders} 
    />
  );
};

export default CustomerDashboard;