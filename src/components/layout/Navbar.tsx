"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ModeToggle } from "./MoodToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, LogOut, User, ChevronRight } from "lucide-react";

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
}

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (session) setUserInfo(session.user as User);
    else setUserInfo(null);
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    const toastId = toast.loading("Logging out...");
    setLoading(true);

    try {
      await authClient.signOut();
      toast.success("You have been signed out!", { id: toastId });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const baseNavItems = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "Providers", href: "/providers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const dashboardLink = userInfo
    ? {
        name: "Dashboard",
        href:
          userInfo.role === "ADMIN"
            ? "/dashboard/admin"
            : userInfo.role === "PROVIDER"
              ? "/dashboard/provider"
              : "/dashboard/customer",
      }
    : null;

  const navItems = dashboardLink
    ? [...baseNavItems, dashboardLink]
    : baseNavItems;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border"
          : "bg-background border-b border-border/30 dark:bg-[#1e1b19]"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-[1.75rem] italic font-sans">
            <span className="text-foreground">Food</span>
            <span className="font-bold text-brand-600">Mart</span>
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-muted/50"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-brand-50 dark:bg-brand-500/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ModeToggle />
          
          <AnimatePresence mode="wait">
            {userInfo ? (
              <motion.div
                key="user-actions"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium max-w-[100px] truncate">
                    {userInfo.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="gap-2 border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  {loading ? "..." : "Logout"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="auth-actions"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button
                  size="sm"
                  asChild
                  className="gap-2 gradient-brand hover:opacity-90 text-white shadow-brand hover:shadow-brand-lg transition-all rounded-lg px-5"
                >
                  <Link href="/login">
                    Sign In
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <ModeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-full hover:bg-muted"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-80 flex flex-col bg-background/95 backdrop-blur-xl border-l border-border/50 p-0"
            >
              <SheetHeader className="px-6 py-4 border-b border-border/50">
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl italic font-sans">
                    <span className="text-foreground">Food</span>
                    <span className="font-bold text-brand-600">Mart</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <SheetClose key={item.name} asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active"
                            className="w-1.5 h-1.5 rounded-full bg-brand-500"
                          />
                        )}
                      </Link>
                    </SheetClose>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-border/50">
                  {userInfo ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{userInfo.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-destructive/30 hover:bg-destructive/10"
                        onClick={handleSignOut}
                        disabled={loading}
                      >
                        <LogOut className="w-4 h-4" />
                        {loading ? "Signing Out..." : "Sign Out"}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="w-full"
                          asChild
                        >
                          <Link href="/login">Sign In</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          className="w-full gradient-brand text-white"
                          asChild
                        >
                          <Link href="/register">Create Account</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
