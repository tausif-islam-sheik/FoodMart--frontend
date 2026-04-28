/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryData, categoryService } from "@/services/category.service";
import { Check, Edit, Plus, Trash, X, Tag, FolderOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { DialogDescription } from "@radix-ui/react-dialog";

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-18">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-orange-500" />
            Categories
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage meal categories for your platform
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md"
        >
          <Plus size={18} /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No categories found</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Create your first category to get started
              </p>
            </CardContent>
          </Card>
        )}

        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-5">
                {inlineEditId === cat.id ? (
                  <div className="space-y-3">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Category name"
                      className="h-10"
                    />
                    <Input
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="Slug"
                      className="h-10"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setInlineEditId(null)}
                        className="h-9"
                      >
                        <X size={14} className="mr-1" /> Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleInlineSave(cat.id!)}
                        className="h-9 bg-orange-500 hover:bg-orange-600"
                        disabled={loadingInlineId === cat.id}
                      >
                        {loadingInlineId === cat.id ? (
                          "Saving..."
                        ) : (
                          <>
                            <Check size={14} className="mr-1" /> Save
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                        <Tag className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground">/{cat.slug}</p>
                        {cat.meals && (
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {cat.meals.length} {cat.meals.length === 1 ? "meal" : "meals"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-9"
                        onClick={() => handleInlineEdit(cat)}
                      >
                        <Edit size={14} className="mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 h-9"
                        onClick={() => openDeleteDialog(cat.id!)}
                      >
                        <Trash size={14} className="mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ADD / UPDATE Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-orange-500" />
              {editingCategory ? "Update Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? "Update the category details below" 
                : "Create a new category for organizing meals"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name</label>
              <Input
                placeholder="e.g. Breakfast, Lunch, Dinner"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL Slug</label>
              <Input
                placeholder="e.g. breakfast, lunch, dinner"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                This will be used in the URL: /category/your-slug
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="h-10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loadingAddUpdate}
              className="h-10 bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
            >
              {loadingAddUpdate
                ? "Processing..."
                : editingCategory
                  ? "Update Category"
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <Trash className="w-5 h-5" />
              Delete Category
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="h-10"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loadingDeleteId === deleteId}
              className="h-10"
            >
              {loadingDeleteId === deleteId ? "Deleting..." : "Delete Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CategoriesClient;