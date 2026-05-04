import type { Metadata } from "next";
import PopularMealsProviderSection from "@/components/homePage/PopularMealsProviderSection";
import RecentMeals from "@/components/homePage/RecentMeals";
import CategoryCards from "@/components/homePage/CategoryCards";
import WhyChooseUs from "@/components/homePage/WhyChooseUs";
import HomeBanner from "@/components/homePage/HomeBanner";
import Testimonials from "@/components/homePage/Testimonials";
import TrendingDeals from "@/components/homePage/TrendingDeals";
import BlogSection from "@/components/homePage/BlogSection";
import Newsletter from "@/components/homePage/Newsletter";
import HowItWorks from "@/components/homePage/HowItWorks";
import FAQ from "@/components/homePage/FAQ";
import AppDownload from "@/components/homePage/AppDownload";

export const metadata: Metadata = {
  title: "FoodMart - Order Delicious Food Online | Multi-Vendor Food Delivery",
  description: "Discover the best restaurants and order delicious meals online. FoodMart connects you with top-rated food providers for fast, reliable delivery.",
  keywords: ["food delivery", "online ordering", "restaurants", "meals", "bangladesh"],
};

export default function Home() {
  return (
    <div className="max-w-8xl mx-auto">
      {/* Hero Section */}
      <HomeBanner />

      {/* Trending Deals Section */}
      <TrendingDeals />

      <div className="max-w-7xl mx-auto">
        {/* Recent Meals */}
        <RecentMeals />

        {/* Popular Providers */}
        <PopularMealsProviderSection />
      </div>

      {/* Popular Categories */}
      <CategoryCards />

      {/* Customer Testimonials */}
      <Testimonials />

      {/* Blog Section */}
      <BlogSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* How It Works */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQ />

      {/* App Download CTA */}
      <AppDownload />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
