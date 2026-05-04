"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface OrderButtonProps {
  mealId: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({ mealId }) => {
  return (
    <Button
      asChild
      className="w-full py-4 text-base font-semibold bg-brand-500 hover:bg-brand-600 text-white rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer group"
    >
      <Link href={`/checkout?mealId=${mealId}&quantity=1`}>
        <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Order Now
      </Link>
    </Button>
  );
};

export default OrderButton;