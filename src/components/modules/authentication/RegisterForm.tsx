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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  ChefHat, 
  ArrowRight,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const toastId = toast.loading("Creating your account...");
      try {
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          setIsLoading(false);
          return;
        }

        toast.success("Account created successfully!", { id: toastId });

        router.push("/login");
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
        setIsLoading(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        {...props}
        className="w-full rounded-2xl shadow-xl border-0 overflow-hidden bg-card"
      >
        {/* Decorative top bar */}
        <div className="h-1.5 gradient-brand" />
        
        <CardHeader className="space-y-4 pt-8 pb-4">
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shadow-lg shadow-orange-500/25">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
              Create account
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign up to get started with FoodMart
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-2 px-6">
          <form
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <div className="space-y-5">
              {/* Name */}
              <form.Field name="name">
                {(field): React.ReactNode => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your full name"
                        required
                        className="pl-11 h-12 rounded-xl border-2 border-border/50 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                )}
              </form.Field>

              {/* Email */}
              <form.Field name="email">
                {(field): React.ReactNode => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="pl-11 h-12 rounded-xl border-2 border-border/50 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                )}
              </form.Field>

              {/* Password */}
              <form.Field name="password">
                {(field): React.ReactNode => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Create a strong password (min 8 chars)"
                        required
                        minLength={8}
                        className="pl-11 pr-11 h-12 rounded-xl border-2 border-border/50 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-200"
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
                  </div>
                )}
              </form.Field>

              {/* Role */}
              <form.Field name="role">
                {(field): React.ReactNode => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
                      I want to
                    </Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(val) => field.handleChange(val)}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-2 border-border/50 focus:border-orange-400 focus:ring-orange-400/20">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CUSTOMER" className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Order food as Customer
                          </div>
                        </SelectItem>
                        <SelectItem value="PROVIDER" className="cursor-pointer">
                          <div className="flex items-center gap-2">
                            <ChefHat className="w-4 h-4" />
                            Sell food as Provider
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </form.Field>
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
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Create Account
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

          {/* Social Login (disabled for now) */}
          <Button
            variant="outline"
            type="button"
            disabled
            className="w-full h-12 rounded-xl border-2 border-border/50 hover:bg-gray-50 disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google (Coming Soon)
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-4 pb-8 pt-2 px-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-1"
            >
              Sign in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}