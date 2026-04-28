"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ShoppingCart, Utensils, Star, ArrowRight, PackageX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";


interface ProviderMealsClientProps {
  meals: any[];
}

export default function ProviderMealsClient({
  meals,
}: ProviderMealsClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 6;

  const totalPages = Math.ceil(meals.length / perPage);

  const paginatedMeals = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return meals.slice(start, start + perPage);
  }, [currentPage, meals]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
            <Utensils className="w-4 h-4 text-brand-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Menu</h2>
            <p className="text-xs text-muted-foreground">
              {meals.length} {meals.length === 1 ? "item" : "items"} available
            </p>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {paginatedMeals.length > 0 ? (
          paginatedMeals.map((meal: any) => (
            <Card key={meal.id} className="group overflow-hidden border-border/50 hover:border-brand-200 hover:shadow-lg transition-all duration-300 bg-card p-0">
              {/* Image Container */}
              <div className="relative w-full h-40 sm:h-44 overflow-hidden">
                {meal.image ? (
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-brand-600">
                      {meal.name.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Category Badge */}
                {meal.category && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-background/95 text-foreground hover:bg-background border border-border/50 shadow-sm text-xs">
                      {meal.category.name}
                    </Badge>
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute bottom-3 right-3">
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-brand-600 text-primary-foreground rounded-lg text-sm font-semibold shadow-md">
                    <span>৳</span>
                    <span>{meal.price}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 space-y-3">
                {/* Title & Rating */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-brand-600 transition-colors">
                    {meal.name}
                  </h3>
                  {meal.rating && (
                    <div className="flex items-center gap-0.5 text-xs text-muted-foreground shrink-0">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{meal.rating}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {meal.description}
                </p>

                {/* CTA Button */}
                <Link href={`/meals/${meal.id}`} className="block">
                  <Button
                    variant={meal.isAvailable ? "default" : "secondary"}
                    disabled={!meal.isAvailable}
                    className={`w-full group/btn ${
                      meal.isAvailable
                        ? "bg-brand-600 hover:bg-brand-700 text-white"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {meal.isAvailable ? (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        <span>Order Now</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </>
                    ) : (
                      <>
                        <PackageX className="w-4 h-4 mr-2" />
                        <span>Unavailable</span>
                      </>
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 sm:py-16">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No meals available
              </h3>
              <p className="text-sm text-muted-foreground">
                This provider hasn&apos;t added any meals yet. Check back later for updates.
              </p>
            </div>
          </div>
        )}
      </div>

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