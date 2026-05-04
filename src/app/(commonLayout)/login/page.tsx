import type { Metadata } from "next";
import { LoginForm } from "@/components/modules/authentication/LoginForm";

export const metadata: Metadata = {
  title: "Login | FoodMart - Access Your Account",
  description: "Sign in to your FoodMart account to order delicious meals, track orders, and manage your profile.",
};

const Login = async () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;