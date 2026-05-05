"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function ProviderReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">
          Customer feedback and ratings for your restaurant.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-brand-500" />
            Customer Reviews
          </CardTitle>
          <CardDescription>
            See what your customers are saying about your food.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No reviews yet. Encourage your customers to leave feedback!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
