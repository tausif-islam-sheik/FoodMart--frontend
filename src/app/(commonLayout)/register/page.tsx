import type { Metadata } from "next";
import { RegisterForm } from "@/components/modules/authentication/RegisterForm";

export const metadata: Metadata = {
  title: "Register | FoodMart - Create Your Account",
  description: "Join FoodMart today! Create an account to order food, track deliveries, and enjoy exclusive offers from top restaurants.",
};

const Register = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;