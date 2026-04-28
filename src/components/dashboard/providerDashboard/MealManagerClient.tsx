"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomSpinner from "@/components/ui/CustomSpinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { CategoryData, categoryService } from "@/services/category.service";
import { MealData, mealService } from "@/services/meal.service";

interface Props {
  userId: string;
}

const MealManagerClient = ({ userId }: Props) => {
  const [meals, setMeals] = useState<any[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const [loadingMeals, setLoadingMeals] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<any | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<any | null>(null);

  const [form, setForm] = useState<MealData>({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    isAvailable: true,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchMeals = async () => {
    setLoadingMeals(true);
    const { data, error } = await mealService.getAllMeals();
    if (error) toast.error(error.message);
    else setMeals(data.filter((meal: any) => meal.userId === userId));
    setLoadingMeals(false);
  };

  const fetchCategories = async () => {
    const res = await categoryService.getAllCategories();
    if (!res.error) setCategories(res.data);
  };

  useEffect(() => {
    fetchMeals();
    fetchCategories();
  }, []);

  const uploadToImgbb = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: fd },
    );
    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      if (!form.name || !form.description || !form.price || !form.categoryId) {
        toast.error("Please fill in all required fields");
        setSaving(false);
        return;
      }

      if (form.price <= 0) {
        toast.error("Price must be greater than 0");
        setSaving(false);
        return;
      }

      let imageUrl = form.image;
      if (imageFile) imageUrl = await uploadToImgbb(imageFile);

      const payload = { ...form, image: imageUrl };

      const res = editingMeal
        ? await mealService.updateMeal(editingMeal.id, payload)
        : await mealService.createMeal(payload);

      if (res.error) throw new Error(res.error.message);

      toast.success(editingMeal ? "Meal updated" : "Meal created");
      setDialogOpen(false);
      fetchMeals();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!mealToDelete) return;

    try {
      setDeletingId(mealToDelete.id);
      const res = await mealService.deleteMeal(mealToDelete.id);
      if (res.error) throw new Error(res.error.message);

      toast.success("Meal deleted");
      fetchMeals();
      setDeleteDialogOpen(false);
      setMealToDelete(null);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => {
            setEditingMeal(null);
            setForm({
              name: "",
              description: "",
              price: 0,
              categoryId: "",
              isAvailable: true,
            });
            setImageFile(null);
            setDialogOpen(true);
          }}
          className="cursor-pointer bg-orange-500 hover:bg-orange-600"
        >
          + Add Meal
        </Button>
      </div>

      {loadingMeals ? (
        <CustomSpinner size="lg" text="Loading meals..." className="py-20" />
      ) : meals.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-medium text-foreground">No meals found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first meal to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {meals.map((meal, index) => {
            const mealCategory = categories.find(
              (c) => c.id === meal.categoryId,
            );
            return (
              <div key={meal.id} className="border rounded-xl shadow">
                {meal.image && (
                  <img
                    src={meal.image}
                    className="h-44 w-full object-cover rounded-t-xl"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold">{meal.name}</h3>
                  <p className="text-sm">{meal.description}</p>
                  <p className="text-sm font-medium text-gray-600">
                    Category: {mealCategory?.name || "N/A"}
                  </p>
                  <p className="font-semibold">৳ {meal.price}</p>
                  <p
                    className={`text-sm font-medium ${
                      meal.isAvailable ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {meal.isAvailable ? "Available" : "Unavailable"}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 cursor-pointer"
                      onClick={() => {
                        setEditingMeal(meal);
                        setForm({
                          name: meal.name,
                          description: meal.description,
                          price: meal.price,
                          image: meal.image,
                          categoryId: meal.categoryId ?? "",
                          isAvailable: meal.isAvailable ?? true,
                        });
                        setDialogOpen(true);
                      }}
                      disabled={saving || deletingId === meal.id}
                    >
                      {saving && editingMeal?.id === meal.id
                        ? "Saving..."
                        : "Edit"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 cursor-pointer"
                      onClick={() => {
                        setMealToDelete(meal);
                        setDeleteDialogOpen(true);
                      }}
                      disabled={saving || deletingId === meal.id}
                    >
                      {deletingId === meal.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingMeal ? "Edit Meal" : "Create Meal"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Meal name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />

            <Select
              value={form.categoryId}
              onValueChange={(val) => setForm({ ...form, categoryId: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id!}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(e) =>
                  setForm({ ...form, isAvailable: e.target.checked })
                }
              />
              <span className="text-sm">Available for order</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="w-full cursor-pointer"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? editingMeal
                  ? "Updating..."
                  : "Creating..."
                : editingMeal
                  ? "Update Meal"
                  : "Create Meal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="py-2">
            Are you sure you want to delete "{mealToDelete?.name}"?
          </p>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deletingId !== null}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 cursor-pointer"
              onClick={handleDelete}
              disabled={deletingId !== null}
            >
              {deletingId ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MealManagerClient;