"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Apple,
  Play,
  Smartphone,
  Star,
  Download,
  Bell,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { useState, useEffect } from "react";
import { mealService } from "@/services/meal.service";
import { providerService } from "@/services/provider.service";
import Image from "next/image";

interface Meal {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
  image?: string;
  provider?: {
    id?: string;
    restaurantName?: string;
    name?: string;
    logo?: string;
  };
}

interface ProviderWithMeal {
  provider: {
    id: string;
    restaurantName: string;
    logo?: string;
  };
  meal: Meal;
}

export default function AppDownload() {
  const [providerMeals, setProviderMeals] = useState<ProviderWithMeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvidersAndMeals = async () => {
      try {
        // Fetch both providers and meals
        const [providersRes, mealsRes] = await Promise.all([
          providerService.getAllProviders(),
          mealService.getAllMeals(),
        ]);

        const providers = providersRes.data || [];
        const meals = mealsRes.data || [];

        // Get first 3 providers with their meals
        const first3Providers = providers.slice(0, 3);
        const providerMealData: ProviderWithMeal[] = [];

        for (const provider of first3Providers) {
          // Find a meal from this provider
          const providerMeal = meals.find(
            (m: Meal) =>
              m.provider?.id === provider.id ||
              m.provider?.restaurantName === provider.restaurantName,
          );

          if (providerMeal) {
            providerMealData.push({
              provider: {
                id: provider.id,
                restaurantName: provider.restaurantName,
                logo: provider.logo,
              },
              meal: providerMeal,
            });
          }
        }

        setProviderMeals(providerMealData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvidersAndMeals();
  }, []);
  return (
    <section id="app-download" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 p-8 md:p-12 lg:p-16"
        >
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full mb-4"
              >
                <Smartphone className="w-3 h-3" />
                Download Our App
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                Order Food Anytime,{" "}
                <span className="text-amber-100">Anywhere</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-lg mb-6 max-w-lg"
              >
                Get the best food delivery experience with the FoodMart app.
                Track orders in real-time, get exclusive app-only deals, and
                reorder your favorites with one tap.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                {[
                  {
                    icon: <Bell className="w-4 h-4" />,
                    text: "Live Notifications",
                  },
                  {
                    icon: <MapPin className="w-4 h-4" />,
                    text: "Live Tracking",
                  },
                  {
                    icon: <Star className="w-4 h-4" />,
                    text: "Exclusive Deals",
                  },
                ].map((feature, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-sm text-white/80"
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      {feature.icon}
                    </span>
                    {feature.text}
                  </span>
                ))}
              </motion.div>

              {/* App Store Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 h-14 gap-3 shadow-lg shadow-black/20 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <Apple className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">
                      Download on the
                    </div>
                    <div className="text-sm font-semibold -mt-0.5">
                      App Store
                    </div>
                  </div>
                </Button>

                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 h-14 gap-3 shadow-lg shadow-black/20 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <Play className="w-7 h-7 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">Get it on</div>
                    <div className="text-sm font-semibold -mt-0.5">
                      Google Play
                    </div>
                  </div>
                </Button>
              </motion.div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 mt-6"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-300 text-amber-300"
                    />
                  ))}
                </div>
                <span className="text-white/90 text-sm">
                  <strong>4.9</strong> rating on App Store & Play Store
                </span>
              </motion.div>
            </div>

            {/* Right - Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Phone Frame - Larger */}
                <div className="w-72 h-[550px] bg-gray-900 rounded-[44px] p-3 shadow-2xl shadow-black/30 relative overflow-hidden border-4 border-gray-800 scale-110">
                  {/* Screen */}
                  <div className="w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 rounded-[32px] overflow-hidden relative">
                    {/* App Header */}
                    <div className="bg-brand-500 p-4 text-white ">
                      <div className="flex items-center justify-between mb-3">
                        {/* FoodMart Logo */}
                        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1">
                          <span className="text-[1.30rem] lg:text-[1.20rem] italic font-sans">
                            <span className="text-gray-900">Food</span>
                            <span className="font-bold text-brand-600">
                              Mart
                            </span>
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/20" />
                      </div>
                      <div className="text-xs opacity-90">Delivering to</div>
                      <div className="text-sm font-medium">
                        Dhanmondi, Dhaka
                      </div>
                    </div>

                    {/* App Content - Food Items - Real Data from Different Providers */}
                    <div className="p-3 space-y-3">
                      {loading ? (
                        // Skeleton loading
                        [...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm"
                          >
                            <div className="w-12 h-12 rounded-lg bg-gray-100 animate-pulse shrink-0" />
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="h-3 bg-gray-100 rounded animate-pulse w-20" />
                              <div className="h-2 bg-gray-100 rounded animate-pulse w-12" />
                            </div>
                            <div className="h-3 bg-gray-100 rounded animate-pulse w-10 shrink-0" />
                          </div>
                        ))
                      ) : providerMeals.length > 0 ? (
                        providerMeals.map(({ provider, meal }) => (
                          <div
                            key={meal.id}
                            className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm"
                          >
                            {/* Food Image */}
                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative">
                              {meal.image ? (
                                <Image
                                  src={meal.image}
                                  alt={meal.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg">
                                  🍽️
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-semibold text-gray-900 truncate">
                                {meal.name}
                              </div>
                              <div className="text-[10px] text-gray-500">
                                {meal.deliveryTime || "25-35 min"}
                              </div>
                            </div>
                            <div className="text-xs font-bold text-brand-600 shrink-0">
                              ৳{meal.price.toFixed(0)}
                            </div>
                          </div>
                        ))
                      ) : (
                        // Fallback if no data
                        <div className="text-center py-4 text-xs text-gray-400">
                          No meals available
                        </div>
                      )}
                    </div>

                    {/* Floating Badge - More Prominent */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full px-4 py-2 shadow-xl shadow-orange-500/30 flex items-center gap-2"
                    >
                      <span className="text-xl">🎉</span>
                      <span className="text-sm font-bold text-white">
                        Get 50% OFF!
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl"
                >
                  🚀
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-4 -left-4 w-14 h-14 bg-amber-300 rounded-full shadow-xl flex items-center justify-center"
                >
                  <Download className="w-6 h-6 text-amber-800" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
