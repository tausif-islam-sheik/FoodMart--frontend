/* eslint-disable @typescript-eslint/no-explicit-any */
import ProviderProfileClient from "@/components/dashboard/providerDashboard/ProviderProfileClient";
import { providerService } from "@/services/provider.service";
import { userService } from "@/services/user.service";

const ProviderOverview = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user || user.role !== "PROVIDER") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500 font-medium">Access denied</p>
      </div>
    );
  }

  const { data: providers } = await providerService.getAllProviders();

  const myProfile = providers?.find(
    (provider: any) => provider.userId === user.id,
  );

  return (
    <div className="w-full">
      <ProviderProfileClient profile={myProfile || null} />
    </div>
  );
};

export default ProviderOverview;