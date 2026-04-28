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
  LayoutDashboard 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

const LINKS = {
  CUSTOMER: [
    { label: "Profile", href: "/dashboard/customer", icon: User },
    { label: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
    { label: "My Cart", href: "/dashboard/customer/my-carts", icon: ShoppingCart },
    { label: "Home", href: "/", icon: Home },
  ],
  PROVIDER: [
    { label: "Restaurant Info", href: "/dashboard/provider", icon: Store },
    { label: "Manage Meals", href: "/dashboard/provider/meals", icon: Utensils },
    { label: "Orders", href: "/dashboard/provider/orders", icon: ClipboardList },
    { label: "Home", href: "/", icon: Home },
  ],
  ADMIN: [
    { label: "Profile", href: "/dashboard/admin", icon: User },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Orders", href: "/dashboard/admin/orders", icon: ClipboardList },
    { label: "Categories", href: "/dashboard/admin/categories", icon: Tags },
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
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b p-3 flex items-center">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-orange-50">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 flex flex-col h-full overflow-y-auto bg-white border-r-0"
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
      <aside className="hidden md:flex w-72 flex-col bg-white border-r h-screen sticky top-0 overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b shrink-0">
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
        <div className="p-4 border-t shrink-0">
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
                ? "bg-linear-to-r from-orange-500 to-orange-400 text-white shadow-md shadow-orange-200" 
                : "text-muted-foreground hover:bg-orange-50 hover:text-orange-600"
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