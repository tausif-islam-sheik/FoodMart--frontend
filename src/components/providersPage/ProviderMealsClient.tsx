"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Utensils, Star, ArrowRight, PackageX, ChefHat, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ProviderMealsClientProps {
  meals: any[];
  providerName?: string;
}

export default function ProviderMealsClient({
  meals,
  providerName,
}: ProviderMealsClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 6;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const totalPages = Math.ceil(meals.length / perPage);

  const paginatedMeals = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return meals.slice(start, start + perPage);
  }, [currentPage, meals]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {providerName ? `${providerName}'s Menu` : "Menu"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {meals.length} {meals.length === 1 ? "delicious item" : "delicious items"} available
            </p>
          </div>
        </div>

        {meals.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Fresh & ready to order</span>
          </div>
        )}
      </div>

      {/* Meals Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {paginatedMeals.length > 0 ? (
          paginatedMeals.map((meal: any) => (
            <motion.div key={meal.id} variants={itemVariants}>
              <Card className="group overflow-hidden border-border/50 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 bg-card p-0">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {meal.image ? (
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                      <span className="text-4xl font-bold text-brand-600">
                        {meal.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Category Badge */}
                  {meal.category && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/95 text-foreground hover:bg-white border-0 shadow-md">
                        {meal.category.name}
                      </Badge>
                    </div>
                  )}

                  {/* Rating Badge */}
                  {meal.rating && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-amber-500/90 text-white hover:bg-amber-500 border-0 shadow-md">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        {meal.rating}
                      </Badge>
                    </div>
                  )}

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-lg">
                      <span>৳</span>
                      <span>{meal.price}</span>
                    </div>
                  </div>

                  {/* Meal Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-brand-100 transition-colors">
                      {meal.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {meal.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-border/60" />

                  {/* CTA Row */}
                  <Link href={`/meals/${meal.id}`} className="block">
                    <Button
                      variant={meal.isAvailable ? "default" : "secondary"}
                      disabled={!meal.isAvailable}
                      className={`w-full h-12 rounded-xl font-semibold ${
                        meal.isAvailable
                          ? "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {meal.isAvailable ? (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          <span>Order Now</span>
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      ) : (
                        <>
                          <PackageX className="w-4 h-4 mr-2" />
                          <span>Currently Unavailable</span>
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </Card>
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
                <Utensils className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                No meals available
              </h3>
              <p className="text-muted-foreground mb-6">
                This provider hasn&apos;t added any meals yet. Check back later for updates.
              </p>
              <Link href="/meals">
                <Button className="bg-brand-500 hover:bg-brand-600 text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Browse All Meals
                </Button>
              </Link>
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