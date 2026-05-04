"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Tag, Truck, Gift, Zap, Star, ChevronRight } from "lucide-react";

interface Deal {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  code?: string;
  icon: React.ReactNode;
  tag?: string;
  countdown?: boolean;
  gradient: string;
}

const deals: Deal[] = [
  {
    id: 1,
    title: "30% OFF",
    subtitle: "First Order",
    description: "New customers get 30% off up to ৳200",
    code: "WELCOME30",
    icon: <Gift className="w-5 h-5" />,
    tag: "Best Deal",
    countdown: true,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "FREE",
    subtitle: "Delivery",
    description: "On orders over ৳500",
    icon: <Truck className="w-5 h-5" />,
    tag: "Popular",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "BUY 2 GET 1",
    subtitle: "Combo Deal",
    description: "Get 1 dessert free with 2 meals",
    code: "COMBO3",
    icon: <Zap className="w-5 h-5" />,
    gradient: "from-violet-500 to-pink-500",
  },
  {
    id: 4,
    title: "20% OFF",
    subtitle: "Happy Hours",
    description: "2PM - 5PM daily",
    icon: <Clock className="w-5 h-5" />,
    countdown: true,
    gradient: "from-amber-500 to-orange-500",
  },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-brand-50 border border-brand-200 text-brand-600 px-2 py-1 rounded-md min-w-[32px] text-center">
        <span className="text-sm font-bold">{formatNumber(value)}</span>
      </div>
      <span className="text-[9px] text-brand-500 mt-0.5 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-0.5">
      <TimeUnit value={timeLeft.hours} label="Hr" />
      <span className="text-brand-400 font-bold">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-brand-400 font-bold">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
}

export default function TrendingDeals() {
  const router = useRouter();

  const handleDealClick = (dealId: number) => {
    router.push(`/meals?deal=${dealId}`);
  };

  const handleViewAll = () => {
    router.push("/meals?deals=true");
  };

  return (
    <section id="deals" className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2.5 md:gap-3">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full">
                <Star className="w-3 h-3" />
                Exclusive Deals
              </span>
              <h2 className="text-3xl md:text-4xl my-2 font-bold text-foreground">
                Trending
                <span className="text-primary"> Deals</span>
              </h2>
              <p className="text-md md:text-lg text-muted-foreground">
                Exclusive offers for you
              </p>
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
            <Tag className="w-3 h-3" />
            Limited time
          </span>
        </motion.div>

        {/* Single Card with All Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-card rounded-3xl shadow-xl dark:shadow-none border border-border overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-6 md:p-8 border-b border-border bg-gradient-to-r from-brand-50/50 to-orange-50/50 dark:from-brand-500/5 dark:to-orange-500/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                  <Gift className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Special Offers
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Grab these limited-time deals before they expire
                  </p>
                </div>
              </div>
              <button
                onClick={handleViewAll}
                className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-colors shadow-md shadow-brand-500/20"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Deals List */}
          <div className="divide-y divide-border">
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => handleDealClick(deal.id)}
                className="group p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Icon with gradient */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${deal.gradient} flex items-center justify-center text-white shadow-md shrink-0`}>
                    {deal.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start md:items-center justify-between gap-3 flex-col md:flex-row">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg md:text-xl font-bold text-foreground">
                            {deal.title}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {deal.subtitle}
                          </span>
                          {deal.tag && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-semibold rounded-full">
                              {deal.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {deal.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        {/* Code */}
                        {deal.code && (
                          <span className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-mono rounded-lg border border-border">
                            {deal.code}
                          </span>
                        )}

                        {/* Countdown */}
                        {deal.countdown && (
                          <div className="hidden sm:block">
                            <CountdownTimer />
                          </div>
                        )}

                        {/* Apply Button */}
                        <button className="flex items-center gap-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors">
                          Apply
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Card Footer */}
          <div className="p-4 md:p-6 bg-gray-50 dark:bg-muted/30 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Valid until end of month</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Deals refresh daily
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
