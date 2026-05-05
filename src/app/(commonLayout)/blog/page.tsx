import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | FoodMart - Food Stories & Updates",
  description: "Discover food stories, restaurant tips, and the latest updates from FoodMart.",
};

const blogPosts = [
  {
    id: 1,
    title: "10 Quick & Healthy Lunch Ideas for Busy Professionals",
    excerpt: "Discover delicious, nutritious meals you can prepare in under 15 minutes. Perfect for your work-from-home days.",
    author: "FoodMart Team",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Recipe",
    categoryColor: "bg-emerald-100 text-emerald-700",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Balanced Eating in Bangladesh",
    excerpt: "Learn how to maintain a healthy diet while enjoying your favorite local dishes. Tips from nutrition experts.",
    author: "Sarah Ahmed",
    date: "Jan 12, 2025",
    readTime: "8 min read",
    category: "Health",
    categoryColor: "bg-blue-100 text-blue-700",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "2024 Food Trends: What's Hot in Dhaka's Food Scene",
    excerpt: "From cloud kitchens to sustainable dining, explore the latest trends shaping how we eat in the capital.",
    author: "Marketing Team",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    category: "Trending",
    categoryColor: "bg-purple-100 text-purple-700",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "10 Best Restaurants in Dhaka You Must Try",
    excerpt: "Explore the top-rated restaurants offering authentic Bangladeshi cuisine and international flavors.",
    author: "FoodMart Team",
    date: "Jan 5, 2025",
    readTime: "5 min read",
    category: "Restaurant Guide",
    categoryColor: "bg-orange-100 text-orange-700",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "How to Order Food Online: A Complete Guide",
    excerpt: "Learn the best practices for ordering food online and getting the most out of FoodMart.",
    author: "Sarah Ahmed",
    date: "Dec 28, 2024",
    readTime: "4 min read",
    category: "How To",
    categoryColor: "bg-indigo-100 text-indigo-700",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Healthy Eating: Best Low-Calorie Meals",
    excerpt: "Discover delicious and healthy meal options available on FoodMart for your fitness journey.",
    author: "Nutrition Expert",
    date: "Dec 20, 2024",
    readTime: "6 min read",
    category: "Health",
    categoryColor: "bg-green-100 text-green-700",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            FoodMart Blog
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover food stories, restaurant tips, and the latest updates from our community.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
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
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <CardTitle className="group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-orange-600 font-medium hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
