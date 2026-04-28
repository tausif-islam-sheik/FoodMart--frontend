import CartClient from "@/components/dashboard/customerPage/CartClient";
import { userService } from "@/services/user.service";

export const metadata = {
  title: "My Cart",
};

const MyCartsPage = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>
        <p>Please login to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <CartClient userId={user.id} />
    </div>
  );
};

export default MyCartsPage;