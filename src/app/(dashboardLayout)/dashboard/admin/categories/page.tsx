import CategoriesClient from "@/components/dashboard/categoryPage/CategoriesClient";
import { categoryService } from "@/services/category.service";


export const metadata = {
  title: "Admin Categories | Feedza",
};

export default async function CategoriesPage() {
  const { data: categories, error } = await categoryService.getAllCategories();

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load categories: {error.message}
      </p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <CategoriesClient initialCategories={categories || []} />
    </div>
  );
}