"use client";

import { ProviderOverviewCards } from "@/components/dashboard/OverviewCards";
import { 
  ProviderRevenueChart, 
  ProviderMealPerformanceChart 
} from "@/components/dashboard/charts/DashboardCharts";
import { DataTable, StatusBadge } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

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

interface ProviderDashboardClientProps {
  user: {
    name: string;
    email: string;
  };
  orders: Order[];
  restaurantName?: string;
}

export default function ProviderDashboardClient({ 
  user, 
  orders,
  restaurantName 
}: ProviderDashboardClientProps) {
  // Calculate real stats from orders
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "PENDING" || o.status === "PROCESSING").length;
  const completedOrders = orders.filter((o) => o.status === "DELIVERED" || o.status === "COMPLETED").length;

  const stats = {
    totalOrders,
    totalRevenue,
    totalMeals: 0, // Would need meals API
    avgRating: 0, // Would need reviews API
    pendingOrders,
    completedOrders,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {restaurantName ? `${restaurantName} Dashboard` : "Provider Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}! Here&apos;s your restaurant performance overview.
        </p>
      </div>

      {/* Stats Cards */}
      <ProviderOverviewCards stats={stats} />

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <Store className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Restaurant Profile</p>
                <p className="font-medium">Update your info</p>
              </div>
              <Link href="/dashboard/provider/profile">
                <Button variant="outline" size="sm">Manage</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Analytics</p>
                <p className="font-medium">View detailed stats</p>
              </div>
              <Link href="/dashboard/provider/analytics">
                <Button variant="outline" size="sm">View</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="font-medium">{stats.pendingOrders} active orders</p>
              </div>
              <Link href="/dashboard/provider/orders">
                <Button variant="outline" size="sm">View</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProviderRevenueChart data={weeklyData} />
        <ProviderMealPerformanceChart data={mealPerformanceData} />
      </div>

      {/* Recent Orders */}
      <DataTable
        data={orders.slice(0, 5)}
        title="Recent Orders"
        description="Latest orders from your customers"
        columns={[
          { key: "customerName", header: "Customer", sortable: true, cell: (o) => o.customerName },
          { key: "items", header: "Items", cell: (o) => (
            <span className="truncate max-w-xs block">{o.items}</span>
          )},
          { key: "total", header: "Total", sortable: true, cell: (o) => `৳${o.total}` },
          { key: "status", header: "Status", sortable: true, cell: (o) => <StatusBadge status={o.status} /> },
          { key: "date", header: "Date", sortable: true, cell: (o) => o.date },
        ]}
        searchKeys={["customerName", "items"]}
        pageSize={5}
      />
    </div>
  );
}
