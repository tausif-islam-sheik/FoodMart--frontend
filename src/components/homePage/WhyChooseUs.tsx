"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, UtensilsCrossed, Wallet, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    title: "Cash on Delivery",
    description: "Pay only when your food arrives at your doorstep. No online payment hassle, no stress.",
    icon: Wallet,
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Fast & Reliable Delivery",
    description: "Our providers prepare meals quickly and deliver them fresh, right on time.",
    icon: Truck,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Trusted Providers",
    description: "All restaurants and food providers are verified to ensure quality and hygiene.",
    icon: ShieldCheck,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Wide Meal Selection",
    description: "From local favorites to premium dishes — discover meals you'll love.",
    icon: UtensilsCrossed,
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-100/30 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full mb-4">
            <Sparkles className="w-3 h-3" />
            Our Promise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose{" "}
            <span className="italic font-sans">
              <span className="font-normal text-foreground">Food</span>
              <span className="font-bold text-brand-600">Mart </span>
            </span>
            ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make food ordering simple, secure, and convenient for everyone.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
        {/* Hover gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        <CardContent className="relative p-6 text-center space-y-4">
          {/* Icon */}
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg`}
          >
            <Icon className="w-7 h-7" />
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-brand-600 transition-colors">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}