import type { Metadata } from "next";
import MealsClient from "@/components/mealsPage/MealsClient";
import { mealService } from "@/services/meal.service";
import { userService } from "@/services/user.service";

export const metadata: Metadata = {
  title: "Meals | FoodMart - Find Your Favorite Dishes",
  description: "Explore a wide variety of delicious meals from top restaurants. Browse categories, filter by preferences, and order your favorite dishes online.",
};

const MealsPage = async () => {
  const res = await mealService.getAllMeals();
  const loggedInUserData = await userService.getSession();
  const user = loggedInUserData?.data?.user || null;

  return (
    <div className="container mx-auto px-4 py-8">
      <MealsClient meals={res.data ?? []} user={user} />
    </div>
  );
};

export default MealsPage;