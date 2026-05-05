import ProfileProviderClient from "@/components/dashboard/providerDashboard/ProfileProviderClient";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

const ProviderAccountPage = async () => {
  const { data: sessionData } = await userService.getSession();
  const user = sessionData?.user;

  if (!user) redirect("/login");
  if (user.role !== "PROVIDER") redirect("/dashboard");

  return (
    <div className="p-4">
      <ProfileProviderClient user={user} />
    </div>
  );
};

export default ProviderAccountPage;
