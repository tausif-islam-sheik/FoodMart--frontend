"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, User, UserCog, ChefHat } from "lucide-react";

interface LoginFormProps extends React.ComponentProps<typeof Card> {
  callbackURL?: string;
}

export function LoginForm({ callbackURL = "/", ...props }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    const toastId = toast.loading("Signing you in...");
    
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid credentials", { id: toastId });
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back!", { id: toastId });
      window.location.href = callbackURL;
    } catch (err) {
      toast.error("Something went wrong. Please try again.", { id: toastId });
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card
        {...props}
        className="w-full max-w-md mx-auto rounded-2xl shadow-xl border-0 bg-card/95 backdrop-blur-xl overflow-hidden"
      >
        {/* Decorative top bar */}
        <div className="h-1.5 gradient-brand" />
        
        <CardHeader className="space-y-4 pt-4 pb-4">
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-brand">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign in to your account to continue
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2.5">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`pl-11 h-12 rounded-xl border-2 transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-border/50 focus:border-brand-400 focus:ring-brand-400/20"
                  }`}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  className={`pl-11 pr-11 h-12 rounded-xl border-2 transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-border/50 focus:border-brand-400 focus:ring-brand-400/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold gradient-brand text-white shadow-brand hover:shadow-brand-lg hover:-translate-y-0.5 transition-all duration-300 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Demo Login Buttons */}
          <div className="space-y-3">
            <p className="text-xs text-center text-muted-foreground uppercase tracking-wider font-medium">
              Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEmail("admin@foodmart.com");
                  setPassword("admin@foodmart.com");
                }}
                className="h-10 px-2 text-xs font-medium border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-colors dark:border-orange-800 dark:hover:bg-orange-950"
              >
                <UserCog className="w-3.5 h-3.5 mr-1 text-orange-500" />
                Admin
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEmail("customer@gmail.com");
                  setPassword("customer@gmail.com");
                }}
                className="h-10 px-2 text-xs font-medium border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors dark:border-blue-800 dark:hover:bg-blue-950"
              >
                <User className="w-3.5 h-3.5 mr-1 text-blue-500" />
                Customer
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEmail("ethan@gmail.com");
                  setPassword("ethan@gmail.com");
                }}
                className="h-10 px-2 text-xs font-medium border-green-200 hover:bg-green-50 hover:border-green-300 transition-colors dark:border-green-800 dark:hover:bg-green-950"
              >
                <ChefHat className="w-3.5 h-3.5 mr-1 text-green-500" />
                Provider
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 pb-8 pt-2">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-brand-600 hover:text-brand-700 transition-colors inline-flex items-center gap-1"
            >
              Create one
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}