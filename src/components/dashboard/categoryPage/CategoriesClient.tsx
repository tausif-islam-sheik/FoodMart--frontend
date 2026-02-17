"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryData, categoryService } from "@/services/category.service";
import { Check, Edit, Plus, Trash, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Category extends CategoryData {
  meals?: any[];
}

interface Props {
  initialCategories: Category[];
}

const CategoriesClient = ({ initialCategories }: Props) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [inlineEditId, setInlineEditId] = useState<string | null>(null);

  const [loadingAddUpdate, setLoadingAddUpdate] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);
  const [loadingInlineId, setLoadingInlineId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDialogOpen(true);
  };

  const handleInlineEdit = (cat: Category) => {
    setInlineEditId(cat.id!);
    setName(cat.name);
    setSlug(cat.slug);
  };

  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoadingDeleteId(deleteId);

    const { error } = await categoryService.deleteCategory(deleteId);

    if (error) {
      setLoadingDeleteId(null);
      return toast.error(error.message);
    }

    setCategories(categories.filter((c) => c.id !== deleteId));
    toast.success("Category deleted successfully!");

    setLoadingDeleteId(null);
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = async () => {
    if (!name || !slug) {
      toast.error("Name and slug are required");
      return;
    }

    setLoadingAddUpdate(true);

    if (editingCategory) {
      const { data, error } = await categoryService.updateCategory(
        editingCategory.id!,
        { name, slug },
      );

      if (error) {
        setLoadingAddUpdate(false);
        return toast.error(error.message);
      }

      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? { ...data, meals: c.meals } : c,
        ),
      );

      toast.success("Category updated successfully");
    } else {
      const { data, error } = await categoryService.createCategory({
        name,
        slug,
      });

      if (error) {
        setLoadingAddUpdate(false);
        return toast.error(error.message);
      }

      setCategories([{ ...data, meals: [] }, ...categories]);
      toast.success("Category added successfully");
    }

    setLoadingAddUpdate(false);
    setDialogOpen(false);
  };

  const handleInlineSave = async (id: string) => {
    if (!name || !slug) return toast.error("Name and slug are required!");

    setLoadingInlineId(id);

    const { data, error } = await categoryService.updateCategory(id, {
      name,
      slug,
    });

    if (error) {
      setLoadingInlineId(null);
      return toast.error(error.message);
    }

    setCategories(
      categories.map((c) => (c.id === id ? { ...data, meals: c.meals } : c)),
    );

    setInlineEditId(null);
    toast.success("Category updated successfully!");
    setLoadingInlineId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 cursor-pointer"
        >
          <Plus size={16} /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No categories found
          </p>
        )}

        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between gap-3"
          >
            {inlineEditId === cat.id ? (
              <>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Slug"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInlineEditId(null)}
                    className="cursor-pointer"
                  >
                    <X size={14} /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleInlineSave(cat.id!)}
                    className="cursor-pointer bg-orange-600"
                    disabled={loadingInlineId === cat.id}
                  >
                    {loadingInlineId === cat.id ? (
                      "Saving..."
                    ) : (
                      <>
                        <Check size={14} /> Save
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="font-semibold text-lg">{cat.name}</p>
                  <p className="text-sm text-gray-500">{cat.slug}</p>
                  {cat.meals && (
                    <p className="text-xs text-gray-400 mt-1">
                      {cat.meals.length} meals
                    </p>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleInlineEdit(cat)}
                  >
                    <Edit size={14} /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => openDeleteDialog(cat.id!)}
                  >
                    <Trash size={14} /> Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ADD / UPDATE Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Update Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-2">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="cursor-pointer bg-orange-600"
              disabled={loadingAddUpdate}
            >
              {loadingAddUpdate
                ? "Processing..."
                : editingCategory
                  ? "Update"
                  : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this category?
          </p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="cursor-pointer"
              disabled={loadingDeleteId === deleteId}
            >
              {loadingDeleteId === deleteId ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoriesClient;