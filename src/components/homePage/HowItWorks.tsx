"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, CreditCard, Bike, ArrowRight, Lightbulb } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <Search className="w-6 h-6" />,
    title: "Menu",
    description: "Explore thousands of dishes from top-rated restaurants in your area. Filter by cuisine, price, or dietary preferences.",
  },
  {
    id: 2,
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Choose Meal",
    description: "Add your favorite items to cart. Customize your order with special instructions and extra toppings.",
  },
  {
    id: 3,
    icon: <CreditCard className="w-6 h-6" />,
    title: "Place Order",
    description: "Checkout securely with multiple payment options. Cash on delivery, card, or mobile banking - you choose.",
  },
  {
    id: 4,
    icon: <Bike className="w-6 h-6" />,
    title: "Fast Delivery",
    description: "Track your order in real-time. Our delivery partners ensure your food arrives hot and fresh within 30 minutes.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent dark:from-transparent dark:via-muted/20 dark:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 dark:bg-muted/50 text-brand-700 dark:text-brand-400 text-xs font-semibold rounded-full mb-4">
            <Lightbulb className="w-3 h-3" />
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting your favorite food delivered is as easy as 1-2-3-4. Follow these simple steps to satisfy your cravings.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connecting Line - Desktop - spans full width between step 1 and step 4 */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 px-[calc(12.5%)]">
            <div className="relative h-0.5 w-full">
              <div className="h-full bg-gradient-to-r from-brand-300 via-brand-500 to-brand-300 dark:from-brand-400 dark:via-brand-300 dark:to-brand-400 rounded-full shadow-[0_0_10px_rgba(255,107,53,0.5)]" />
              {/* Animated ball - 0.5s pause at each step */}
              <motion.div
                animate={{
                  left: ["0%", "33.33%", "33.33%", "66.66%", "66.66%", "100%", "100%", "0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.175, 0.225, 0.425, 0.475, 0.675, 0.725, 1],
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 border-brand-500 dark:border-brand-400 rounded-full shadow-[0_0_15px_rgba(255,107,53,0.8)] z-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="relative"
              >
                {/* Step Card */}
                <div className="text-center">
                  {/* Icon Circle with Step Number */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Outer ring */}
                    <div className="absolute inset-0 bg-brand-100 rounded-full animate-ping opacity-20" />
                    {/* Main circle */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                      {step.icon}
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border-2 border-brand-500 flex items-center justify-center text-sm font-bold text-brand-600 dark:text-brand-400">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="flex lg:hidden justify-center my-4">
                    <ArrowRight className="w-5 h-5 text-brand-300 rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
