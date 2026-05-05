import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Target,
  Heart,
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Star,
  Store,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | FoodMart - Our Story & Mission",
  description: "Learn about FoodMart's mission to revolutionize food delivery. Discover our story, values, and commitment to connecting people with great food.",
};

const About = () => {
  const stats = [
    { value: "500+", label: "Restaurant Partners", icon: Store },
    { value: "1M+", label: "Orders Delivered", icon: Truck },
    { value: "50+", label: "Cities Covered", icon: Globe },
    { value: "4.9", label: "Customer Rating", icon: Star },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make starts with how it benefits our customers and restaurant partners.",
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-rose-50",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured",
      description: "We partner only with verified restaurants that meet our strict quality and hygiene standards.",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Zap,
      title: "Speed & Reliability",
      description: "Our logistics network ensures your food arrives hot, fresh, and on time, every time.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "We support local businesses and create opportunities for delivery partners in every city.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
    },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", initial: "S", color: "from-brand-500 to-orange-500" },
    { name: "Michael Chen", role: "CTO", initial: "M", color: "from-blue-500 to-indigo-500" },
    { name: "Emily Rodriguez", role: "Head of Operations", initial: "E", color: "from-emerald-500 to-teal-500" },
    { name: "David Kim", role: "Head of Partnerships", initial: "D", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-orange-50/50 dark:from-background dark:via-muted/30 dark:to-background" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-brand-900/30 rounded-full shadow-sm border border-brand-100 mb-6">
                <Sparkles className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-600">Our Story</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Connecting People with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-500">
                  Great Food
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                FoodMart started with a simple idea: everyone deserves access to
                delicious, quality meals from their favorite local restaurants,
                delivered right to their doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="gap-2 bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25">
                    Join As a Provider <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-brand-500 to-brand-600 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          
          <div className="container relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container max-w-6xl mx-auto relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 rounded-full mb-4">
                  <Target className="w-4 h-4 text-brand-500" />
                  <span className="text-sm font-medium text-brand-600">Our Mission</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Making Food Delivery{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-500">
                    Simple & Joyful
                  </span>
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We believe that enjoying your favorite meal shouldn&apos;t be
                  complicated. Whether it&apos;s a quick lunch, a family dinner, or a
                  late-night craving, FoodMart is here to bring the restaurant
                  experience to your home.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform connects thousands of restaurants with millions
                  of customers, creating opportunities for local businesses
                  while delivering convenience to food lovers everywhere.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/20 dark:to-brand-800/20 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-3">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Vision</h3>
                    <p className="text-sm text-muted-foreground mt-2">To be the most loved food delivery platform worldwide</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/20 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Goal</h3>
                    <p className="text-sm text-muted-foreground mt-2">Deliver 10 million meals by end of 2025</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Reach</h3>
                    <p className="text-sm text-muted-foreground mt-2">Expand to 100+ cities across the nation</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-3">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Quality</h3>
                    <p className="text-sm text-muted-foreground mt-2">Maintain 4.9+ rating across all services</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-200/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-200/10 rounded-full blur-3xl" />

          <div className="container max-w-6xl mx-auto relative">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-brand-900/30 rounded-full shadow-sm border border-brand-100 mb-4">
                <Heart className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-600">Our Values</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Drives{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-500">
                  Us Forward
                </span>
              </h2>
              <p className="text-muted-foreground">
                These core principles guide every decision we make and shape how
                we serve our community.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-background border border-border shadow-sm hover:shadow-lg hover:border-brand-200 transition-all group">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-brand-900/30 rounded-full shadow-sm border border-brand-100 mb-4">
                <Users className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium text-brand-600">Leadership Team</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-500">
                  People
                </span>{" "}
                Behind FoodMart
              </h2>
              <p className="text-muted-foreground">
                A passionate team dedicated to revolutionizing how you
                experience food delivery.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="bg-background border border-border shadow-sm text-center hover:shadow-lg hover:border-brand-200 transition-all group">
                  <CardContent className="p-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl font-bold text-white">{member.initial}</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-brand-500 to-brand-600 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience FoodMart?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join millions of happy customers and discover why FoodMart is
                the preferred choice for food delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/meals">
                  <Button size="lg" variant="secondary" className="gap-2 bg-white text-brand-600 hover:bg-white/90 shadow-lg">
                    Order Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
