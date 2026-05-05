"use client";

import { ProviderOverviewCards } from "@/components/dashboard/OverviewCards";
import { 
  ProviderRevenueChart, 
  ProviderMealPerformanceChart 
} from "@/components/dashboard/charts/DashboardCharts";
import { DataTable, StatusBadge } from "@/components/dashboard/DataTable";
import { useEffect, useState } from "react";
import { providerService } from "@/services/provider.service";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample data for charts
const weeklyData = [
  { name: "Mon", orders: 45, revenue: 8500 },
  { name: "Tue", orders: 52, revenue: 9200 },
  { name: "Wed", orders: 48, revenue: 8800 },
  { name: "Thu", orders: 61, revenue: 11500 },
  { name: "Fri", orders: 75, revenue: 14200 },
  { name: "Sat", orders: 82, revenue: 15800 },
  { name: "Sun", orders: 68, revenue: 12900 },
];

const mealPerformanceData = [
  { name: "Chicken Biryani", orders: 145, rating: 4.8 },
  { name: "Beef Burger", orders: 128, rating: 4.6 },
  { name: "Pizza Margherita", orders: 112, rating: 4.5 },
  { name: "Fried Rice", orders: 98, rating: 4.4 },
  { name: "Pasta Alfredo", orders: 87, rating: 4.3 },
];

interface Order {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: string;
  date: string;
}

export default function ProviderAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await providerService.getProviderOrders();
        if (response.success) {
          const formattedOrders = response.data.map((order: any) => ({
            id: order.id,
            customerName: order.customer?.name || "Unknown",
            items: order.items?.map((i: any) => i.meal?.name).join(", ") || "-",
            total: order.total || 0,
            status: order.status,
            date: new Date(order.createdAt).toLocaleDateString(),
          }));
          setOrders(formattedOrders);
        }
      } catch {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const stats = {
    totalMeals: 24,
    totalOrders: orders.length || 345,
    totalRevenue: 128000,
    avgRating: 4.7,
    pendingOrders: orders.filter((o) => o.status === "PENDING").length || 12,
    completedOrders: orders.filter((o) => o.status === "DELIVERED").length || 298,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your restaurant performance and insights.
        </p>
      </div>

      {/* Stats Cards */}
      <ProviderOverviewCards stats={stats} />

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProviderRevenueChart data={weeklyData} />
        <ProviderMealPerformanceChart data={mealPerformanceData} />
      </div>

      {/* Recent Orders Table */}
      <DataTable
        data={orders.slice(0, 10)}
        title="Recent Orders"
        description="Latest orders from your customers"
        columns={[
          { key: "customerName", header: "Customer", sortable: true, cell: (order) => order.customerName },
          { key: "items", header: "Items", cell: (order) => (
            <span className="truncate max-w-[200px] block">{order.items}</span>
          )},
          { key: "total", header: "Total", sortable: true, cell: (order) => `৳${order.total}` },
          { key: "status", header: "Status", sortable: true, cell: (order) => <StatusBadge status={order.status} /> },
          { key: "date", header: "Date", sortable: true, cell: (order) => order.date },
        ]}
        searchKeys={["customerName", "items"]}
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
    </div>
  );
}
