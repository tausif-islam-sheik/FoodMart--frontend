"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Store,
  ChefHat,
  Star
} from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  color?: "brand" | "green" | "blue" | "purple" | "orange";
}

const colorVariants = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400",
  green: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
};

function StatCard({ title, value, description, icon: Icon, trend, color = "brand" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-border/50 hover:border-brand-200 hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg ${colorVariants[color]}`}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.positive ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}>
                {trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Admin Stats
export function AdminOverviewCards({ stats }: { 
  stats: {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    totalProviders: number;
    activeUsers: number;
    pendingOrders: number;
  } 
}) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon={Users}
        color="blue"
        trend={{ value: 12, label: "from last month", positive: true }}
      />
      <StatCard
        title="Total Orders"
        value={stats.totalOrders.toLocaleString()}
        icon={ShoppingBag}
        color="brand"
        trend={{ value: 8, label: "from last month", positive: true }}
      />
      <StatCard
        title="Total Revenue"
        value={`৳${stats.totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        color="green"
        trend={{ value: 15, label: "from last month", positive: true }}
      />
      <StatCard
        title="Providers"
        value={stats.totalProviders.toLocaleString()}
        icon={Store}
        color="purple"
        trend={{ value: 5, label: "from last month", positive: true }}
      />
      <StatCard
        title="Active Users"
        value={stats.activeUsers.toLocaleString()}
        icon={Users}
        color="blue"
        description="Currently online"
      />
      <StatCard
        title="Pending Orders"
        value={stats.pendingOrders.toLocaleString()}
        icon={Package}
        color="orange"
        description="Awaiting processing"
      />
    </div>
  );
}

// Provider Stats
export function ProviderOverviewCards({ stats }: {
  stats: {
    totalMeals: number;
    totalOrders: number;
    totalRevenue: number;
    avgRating: number;
    pendingOrders: number;
    completedOrders: number;
  }
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Meals"
        value={stats.totalMeals}
        icon={ChefHat}
        color="brand"
        description="Menu items"
      />
      <StatCard
        title="Total Orders"
        value={stats.totalOrders.toLocaleString()}
        icon={ShoppingBag}
        color="blue"
        trend={{ value: 10, label: "from last month", positive: true }}
      />
      <StatCard
        title="Total Revenue"
        value={`৳${stats.totalRevenue.toLocaleString()}`}
        icon={DollarSign}
        color="green"
        trend={{ value: 20, label: "from last month", positive: true }}
      />
      <StatCard
        title="Average Rating"
        value={stats.avgRating.toFixed(1)}
        icon={Star}
        color="orange"
        description="Out of 5 stars"
      />
      <StatCard
        title="Pending Orders"
        value={stats.pendingOrders}
        icon={Package}
        color="purple"
        description="To be prepared"
      />
      <StatCard
        title="Completed"
        value={stats.completedOrders.toLocaleString()}
        icon={TrendingUp}
        color="green"
        description="This month"
      />
    </div>
  );
}

// Customer Stats
export function CustomerOverviewCards({ stats }: {
  stats: {
    totalOrders: number;
    totalSpent: number;
    favoriteProvider: string;
    pendingOrders: number;
    savedAddresses: number;
    rewardPoints: number;
  }
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Orders"
        value={stats.totalOrders}
        icon={ShoppingBag}
        color="brand"
        description="Lifetime orders"
      />
      <StatCard
        title="Total Spent"
        value={`৳${stats.totalSpent.toLocaleString()}`}
        icon={DollarSign}
        color="green"
        trend={{ value: 5, label: "this month", positive: true }}
      />
      <StatCard
        title="Favorite Restaurant"
        value={stats.favoriteProvider}
        icon={Store}
        color="purple"
        description="Most ordered from"
      />
      <StatCard
        title="Pending Orders"
        value={stats.pendingOrders}
        icon={Package}
        color="orange"
        description="On the way"
      />
      <StatCard
        title="Saved Addresses"
        value={stats.savedAddresses}
        icon={Users}
        color="blue"
        description="Delivery locations"
      />
      <StatCard
        title="Reward Points"
        value={stats.rewardPoints.toLocaleString()}
        icon={Star}
        color="green"
        description="Available to redeem"
      />
    </div>
  );
}
