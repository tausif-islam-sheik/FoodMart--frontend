"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, MessageCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Regular Customer",
    gender: "female",
    rating: 5,
    text: "FoodMart has completely changed how I order food. The delivery is always on time, and the food quality is consistently amazing. I especially love the variety of restaurants available!",
    meal: "Biryani Special",
  },
  {
    id: 2,
    name: "Rahim Khan",
    role: "Food Enthusiast",
    gender: "male",
    rating: 5,
    text: "As someone who orders food frequently, I've tried many apps. FoodMart stands out with their excellent customer service and the freshness of the food. Highly recommended!",
    meal: "Grilled Salmon",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Busy Professional",
    gender: "female",
    rating: 5,
    text: "The app interface is so intuitive and easy to use. I can order my lunch in less than a minute. The real-time order tracking feature is a game-changer for me.",
    meal: "Chicken Shawarma",
  },
  {
    id: 4,
    name: "Tanvir Hossain",
    role: "Restaurant Partner",
    gender: "male",
    rating: 5,
    text: "As a restaurant owner, partnering with FoodMart has significantly boosted our sales. Their platform is reliable, and the support team is always helpful. Great partnership!",
    meal: "Chef's Special",
  },
];

// Gender-based avatar colors and icons
const genderStyles = {
  male: {
    bg: "from-blue-100 to-indigo-100",
    text: "text-blue-600",
    icon: "👨",
  },
  female: {
    bg: "from-pink-100 to-rose-100",
    text: "text-pink-600",
    icon: "👩",
  },
};

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-orange-50/30 to-background dark:via-orange-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Customer Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Customers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real experiences from real food lovers who trust FoodMart for their daily cravings
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-card overflow-hidden group">
                {/* Animated top gradient bar - smooth hover effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-400 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <CardContent className="p-4 relative">
                  {/* Quote Icon */}
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <Quote className="w-6 h-6 text-orange-200 dark:text-orange-900/30 absolute top-3 right-3" />
                  </motion.div>
                  
                  {/* Rating */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-foreground text-sm leading-relaxed mb-3 line-clamp-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Meal Tag */}
                  <motion.div 
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-md mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-[10px] font-medium text-orange-700 dark:text-orange-300">
                      Ordered: {testimonial.meal}
                    </span>
                  </motion.div>

                  {/* Author Info with Gender Avatar */}
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <motion.div 
                      className={`w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br ${genderStyles[testimonial.gender as keyof typeof genderStyles].bg} flex items-center justify-center shadow-sm`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-lg">
                        {genderStyles[testimonial.gender as keyof typeof genderStyles].icon}
                      </span>
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${testimonial.gender === "male" ? "bg-blue-400" : "bg-pink-400"}`} />
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "100K+", label: "Orders Delivered" },
            { value: "4.9", label: "Average Rating" },
            { value: "500+", label: "Restaurant Partners" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                y: -4,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="text-center p-4 bg-white dark:bg-card rounded-xl shadow-sm border border-border/50 cursor-default"
            >
              <motion.div 
                className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
