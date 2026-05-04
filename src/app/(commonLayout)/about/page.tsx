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
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | FoodMart - Our Story & Mission",
  description: "Learn about FoodMart's mission to revolutionize food delivery. Discover our story, values, and commitment to connecting people with great food.",
};

const About = () => {
  const stats = [
    { value: "500+", label: "Restaurant Partners" },
    { value: "1M+", label: "Orders Delivered" },
    { value: "50+", label: "Cities Covered" },
    { value: "4.9", label: "Customer Rating" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision we make starts with how it benefits our customers and restaurant partners.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured",
      description:
        "We partner only with verified restaurants that meet our strict quality and hygiene standards.",
    },
    {
      icon: Clock,
      title: "Speed & Reliability",
      description:
        "Our logistics network ensures your food arrives hot, fresh, and on time, every time.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description:
        "We support local businesses and create opportunities for delivery partners in every city.",
    },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", initial: "S" },
    { name: "Michael Chen", role: "CTO", initial: "M" },
    { name: "Emily Rodriguez", role: "Head of Operations", initial: "E" },
    { name: "David Kim", role: "Head of Partnerships", initial: "D" },
  ];

  return (
    <div className="min-h-screen flex flex-col p-5 md:p-0">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-background to-accent/20" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-orange-500 bg-orange-50 rounded-full">
                Our Story
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Connecting People with{" "}
                <span className="text-orange-500">Great Food</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                FoodMart started with a simple idea: everyone deserves access to
                delicious, quality meals from their favorite local restaurants,
                delivered right to their doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/register"}>
                  <Button
                    size="lg"
                    className="gap-2 bg-orange-500 hover:bg-orange-400 cursor-pointer"
                  >
                    Join As a Provider <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={"/register"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:text-orange-700 hover:bg-orange-50 cursor-pointer"
                  >
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-orange-500">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-primary-foreground/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 md:py-28">
          <div className="container max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-orange-500 bg-orange-50 rounded-full">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Making Food Delivery{" "}
                  <span className="text-orange-500">Simple & Joyful</span>
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We believe that enjoying your favorite meal shouldn't be
                  complicated. Whether it's a quick lunch, a family dinner, or a
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
                <Card className="bg-orange-50 border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Target className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground">Vision</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      To be the most loved food delivery platform worldwide
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Truck className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground">Goal</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Deliver 10 million meals by end of 2025
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground">Reach</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Expand to 100+ cities across the nation
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <Award className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground">Quality</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Maintain 4.9+ rating across all services
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-orange-500 bg-orange-50 rounded-full">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Drives <span className="text-orange-500">Us Forward</span>
              </h2>
              <p className="text-muted-foreground">
                These core principles guide every decision we make and shape how
                we serve our community.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-orange-500 bg-orange-50 rounded-full">
                Leadership Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet the <span className="text-orange-500">People</span> Behind
                FoodMart
              </h2>
              <p className="text-muted-foreground">
                A passionate team dedicated to revolutionizing how you
                experience food delivery.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="bg-background border border-border shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-300 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {member.initial}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.role}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-orange-500">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Experience FoodMart?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Join millions of happy customers and discover why FoodMart is
                the preferred choice for food delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/meals"}>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 cursor-pointer"
                  >
                    Order Now <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={"/register"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer"
                  >
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
