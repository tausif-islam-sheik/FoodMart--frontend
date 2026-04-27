"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mealService } from "@/services/meal.service";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, Heart, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface MealData {
  id: string;
  name: string;
  image?: string | null;
  price: number;
  createdAt?: string;
  provider?: string | { restaurantName?: string; [key: string]: any };
  rating?: number;
  deliveryTime?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function RecentMeals() {
  const [meals, setMeals] = useState<MealData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsRes = await mealService.getAllMeals();
        
        // Handle different response structures: { success: true, data: [...] } or direct array
        const mealsData = mealsRes.data || mealsRes || [];
        const fetchedMeals: MealData[] = Array.isArray(mealsData) ? mealsData : [];
        
        // Filter only valid meals (must have name and price)
        const validMeals = fetchedMeals.filter(
          (meal): meal is MealData => 
            meal && 
            typeof meal === "object" && 
            "name" in meal && 
            "price" in meal &&
            typeof meal.name === "string" &&
            typeof meal.price === "number"
        );
        
        // Sort by createdAt descending and take 4
        const recentMeals = validMeals
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime(),
          )
          .slice(0, 4)
          .map((meal) => {
            // Handle provider being either a string or an object from Prisma
            const providerName = 
              typeof meal.provider === "string" 
                ? meal.provider 
                : meal.provider?.restaurantName || "Featured Restaurant";
            
            return {
              ...meal,
              provider: providerName,
              rating: meal.rating || 4.5,
              deliveryTime: meal.deliveryTime || "25-35 min",
            };
          });
        setMeals(recentMeals);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-muted rounded-lg" />
              <div className="h-10 w-32 bg-muted rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-100/30 rounded-full blur-3xl -z-10" />
      
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
              <Star className="w-3 h-3" />
              Fresh Arrivals
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Recent <span className="gradient-text">Meals</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Discover the latest additions to our menu, fresh from the kitchen
            </p>
          </div>
          
          <Link href="/meals">
            <Button
              variant="outline"
              className="group gap-2 border-2 hover:border-brand-300 hover:bg-brand-50 rounded-xl px-6"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Meals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {meals.map((meal, index) => (
            <MealCard key={meal.id} meal={meal} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MealCard({ meal, index }: { meal: MealData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden rounded-2xl border-0 bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 p-0">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          {meal.image ? (
            <motion.img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
              <span className="text-6xl">🍽️</span>
            </div>
          )}
          
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-lg shadow-sm">
              New
            </span>
          </div>
          
          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
          
          {/* Quick Add Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <button className="w-full py-2.5 bg-white text-foreground font-medium rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-brand-50 transition-colors">
              <Plus className="w-4 h-4" />
              Quick Add
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-brand-600 transition-colors">
              {meal.name}
            </h3>
            <div className="flex items-center gap-1 text-xs font-medium">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{meal.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1">
            {meal.provider}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {meal.deliveryTime}
            </div>
            <span className="text-lg font-bold gradient-text">
              ৳{meal.price.toFixed(0)}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
