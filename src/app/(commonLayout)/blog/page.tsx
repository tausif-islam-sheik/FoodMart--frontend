import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | FoodMart - Food Stories & Updates",
  description: "Discover food stories, restaurant tips, and the latest updates from FoodMart.",
};

const blogPosts = [
  {
    id: 1,
    title: "10 Best Restaurants in Dhaka You Must Try",
    excerpt: "Explore the top-rated restaurants offering authentic Bangladeshi cuisine and international flavors.",
    author: "FoodMart Team",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Restaurant Guide",
  },
  {
    id: 2,
    title: "How to Order Food Online: A Complete Guide",
    excerpt: "Learn the best practices for ordering food online and getting the most out of FoodMart.",
    author: "Sarah Ahmed",
    date: "Jan 10, 2025",
    readTime: "4 min read",
    category: "How To",
  },
  {
    id: 3,
    title: "Healthy Eating: Best Low-Calorie Meals",
    excerpt: "Discover delicious and healthy meal options available on FoodMart for your fitness journey.",
    author: "Nutrition Expert",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    category: "Health",
  },
  {
    id: 4,
    title: "Behind the Scenes: How FoodMart Delivers",
    excerpt: "A look into our delivery system and how we ensure your food arrives fresh and on time.",
    author: "Operations Team",
    date: "Dec 28, 2024",
    readTime: "7 min read",
    category: "Company News",
  },
  {
    id: 5,
    title: "Seasonal Specials: Winter Comfort Foods",
    excerpt: "Warm and cozy dishes perfect for the winter season, available now on FoodMart.",
    author: "Chef Rahman",
    date: "Dec 20, 2024",
    readTime: "3 min read",
    category: "Food Trends",
  },
  {
    id: 6,
    title: "Customer Stories: Why They Love FoodMart",
    excerpt: "Real stories from our satisfied customers about their FoodMart experience.",
    author: "Marketing Team",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Stories",
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
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <span className="text-6xl">📝</span>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="group-hover:text-orange-600 transition-colors">
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
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
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
