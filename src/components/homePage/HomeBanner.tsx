"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, MapPin, Sparkles, Utensils, Flame, Truck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};


const stats = [
  { icon: Clock, value: "30", label: "min delivery", color: "text-brand-500" },
  { icon: Star, value: "4.9", label: "rating", color: "text-yellow-500" },
  { icon: MapPin, value: "500+", label: "restaurants", color: "text-brand-500" },
];

const HomeBanner = () => {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero">
        {/* Animated blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-brand-500/20 dark:bg-brand-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-125 h-125 bg-brand-400/15 dark:bg-brand-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-300/10 dark:bg-brand-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-brand-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                </span>
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-600">
                  Now delivering in your area
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                Delicious Food{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">Delivered</span>
                  <motion.svg
                    viewBox="0 0 200 12"
                    fill="none"
                    className="absolute -bottom-2 left-0 w-full"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <motion.path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
                <br />
                <span className="text-foreground">Fast</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                From local favorites to gourmet cuisines — discover restaurants
                near you and get your cravings satisfied in minutes.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row gap-3 justify-center lg:justify-start"
            >
              <Link href="/meals">
                <Button
                  size="lg"
                  className="group text-sm sm:text-base font-semibold px-6 sm:px-12 py-3 sm:py-5 h-auto bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-300/50 hover:shadow-orange-300/70 hover:-translate-y-0.5 transition-all duration-300 rounded-xl border-0"
                >
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/meals">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm sm:text-base font-semibold px-5 sm:px-10 py-3 sm:py-5 h-auto bg-white hover:bg-gray-50 text-foreground border border-gray-200 shadow-sm rounded-xl transition-all duration-300"
                >
                  <Utensils className="mr-2 h-5 w-5" />
                  Explore Menu
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 sm:gap-6 pt-4 justify-center lg:justify-start"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-colors duration-300"
                >
                  <div className="p-1.5 rounded-lg bg-brand-100 dark:bg-brand-900/30">
                    <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-foreground leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Food Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Background decorative circles */}
              <div className="absolute inset-0 -z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px]"
                >
                  <div className="absolute inset-0 rounded-full border border-dashed border-orange-300/40 dark:border-brand-600/20" />
                  <div className="absolute inset-12 rounded-full border border-dashed border-orange-400/30 dark:border-brand-500/15" />
                </motion.div>
              </div>

              {/* Main Featured Dish Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="bg-white dark:bg-card rounded-[2.5rem] shadow-2xl shadow-orange-200/50 dark:shadow-brand-500/10 border border-white/50 dark:border-border/50 overflow-hidden">
                  {/* Food Image Section */}
                  <div className="relative p-5 pb-0">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      {/* Hot Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <div className="flex items-center gap-1.5 bg-white dark:bg-card px-2.5 py-1 rounded-full shadow-sm">
                          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                          <span className="text-xs font-semibold text-foreground">Hot</span>
                        </div>
                      </div>
                      
                      {/* Hero Burger Image */}
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <img
                          src="/hero-burger.jpg"
                          alt="Truffle Cheeseburger"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 pt-4">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">SIGNATURE</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">Truffle Cheeseburger</h3>
                      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-1.5 rounded-full font-bold text-lg">
                        $12.99
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 1 - Pizza Express (Top Right) */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-24 z-20"
              >
                <div className="bg-white dark:bg-card rounded-2xl shadow-xl shadow-orange-200/30 dark:shadow-brand-500/10 border border-gray-100 dark:border-border/50 p-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-100 to-red-50 dark:from-orange-900/30 dark:to-red-900/20 flex items-center justify-center overflow-hidden">
                    {/* Pizza illustration with pepperoni */}
                    <div className="relative w-9 h-9">
                      <div className="absolute inset-0 bg-orange-400 rounded-full" />
                      <div className="absolute inset-1 bg-amber-100 rounded-full" />
                      <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full" />
                      <div className="absolute top-3 right-2 w-2 h-2 bg-red-500 rounded-full" />
                      <div className="absolute bottom-3 left-3 w-2 h-2 bg-red-500 rounded-full" />
                      <div className="absolute bottom-2 right-3 w-2 h-2 bg-green-500 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-sm">Pizza Express</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>15 min away</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">Open</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 - Daily Orders (Right Middle) */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-28 z-20 -translate-y-1/2"
              >
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl shadow-xl shadow-orange-300/50 dark:shadow-brand-500/30 p-4 flex items-center gap-4">
                  {/* Icons Row */}
                  <div className="flex -space-x-2">
                    {/* Truck icon */}
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <Truck className="w-4 h-4" />
                    </div>
                    {/* Fork and Knife icon */}
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 2v18c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V2"/>
                        <path d="M8 2v20"/>
                        <path d="M16 2v20"/>
                      </svg>
                    </div>
                    {/* Clock icon */}
                    <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  {/* Text Content */}
                  <div>
                    <p className="text-2xl font-bold leading-tight">2.5k+</p>
                    <p className="text-sm opacity-90">daily orders</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3 - Fresh Salads (Bottom Left) */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-24 z-20"
              >
                <div className="bg-white dark:bg-card rounded-2xl shadow-xl shadow-orange-200/30 dark:shadow-brand-500/10 border border-gray-100 dark:border-border/50 p-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-100 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 flex items-center justify-center overflow-hidden">
                    {/* Salad bowl illustration */}
                    <div className="relative w-9 h-9">
                      {/* Bowl */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-5 bg-white rounded-b-full border-2 border-gray-200" />
                      {/* Salad ingredients */}
                      <div className="absolute bottom-3 left-1 w-3 h-3 bg-green-500 rounded-full" />
                      <div className="absolute bottom-4 left-3 w-2.5 h-2.5 bg-red-400 rounded-full" />
                      <div className="absolute bottom-3 right-2 w-3 h-3 bg-green-400 rounded-full" />
                      <div className="absolute bottom-4 right-3 w-2 h-2 bg-yellow-400 rounded-full" />
                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Fresh Salads</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-muted-foreground">(2.3k reviews)</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 4 - Free Delivery (Bottom Right) */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-12 right-12 z-20"
              >
                <div className="bg-white dark:bg-card rounded-xl shadow-lg shadow-orange-200/30 dark:shadow-brand-500/10 border border-gray-100 dark:border-border/50 px-4 py-3 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-linear-to-br from-teal-100 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/20 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-teal-500" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Free delivery</p>
                    <p className="text-xs text-muted-foreground">over $20</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
