"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star, MapPin, Sparkles, Utensils } from "lucide-react";
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
      ease: [0.25, 0.46, 0.45, 0.94],
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
          className="absolute top-20 left-10 w-96 h-96 bg-brand-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-brand-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-200/20 rounded-full blur-3xl"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-brand-200 shadow-sm">
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/meals">
                <Button
                  size="lg"
                  className="group text-base px-8 py-6 h-auto gradient-brand text-white shadow-brand hover:shadow-brand-lg hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
                >
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/meals">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 h-auto hover:bg-brand-50 hover:text-brand-600 hover:border-brand-300 border-2 border-border bg-white/80 backdrop-blur-sm rounded-xl transition-all duration-300"
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
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/50 hover:bg-white/80 transition-colors duration-300"
                >
                  <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-900/30">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div className="text-left">
                    <span className="block text-lg font-bold text-foreground leading-none">
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative w-full aspect-square">
                {/* Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-brand-300/50"
                />
                
                {/* Middle Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border-2 border-dashed border-brand-400/40"
                />
                
                {/* Inner Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-16 rounded-full border-2 border-dashed border-brand-500/30"
                />

                {/* Center Content */}
                <div className="absolute inset-24 rounded-3xl bg-gradient-to-br from-white to-brand-50 shadow-2xl shadow-brand-500/20 flex items-center justify-center overflow-hidden">
                  <div className="text-center space-y-4 p-8">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-28 h-28 mx-auto bg-gradient-to-br from-brand-100 to-brand-200 rounded-3xl flex items-center justify-center shadow-lg"
                    >
                      <span className="text-6xl">🍔</span>
                    </motion.div>
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-foreground">
                        Your favorite food
                      </p>
                      <p className="text-sm text-muted-foreground">
                        awaits delivery
                      </p>
                    </div>
                  </div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-border/50 p-4 flex items-center gap-3 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center text-2xl">
                  🍕
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Pizza Express</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    15 min away
                  </div>
                </div>
                <div className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Open
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-16 left-0 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-border/50 p-4 flex items-center gap-3 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-2xl">
                  🥗
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Fresh Salads</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">4.8</span>
                    <span className="text-muted-foreground">(2.3k reviews)</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-1/2 -right-4 bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 rounded-2xl p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🍜</div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🍱</div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🥡</div>
                  </div>
                  <div className="text-sm font-medium">
                    <p>2.5k+</p>
                    <p className="text-xs opacity-80">daily orders</p>
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
