"use client";

import { X, ArrowUpDown, Utensils, DollarSign, CheckCircle, LayoutGrid, SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MealsSidebarProps {
  meals: { category: { name: string } }[];
  filteredMealsCount: number;
  totalPages: number;
  page: number;
  ITEMS_PER_PAGE: number;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  priceBounds: { min: number; max: number };
  availability: string;
  setAvailability: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  activeFiltersCount: number;
  clearAllFilters: () => void;
  setPage: (page: number) => void;
  showMobileFilters?: boolean;
}

const MealsSidebar = ({
  meals,
  filteredMealsCount,
  totalPages,
  page,
  ITEMS_PER_PAGE,
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  priceBounds,
  availability,
  setAvailability,
  sortBy,
  setSortBy,
  activeFiltersCount,
  clearAllFilters,
  setPage,
  showMobileFilters,
}: MealsSidebarProps) => {
  return (
    <aside
      className={`w-full lg:w-80 shrink-0 lg:sticky lg:top-24 ${
        showMobileFilters ? "block" : "hidden lg:block"
      }`}
    >
      {/* All Filters in One Card */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
        {/* Header with Results */}
        <div className="p-5 lg:p-6 bg-gradient-to-br from-brand-50/50 to-orange-50/50 dark:from-brand-500/5 dark:to-orange-500/5 border-b border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Filters</h3>
              <p className="text-xs text-muted-foreground">
                {filteredMealsCount} meals found
              </p>
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all filters
            </button>
          )}
        </div>

        {/* Categories - Modern Horizontal Chips */}
        <div className="p-5 lg:p-6 border-b border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="w-4 h-4 text-brand-500" />
            <label className="text-sm font-semibold">Categories</label>
          </div>
          
          {/* Category Chips Grid */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory(null);
                setPage(1);
              }}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                selectedCategory === null
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                  : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
              )}
            >
              <span className="flex items-center gap-1.5">
                All
                <span className="opacity-70">({meals.length})</span>
              </span>
            </motion.button>
            
            {categories.map((cat) => {
              const count = meals.filter((m) => m.category.name === cat).length;
              const isActive = selectedCategory === cat;
              
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCategory(isActive ? null : cat);
                    setPage(1);
                  }}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                      : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {cat}
                    <span className="opacity-70">({count})</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="p-5 lg:p-6 border-b border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-brand-500" />
            <label className="text-sm font-semibold">Price Range</label>
          </div>
          
          <div className="space-y-4">
            {/* Price Display */}
            <div className="flex items-center justify-between">
              <div className="bg-muted rounded-lg px-3 py-1.5 min-w-[70px] text-center">
                <span className="text-xs text-muted-foreground">Min</span>
                <p className="text-sm font-semibold text-foreground">৳{priceRange[0]}</p>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className="bg-muted rounded-lg px-3 py-1.5 min-w-[70px] text-center">
                <span className="text-xs text-muted-foreground">Max</span>
                <p className="text-sm font-semibold text-foreground">৳{priceRange[1]}</p>
              </div>
            </div>
            
            {/* Slider */}
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value as [number, number]);
                setPage(1);
              }}
              max={priceBounds.max}
              min={priceBounds.min}
              step={10}
              className="w-full"
            />
            
            {/* Min/Max Labels */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>৳{priceBounds.min}</span>
              <span>৳{priceBounds.max}</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-brand-500" />
            <label className="text-sm font-semibold">Availability</label>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {[
              { value: "all", label: "All Items", desc: "Show everything" },
              { value: "available", label: "Available Now", desc: "Ready to order" },
              { value: "unavailable", label: "Out of Stock", desc: "Currently unavailable" },
            ].map((opt) => (
              <motion.button
                key={opt.value}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setAvailability(opt.value);
                  setPage(1);
                }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 border",
                  availability === opt.value
                    ? "bg-brand-50 border-brand-200 text-brand-700 shadow-sm"
                    : "bg-transparent border-border/50 hover:bg-muted text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                      availability === opt.value
                        ? "border-brand-500 bg-brand-500"
                        : "border-muted-foreground/30"
                    )}
                  >
                    {availability === opt.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-white"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium">{opt.label}</span>
                    <p className="text-xs opacity-70">{opt.desc}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Clear All - Fixed at bottom */}
        {activeFiltersCount > 0 && (
          <div className="p-5 lg:p-6 border-t border-border/50 bg-muted/30">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full gap-2 h-11 rounded-xl border-dashed border-brand-200 text-brand-600 hover:bg-brand-50 hover:border-brand-300 transition-all"
            >
              <X className="w-4 h-4" />
              Clear all {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default MealsSidebar;
