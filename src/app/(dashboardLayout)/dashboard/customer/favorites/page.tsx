"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Favorites</h1>
        <p className="text-muted-foreground">
          Your favorite meals and restaurants.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-500" />
            Saved Favorites
          </CardTitle>
          <CardDescription>
            Meals and restaurants you have marked as favorites will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No favorites yet. Start exploring and save your favorite meals!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
