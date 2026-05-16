import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import CustomerProfileClient from "@/components/dashboard/customerPage/CustomerProfileClient";

export default async function CustomerProfilePage() {
  const user = await userService.getSession();

  if (!user) {
    redirect("/login");
  }

  return <CustomerProfileClient user={user} />;
}
