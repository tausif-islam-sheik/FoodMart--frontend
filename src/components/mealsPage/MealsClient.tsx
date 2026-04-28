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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <main className="flex-1 space-y-4 lg:space-y-6 w-full">
        {/* Search Bar */}
        <div className="bg-card rounded-lg shadow-lg border border-border/50 p-4 lg:p-5 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-9 h-10 text-sm rounded-lg w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                {selectedCategory}
                <button onClick={() => setSelectedCategory(null)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {(priceRange[0] > priceBounds.min || priceRange[1] < priceBounds.max) && (
              <Badge variant="secondary" className="gap-1 px-3 py-1.5">
                ৳{priceRange[0]} - ৳{priceRange[1]}
                <button onClick={() => setPriceRange([priceBounds.min, priceBounds.max])}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {availability !== "all" && (
              <Badge variant="secondary" className="gap-1 px-3 py-1.5 capitalize">
                {availability}
                <button onClick={() => setAvailability("all")}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 min-w-0">
          {paginatedMeals.map((meal) => (
            <Card key={meal.id} className="flex flex-col overflow-hidden pt-0">
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={meal.image || "/placeholder-meal.jpg"}
                  alt={meal.name}
                  fill
                  className="block object-cover transition-transform duration-300 ease-out hover:scale-110"
                  unoptimized
                />
              </div>

              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-base font-semibold">{meal.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {meal.provider.restaurantName}
                </p>
              </CardHeader>

              <CardContent className="space-y-1.5 p-3 pt-1">
                <p className="text-xs line-clamp-2 text-muted-foreground leading-relaxed">{meal.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold text-orange-600">
                    ৳ {meal.price}
                  </span>
                  <Badge variant={meal.isAvailable ? "default" : "destructive"}>
                    {meal.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex flex-col gap-2 p-3 pt-1">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() =>
                      setQuantities((q) => ({
                        ...q,
                        [meal.id]: Math.max(1, (q[meal.id] || 1) - 1),
                      }))
                    }
                  >
                    -
                  </Button>

                  <span className="min-w-6 text-center text-sm font-medium">
                    {quantities[meal.id] || 1}
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() =>
                      setQuantities((q) => ({
                        ...q,
                        [meal.id]: (q[meal.id] || 1) + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </div>

                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1 gap-1 bg-orange-600 hover:bg-orange-700 text-white cursor-pointer text-xs"
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

                        if (res.success) {
                          toast.success("Added to cart");
                        } else {
                          toast.error(res.message || "Failed to add to cart");
                        }
                      } catch (error) {
                        toast.error("Something went wrong");
                      } finally {
                        setAddingId(null);
                      }
                    }}
                  >
                    <ShoppingCart className="w-3 h-3" />
                    {addingId === meal.id ? "Adding..." : "Add"}
                  </Button>

                  <Button asChild variant="outline" className="flex-1 text-xs">
                    <Link href={`/meals/${meal.id}`}>Details</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="cursor-pointer"
            >
              <ChevronsLeft size={18} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="cursor-pointer"
            >
              <ChevronLeft size={18} />
            </Button>

            <span className="px-4 text-sm font-medium">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="cursor-pointer"
            >
              <ChevronRight size={18} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="cursor-pointer"
            >
              <ChevronsRight size={18} />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MealsClient;