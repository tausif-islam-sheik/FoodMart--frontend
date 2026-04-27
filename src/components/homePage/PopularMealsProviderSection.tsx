"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { providerService } from "@/services/provider.service";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, MapPin, ShoppingBag, Store, Star } from "lucide-react";

interface Provider {
  id: string;
  restaurantName: string;
  address: string;
  logo?: string | null;
  orders?: any[];
  rating?: number;
  cuisine?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function PopularMealsProviderSection() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await providerService.getAllProviders();
        const data = res.data || [];
        setProviders(data);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Sort by order count
  const sortedProviders = [...providers].sort(
    (a, b) => (b.orders?.length || 0) - (a.orders?.length || 0),
  );

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-muted rounded-lg" />
              <div className="h-10 w-32 bg-muted rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-72 bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-3xl -z-10 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full">
              <Store className="w-3 h-3" />
              Top Rated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Popular <span className="gradient-text">Providers</span>
            </h2>
            <p className="text-muted-foreground max-w-md">
              Discover the most loved restaurants in your area
            </p>
          </div>

          <Link href="/providers">
            <Button
              variant="outline"
              className="group gap-2 border-2 hover:border-brand-300 hover:bg-brand-50 rounded-xl px-6"
            >
              See All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Providers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sortedProviders.slice(0, 4).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  const [isHovered, setIsHovered] = useState(false);
  const orderCount = provider.orders?.length || 0;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden rounded-2xl border-0 bg-card shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 p-0">
        {/* Image/Logo Container */}
        <div className="relative h-44 overflow-hidden bg-card">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {provider.logo ? (
              <Image
                src={provider.logo}
                alt={provider.restaurantName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-card shadow-md flex items-center justify-center text-4xl">
                  🍽️
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            <ShoppingBag className="w-3 h-3" />
            {orderCount}
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-brand-600 transition-colors">
              {provider.restaurantName}
            </h3>
            <div className="flex items-center gap-1 text-xs font-medium">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{provider.rating || 4.5}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{provider.address}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <span className="text-xs text-muted-foreground">
              {orderCount > 0 ? `${orderCount} orders delivered` : "New Partner"}
            </span>
            <Link href={`/providers/${provider.id}`}>
              <button className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                View Menu →
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
















// "use client";

// import { useState, useEffect } from "react";
// import { ArrowRight, MapPin, ShoppingBag } from "lucide-react";
// import Link from "next/link";

// // ── Mock data (replace with your actual async fetch) ──
// const mockProviders = [
//   {
//     id: "1",
//     restaurantName: "Pizza Express",
//     address: "123 Main Street, Dhaka",
//     logo: null,
//     orders: Array(247),
//     cuisine: "Italian",
//     emoji: "🍕",
//   },
//   {
//     id: "2",
//     restaurantName: "Fresh Garden",
//     address: "45 Green Lane, Chittagong",
//     logo: null,
//     orders: Array(189),
//     cuisine: "Healthy",
//     emoji: "🥗",
//   },
//   {
//     id: "3",
//     restaurantName: "Sushi Palace",
//     address: "78 Ocean Road, Sylhet",
//     logo: null,
//     orders: Array(156),
//     cuisine: "Japanese",
//     emoji: "🍣",
//   },
//   {
//     id: "4",
//     restaurantName: "Burger Barn",
//     address: "90 River View, Rajshahi",
//     logo: null,
//     orders: Array(134),
//     cuisine: "American",
//     emoji: "🍔",
//   },
// ];

// export default function PopularMealsProviderSection() {
//   const [width, setWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1024,
//   );
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [hoveredBtn, setHoveredBtn] = useState(false);

//   useEffect(() => {
//     const onResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const isMobile = width < 640;
//   const isTablet = width >= 640 && width < 1024;

//   // ── Palette ──
//   const accent = "#b5652a";
//   const accentHover = "#9a5222";
//   const accentLight = "#c47a3a";
//   const accentGlow = "rgba(181,101,42,0.18)";
//   const accentTint = "#faf4ee";
//   const accentTintMid = "#f2e4d4";

//   // sort by order count
//   const sorted = [...mockProviders].sort(
//     (a, b) => (b.orders?.length || 0) - (a.orders?.length || 0),
//   );
//   const displayed = sorted.slice(0, 4);

//   return (
//     <section
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         background: "#fff",
//         padding: isMobile ? "64px 20px" : isTablet ? "80px 32px" : "100px 28px",
//         fontFamily: "'Georgia', serif",
//       }}
//     >
//       {/* ── Subtle top edge line ── */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: "10%",
//           right: "10%",
//           height: "1px",
//           background: `linear-gradient(to right, transparent, ${accentGlow}, transparent)`,
//         }}
//       />

//       {/* ── Ambient glow ── */}
//       <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
//         <div
//           style={{
//             position: "absolute",
//             top: "-200px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "600px",
//             height: "400px",
//             borderRadius: "50%",
//             background:
//               "radial-gradient(ellipse, rgba(181,101,42,0.04) 0%, transparent 70%)",
//           }}
//         />
//       </div>

//       {/* ── Inner ── */}
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           maxWidth: "1100px",
//           margin: "0 auto",
//         }}
//       >
//         {/* ── Header Row ── */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: isMobile ? "flex-start" : "center",
//             justifyContent: "space-between",
//             flexDirection: isMobile ? "column" : "row",
//             gap: isMobile ? "20px" : "0",
//             marginBottom: isMobile ? "36px" : "52px",
//           }}
//         >
//           {/* Left: badge + headline */}
//           <div>
//             {/* Badge */}
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 background: "rgba(181,101,42,0.08)",
//                 border: `1px solid rgba(181,101,42,0.22)`,
//                 borderRadius: "30px",
//                 padding: "6px 18px",
//                 marginBottom: "16px",
//               }}
//             >
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "7px",
//                   height: "7px",
//                   borderRadius: "50%",
//                   background: accent,
//                   boxShadow: `0 0 6px ${accentGlow}`,
//                 }}
//               />
//               <span
//                 style={{
//                   color: accent,
//                   fontSize: "11px",
//                   letterSpacing: "1.5px",
//                   textTransform: "uppercase",
//                   fontFamily: "'Helvetica Neue', sans-serif",
//                   fontWeight: 500,
//                 }}
//               >
//                 Top Rated
//               </span>
//             </div>

//             {/* Headline */}
//             <h2
//               style={{
//                 fontSize: isMobile ? "28px" : "38px",
//                 fontWeight: 400,
//                 color: "#1a1a1a",
//                 lineHeight: 1.2,
//                 letterSpacing: "-0.4px",
//                 margin: 0,
//               }}
//             >
//               Popular{" "}
//               <span style={{ color: accent, fontStyle: "italic" }}>
//                 Providers
//               </span>
//             </h2>
//           </div>

//           {/* CTA Button */}
//           <Link href={"/providers"}>
//             <button
//               onMouseEnter={() => setHoveredBtn(true)}
//               onMouseLeave={() => setHoveredBtn(false)}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 padding: isMobile ? "13px 24px" : "14px 30px",
//                 border: `1.5px solid ${hoveredBtn ? accent : "rgba(181,101,42,0.3)"}`,
//                 borderRadius: "50px",
//                 background: hoveredBtn
//                   ? "rgba(181,101,42,0.08)"
//                   : "rgba(181,101,42,0.04)",
//                 color: hoveredBtn ? accentLight : accentLight,
//                 fontSize: isMobile ? "13px" : "14px",
//                 fontFamily: "'Helvetica Neue', sans-serif",
//                 fontWeight: 600,
//                 letterSpacing: "0.4px",
//                 cursor: "pointer",
//                 transition: "all 0.25s ease",
//                 whiteSpace: "nowrap",
//                 flexShrink: 0,
//               }}
//             >
//               See All Providers
//               <ArrowRight
//                 size={16}
//                 style={{
//                   transform: hoveredBtn ? "translateX(3px)" : "translateX(0)",
//                   transition: "transform 0.25s ease",
//                 }}
//               />
//             </button>
//           </Link>
//         </div>

//         {/* ── Cards Grid ── */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: isMobile
//               ? "1fr"
//               : isTablet
//                 ? "1fr 1fr"
//                 : "1fr 1fr 1fr 1fr",
//             gap: isMobile ? "16px" : isTablet ? "20px" : "24px",
//           }}
//         >
//           {displayed.map((provider, index) => {
//             const isHov = hoveredCard === index;
//             return (
//               <div
//                 key={provider.id}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 style={{
//                   background: isHov ? "#fff" : "rgba(250,244,238,0.6)",
//                   border: `1px solid ${isHov ? "rgba(181,101,42,0.3)" : "rgba(0,0,0,0.07)"}`,
//                   borderRadius: "20px",
//                   overflow: "hidden",
//                   boxShadow: isHov
//                     ? "0 10px 36px rgba(181,101,42,0.15), 0 2px 8px rgba(0,0,0,0.06)"
//                     : "0 2px 10px rgba(0,0,0,0.04)",
//                   transform: isHov ? "translateY(-5px)" : "translateY(0)",
//                   transition: "all 0.3s ease",
//                   cursor: "pointer",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 {/* Logo / Image Area */}
//                 <div
//                   style={{
//                     position: "relative",
//                     height: isMobile ? "140px" : "160px",
//                     background: isHov
//                       ? `linear-gradient(135deg, ${accentTint}, ${accentTintMid})`
//                       : `linear-gradient(135deg, ${accentTintMid}, ${accentTint})`,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     transition: "background 0.3s ease",
//                   }}
//                 >
//                   {/* Decorative ring */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       inset: "12px",
//                       borderRadius: "50%",
//                       border: `1px dashed rgba(181,101,42,${isHov ? "0.2" : "0.12"})`,
//                       transition: "border 0.3s ease",
//                     }}
//                   />

//                   {/* Emoji icon */}
//                   <div
//                     style={{
//                       position: "relative",
//                       zIndex: 1,
//                       width: isMobile ? "64px" : "72px",
//                       height: isMobile ? "64px" : "72px",
//                       borderRadius: "50%",
//                       background: "#fff",
//                       border: `2px solid rgba(181,101,42,${isHov ? "0.25" : "0.15"})`,
//                       boxShadow: isHov
//                         ? "0 4px 16px rgba(181,101,42,0.2)"
//                         : "0 2px 8px rgba(0,0,0,0.06)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: isMobile ? "28px" : "32px",
//                       transition: "all 0.3s ease",
//                     }}
//                   >
//                     {provider.emoji}
//                   </div>

//                   {/* Order count badge */}
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "14px",
//                       right: "14px",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "5px",
//                       background: "rgba(26,20,16,0.7)",
//                       backdropFilter: "blur(6px)",
//                       borderRadius: "20px",
//                       padding: "5px 10px",
//                       border: `1px solid rgba(181,101,42,0.2)`,
//                     }}
//                   >
//                     <ShoppingBag size={11} style={{ color: accentLight }} />
//                     <span
//                       style={{
//                         color: "#fff",
//                         fontSize: "11px",
//                         fontFamily: "'Helvetica Neue', sans-serif",
//                         fontWeight: 600,
//                         letterSpacing: "0.3px",
//                       }}
//                     >
//                       {provider.orders?.length || 0}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div
//                   style={{
//                     padding: isMobile ? "18px 20px 20px" : "20px 22px 24px",
//                     flex: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "8px",
//                   }}
//                 >
//                   {/* Cuisine tag */}
//                   <span
//                     style={{
//                       display: "inline-block",
//                       width: "fit-content",
//                       fontSize: "10px",
//                       letterSpacing: "1.2px",
//                       textTransform: "uppercase",
//                       color: accent,
//                       fontFamily: "'Helvetica Neue', sans-serif",
//                       fontWeight: 600,
//                     }}
//                   >
//                     {provider.cuisine}
//                   </span>

//                   {/* Name */}
//                   <h3
//                     style={{
//                       fontSize: isMobile ? "16px" : "17px",
//                       fontWeight: 400,
//                       color: "#1a1a1a",
//                       margin: 0,
//                       letterSpacing: "-0.2px",
//                     }}
//                   >
//                     {provider.restaurantName}
//                   </h3>

//                   {/* Address */}
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "6px",
//                       marginTop: "auto",
//                     }}
//                   >
//                     <MapPin
//                       size={13}
//                       style={{ color: "#bbb", flexShrink: 0 }}
//                     />
//                     <span
//                       style={{
//                         fontSize: "13px",
//                         color: "#999",
//                         fontFamily: "'Helvetica Neue', sans-serif",
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {provider.address}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
