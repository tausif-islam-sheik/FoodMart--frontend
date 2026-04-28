/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { MapPin, Phone, Utensils, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProviderCardProps {
  provider: any;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  // Calculate meal count
  const mealCount = provider.meals?.length || 0;

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-brand-200 hover:shadow-lg transition-all duration-300 bg-white p-0">
      {/* Image Container - Full bleed to edges */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden">
        {provider.logo ? (
          <Image
            src={provider.logo}
            alt={provider.restaurantName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-4xl font-bold text-brand-600">
              {provider.restaurantName.charAt(0)}
            </span>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Meal Count Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/95 text-foreground hover:bg-white border-0 shadow-sm">
            <Utensils className="w-3 h-3 mr-1 text-brand-600" />
            {mealCount} {mealCount === 1 ? "Meal" : "Meals"}
          </Badge>
        </div>

        {/* Restaurant Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white leading-tight">
            {provider.restaurantName}
          </h3>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Info Section */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
            <span className="line-clamp-2">{provider.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-brand-600 shrink-0" />
            <span>{provider.phone}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/providers/${provider.id}`} className="block">
          <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white group/btn">
            <span>View Menu</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;