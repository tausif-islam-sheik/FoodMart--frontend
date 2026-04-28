"use client";

import { X, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
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
      className={`w-full lg:w-72 shrink-0 lg:sticky lg:top-24 ${
        showMobileFilters ? "block" : "hidden lg:block"
      }`}
    >
      {/* All Filters in One Card */}
      <div className="bg-card rounded-lg shadow-lg border border-border/50 overflow-hidden">
        {/* Results & Sort */}
        <div className="p-4 lg:p-5 space-y-3 lg:space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">
              Showing{" "}
              <span className="font-semibold text-foreground text-base">
                {filteredMealsCount}
              </span>{" "}
              meals
            </p>
            {filteredMealsCount > ITEMS_PER_PAGE && (
              <p className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Sort by</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full h-10 rounded-md">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name: A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Categories Dropdown */}
        <div className="p-4 lg:p-5">
          <label className="text-sm font-semibold mb-3 block">Categories</label>
          <Select
            value={selectedCategory || "all"}
            onValueChange={(value) => {
              setSelectedCategory(value === "all" ? null : value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full h-10 rounded-lg">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="flex items-center justify-between w-full">
                  <span>All Categories</span>
                  <span className="text-xs text-muted-foreground ml-2">({meals.length})</span>
                </span>
              </SelectItem>
              {categories.map((cat) => {
                const count = meals.filter((m) => m.category.name === cat).length;
                return (
                  <SelectItem key={cat} value={cat}>
                    <span className="flex items-center justify-between w-full">
                      <span>{cat}</span>
                      <span className="text-xs text-muted-foreground ml-2">({count})</span>
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Price Range */}
        <div className="p-4 lg:p-5">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-semibold">Price Range</label>
            <span className="text-sm text-brand-600 font-medium">
              ৳{priceRange[0]} - ৳{priceRange[1]}
            </span>
          </div>
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
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Availability */}
        <div className="p-4 lg:p-5">
          <label className="text-sm font-semibold mb-3 block">Availability</label>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Items" },
              { value: "available", label: "Available" },
              { value: "unavailable", label: "Out of Stock" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setAvailability(opt.value);
                  setPage(1);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                  availability === opt.value
                    ? "bg-brand-500 text-white shadow-sm"
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear All - Inside the card at bottom */}
        {activeFiltersCount > 0 && (
          <>
            <div className="border-t border-border/50" />
            <div className="p-4 lg:p-5">
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="w-full gap-2 text-brand-600 border-brand-200 hover:bg-brand-50 hover:border-brand-300"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </Button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default MealsSidebar;
