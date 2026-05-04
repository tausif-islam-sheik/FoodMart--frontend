"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
  SlidersHorizontal,
  ShoppingCart,
  Plus,
  Minus,
  Clock,
  Star,
  Utensils,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cartService } from "@/services/cart.service";
import Image from "next/image";
import { toast } from "sonner";
import MealsSidebar from "./MealsSidebar";

interface Category {
  id: string;
  name: string;
}

interface Provider {
  restaurantName: string;
}

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  category: Category;
  provider: Provider;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: "CUSTOMER" | "ADMIN" | "PROVIDER";
  status: "ACTIVE" | "INACTIVE" | string;
}

const ITEMS_PER_PAGE = 9;

const MealsClient = ({ meals, user }: { meals: Meal[]; user: User | null }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [page, setPage] = useState(1);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(meals.map((m) => m.category.name))),
    [meals],
  );

  const priceBounds = useMemo(() => {
    if (meals.length === 0) return { min: 0, max: 1000 };
    const prices = meals.map((m) => m.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [meals]);

  const filteredMeals = useMemo(() => {
    let data = [...meals];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      data = data.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.provider.restaurantName.toLowerCase().includes(query),
      );
    }

    if (selectedCategory) {
      data = data.filter((m) => m.category.name === selectedCategory);
    }

    data = data.filter((m) => m.price >= priceRange[0] && m.price <= priceRange[1]);

    if (availability !== "all") {
      data = data.filter((m) =>
        availability === "available" ? m.isAvailable : !m.isAvailable,
      );
    }

    if (sortBy === "price-low") data.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") data.sort((a, b) => b.price - a.price);
    if (sortBy === "name") data.sort((a, b) => a.name.localeCompare(b.name));

    return data;
  }, [meals, searchQuery, selectedCategory, priceRange, availability, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory) count++;
    if (priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max) count++;
    if (availability !== "all") count++;
    return count;
  }, [searchQuery, selectedCategory, priceRange, availability, priceBounds]);

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);

  const paginatedMeals = filteredMeals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceRange([priceBounds.min, priceBounds.max]);
    setSortBy("default");
    setAvailability("all");
    setPage(1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden w-full">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Left Sidebar - Filters */}
      <MealsSidebar
        meals={meals}
        filteredMealsCount={filteredMeals.length}
        totalPages={totalPages}
        page={page}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        priceBounds={priceBounds}
        availability={availability}
        setAvailability={setAvailability}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
        setPage={setPage}
        showMobileFilters={showMobileFilters}
      />

      {/* Right Content - Meals Grid */}
      <main className="flex-1 space-y-5 lg:space-y-6 w-full">
        {/* Search & Sort Header */}
        <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Bar - Modern Pill Style */}
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500">
                <Search className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder="Search for meals, restaurants..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-12 pr-10 h-12 text-sm rounded-full w-full bg-muted/50 border-0 focus-visible:ring-brand-500/20 focus-visible:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted-foreground/20 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown - Inline */}
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-muted-foreground sm:hidden" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-4 pr-10 rounded-full bg-muted/50 border-0 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer appearance-none bg-no-repeat bg-right-3"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundPosition: "right 12px center" }}
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredMeals.length}</span> meals
              {filteredMeals.length > ITEMS_PER_PAGE && (
                <span className="text-muted-foreground"> • Page {page} of {totalPages}</span>
              )}
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Pills - Modern Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-medium rounded-full hover:bg-brand-100 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                {searchQuery}
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
            {selectedCategory && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-medium rounded-full hover:bg-brand-100 transition-colors"
              >
                <Utensils className="w-3.5 h-3.5" />
                {selectedCategory}
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
            {(priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setPriceRange([priceBounds.min, priceBounds.max])}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-medium rounded-full hover:bg-brand-100 transition-colors"
              >
                ৳{priceRange[0]} - ৳{priceRange[1]}
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
            {availability !== "all" && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setAvailability("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 text-sm font-medium rounded-full hover:bg-brand-100 transition-colors capitalize"
              >
                {availability}
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        )}

        {/* Meals Grid - Modern Food Delivery Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 min-w-0">
          {paginatedMeals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={meal.image || "/placeholder-meal.jpg"}
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  unoptimized
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {!meal.isAvailable && (
                    <Badge variant="destructive" className="text-xs px-2 py-0.5">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Quick Add Button (Desktop) */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Button
                    size="sm"
                    disabled={!meal.isAvailable}
                    className="bg-white text-foreground hover:bg-brand-50 shadow-lg"
                    onClick={async () => {
                      if (!user) {
                        toast.error("Please login to add items to cart");
                        return;
                      }
                      try {
                        setAddingId(meal.id);
                        const res = await cartService.addToCart({
                          mealId: meal.id,
                          quantity: 1,
                        });
                        if (res.success) toast.success("Added to cart");
                        else toast.error(res.message || "Failed to add to cart");
                      } catch {
                        toast.error("Something went wrong");
                      } finally {
                        setAddingId(null);
                      }
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Quick Add
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Restaurant Name */}
                <p className="text-xs text-brand-600 font-medium mb-1 flex items-center gap-1">
                  <Utensils className="w-3 h-3" />
                  {meal.provider.restaurantName}
                </p>

                {/* Meal Name */}
                <h3 className="font-semibold text-foreground text-lg leading-tight mb-1 group-hover:text-brand-600 transition-colors">
                  {meal.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                  {meal.description}
                </p>

                {/* Rating & Time Row */}
                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.5
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    25-35 min
                  </span>
                </div>

                {/* Price & Actions Row */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Price</span>
                    <span className="text-xl font-bold text-brand-600">
                      ৳{meal.price}
                    </span>
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="flex items-center gap-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-muted rounded-lg">
                      <button
                        onClick={() =>
                          setQuantities((q) => ({
                            ...q,
                            [meal.id]: Math.max(1, (q[meal.id] || 1) - 1),
                          }))
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-l-lg hover:bg-muted-foreground/10 transition-colors text-muted-foreground"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {quantities[meal.id] || 1}
                      </span>
                      <button
                        onClick={() =>
                          setQuantities((q) => ({
                            ...q,
                            [meal.id]: (q[meal.id] || 1) + 1,
                          }))
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-r-lg hover:bg-muted-foreground/10 transition-colors text-muted-foreground"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add Button */}
                    <Button
                      size="sm"
                      disabled={!meal.isAvailable || addingId === meal.id}
                      onClick={async () => {
                        if (!user) {
                          toast.error("Please login to add items to cart");
                          return;
                        }
                        try {
                          setAddingId(meal.id);
                          const quantity = quantities[meal.id] || 1;
                          const res = await cartService.addToCart({
                            mealId: meal.id,
                            quantity,
                          });
                          if (res.success) toast.success("Added to cart");
                          else toast.error(res.message || "Failed to add to cart");
                        } catch {
                          toast.error("Something went wrong");
                        } finally {
                          setAddingId(null);
                        }
                      }}
                      className="bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-4"
                    >
                      {addingId === meal.id ? (
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </span>
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </Button>

                    {/* Details Button */}
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-lg px-3 border-border hover:bg-muted"
                    >
                      <Link href={`/meals/${meal.id}`}>Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 flex-wrap pt-4">
            <div className="flex items-center gap-1 bg-card rounded-xl p-1.5 border border-border/50 shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="h-9 w-9 rounded-lg hover:bg-muted"
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-9 w-9 rounded-lg hover:bg-muted"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="h-6 w-px bg-border mx-1" />

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  if (pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition-all ${
                        page === pageNum
                          ? "bg-brand-500 text-white shadow-md"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <div className="h-6 w-px bg-border mx-1" />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-9 w-9 rounded-lg hover:bg-muted"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="h-9 w-9 rounded-lg hover:bg-muted"
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MealsClient;