"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderData, orderService } from "@/services/order.service";
import { mealService } from "@/services/meal.service";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  MapPin,
  Minus,
  Plus,
  Truck,
  Clock,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  Star,
  Utensils,
  Store,
  Shield,
  Loader2,
} from "lucide-react";

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [fetchingMeal, setFetchingMeal] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [meal, setMeal] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const mealId = searchParams.get("mealId");
  const initialQty = parseInt(searchParams.get("quantity") || "1");

  useEffect(() => {
    setQuantity(initialQty);
    fetchMealAndUser();
  }, [mealId, initialQty]);

  const fetchMealAndUser = async () => {
    if (!mealId) {
      toast.error("No meal selected");
      router.push("/meals");
      return;
    }

    try {
      setFetchingMeal(true);
      const [mealRes, userRes] = await Promise.all([
        mealService.getMealById(mealId),
        fetch(`${AUTH_API}/get-session`, {
          credentials: "include",
          cache: "no-store",
        }).then(async (res) => {
          if (!res.ok) return { data: null, error: "Unauthorized" };
          const session = await res.json();
          return { data: session, error: session === null ? "Session is missing!" : null };
        }).catch(() => ({ data: null, error: "Failed to get session" })),
      ]);

      if (mealRes.data) {
        setMeal(mealRes.data);
      } else {
        toast.error("Meal not found");
        router.push("/meals");
        return;
      }

      if (userRes.data?.user) {
        setUser(userRes.data.user);
        if (userRes.data.user.address) {
          setAddress(userRes.data.user.address);
        }
      }
    } catch (error) {
      toast.error("Failed to load order details");
    } finally {
      setFetchingMeal(false);
    }
  };

  const total = meal ? meal.price * quantity : 0;

  const handleOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address");
      return;
    }

    if (!user) {
      toast.error("Please login to place an order");
      router.push("/login");
      return;
    }

    if (user.role !== "CUSTOMER") {
      toast.error("Only customers can place orders");
      return;
    }

    setLoading(true);

    const payload: OrderData = {
      customerId: user.id,
      providerId: meal.providerId,
      address,
      totalAmount: total,
      items: [{ mealId: meal.id, quantity }],
    };

    const { data, error } = await orderService.createOrder(payload);
    setLoading(false);

    if (data) {
      setOrderDetails(data);
      setShowSuccessModal(true);
    } else {
      toast.error(error || "Failed to place order");
    }
  };

  if (fetchingMeal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Meal not found</p>
          <Button asChild>
            <Link href="/meals">Browse Meals</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/meals/${meal.id}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span>Back to Meal</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-500" />
              <h1 className="font-semibold text-foreground">Checkout</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Meal Card */}
            <Card className="overflow-hidden border-border/50 p-0">
              <div className="relative aspect-video">
                <Image
                  src={meal.image || "/placeholder-meal.jpg"}
                  alt={meal.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-white/90 text-foreground mb-2">
                    <Utensils className="w-3 h-3 mr-1" />
                    {meal.category.name}
                  </Badge>
                  <h2 className="text-xl font-bold text-white">{meal.name}</h2>
                </div>
              </div>
              <CardContent className="p-4 space-y-4">
                {/* Provider Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center overflow-hidden">
                    {meal.provider.logo ? (
                      <Image
                        src={meal.provider.logo}
                        alt={meal.provider.restaurantName}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <Store className="w-5 h-5 text-brand-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{meal.provider.restaurantName}</p>
                    <p className="text-sm text-muted-foreground">{meal.provider.address}</p>
                  </div>
                </div>

                <Separator />

                {/* Meal Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {meal.rating ? `${meal.rating} (${meal.reviewCount || 0} reviews)` : "No reviews yet"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    25-35 min delivery
                  </span>
                </div>

                <Separator />

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {meal.description}
                </p>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="border-border/50">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Free Delivery</p>
                    <p className="text-sm text-muted-foreground">On orders over ৳500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Secure Payment</p>
                    <p className="text-sm text-muted-foreground">Cash on delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="border-border/50 sticky top-24">
              <CardContent className="p-6 space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white shadow-lg">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
                    <p className="text-sm text-muted-foreground">Review and place your order</p>
                  </div>
                </div>

                <Separator />

                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <motion.span
                      key={quantity}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-16 text-center text-2xl font-bold text-foreground"
                    >
                      {quantity}
                    </motion.span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center hover:bg-brand-200 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Address Input */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    Delivery Address
                  </label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address"
                    className="h-12 rounded-xl border-border focus-visible:ring-brand-500"
                  />
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Price ({quantity} × ৳{meal.price})
                    </span>
                    <span className="font-medium">৳{meal.price * quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">৳0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total Amount</span>
                    <span className="text-3xl font-bold text-brand-600">৳{total}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                {!user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Please sign in to place your order
                    </p>
                    <div className="flex gap-3">
                      <Button asChild variant="outline" className="flex-1 h-12 rounded-xl">
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button asChild className="flex-1 h-12 rounded-xl bg-brand-500 hover:bg-brand-600">
                        <Link href="/register">Register</Link>
                      </Button>
                    </div>
                  </div>
                ) : user.role !== "CUSTOMER" ? (
                  <div className="p-4 bg-amber-50 rounded-xl text-center">
                    <p className="text-amber-700 text-sm">
                      Please sign in as a customer to place an order
                    </p>
                    <Button asChild className="mt-3 bg-brand-500 hover:bg-brand-600">
                      <Link href="/login">Switch Account</Link>
                    </Button>
                  </div>
                ) : !meal.isAvailable ? (
                  <Button
                    disabled
                    className="w-full h-14 rounded-xl bg-muted text-muted-foreground cursor-not-allowed"
                  >
                    Currently Unavailable
                  </Button>
                ) : (
                  <Button
                    onClick={handleOrder}
                    disabled={loading || !address.trim()}
                    className="w-full h-14 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Order...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Place Order
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                )}

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Provider
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                Order Placed Successfully!
              </DialogTitle>
            </DialogHeader>
            <p className="text-green-100 mt-2">
              Your delicious meal is on its way
            </p>
          </div>

          <div className="p-6 space-y-4">
            {orderDetails && (
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                  <span className="text-sm text-muted-foreground">Order ID</span>
                  <span className="font-mono font-semibold text-foreground">#{orderDetails.id?.slice(-8).toUpperCase()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                  <span className="text-sm text-muted-foreground">Meal</span>
                  <span className="font-medium text-foreground text-right max-w-[60%] truncate">{meal?.name}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-xl">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <span className="font-semibold text-foreground">{quantity} × ৳{meal?.price}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
                  <span className="text-sm font-medium text-green-700">Total Paid</span>
                  <span className="text-xl font-bold text-green-600">৳{orderDetails.totalAmount}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <ShoppingBag className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700">Track Your Order</p>
                <p className="text-sm text-blue-600 mt-1">
                  Check your orders in the dashboard to track delivery status and view order history.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => router.push("/meals")}
                className="flex-1 h-12 rounded-xl"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => router.push("/dashboard/customer/orders")}
                className="flex-1 h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white"
              >
                View My Orders
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
