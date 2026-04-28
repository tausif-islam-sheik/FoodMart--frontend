import MealsClient from "@/components/mealsPage/MealsClient";
import { mealService } from "@/services/meal.service";
import { userService } from "@/services/user.service";

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