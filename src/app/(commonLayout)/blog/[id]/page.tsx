import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, Share2, Heart, MessageCircle, Twitter, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "10 Quick & Healthy Lunch Ideas for Busy Professionals",
    excerpt: "Discover delicious, nutritious meals you can prepare in under 15 minutes. Perfect for your work-from-home days.",
    content: `
      <p>In today's fast-paced world, finding time to prepare a healthy lunch can be challenging. But eating well doesn't have to be complicated or time-consuming. Here are 10 quick and healthy lunch ideas that busy professionals can prepare in under 15 minutes.</p>
      
      <h2>1. Mediterranean Chickpea Salad</h2>
      <p>Combine chickpeas, cucumber, cherry tomatoes, red onion, feta cheese, and a drizzle of olive oil with lemon juice. This protein-packed salad takes just 10 minutes to prepare.</p>
      
      <h2>2. Avocado Toast with Egg</h2>
      <p>Toast whole grain bread, mash ripe avocado on top, and add a poached or fried egg. Sprinkle with everything bagel seasoning for extra flavor.</p>
      
      <h2>3. Asian-Style Rice Bowl</h2>
      <p>Mix leftover rice with edamame, shredded carrots, cucumber, and top with a simple soy-sesame dressing. Add grilled chicken or tofu for protein.</p>
      
      <h2>4. Greek Yogurt Parfait</h2>
      <p>Layer Greek yogurt with granola, fresh berries, and a drizzle of honey. This protein-rich option keeps you full all afternoon.</p>
      
      <h2>5. Quick Quesadilla</h2>
      <p>Fill a whole wheat tortilla with black beans, cheese, and salsa. Cook in a pan for 3 minutes per side. Serve with Greek yogurt as a sour cream substitute.</p>
    `,
    author: "FoodMart Team",
    authorBio: "FoodMart's nutrition experts curate the best recipes and healthy eating tips for our community.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Recipe",
    categoryColor: "bg-emerald-100 text-emerald-700",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Balanced Eating in Bangladesh",
    excerpt: "Learn how to maintain a healthy diet while enjoying your favorite local dishes. Tips from nutrition experts.",
    content: `
      <p>Bangladeshi cuisine is rich in flavors, spices, and traditions. But can you enjoy your favorite biryani, kacchi, and sweets while maintaining a healthy diet? Absolutely! This guide will show you how.</p>
      
      <h2>Understanding Bangladeshi Nutrition</h2>
      <p>Traditional Bangladeshi food includes a variety of nutrients - rice provides carbohydrates, lentils offer protein, and vegetables supply essential vitamins. The key is balance and portion control.</p>
      
      <h2>Smart Swaps for Healthier Meals</h2>
      <p>Replace white rice with brown rice or red rice for more fiber. Use mustard oil in moderation. Add more vegetables to your curries. Choose grilled over fried options when possible.</p>
      
      <h2>Portion Control Tips</h2>
      <p>Use the plate method: half your plate should be vegetables, a quarter protein (fish, chicken, or lentils), and a quarter carbohydrates (rice or roti).</p>
      
      <h2>Healthy Bangladeshi Breakfast Options</h2>
      <p>Start your day with panta bhat (fermented rice) with fried hilsa - rich in probiotics and omega-3. Or try a vegetable omelet with whole grain toast.</p>
    `,
    author: "Sarah Ahmed",
    authorBio: "Sarah is a certified nutritionist with 8 years of experience in South Asian dietary planning.",
    date: "Jan 12, 2025",
    readTime: "8 min read",
    category: "Health",
    categoryColor: "bg-blue-100 text-blue-700",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "2024 Food Trends: What's Hot in Dhaka's Food Scene",
    excerpt: "From cloud kitchens to sustainable dining, explore the latest trends shaping how we eat in the capital.",
    content: `
      <p>Dhaka's food scene is evolving rapidly. From traditional street food to modern fusion cuisine, the capital is embracing new trends while honoring its culinary heritage. Here's what's trending in 2024.</p>
      
      <h2>1. Cloud Kitchens Revolution</h2>
      <p>Virtual restaurants and cloud kitchens are booming. These delivery-only establishments offer everything from gourmet burgers to authentic biryani without the dine-in overhead.</p>
      
      <h2>2. Sustainable Dining</h2>
      <p>Eco-conscious restaurants are adopting zero-waste practices, using locally sourced ingredients, and eliminating single-use plastics. Farm-to-table is becoming the new standard.</p>
      
      <h2>3. Fusion Cuisine</h2>
      <p>Chefs are experimenting with bold flavor combinations - think sushi rolls with mango chutney or burgers with desi spice blends. The results are surprisingly delicious.</p>
      
      <h2>4. Street Food Goes Gourmet</h2>
      <p>Traditional street foods like fuchka and chotpoti are getting gourmet makeovers in upscale restaurants while maintaining their authentic flavors.</p>
    `,
    author: "Marketing Team",
    authorBio: "The FoodMart Marketing Team keeps you updated on the latest food trends and restaurant openings.",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    category: "Trending",
    categoryColor: "bg-purple-100 text-purple-700",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "10 Best Restaurants in Dhaka You Must Try",
    excerpt: "Explore the top-rated restaurants offering authentic Bangladeshi cuisine and international flavors.",
    content: `
      <p>Dhaka is a food lover's paradise, offering everything from authentic Bangladeshi cuisine to international fine dining. Here are our top 10 restaurant picks you shouldn't miss.</p>
      
      <h2>1. Star Kabab & Restaurant</h2>
      <p>A Dhaka institution famous for its beef tehari and seekh kebabs. The flavors here are unmatched, and the prices are reasonable.</p>
      
      <h2>2. Nanna Biriyani</h2>
      <p>Known for serving some of the best kacchi biryani in town. The long-grain rice and tender mutton make it worth the wait.</p>
      
      <h2>3. Cooper's</h2>
      <p>This bakery-turned-restaurant serves excellent burgers, sandwiches, and continental dishes. Their chocolate cake is legendary.</p>
      
      <h2>4. Panshi Restaurant</h2>
      <p>For authentic Bengali fish preparations, this is the place to go. Try their hilsa curry when in season.</p>
    `,
    author: "FoodMart Team",
    authorBio: "FoodMart's team of food critics and local experts bring you the best dining recommendations.",
    date: "Jan 5, 2025",
    readTime: "5 min read",
    category: "Restaurant Guide",
    categoryColor: "bg-orange-100 text-orange-700",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    title: "How to Order Food Online: A Complete Guide",
    excerpt: "Learn the best practices for ordering food online and getting the most out of FoodMart.",
    content: `
      <p>Online food ordering has revolutionized how we eat. Whether you're a first-time user or a seasoned pro, this guide will help you get the most out of your FoodMart experience.</p>
      
      <h2>Getting Started</h2>
      <p>Create an account, add your delivery address, and browse restaurants in your area. Use filters to find exactly what you're craving - from cuisine type to price range.</p>
      
      <h2>Reading Reviews</h2>
      <p>Check ratings and read recent reviews before ordering. Look for comments about food quality, portion sizes, and delivery time.</p>
      
      <h2>Smart Ordering Tips</h2>
      <p>Order during off-peak hours for faster delivery. Combine orders with colleagues or family to meet minimum order values. Look for promo codes before checkout.</p>
      
      <h2>Tracking Your Order</h2>
      <p>Use our real-time tracking feature to follow your order from preparation to delivery. You'll know exactly when to expect your food.</p>
    `,
    author: "Sarah Ahmed",
    authorBio: "Sarah is a tech writer and food enthusiast who helps users navigate digital platforms.",
    date: "Dec 28, 2024",
    readTime: "4 min read",
    category: "How To",
    categoryColor: "bg-indigo-100 text-indigo-700",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    title: "Healthy Eating: Best Low-Calorie Meals",
    excerpt: "Discover delicious and healthy meal options available on FoodMart for your fitness journey.",
    content: `
      <p>Eating healthy doesn't mean sacrificing flavor. FoodMart offers plenty of low-calorie options that are both nutritious and delicious. Here's our guide to guilt-free dining.</p>
      
      <h2>Understanding Calories</h2>
      <p>A typical adult needs 2000-2500 calories per day. For weight loss, a moderate deficit of 500 calories can lead to healthy, sustainable results.</p>
      
      <h2>Best Low-Calorie Breakfast Options</h2>
      <p>Start with egg white omelets, oatmeal with fresh fruit, or Greek yogurt parfaits. These options are high in protein to keep you full longer.</p>
      
      <h2>Light Lunch Choices</h2>
      <p>Opt for grilled chicken salads, vegetable soups, or sushi rolls. Many restaurants now offer 'light' menu sections with calorie counts.</p>
      
      <h2>Dinner Without the Guilt</h2>
      <p>Choose grilled fish, steamed vegetables, and lean proteins. Skip heavy sauces and ask for dressings on the side.</p>
    `,
    author: "Nutrition Expert",
    authorBio: "Our certified nutritionists curate healthy meal options and provide expert dietary advice.",
    date: "Dec 20, 2024",
    readTime: "6 min read",
    category: "Health",
    categoryColor: "bg-green-100 text-green-700",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop",
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | FoodMart Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="text-white/80 hover:text-white mb-4 -ml-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <Badge className={`mb-4 ${post.categoryColor}`}>
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-orange-500 text-white">
                    {post.author.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-[1fr,280px] gap-12">
          {/* Main Content */}
          <article>
            <Card>
              <CardContent className="p-8 md:p-12">
                {/* Article Content */}
                <div
                  className="prose prose-lg max-w-none 
                    prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:relative prose-h2:pb-4
                    prose-h2:after:content-[''] prose-h2:after:absolute prose-h2:after:bottom-0 prose-h2:after:left-0 prose-h2:after:w-16 prose-h2:after:h-1 prose-h2:after:bg-gradient-to-r prose-h2:after:from-orange-500 prose-h2:after:to-red-500 prose-h2:after:rounded-full
                    prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:mb-6
                    prose-strong:text-foreground prose-strong:font-semibold
                    first-letter:text-5xl first-letter:font-bold first-letter:text-orange-600 first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-10 mb-10">
                  <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors cursor-pointer">
                    #healthyfood
                  </span>
                  <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors cursor-pointer">
                    #bangladesh
                  </span>
                  <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors cursor-pointer">
                    #nutrition
                  </span>
                  <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors cursor-pointer">
                    #foodmart
                  </span>
                </div>
                
                {/* Share Section */}
                <div className="relative mt-12 pt-12">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-6">
                      Share this article
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full w-12 h-12 border-2 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-300 group"
                      >
                        <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full w-12 h-12 border-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-all duration-300 group"
                      >
                        <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full w-12 h-12 border-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-300 group"
                      >
                        <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full w-12 h-12 border-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300 group"
                      >
                        <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Engagement */}
                <div className="mt-12 flex items-center justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="gap-2 px-6 h-12 rounded-full border-2 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-300 group"
                  >
                    <Heart className="w-5 h-5 group-hover:fill-current group-hover:scale-110 transition-all" />
                    <span className="font-medium">Like</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 px-6 h-12 rounded-full border-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-300 group"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Comment</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-orange-500 text-white text-xl">
                    {post.author.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{post.author}</h3>
                <p className="text-sm text-muted-foreground mt-2">{post.authorBio}</p>
                <Button className="w-full mt-4" variant="outline">
                  Follow Author
                </Button>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.id}`}
                      className="group block"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform"
                            sizes="80px"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-orange-600 transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{related.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
