import type { Metadata } from "next";
import ProvidersClient from "@/components/providersPage/ProvidersClient";
import { categoryService } from "@/services/category.service";
import { providerService } from "@/services/provider.service";
import { Store, Sparkles, ChefHat } from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant Providers | FoodMart - Partner Restaurants",
  description: "Discover verified restaurants and food providers on FoodMart. Browse menus, read reviews, and order from your favorite local restaurants.",
};

const ProvidersPage = async () => {
  const [providersRes, categoriesRes] = await Promise.all([
    providerService.getAllProviders(),
    categoryService.getAllCategories(),
  ]);

  const providers = providersRes.data ?? [];
  const categories = categoriesRes.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Header */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-orange-50/30 to-background dark:from-brand-950/30 dark:via-orange-950/20" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-brand-900/30 rounded-full shadow-sm border border-brand-100 mb-6">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span className="text-sm font-medium text-brand-600">
                Trusted Partners
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Restaurant{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-500">
                Partners
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Discover {providers.length}+ verified restaurants and food providers. 
              Browse their menus, read reviews, and order delicious meals delivered to your doorstep.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                  <Store className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{providers.length}+</p>
                  <p className="text-sm text-muted-foreground">Restaurants</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{categories.length}+</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <ProvidersClient providers={providers} categories={categories} />
      </div>
    </div>
  );
};

export default ProvidersPage;