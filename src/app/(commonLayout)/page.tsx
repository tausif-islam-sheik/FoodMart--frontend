import PopularMealsProviderSection from "@/components/homePage/PopularMealsProviderSection";
import RecentMeals from "@/components/homePage/RecentMeals";
import CategoryCards from "@/components/homePage/CategoryCards";
import WhyChooseUs from "@/components/homePage/WhyChooseUs";
import HowItWorks from "@/components/homePage/HowItWorks";
import HomeBanner from "@/components/homePage/HomeBanner";
import Testimonials from "@/components/homePage/Testimonials";

export default function Home() {
  return (
    <div className="max-w-8xl mx-auto">
      <HomeBanner />
      <HowItWorks />
      <div className="max-w-7xl mx-auto">
        <RecentMeals />
        <PopularMealsProviderSection />
      </div>
      <CategoryCards />
      <Testimonials />
      <WhyChooseUs />
    </div>
  );
}
