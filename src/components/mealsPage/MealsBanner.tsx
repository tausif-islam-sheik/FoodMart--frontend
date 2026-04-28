"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// import mealsHeroBg from "@/public/meals-hero-bg.jpg";

const MealsBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/meals-hero-bg.jpg)" }}
      />

      {/* No overlay - text on white menu card area */}

      {/* Content */}
      <div className="relative z-10 flex min-h-[400px] items-center justify-center px-6 py-20 md:min-h-[500px] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl rounded-2xl bg-card/95 px-8 py-10 text-center shadow-xl backdrop-blur-md md:px-12 md:py-14 border border-border/50"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Our <span className="text-brand-600">Delicious</span> Meals
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Explore a wide range of freshly prepared meals from your favorite
            providers. Quality ingredients, delightful flavors, and fast
            delivery to satisfy every craving.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="#meals">
              <button className="rounded-lg px-8 py-3 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-brand-500 hover:bg-brand-600 cursor-pointer">
                Explore Menu
              </button>
            </Link>
            <Link href="#meals">
              <button className="rounded-lg border-2 border-brand-200 bg-card/80 px-8 py-3 font-semibold backdrop-blur-sm transition-all duration-300 hover:border-brand-400 hover:text-brand-600 text-brand-500 cursor-pointer">
                Order Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default MealsBanner;
