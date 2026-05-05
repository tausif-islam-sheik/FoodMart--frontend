"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Utensils, ArrowRight, Star, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ProviderCardProps {
  provider: any;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const mealCount = provider.meals?.length || 0;

  return (
    <Link href={`/providers/${provider.id}`}>
      <Card className="group overflow-hidden border-border/50 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 bg-card p-0 cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {provider.logo ? (
            <Image
              src={provider.logo}
              alt={provider.restaurantName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
              <span className="text-5xl font-bold text-brand-600">
                {provider.restaurantName.charAt(0)}
              </span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Meal Count Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/95 text-foreground hover:bg-white border-0 shadow-md">
              <Utensils className="w-3 h-3 mr-1.5 text-brand-500" />
              {mealCount} {mealCount === 1 ? "Meal" : "Meals"}
            </Badge>
          </div>

          {/* Rating Badge (if available) */}
          {provider.rating && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-amber-500/90 text-white hover:bg-amber-500 border-0 shadow-md">
                <Star className="w-3 h-3 mr-1 fill-white" />
                {provider.rating}
              </Badge>
            </div>
          )}

          {/* Restaurant Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-brand-100 transition-colors">
              {provider.restaurantName}
            </h3>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Info Section */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
              <span className="line-clamp-2">{provider.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-brand-500 shrink-0" />
              <span>{provider.phone}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60" />

          {/* CTA Row */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
              View Menu
            </span>
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
              <ChevronRight className="w-4 h-4 text-brand-600 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProviderCard;