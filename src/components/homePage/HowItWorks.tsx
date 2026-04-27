"use client";

import { ClipboardList, Smile, Truck, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  {
    icon: ClipboardList,
    title: "Choose Your Favorite",
    description:
      "Browse our wide variety of delicious meals and pick exactly what you love. You can order online or call us to customize your order according to your taste and preferences. It's fast, easy, and convenient!",
    step: 1,
  },
  {
    icon: Truck,
    title: "We Deliver Your Meals",
    description:
      "Once your order is placed, our professional delivery team ensures your meals are freshly prepared and delivered straight to your doorstep. Enjoy hot and delicious food without leaving the comfort of your home.",
    step: 2,
  },
  {
    icon: Smile,
    title: "Eat and Enjoy",
    description:
      "Relax and enjoy your meals with your family or friends. No shopping, no cooking, no counting, and no cleaning required. Experience the joy of healthy, hassle-free dining at home with FoodHub.",
    step: 3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100 text-brand-700 text-sm font-semibold rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It <span className="text-brand-600">Works</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Getting your favorite meals delivered has never been easier
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connection Line - Desktop Only */}
          <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />

          {steps.map((step) => (
            <motion.div
              key={step.step}
              variants={cardVariants}
              className="group relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shadow-lg shadow-brand-500/30 bg-gradient-to-br from-brand-500 to-brand-600 text-white">
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6 pt-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center group-hover:from-brand-200 group-hover:to-brand-100 transition-all duration-300">
                    <step.icon
                      className="w-8 h-8 text-brand-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/meals">
            <button className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/20 hover:-translate-y-0.5 bg-gradient-to-r from-brand-500 to-brand-600 text-white cursor-pointer group">
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
