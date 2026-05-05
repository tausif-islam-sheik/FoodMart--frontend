import type { Metadata } from "next";
import ProviderMealsClient from "@/components/providersPage/ProviderMealsClient";
import { adminService } from "@/services/admin.service";
import { mealService } from "@/services/meal.service";
import { providerService } from "@/services/provider.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, User, Store, ArrowLeft, Calendar, Utensils, CheckCircle2, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ProviderDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProviderDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const providerRes = await providerService.getProviderById(id);
  const provider = providerRes.data;

  return {
    title: provider ? `${provider.restaurantName} | FoodMart` : "Provider | FoodMart",
    description: provider ? `Order from ${provider.restaurantName}. Browse menu, reviews, and place your order.` : "View provider details",
  };
}

const ProviderDetails = async ({ params }: ProviderDetailsProps) => {
  const { id } = await params;

  // Get provider info
  const providerRes = await providerService.getProviderById(id);
  if (!providerRes.data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Store className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-xl font-bold text-foreground mb-2">Provider not found</h1>
          <Link href="/providers" className="text-brand-600 hover:underline">
            Browse all providers
          </Link>
        </div>
      </div>
    );
  }
  const provider = providerRes.data;

  // Get user info for provider
  const userRes = await adminService.getUserById(provider.userId);
  const user = userRes.data;

  // Get all meals for this provider
  const mealsRes = await mealService.getAllMeals();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meals = mealsRes.data?.filter((meal: any) => meal.providerId === provider.id) || [];

  // Calculate stats
  const mealCount = meals.length;
  const categoryCount = new Set(meals.map((m: any) => m.categoryId)).size;
  const averageRating = meals.length > 0
    ? (meals.reduce((acc: number, m: any) => acc + (m.rating || 0), 0) / meals.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Providers
          </Link>
        </div>
      </div>

      {/* Modern Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-orange-50/30 to-background dark:from-brand-950/30 dark:via-orange-950/20" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative container mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Provider Image */}
            <div className="relative">
              <div className="w-38 h-38 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-background bg-background">
                {provider.logo ? (
                  <Image
                    src={provider.logo}
                    alt={provider.restaurantName}
                    fill
                    className="object-cover rounded-full"
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
                  <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl font-bold text-brand-600">
                      {provider.restaurantName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Verified Badge */}
              <div className="absolute -bottom-0 -right-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Provider Info */}
            <div className="flex-1 text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-brand-900/30 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span className="text-sm font-medium text-brand-700">
                  Verified Partner
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                {provider.restaurantName}
              </h1>

              {user && (
                <p className="text-muted-foreground text-base mb-6">
                  Owned by <span className="font-semibold text-foreground">{user.name}</span>
                </p>
              )}

              {/* Stats Cards */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-muted/50 rounded-xl shadow-sm border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center">
                    <Utensils className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-foreground">{mealCount}</p>
                    <p className="text-xs text-muted-foreground">{mealCount === 1 ? "Meal" : "Meals"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-muted/50 rounded-xl shadow-sm border border-border/50">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Store className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-foreground">{categoryCount}</p>
                    <p className="text-xs text-muted-foreground">{categoryCount === 1 ? "Category" : "Categories"}</p>
                  </div>
                </div>

                {averageRating && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-muted/50 rounded-xl shadow-sm border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-foreground">{averageRating}</p>
                      <p className="text-xs text-muted-foreground">Avg Rating</p>
                    </div>
                  </div>
                )}

                {user && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-muted/50 rounded-xl shadow-sm border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold text-foreground">
                        {new Date((user as unknown as { createdAt: string }).createdAt).getFullYear()}
                      </p>
                      <p className="text-xs text-muted-foreground">Partner Since</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card className="border-border/50 overflow-hidden">
              <div className="bg-gradient-to-r from-brand-500 to-brand-600 p-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Store className="w-5 h-5" />
                  Contact Information
                </h3>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-sm font-medium text-foreground leading-relaxed">{provider.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-sm font-medium text-foreground">{provider.phone}</p>
                    </div>
                  </div>

                  {user && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Owner</p>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardContent className="p-5">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <Link
                    href={`tel:${provider.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium text-foreground">Call Restaurant</span>
                  </Link>
                  <Link
                    href="/providers"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center group-hover:bg-brand-200 transition-colors">
                      <Store className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="font-medium text-foreground">More Providers</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Meals */}
          <div className="lg:col-span-3">
            <ProviderMealsClient meals={meals} providerName={provider.restaurantName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;