import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Percent, Ticket, Truck, Copy, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Offers & Deals | FoodMart - Special Discounts",
  description: "Discover the latest offers, discounts, and deals on FoodMart. Save big on your favorite meals!",
};

const offers = [
  {
    id: 1,
    title: "First Order Discount",
    description: "Get 25% off on your first order with FoodMart. Minimum order value ৳500.",
    code: "FIRST25",
    discount: "25% OFF",
    type: "percentage",
    validUntil: "Dec 31, 2025",
    icon: Gift,
    color: "bg-orange-500",
  },
  {
    id: 2,
    title: "Free Delivery",
    description: "Enjoy free delivery on all orders above ৳1000. No code needed!",
    code: "FREEDEL",
    discount: "Free Delivery",
    type: "delivery",
    validUntil: "Jan 31, 2025",
    icon: Truck,
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "Weekend Special",
    description: "Flat ৳150 off on weekend orders. Use code WEEKEND150.",
    code: "WEEKEND150",
    discount: "৳150 OFF",
    type: "fixed",
    validUntil: "Every Weekend",
    icon: Ticket,
    color: "bg-orange-500",
  },
  {
    id: 4,
    title: "Student Discount",
    description: "Students get 20% off on all orders. Verify your student ID.",
    code: "STUDENT20",
    discount: "20% OFF",
    type: "percentage",
    validUntil: "Dec 31, 2025",
    icon: Percent,
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Family Feast",
    description: "Order for 4+ people and get 15% off. Perfect for family meals!",
    code: "FAMILY15",
    discount: "15% OFF",
    type: "percentage",
    validUntil: "Dec 31, 2025",
    icon: Gift,
    color: "bg-orange-500",
  },
  {
    id: 6,
    title: "Lunch Special",
    description: "30% off on lunch orders between 12 PM - 3 PM.",
    code: "LUNCH30",
    discount: "30% OFF",
    type: "percentage",
    validUntil: "Daily",
    icon: Clock,
    color: "bg-orange-500",
  },
];

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Special Offers & Deals
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Save big on your favorite meals with our exclusive discounts and promotions.
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <Card key={offer.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`${offer.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge className="bg-white/20 text-white border-0 font-bold text-lg">
                      {offer.discount}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground mb-4">{offer.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 bg-muted rounded-lg px-3 py-2 flex items-center justify-between">
                      <code className="text-sm font-mono text-orange-600">{offer.code}</code>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Valid until: {offer.validUntil}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-0">
            <CardContent className="p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want More Exclusive Deals?
              </h2>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter and be the first to know about new offers and promotions.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-white/90">
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
