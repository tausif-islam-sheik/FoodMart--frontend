import CustomSpinner from "@/components/ui/CustomSpinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <CustomSpinner size="xl" text="Loading..." />
      </div>
    </div>
  );
}