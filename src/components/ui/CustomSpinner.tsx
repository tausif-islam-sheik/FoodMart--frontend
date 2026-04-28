"use client";

import { cn } from "@/lib/utils";

interface CustomSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-8 h-8 border-3",
  lg: "w-12 h-12 border-4",
  xl: "w-16 h-16 border-4",
};

export default function CustomSpinner({ 
  size = "md", 
  className,
  text 
}: CustomSpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div 
          className={cn(
            "rounded-full border-orange-200 border-t-orange-500 animate-spin",
            sizeClasses[size]
          )} 
        />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
        </div>
      </div>
      {text && (
        <p className="mt-3 text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Full page loading overlay
export function FullPageSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <CustomSpinner size="xl" text={text} />
    </div>
  );
}

// Card loading state
export function CardSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <CustomSpinner size="lg" text={text} />
    </div>
  );
}
