import ProviderProfileClient from "@/components/dashboard/providerDashboard/ProviderProfileClient";
import { providerService } from "@/services/provider.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

const RestaurantInfoPage = async () => {
  const { data: sessionData } = await userService.getSession();
  const user = sessionData?.user;

  if (!user) redirect("/login");
  if (user.role !== "PROVIDER") redirect("/dashboard");

  const { data: providers } = await providerService.getAllProviders();
  const myProfile = providers?.find((provider: { userId: string }) => provider.userId === user.id);

  return (
    <div className="w-full">
      <ProviderProfileClient profile={myProfile || null} />
    </div>
  );
};

export default RestaurantInfoPage;