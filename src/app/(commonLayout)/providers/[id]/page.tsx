/* eslint-disable @typescript-eslint/no-explicit-any */
import ProviderMealsClient from "@/components/providersPage/ProviderMealsClient";
import { adminService } from "@/services/admin.service";
import { mealService } from "@/services/meal.service";
import { providerService } from "@/services/provider.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, User, Store, ArrowLeft, Calendar, Utensils, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProviderDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // 1️⃣ Get provider info
  const providerRes = await providerService.getProviderById(id);
  if (!providerRes.data) return <p>Provider not found</p>;
  const provider = providerRes.data;

  // 2️⃣ Get user info for provider
  const userRes = await adminService.getUserById(provider.userId);
  const user = userRes.data;

  // 3️⃣ Get all meals for this provider
  const mealsRes = await mealService.getAllMeals();
  const meals =
    mealsRes.data?.filter((meal: any) => meal.providerId === provider.id) || [];

  // Calculate stats
  const mealCount = meals.length;
  const categoryCount = new Set(meals.map((m: any) => m.categoryId)).size;

  return (
    <div className="min-h-screen bg-background">
      {/* Provider Hero Section */}
      <div className="bg-linear-to-br from-brand-50/50 via-orange-50/30 to-background dark:from-brand-950/30 dark:via-orange-950/20 border-b border-border">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Provider Image */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-xl ring-4 ring-background bg-background shrink-0">
              {provider.logo ? (
                <Image
                  src={provider.logo}
                  alt={provider.restaurantName}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              ) : user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-bold text-brand-600">
                    {provider.restaurantName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Provider Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  {provider.restaurantName}
                </h1>
                <Badge className="w-fit mx-auto md:mx-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 border-0">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>

              {user && (
                <p className="text-muted-foreground text-sm sm:text-base mb-4">
                  Owned by <span className="font-semibold text-foreground">{user.name}</span>
                </p>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 dark:bg-muted/50 rounded-full text-sm text-muted-foreground border border-border/50">
                  <Utensils className="w-4 h-4 text-brand-600" />
                  <span>{mealCount} {mealCount === 1 ? "Meal" : "Meals"}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 dark:bg-muted/50 rounded-full text-sm text-muted-foreground border border-border/50">
                  <Store className="w-4 h-4 text-brand-600" />
                  <span>{categoryCount} {categoryCount === 1 ? "Category" : "Categories"}</span>
                </div>
                {user && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 dark:bg-muted/50 rounded-full text-sm text-muted-foreground border border-border/50">
                    <Calendar className="w-4 h-4 text-brand-600" />
                    <span>Partner since {(user as any)?.createdAt ? new Date((user as any).createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "2024"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Sidebar - Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-border/50">
              <CardContent className="p-4 sm:p-5 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Store className="w-5 h-5 text-brand-600" />
                  Contact Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Address</p>
                      <p className="text-sm font-medium text-foreground">{provider.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-foreground">{provider.phone}</p>
                    </div>
                  </div>

                  {user && (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Owner</p>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Meals */}
          <div className="lg:col-span-3">
            <ProviderMealsClient meals={meals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;