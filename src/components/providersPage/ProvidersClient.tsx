/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";
import ProviderCard from "./ProviderCard";
import { Filter, Store, SearchX } from "lucide-react";

interface ProvidersClientProps {
  providers: any[];
  categories: { id: string; name: string }[];
}

export default function ProvidersClient({
  providers,
  categories,
}: ProvidersClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const perPage = 8;

  const filteredProviders = useMemo(() => {
    if (selectedCategory === "all") return providers;

    return providers.filter((p: any) => {
      if (!Array.isArray(p.meals)) return false;
      return p.meals.some((m: any) => m.categoryId === selectedCategory);
    });
  }, [selectedCategory, providers]);

  const totalPages = Math.ceil(filteredProviders.length / perPage);

  const paginatedProviders = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredProviders.slice(start, start + perPage);
  }, [filteredProviders, currentPage]);

  const selectedCategoryName = selectedCategory === "all"
    ? "All Categories"
    : categories.find(c => c.id === selectedCategory)?.name || "All Categories";

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
            <Store className="w-4 h-4 text-brand-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {filteredProviders.length} {filteredProviders.length === 1 ? "Provider" : "Providers"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {filteredProviders.length > perPage
                ? `Showing ${(currentPage - 1) * perPage + 1}-${Math.min(currentPage * perPage, filteredProviders.length)} of ${filteredProviders.length}`
                : `Showing all ${filteredProviders.length} providers`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter by:</span>
          </div>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-48 sm:w-56 h-10 bg-background border-border/60 hover:border-brand-300 transition-colors">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Badge */}
      {selectedCategory !== "all" && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filter:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm font-medium">
            {selectedCategoryName}
            <button
              onClick={() => setSelectedCategory("all")}
              className="w-4 h-4 rounded-full bg-brand-200/50 hover:bg-brand-200 flex items-center justify-center transition-colors"
            >
              <span className="text-xs">×</span>
            </button>
          </span>
        </div>
      )}

      {/* Providers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {paginatedProviders.length > 0 ? (
          paginatedProviders.map((provider: any) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))
        ) : (
          <div className="col-span-full py-12 sm:py-16">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <SearchX className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No providers found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                No restaurants match the selected category. Try selecting a different category or check back later.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium"
              >
                View All Providers
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}












// ─── ProvidersClient.tsx ────────────────────────────────────
// "use client";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useMemo, useState, useEffect } from "react";
// import Pagination from "./Pagination";
// import ProviderCard from "./ProviderCard";
// import { ChevronDown } from "lucide-react";

// interface ProvidersClientProps {
//   providers: any[];
//   categories: { id: string; name: string }[];
// }

// export default function ProvidersClient({
//   providers,
//   categories,
// }: ProvidersClientProps) {
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [width, setWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1024
//   );
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     const onResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const isMobile = width < 640;
//   const isTablet = width >= 640 && width < 1024;

//   // ── Palette ──
//   const accent = "#b5652a";
//   const accentLight = "#c47a3a";
//   const accentGlow = "rgba(181,101,42,0.18)";
//   const accentTint = "#faf4ee";

//   const perPage = 6;

//   const filteredProviders = useMemo(() => {
//     if (selectedCategory === "all") return providers;
//     return providers.filter((p: any) => {
//       if (!Array.isArray(p.meals)) return false;
//       return p.meals.some((m: any) => m.categoryId === selectedCategory);
//     });
//   }, [selectedCategory, providers]);

//   const totalPages = Math.ceil(filteredProviders.length / perPage);

//   const paginatedProviders = useMemo(() => {
//     const start = (currentPage - 1) * perPage;
//     return filteredProviders.slice(start, start + perPage);
//   }, [filteredProviders, currentPage]);

//   const allCategories = [
//     { id: "all", name: "All Categories" },
//     ...categories,
//   ];

//   const selectedLabel =
//     allCategories.find((c) => c.id === selectedCategory)?.name ||
//     "All Categories";

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: isMobile ? "28px" : "36px",
//         fontFamily: "'Georgia', serif",
//       }}
//     >
//       {/* ── Filter Row ── */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: isMobile ? "flex-start" : "center",
//           justifyContent: "space-between",
//           flexDirection: isMobile ? "column" : "row",
//           gap: isMobile ? "16px" : "0",
//         }}
//       >
//         {/* Left: badge + heading */}
//         <div>
//           <div
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "10px",
//               background: "rgba(181,101,42,0.08)",
//               border: `1px solid rgba(181,101,42,0.22)`,
//               borderRadius: "30px",
//               padding: "6px 18px",
//               marginBottom: "14px",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 width: "7px",
//                 height: "7px",
//                 borderRadius: "50%",
//                 background: accent,
//                 boxShadow: `0 0 6px ${accentGlow}`,
//               }}
//             />
//             <span
//               style={{
//                 color: accent,
//                 fontSize: "11px",
//                 letterSpacing: "1.5px",
//                 textTransform: "uppercase" as const,
//                 fontFamily: "'Helvetica Neue', sans-serif",
//                 fontWeight: 500,
//               }}
//             >
//               Explore
//             </span>
//           </div>

//           <h2
//             style={{
//               fontSize: isMobile ? "28px" : "36px",
//               fontWeight: 400,
//               color: "#1a1a1a",
//               lineHeight: 1.2,
//               letterSpacing: "-0.4px",
//               margin: 0,
//             }}
//           >
//             All{" "}
//             <span style={{ color: accent, fontStyle: "italic" }}>
//               Providers
//             </span>
//           </h2>
//         </div>

//         {/* Custom Dropdown */}
//         <div style={{ position: "relative" }}>
//           <button
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               minWidth: isMobile ? "100%" : "220px",
//               padding: "11px 18px",
//               background: dropdownOpen ? "#fff" : "rgba(250,244,238,0.7)",
//               border: `1.5px solid ${dropdownOpen ? accent : "rgba(181,101,42,0.22)"}`,
//               borderRadius: "12px",
//               cursor: "pointer",
//               transition: "all 0.2s ease",
//               outline: "none",
//               boxShadow: dropdownOpen ? `0 0 0 3px ${accentGlow}` : "none",
//             }}
//           >
//             <span
//               style={{
//                 flex: 1,
//                 textAlign: "left" as const,
//                 fontSize: "14px",
//                 color: "#1a1a1a",
//                 fontFamily: "'Helvetica Neue', sans-serif",
//                 fontWeight: 500,
//               }}
//             >
//               {selectedLabel}
//             </span>
//             <ChevronDown
//               size={16}
//               style={{
//                 color: accent,
//                 transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
//                 transition: "transform 0.2s ease",
//                 flexShrink: 0,
//               }}
//             />
//           </button>

//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <>
//               <div
//                 style={{ position: "fixed", inset: 0, zIndex: 9 }}
//                 onClick={() => setDropdownOpen(false)}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "calc(100% + 6px)",
//                   left: 0,
//                   right: 0,
//                   minWidth: "220px",
//                   background: "#fff",
//                   border: `1px solid rgba(181,101,42,0.18)`,
//                   borderRadius: "14px",
//                   boxShadow:
//                     "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
//                   zIndex: 10,
//                   overflow: "hidden",
//                   padding: "6px",
//                 }}
//               >
//                 {allCategories.map((cat) => (
//                   <DropdownItem
//                     key={cat.id}
//                     label={cat.name}
//                     isActive={selectedCategory === cat.id}
//                     onClick={() => {
//                       setSelectedCategory(cat.id);
//                       setCurrentPage(1);
//                       setDropdownOpen(false);
//                     }}
//                     accent={accent}
//                     accentTint={accentTint}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ── Providers Grid ── */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: isMobile
//             ? "1fr"
//             : isTablet
//             ? "1fr 1fr"
//             : "1fr 1fr 1fr",
//           gap: isMobile ? "16px" : isTablet ? "20px" : "24px",
//         }}
//       >
//         {paginatedProviders.length > 0 ? (
//           paginatedProviders.map((provider: any) => (
//             <ProviderCard key={provider.id} provider={provider} />
//           ))
//         ) : (
//           <div
//             style={{
//               gridColumn: "1 / -1",
//               textAlign: "center" as const,
//               padding: "80px 20px",
//               display: "flex",
//               flexDirection: "column" as const,
//               alignItems: "center",
//               gap: "16px",
//             }}
//           >
//             <div
//               style={{
//                 width: "72px",
//                 height: "72px",
//                 borderRadius: "50%",
//                 background: `linear-gradient(135deg, ${accentTint}, rgba(242,228,212,0.6))`,
//                 border: `1px dashed rgba(181,101,42,0.25)`,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "28px",
//               }}
//             >
//               🔍
//             </div>
//             <p
//               style={{
//                 fontSize: "17px",
//                 color: "#1a1a1a",
//                 margin: 0,
//                 fontWeight: 400,
//               }}
//             >
//               No providers found
//             </p>
//             <p
//               style={{
//                 fontSize: "14px",
//                 color: "#999",
//                 margin: 0,
//                 fontFamily: "'Helvetica Neue', sans-serif",
//                 maxWidth: "320px",
//                 lineHeight: 1.6,
//               }}
//             >
//               Try selecting a different category or check back later.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ── Pagination ── */}
//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       )}
//     </div>
//   );
// }

// /* ── Dropdown Item ── */
// function DropdownItem({
//   label,
//   isActive,
//   onClick,
//   accent,
//   accentTint,
// }: {
//   label: string;
//   isActive: boolean;
//   onClick: () => void;
//   accent: string;
//   accentTint: string;
// }) {
//   const [hov, setHov] = useState(false);

//   return (
//     <button
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       onClick={onClick}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "10px",
//         width: "100%",
//         padding: "10px 14px",
//         border: "none",
//         borderRadius: "10px",
//         background: isActive
//           ? `linear-gradient(135deg, ${accentTint}, rgba(242,228,212,0.7))`
//           : hov
//           ? "rgba(181,101,42,0.05)"
//           : "transparent",
//         cursor: "pointer",
//         transition: "background 0.15s ease",
//         textAlign: "left" as const,
//       }}
//     >
//       <span
//         style={{
//           display: "inline-block",
//           width: "6px",
//           height: "6px",
//           borderRadius: "50%",
//           background: isActive ? accent : "transparent",
//           flexShrink: 0,
//           transition: "background 0.15s ease",
//         }}
//       />
//       <span
//         style={{
//           fontSize: "14px",
//           color: isActive ? accent : "#333",
//           fontFamily: "'Helvetica Neue', sans-serif",
//           fontWeight: isActive ? 600 : 500,
//           transition: "color 0.15s ease",
//         }}
//       >
//         {label}
//       </span>
//     </button>
//   );
// }