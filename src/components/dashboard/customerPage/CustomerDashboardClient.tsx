"use client";

import { CustomerOverviewCards } from "@/components/dashboard/OverviewCards";
import { 
  CustomerOrderHistoryChart, 
  CustomerCategoryChart 
} from "@/components/dashboard/charts/DashboardCharts";
import { DataTable, StatusBadge } from "@/components/dashboard/DataTable";
import CustomerProfileClient from "@/components/dashboard/customerPage/CustomerProfileClient";
import { Badge } from "@/components/ui/badge";

// Sample data for charts
const orderHistoryData = [
  { name: "Jan", orders: 5, spent: 2500 },
  { name: "Feb", orders: 8, spent: 4200 },
  { name: "Mar", orders: 12, spent: 6800 },
  { name: "Apr", orders: 7, spent: 3900 },
  { name: "May", orders: 15, spent: 8500 },
  { name: "Jun", orders: 10, spent: 5600 },
];

const categoryData = [
  { name: "Fast Food", value: 40 },
  { name: "Traditional", value: 30 },
  { name: "Desserts", value: 15 },
  { name: "Beverages", value: 10 },
  { name: "Others", value: 5 },
];

interface Order {
  id: string;
  orderId: string;
  restaurant: string;
  items: number;
  total: number;
  status: string;
  date: string;
}

interface CustomerDashboardClientProps {
  user: any;
  orders: Order[];
}

export default function CustomerDashboardClient({ user, orders }: CustomerDashboardClientProps) {
  // Calculate real stats from orders
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((acc: number, o: Order) => acc + (o.total || 0), 0);
  const pendingOrders = orders.filter((o: Order) => o.status === "PENDING" || o.status === "PROCESSING").length;
  
  // Find favorite provider (most orders)
  const providerCounts: Record<string, number> = {};
  orders.forEach((o) => {
    providerCounts[o.restaurant] = (providerCounts[o.restaurant] || 0) + 1;
  });
  const favoriteProvider = Object.entries(providerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const stats = {
    totalOrders,
    totalSpent,
    favoriteProvider,
    pendingOrders,
    savedAddresses: 0, // Would need addresses API
    rewardPoints: 0, // Would need rewards API
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here&apos;s your activity overview.
        </p>
      </div>

      {/* Stats Cards */}
      <CustomerOverviewCards stats={stats} />

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <CustomerOrderHistoryChart data={orderHistoryData} />
        <CustomerCategoryChart data={categoryData} />
      </div>

      {/* Recent Orders Table */}
      <DataTable
        data={orders.slice(0, 10)}
        title="Recent Orders"
        description="Your latest food orders"
        columns={[
          { key: "orderId", header: "Order ID", sortable: true, cell: (order) => (
            <Badge variant="outline">{order.orderId}</Badge>
          )},
          { key: "restaurant", header: "Restaurant", sortable: true, cell: (order) => order.restaurant },
          { key: "items", header: "Items", sortable: true, cell: (order) => `${order.items} items` },
          { key: "total", header: "Total", sortable: true, cell: (order) => `৳${order.total}` },
          { key: "status", header: "Status", sortable: true, cell: (order) => <StatusBadge status={order.status} /> },
          { key: "date", header: "Date", sortable: true, cell: (order) => order.date },
        ]}
        searchKeys={["orderId", "restaurant"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "PENDING", label: "Pending" },
              { value: "PROCESSING", label: "Processing" },
              { value: "DELIVERED", label: "Delivered" },
              { value: "CANCELLED", label: "Cancelled" },
            ],
          },
        ]}
        pageSize={5}
      />

      {/* Profile Section */}
      <div className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <CustomerProfileClient user={user} />
      </div>
    </div>
  );
}
