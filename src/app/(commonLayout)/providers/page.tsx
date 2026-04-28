import ProvidersClient from "@/components/providersPage/ProvidersClient";
import { categoryService } from "@/services/category.service";
import { providerService } from "@/services/provider.service";
import { Store, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ProvidersPage = async () => {
  const [providersRes, categoriesRes] = await Promise.all([
    providerService.getAllProviders(),
    categoryService.getAllCategories(),
  ]);

  const providers = providersRes.data ?? [];
  const categories = categoriesRes.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-linear-to-br from-brand-50/50 via-orange-50/30 to-background dark:from-brand-950/30 dark:via-orange-950/20 border-b border-border">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
              <Store className="w-5 h-5 sm:w-6 sm:h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-brand-600 uppercase tracking-wider">
              Our Partners
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Restaurant <span className="text-brand-600">Providers</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Discover verified restaurants and food providers. Browse their menus and order delicious meals delivered to your doorstep.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <ProvidersClient providers={providers} categories={categories} />
      </div>
    </div>
  );
};

export default ProvidersPage;