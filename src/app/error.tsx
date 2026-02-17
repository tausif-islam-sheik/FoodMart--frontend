"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />

        <h2 className="text-xl font-semibold">Something went wrong 😢</h2>

        <p className="text-sm text-muted-foreground">
          We couldn’t load this page right now. Please try again.
        </p>

        <Button className="bg-orange-600 hover:bg-orange-500 cursor-pointer" onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}