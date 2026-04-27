"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CategoryData, categoryService } from "@/services/category.service";
import { MealData, mealService } from "@/services/meal.service";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Grid3X3, ChefHat, Pizza, Coffee, Salad, Soup, Sandwich, Beef, Fish, Apple, IceCream, Croissant, Drumstick, Egg, Flame, UtensilsCrossed, Cookie, CupSoda, Milk } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Pizza": <Pizza className="w-6 h-6" />,
  "Italian": <Pizza className="w-6 h-6" />,
  "Burger": <Beef className="w-6 h-6" />,
  "Fast Food": <Sandwich className="w-6 h-6" />,
  "Sandwich": <Sandwich className="w-6 h-6" />,
  "Coffee": <Coffee className="w-6 h-6" />,
  "Cafe": <Coffee className="w-6 h-6" />,
  "Beverages": <CupSoda className="w-6 h-6" />,
  "Drinks": <CupSoda className="w-6 h-6" />,
  "Salad": <Salad className="w-6 h-6" />,
  "Healthy": <Salad className="w-6 h-6" />,
  "Vegan": <Apple className="w-6 h-6" />,
  "Vegetarian": <Apple className="w-6 h-6" />,
  "Soup": <Soup className="w-6 h-6" />,
  "Dessert": <IceCream className="w-6 h-6" />,
  "Sweets": <Cookie className="w-6 h-6" />,
  "Bakery": <Croissant className="w-6 h-6" />,
  "Breakfast": <Egg className="w-6 h-6" />,
  "Brunch": <Egg className="w-6 h-6" />,
  "Seafood": <Fish className="w-6 h-6" />,
  "Sushi": <Fish className="w-6 h-6" />,
  "Chicken": <Drumstick className="w-6 h-6" />,
  "BBQ": <Flame className="w-6 h-6" />,
  "Grill": <Flame className="w-6 h-6" />,
  "Asian": <UtensilsCrossed className="w-6 h-6" />,
  "Chinese": <UtensilsCrossed className="w-6 h-6" />,
  "Japanese": <UtensilsCrossed className="w-6 h-6" />,
  "Indian": <UtensilsCrossed className="w-6 h-6" />,
  "Mexican": <UtensilsCrossed className="w-6 h-6" />,
  "Thai": <UtensilsCrossed className="w-6 h-6" />,
  "Milkshake": <Milk className="w-6 h-6" />,
};

const gradients = [
  "from-red-500 to-orange-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-purple-500",
];

interface CategoryWithCount extends CategoryData {
  mealCount: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function CategorySection() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, mealRes] = await Promise.all([
          categoryService.getAllCategories(),
          mealService.getAllMeals(),
        ]);

        const cats = catRes.data || [];
        const meals = mealRes.data || mealRes || [];

        // Count meals per category
        const categoryMealCount: Record<string, number> = {};
        (meals as MealData[]).forEach((meal: MealData) => {
          if (meal.categoryId) {
            categoryMealCount[meal.categoryId] =
              (categoryMealCount[meal.categoryId] || 0) + 1;
          }
        });

        const sorted = (cats as CategoryData[])
          .map((cat: CategoryData) => ({
            ...cat,
            mealCount: categoryMealCount[cat.id!] || 0,
          }))
          .sort((a, b) => b.mealCount - a.mealCount)
          .slice(0, 6);

        setCategories(sorted);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="h-8 w-48 bg-muted rounded-lg" />
              <div className="h-10 w-32 bg-muted rounded-lg" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-36 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-100/20 rounded-full blur-3xl -z-10 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full">
              <Grid3X3 className="w-3 h-3" />
              Browse by Type
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Popular <span className="gradient-text">Categories</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Explore our wide range of food categories
            </p>
          </div>

          <Link href="/meals">
            <Button
              variant="outline"
              className="group gap-2 border-2 hover:border-brand-300 hover:bg-brand-50 rounded-xl px-6"
            >
              See All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat, idx) => (
            <CategoryCard key={cat.id} category={cat} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: CategoryWithCount; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = gradients[index % gradients.length];
  
  // Get icon based on name or default to Grid3X3
  const icon = iconMap[category.name] || <Grid3X3 className="w-6 h-6" />;
  
  // Get initials for fallback
  const initials = category.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/meals?category=${category.id}`}>
        <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 p-0 cursor-pointer">
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          <div className="relative p-6 flex flex-col items-center text-center space-y-3">
            {/* Icon Circle */}
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
            >
              {icon}
            </motion.div>

            {/* Category Name */}
            <h3 className="font-semibold text-foreground group-hover:text-brand-600 transition-colors">
              {category.name}
            </h3>

            {/* Meal Count */}
            <p className="text-xs text-muted-foreground">
              {category.mealCount} {category.mealCount === 1 ? "meal" : "meals"}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
