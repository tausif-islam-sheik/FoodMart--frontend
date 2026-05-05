"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Menu, 
  User, 
  ShoppingBag, 
  ShoppingCart, 
  Home, 
  Store, 
  Utensils, 
  ClipboardList, 
  Users, 
  Tags, 
  LayoutDashboard,
  BarChart3,
  Settings,
  Heart,
  MapPin,
  CreditCard,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

const LINKS = {
  CUSTOMER: [
    { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
    { label: "My Cart", href: "/dashboard/customer/my-carts", icon: ShoppingCart },
    { label: "Favorites", href: "/dashboard/customer/favorites", icon: Heart },
    { label: "Addresses", href: "/dashboard/customer/addresses", icon: MapPin },
    { label: "Notifications", href: "/dashboard/customer/notifications", icon: Bell },
    { label: "Home", href: "/", icon: Home },
  ],
  PROVIDER: [
    { label: "Dashboard", href: "/dashboard/provider", icon: LayoutDashboard },
    { label: "Restaurant Info", href: "/dashboard/provider/profile", icon: Store },
    { label: "Provider Profile", href: "/dashboard/provider/account", icon: User },
    { label: "Manage Meals", href: "/dashboard/provider/meals", icon: Utensils },
    { label: "Orders", href: "/dashboard/provider/orders", icon: ClipboardList },
    { label: "Reviews", href: "/dashboard/provider/reviews", icon: Heart },
    { label: "Home", href: "/", icon: Home },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Overview", href: "/dashboard/admin/overview", icon: BarChart3 },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Orders", href: "/dashboard/admin/orders", icon: ClipboardList },
    { label: "Providers", href: "/dashboard/admin/providers", icon: Store },
    { label: "Categories", href: "/dashboard/admin/categories", icon: Tags },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    { label: "Home", href: "/", icon: Home },
  ],
};

const DASHBOARD_TITLES: Record<Role, string> = {
  ADMIN: "Admin Dashboard",
  PROVIDER: "Provider Dashboard",
  CUSTOMER: "Dashboard",
};

export default function Sidebar({ role }: { role: Role }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const links = LINKS[role];
  const dashboardTitle = DASHBOARD_TITLES[role];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b dark:border-border p-3 flex items-center">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-orange-50">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 flex flex-col h-full overflow-y-auto bg-white dark:bg-background border-r-0"
          >
            <SheetTitle className="mt-2 px-2">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
                <LayoutDashboard className="w-6 h-6 text-orange-500" />
                {dashboardTitle}
              </Link>
            </SheetTitle>
            <div className="mt-6">
              <SidebarContent
                links={links}
                onLinkClick={() => setSheetOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>

        <div className="ml-3 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-orange-500" />
          <h2 className="font-semibold">{dashboardTitle}</h2>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white dark:bg-background border-r dark:border-border h-screen sticky top-0 overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b dark:border-border shrink-0">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <LayoutDashboard className="w-6 h-6 text-orange-500" />
            {dashboardTitle}
          </Link>
        </div>
        
        {/* Nav Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <SidebarContent links={links} />
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t dark:border-border shrink-0">
          <p className="text-xs text-muted-foreground text-center">
            {new Date().getFullYear()} FoodMart. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}

function SidebarContent({
  links,
  onLinkClick,
}: {
  links: { label: string; href: string; icon: React.ElementType }[];
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Menu
      </p>
      {links?.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-linear-to-r from-orange-500 to-orange-400 text-white shadow-md shadow-orange-200 dark:shadow-none" 
                : "text-muted-foreground hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-accent dark:hover:text-orange-400"
            )}
          >
            <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-muted-foreground")} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}