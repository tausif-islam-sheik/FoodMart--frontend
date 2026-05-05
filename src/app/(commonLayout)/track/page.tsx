import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Clock, CheckCircle, Truck, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Track Order | FoodMart - Order Tracking",
  description: "Track your FoodMart order in real-time. Enter your order ID to see the current status.",
};

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Track Your Order
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Enter your order ID to track your food delivery in real-time.
          </p>
        </div>
      </div>

      {/* Track Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="orderId" className="sr-only">Order ID</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="orderId"
                    placeholder="Enter your Order ID (e.g., ORD-123456)"
                    className="pl-11 h-14"
                  />
                </div>
              </div>
              <Button className="h-14 px-8 bg-orange-600 hover:bg-orange-700">
                Track
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sample Order Status */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order #ORD-123456
                </CardTitle>
                <CardDescription>
                  Placed on January 15, 2025 at 2:30 PM
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                Out for Delivery
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Order Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
              
              <div className="space-y-8">
                {/* Step 1 - Completed */}
                <div className="relative flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0 relative z-10">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold">Order Confirmed</h3>
                    <p className="text-sm text-muted-foreground">Your order has been received and confirmed</p>
                    <p className="text-xs text-muted-foreground mt-1">2:30 PM</p>
                  </div>
                </div>

                {/* Step 2 - Completed */}
                <div className="relative flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0 relative z-10">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold">Preparing Your Food</h3>
                    <p className="text-sm text-muted-foreground">The restaurant is preparing your order</p>
                    <p className="text-xs text-muted-foreground mt-1">2:35 PM</p>
                  </div>
                </div>

                {/* Step 3 - Completed */}
                <div className="relative flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0 relative z-10">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold">Ready for Pickup</h3>
                    <p className="text-sm text-muted-foreground">Your order is ready and waiting for the delivery partner</p>
                    <p className="text-xs text-muted-foreground mt-1">2:55 PM</p>
                  </div>
                </div>

                {/* Step 4 - Active */}
                <div className="relative flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0 relative z-10 ring-4 ring-orange-100">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-orange-600">Out for Delivery</h3>
                    <p className="text-sm text-muted-foreground">Rahim is on the way with your order</p>
                    <p className="text-xs text-muted-foreground mt-1">3:00 PM</p>
                  </div>
                </div>

                {/* Step 5 - Pending */}
                <div className="relative flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0 relative z-10">
                    <MapPin className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-muted-foreground">Delivered</h3>
                    <p className="text-sm text-muted-foreground">Estimated arrival: 3:15 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Partner Info */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl">👨‍🚀</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Rahim Uddin</h3>
                <p className="text-sm text-muted-foreground">Your Delivery Partner</p>
                <p className="text-sm text-green-600">Arriving in 15 minutes</p>
              </div>
              <Button variant="outline">Call</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
