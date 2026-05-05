"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    category: "Recipe",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "10 Quick & Healthy Lunch Ideas for Busy Professionals",
    excerpt: "Discover delicious, nutritious meals you can prepare in under 15 minutes. Perfect for your work-from-home days.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    bgGradient: "from-emerald-400 to-teal-500",
  },
  {
    id: 2,
    category: "Health",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "The Ultimate Guide to Balanced Eating in Bangladesh",
    excerpt: "Learn how to maintain a healthy diet while enjoying your favorite local dishes. Tips from nutrition experts.",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    bgGradient: "from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    category: "Trending",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "2024 Food Trends: What's Hot in Dhaka's Food Scene",
    excerpt: "From cloud kitchens to sustainable dining, explore the latest trends shaping how we eat in the capital.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    bgGradient: "from-purple-400 to-pink-500",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
              <BookOpen className="w-3 h-3" />
              Food Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Food Stories <span className="gradient-text">& Tips</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Discover recipes, health tips, and the latest food trends
            </p>
          </div>

          <Link
            href="/blog"
            className="group flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50"
            >
              {/* Image Area */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-foreground group-hover:text-brand-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 group/link"
                >
                  Read More
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
