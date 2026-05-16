"use client";

import { AdminOverviewCards } from "@/components/dashboard/OverviewCards";
import { 
  AdminRevenueChart, 
  AdminUserGrowthChart, 
  AdminCategoryChart 
} from "@/components/dashboard/charts/DashboardCharts";
import { DataTable, StatusBadge } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";

// Sample data for charts - in production, fetch from API
const revenueData = [
  { name: "Jan", orders: 400, revenue: 24000 },
  { name: "Feb", orders: 300, revenue: 18000 },
  { name: "Mar", orders: 550, revenue: 33000 },
  { name: "Apr", orders: 450, revenue: 27000 },
  { name: "May", orders: 600, revenue: 36000 },
  { name: "Jun", orders: 700, revenue: 42000 },
];

const userGrowthData = [
  { name: "Jan", users: 120, providers: 8 },
  { name: "Feb", users: 150, providers: 10 },
  { name: "Mar", users: 200, providers: 12 },
  { name: "Apr", users: 280, providers: 15 },
  { name: "May", users: 350, providers: 18 },
  { name: "Jun", users: 420, providers: 22 },
];

const categoryData = [
  { name: "Fast Food", value: 35 },
  { name: "Traditional", value: 25 },
  { name: "Desserts", value: 20 },
  { name: "Beverages", value: 15 },
  { name: "Others", value: 5 },
];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AdminOverviewClientProps {
  users: User[];
  stats: {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    totalProviders: number;
    activeUsers: number;
    pendingOrders: number;
  };
}

export default function AdminOverviewClient({ users, stats }: AdminOverviewClientProps) {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Comprehensive analytics and insights for your platform.
        </p>
      </div>

      {/* Stats Cards */}
      <AdminOverviewCards stats={stats} />

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-2">
          <AdminRevenueChart data={revenueData} />
        </div>
        <div>
          <AdminCategoryChart data={categoryData} />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <AdminUserGrowthChart data={userGrowthData} />
        <AdminRevenueChart data={revenueData} />
      </div>

      {/* Recent Users Table */}
      <DataTable
        data={users.slice(0, 10)}
        title="Recent Users"
        description="Recently registered users on the platform"
        columns={[
          { key: "name", header: "Name", sortable: true, cell: (user) => user.name },
          { key: "email", header: "Email", sortable: true, cell: (user) => user.email },
          { key: "role", header: "Role", sortable: true, cell: (user) => (
            <Badge variant={user.role === "ADMIN" ? "default" : user.role === "PROVIDER" ? "secondary" : "outline"}>
              {user.role}
            </Badge>
          )},
          { key: "status", header: "Status", sortable: true, cell: (user) => <StatusBadge status={user.status || "ACTIVE"} /> },
        ]}
        searchKeys={["name", "email"]}
        filterOptions={[
          {
            key: "role",
            label: "Role",
            options: [
              { value: "ADMIN", label: "Admin" },
              { value: "PROVIDER", label: "Provider" },
              { value: "CUSTOMER", label: "Customer" },
            ],
          },
          {
            key: "status",
            label: "Status",
            options: [
              { value: "ACTIVE", label: "Active" },
              { value: "SUSPENDED", label: "Suspended" },
              { value: "INACTIVE", label: "Inactive" },
            ],
          },
        ]}
        pageSize={5}
      />
    </div>
  );
}
