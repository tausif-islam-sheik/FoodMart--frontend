"use client";

import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import ProviderCard from "./ProviderCard";
import { Filter, Store, SearchX, Grid3X3, List, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ProvidersClientProps {
  providers: any[];
  categories: { id: string; name: string }[];
}

export default function ProvidersClient({
  providers,
  categories,
}: ProvidersClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPage = 8;

  const filteredProviders = useMemo(() => {
    if (selectedCategory === "all") return providers;

    return providers.filter((p: any) => {
      if (!Array.isArray(p.meals)) return false;
      return p.meals.some((m: any) => m.categoryId === selectedCategory);
    });
  }, [selectedCategory, providers]);

  const totalPages = Math.ceil(filteredProviders.length / perPage);

  const paginatedProviders = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredProviders.slice(start, start + perPage);
  }, [filteredProviders, currentPage]);

  const selectedCategoryName = selectedCategory === "all"
    ? "All Categories"
    : categories.find(c => c.id === selectedCategory)?.name || "All Categories";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="space-y-6">
      {/* Modern Filter Section */}
      <div className="space-y-4">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {filteredProviders.length} {filteredProviders.length === 1 ? "Provider" : "Providers"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {filteredProviders.length > perPage
                  ? `Showing ${(currentPage - 1) * perPage + 1}-${Math.min(currentPage * perPage, filteredProviders.length)} of ${filteredProviders.length}`
                  : `Showing all ${filteredProviders.length} providers`}
              </p>
            </div>
          </div>

          {/* Clear Filter Button */}
          {selectedCategory !== "all" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className="w-full sm:w-auto border-brand-200 text-brand-600 hover:bg-brand-50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Clear Filter
            </Button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2 flex items-center gap-1">
            <Filter className="w-4 h-4" />
            Filter by:
          </span>
          
          {/* All Categories Pill */}
          <button
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            All Categories
          </button>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Indicator */}
        {selectedCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-brand-50 rounded-xl border border-brand-100"
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-sm text-brand-700">
              Showing providers with <span className="font-semibold">{selectedCategoryName}</span> meals
            </span>
          </motion.div>
        )}
      </div>

      {/* Providers Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {paginatedProviders.length > 0 ? (
          paginatedProviders.map((provider: any) => (
            <motion.div key={provider.id} variants={itemVariants}>
              <ProviderCard provider={provider} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <SearchX className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                No providers found
              </h3>
              <p className="text-muted-foreground mb-6">
                No restaurants match the selected category. Try selecting a different category or check back later.
              </p>
              <Button
                onClick={() => setSelectedCategory("all")}
                className="bg-brand-500 hover:bg-brand-600 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                View All Providers
              </Button>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
