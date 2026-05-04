/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { providerService } from "@/services/provider.service";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, MapPin, ShoppingBag, Store, Star } from "lucide-react";

interface Provider {
  id: string;
  restaurantName: string;
  address: string;
  logo?: string | null;
  orders?: any[];
  rating?: number;
  cuisine?: string;
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

export default function PopularMealsProviderSection() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await providerService.getAllProviders();
        const data = res.data || [];
        setProviders(data);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Sort by order count
  const sortedProviders = [...providers].sort(
    (a, b) => (b.orders?.length || 0) - (a.orders?.length || 0),
  );

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-gray-200 dark:bg-muted rounded-lg" />
              <div className="h-10 w-32 bg-gray-200 dark:bg-muted rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-72 bg-gray-200 dark:bg-muted rounded-2xl border border-gray-300 dark:border-border" />
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-3xl -z-10 translate-x-1/2" />

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
              <Store className="w-3 h-3" />
              Top Rated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Popular <span className="gradient-text">Providers</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Discover the most loved restaurants in your area
            </p>
          </div>

          <Link href="/providers">
            <Button
              variant="outline"
              className="group gap-2 border-2 hover:border-brand-300 hover:bg-brand-50 rounded-xl px-6"
            >
              See All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Providers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sortedProviders.slice(0, 4).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  const [isHovered, setIsHovered] = useState(false);
  const orderCount = provider.orders?.length || 0;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 p-0">
        {/* Image/Logo Container */}
        <div className="relative h-44 overflow-hidden bg-card">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {provider.logo ? (
              <div className="w-full h-full flex items-center justify-center bg-white p-4">
                <Image
                  src={provider.logo}
                  alt={provider.restaurantName}
                  fill
                className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-card shadow-md flex items-center justify-center text-4xl">
                  🍽️
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            <ShoppingBag className="w-3 h-3" />
            {orderCount}
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-brand-600 transition-colors">
              {provider.restaurantName}
            </h3>
            <div className="flex items-center gap-1 text-xs font-medium">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{provider.rating || 4.5}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{provider.address}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <span className="text-xs text-muted-foreground">
              {orderCount > 0 ? `${orderCount} orders delivered` : "New Partner"}
            </span>
            <Link href={`/providers/${provider.id}`}>
              <button className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                View Menu →
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}