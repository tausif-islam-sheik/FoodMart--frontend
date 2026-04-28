/* eslint-disable @typescript-eslint/no-explicit-any */
import MealSlider from "@/components/mealsPage/MealSlider";
import OrderButton from "@/components/mealsPage/OrderButton";
import ReviewSection from "@/components/mealsPage/ReviewSection";
import { adminService } from "@/services/admin.service";
import { mealService } from "@/services/meal.service";
import { userService } from "@/services/user.service";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Store, Clock, ShoppingBag, Calendar, CheckCircle2, Star, ArrowLeft, Truck, Shield, Utensils, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MealsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const mealRes = await mealService.getMealById(id);
  const meal = mealRes.data;

  const userInfo = await adminService.getUserById(meal?.userId);

  const loggedInUserData = await userService.getSession();
  const user = loggedInUserData.data?.user!;

  if (!meal)
    return (
      <div className="mt-10 flex justify-center items-center">
        Meal not found
      </div>
    );

  const allMealsRes = await mealService.getAllMeals();
  const allMeals = allMealsRes.data ?? [];

  const sameCategory = allMeals.filter(
    (m: any) =>
      m.category.id === meal.category.id && m.id !== meal.id && m.isAvailable,
  );

  const otherCategory = allMeals.filter(
    (m: any) => m.category.id !== meal.category.id && m.isAvailable,
  );

  // Calculate average rating from reviews
  const averageRating = meal?.reviews && meal.reviews.length > 0
    ? (meal.reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0) / meal.reviews.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-background mb-12">
      {/* Top Navigation Bar */}
      <div className="border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/meals" 
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors text-primary">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span>Back to Meals</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch">
            {/* Left - Image */}
            <div className="space-y-2 sm:space-y-3 h-full">
              <div className="relative group h-full">
                <Card className="overflow-hidden border-0 shadow-lg sm:shadow-xl h-full p-0">
                  <div className="relative w-full h-full min-h-[220px] sm:min-h-[320px] lg:min-h-[400px]">
                    <Image
                      src={meal.image || "/placeholder-meal.jpg"}
                      alt={meal.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                      priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <Badge 
                        className={cn(
                          "px-3 py-1 text-xs font-medium",
                          meal.isAvailable 
                            ? "bg-green-500/90 hover:bg-green-600 text-white backdrop-blur-sm" 
                            : "bg-red-500/90 hover:bg-red-600 text-white backdrop-blur-sm"
                        )}
                      >
                        {meal.isAvailable ? (
                          <><CheckCircle2 className="w-3 h-3 mr-1" /> In Stock</>
                        ) : (
                          "Out of Stock"
                        )}
                      </Badge>
                    </div>
                  </div>
                </Card>
                
                {/* Floating Category Badge */}
                <div className="absolute -top-2.5 left-4 z-10">
                  <Badge className="px-3 py-1 text-xs font-semibold bg-brand-600 text-white shadow-lg">
                    <Utensils className="w-3 h-3 mr-1" />
                    {meal.category.name}
                  </Badge>
                </div>
              </div>
              
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1.5 bg-muted/40 rounded-full text-[9px] sm:text-xs text-muted-foreground">
                  <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1.5 bg-muted/40 rounded-full text-[9px] sm:text-xs text-muted-foreground">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 sm:px-3 sm:py-1.5 bg-muted/40 rounded-full text-[9px] sm:text-xs text-muted-foreground">
                  <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Freshly Made</span>
                </div>
              </div>
            </div>

            {/* Right - Details */}
            <div className="space-y-2 sm:space-y-4 mt-4 sm:mt-0">
              {/* Title & Price */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                    {meal.name}
                  </h1>
                  {averageRating && (
                    <div className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-yellow-50 text-yellow-700 rounded-lg shrink-0">
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold text-xs sm:text-sm">{averageRating}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xl sm:text-2xl font-bold text-brand-600">
                    ৳{meal.price}
                  </p>
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    ৳{Math.round(meal.price * 1.2)}
                  </span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] sm:text-xs">
                    20% OFF
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600" />
                  <span>{meal.provider.address}</span>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-semibold text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  {meal.description}
                </p>
              </div>

              <Separator />

              {/* Provider Info Card */}
              <Card className="border-border/50 bg-linear-to-br from-card to-muted/20 pt-1 pb-2">
                <CardContent className="p-2.5 sm:p-3 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-1.5 sm:gap-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand-100 flex items-center justify-center">
                        <Store className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-600" />
                      </div>
                      Provider Info
                    </h3>
                    <Badge variant="outline" className="text-[9px] sm:text-[10px] h-4 sm:h-5 text-green-500 bg-green-100">Verified</Badge>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-2.5">
                    {userInfo.data?.image ? (
                      <Image
                        src={userInfo.data.image}
                        alt={userInfo.data.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border-2 border-brand-200 shadow-sm w-10 h-10 sm:w-11 sm:h-11"
                        unoptimized
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-md">
                        {userInfo.data?.name?.charAt(0) || meal.provider.restaurantName.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-xs sm:text-sm truncate">
                        {meal.provider.restaurantName}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                        {userInfo.data?.name || "Premium Partner"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-background rounded-lg">
                      <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-600" />
                      <div className="text-[9px] sm:text-[10px]">
                        <p className="text-muted-foreground">Joined</p>
                        <p className="font-medium">{userInfo.data
                          ? new Date((userInfo.data as any).createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                          : "2024"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 sm:py-1.5 bg-background rounded-lg">
                      <ShoppingBag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-600" />
                      <div className="text-[9px] sm:text-[10px]">
                        <p className="text-muted-foreground">Payment</p>
                        <p className="font-medium">Cash on Delivery</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Section */}
              <div className="pt-1">
                {meal?.isAvailable ? (
                  user?.role === "CUSTOMER" ? (
                    <OrderButton
                      mealId={meal.id}
                      mealName={meal.name}
                      mealPrice={meal.price}
                      providerId={meal.providerId}
                      customerId={user.id}
                    />
                  ) : (
                    <Card className="border-brand-200 bg-brand-50/50">
                      <CardContent className="p-4 text-center">
                        <p className="text-brand-700 font-medium">
                          Please sign in as a customer to place an order
                        </p>
                        <div className="flex gap-3 mt-3 justify-center">
                          <Link href="/login">
                            <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
                              Sign In
                            </button>
                          </Link>
                          <Link href="/register">
                            <button className="px-4 py-2 border border-brand-600 text-brand-600 rounded-lg hover:bg-brand-50 transition-colors">
                              Register
                            </button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  )
                ) : (
                  <button
                    disabled
                    className="w-full py-4 text-lg font-medium bg-muted text-muted-foreground rounded-lg cursor-not-allowed border border-border"
                  >
                    Currently Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-6 sm:mt-8 lg:mt-10 mx-4 lg:mx-8">
          <div className="bg-white rounded-xl border border-border p-3 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Customer Reviews</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {meal?.reviews?.length || 0} {meal?.reviews?.length === 1 ? 'Review' : 'Reviews'}
                </p>
              </div>
              {averageRating && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 rounded-lg">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-sm">{averageRating}</span>
                </div>
              )}
            </div>
            
            {meal?.reviews && meal.reviews.length > 0 ? (
              <div className="space-y-4">
                {meal.reviews.map((review: any) => (
                  <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
                        {review.customer?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{review.customer?.name || 'Anonymous'}</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                        <span className="text-xs text-muted-foreground mt-2 block">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Meals */}
        {sameCategory.length > 0 && (
          <div className="mt-5 sm:mt-6 lg:mt-8 mx-3 lg:mx-7">
            <MealSlider title="More from this category" meals={sameCategory} />
          </div>
        )}

        {otherCategory.length > 0 && (
          <div className="mt-5 sm:mt-6 lg:mt-8 mx-3 lg:mx-7">
            <MealSlider
              title="You might also like"
              meals={otherCategory}
            />
          </div>
        )}
      </div>
  );
};

export default MealsDetails;