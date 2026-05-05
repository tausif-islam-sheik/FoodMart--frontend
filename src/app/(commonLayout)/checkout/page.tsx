import type { Metadata } from "next";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout | FoodMart - Complete Your Order",
  description: "Review your order details, enter delivery address, and place your order securely.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
