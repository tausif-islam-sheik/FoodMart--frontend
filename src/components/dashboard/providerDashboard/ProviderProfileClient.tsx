/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { providerService } from "@/services/provider.service";
import { Store, MapPin, Phone, Building2, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Props {
  profile: any | null;
}

const ProviderProfileClient = ({ profile }: Props) => {
  const router = useRouter();
  const isEdit = Boolean(profile);

  const [form, setForm] = useState<{
    restaurantName: string;
    address: string;
    phone: string;
    logo?: string;
  }>({
    restaurantName: profile?.restaurantName ?? "",
    address: profile?.address ?? "",
    phone: profile?.phone ?? "",
    logo: profile?.logo ?? "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(profile?.logo ?? null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImageToImgbb = async (): Promise<string | undefined> => {
    if (!imageFile) return form.logo || undefined;

    const body = new FormData();
    body.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body },
    );

    const data = await res.json();

    if (!data.success) throw new Error("Image upload failed");

    return data.data.url;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const logoUrl = await uploadImageToImgbb();

      const payload: {
        restaurantName: string;
        address: string;
        phone: string;
        logo?: string;
      } = {
        restaurantName: form.restaurantName,
        address: form.address,
        phone: form.phone,
        ...(logoUrl ? { logo: logoUrl } : {}),
      };

      const res = isEdit
        ? await providerService.updateProviderProfile(profile.id, payload)
        : await providerService.createProviderProfile(payload);

      if (res.error) {
        toast.error(res.error.message || "Something went wrong");
        return;
      }

      toast.success(
        isEdit
          ? "Profile updated successfully"
          : "Profile created successfully",
      );

      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
          <Building2 className="w-7 h-7 text-orange-500" />
          {isEdit ? "Restaurant Profile" : "Create Restaurant Profile"}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isEdit 
            ? "Manage your restaurant information and settings" 
            : "Set up your restaurant profile to start receiving orders"}
        </p>
      </div>

      <Card className="shadow-lg border-0 bg-white dark:bg-card overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Restaurant Information</CardTitle>
          <CardDescription>Update your restaurant details below</CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Logo Upload Section */}
          <div className="flex flex-col sm:flex-row items-start gap-4 pb-4 border-b">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-dashed border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Logo Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <Store className="w-10 h-10 text-orange-300" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-medium mb-2 block">Restaurant Logo</Label>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer h-11 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Recommended: Square image, at least 400x400px
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Restaurant Name */}
            <div className="space-y-2">
              <Label htmlFor="restaurantName" className="text-sm font-medium flex items-center gap-2">
                <Store className="w-4 h-4 text-orange-500" />
                Restaurant Name
              </Label>
              <Input
                id="restaurantName"
                name="restaurantName"
                value={form.restaurantName}
                onChange={handleChange}
                placeholder="e.g. FoodMart Kitchen"
                className="h-11"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Full Address
              </Label>
              <Input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter complete restaurant address"
                className="h-11"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                Contact Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="h-11"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-linear-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-6 h-11"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Create Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProviderProfileClient;