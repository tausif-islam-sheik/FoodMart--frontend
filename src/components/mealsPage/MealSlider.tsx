"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Star, Clock, ShoppingBag, ChevronLeft, ChevronRight, Utensils } from "lucide-react";

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

interface MealSliderProps {
  title: string;
  meals: Meal[];
}

const ITEMS_PER_SLIDE = 4;

const MealSlider = ({ title, meals }: MealSliderProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + ITEMS_PER_SLIDE;
  const totalSlides = Math.ceil(meals.length / ITEMS_PER_SLIDE);

  const prev = () =>
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_SLIDE, 0));
  const next = () =>
    setStartIndex((prev) =>
      Math.min(prev + ITEMS_PER_SLIDE, (totalSlides - 1) * ITEMS_PER_SLIDE),
    );

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
            <Utensils className="w-4 h-4 text-brand-600" />
          </div>
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {Math.min(startIndex + ITEMS_PER_SLIDE, meals.length)} / {meals.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-4">
        {/* Left Button (Desktop) */}
        <Button
          size="icon"
          onClick={prev}
          disabled={startIndex === 0}
          className="hidden md:flex h-auto min-h-[120px] w-10 rounded-xl bg-muted hover:bg-muted-foreground/20 text-muted-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Slider Grid - Modern Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {meals.slice(startIndex, endIndex).map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={meal.image || "/placeholder-meal.jpg"}
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-foreground text-xs font-medium backdrop-blur-sm">
                    {meal.category.name}
                  </Badge>
                </div>

                {/* Availability Badge */}
                {!meal.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                {/* Restaurant */}
                <p className="text-xs text-brand-600 font-medium mb-1">
                  {meal.provider.restaurantName}
                </p>

                {/* Name */}
                <h3 className="font-semibold text-foreground text-base leading-tight mb-1 group-hover:text-brand-600 transition-colors line-clamp-1">
                  {meal.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                  {meal.description}
                </p>

                {/* Rating & Time */}
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

                {/* Price & Button Row */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div>
                    <span className="text-xs text-muted-foreground">Price</span>
                    <p className="text-lg font-bold text-brand-600">৳{meal.price}</p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    disabled={!meal.isAvailable}
                    className="bg-brand-500 hover:bg-brand-600 text-white rounded-lg px-4 h-10"
                  >
                    <Link href={`/meals/${meal.id}`} className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" />
                      Order
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Button (Desktop) */}
        <Button
          size="icon"
          onClick={next}
          disabled={startIndex + ITEMS_PER_SLIDE >= meals.length}
          className="hidden md:flex h-auto min-h-[120px] w-10 rounded-xl bg-muted hover:bg-muted-foreground/20 text-muted-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-3 md:hidden">
          <Button
            size="sm"
            onClick={prev}
            disabled={startIndex === 0}
            className="rounded-xl bg-muted hover:bg-muted-foreground/20 text-foreground h-10 px-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button
            size="sm"
            onClick={next}
            disabled={startIndex + ITEMS_PER_SLIDE >= meals.length}
            className="rounded-xl bg-muted hover:bg-muted-foreground/20 text-foreground h-10 px-6"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealSlider;