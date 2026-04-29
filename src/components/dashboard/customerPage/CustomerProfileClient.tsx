"use client";

import { adminService, UserData } from "@/services/admin.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserIcon, Camera, Save, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Props {
  user: UserData | null;
}

const CustomerProfileClient = ({ user }: Props) => {
  const [updating, setUpdating] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    image?: string;
  }>({
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
  });

  if (!user) return <p>No profile data found.</p>;

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await adminService.updateUser(user.id!, form);
      if (res.data) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(res.error?.message || "Failed to update profile");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setImageUploading(true);

    try {
      const apiKey = process.env.IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, image: data.data.url });
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch {
      toast.error("Something went wrong during image upload");
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="my-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <User className="w-5 h-5 text-white" />
          </div>
          Customer Profile
        </h1>
        <p className="text-muted-foreground mt-2 ml-[52px]">
          Manage your account settings and personal information
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="xl:col-span-1 shadow-lg border-0 bg-white dark:bg-card overflow-hidden h-fit">
          <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
          <CardContent className="p-6 text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100 dark:border-orange-900/30 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center shadow-inner mx-auto">
                {form.image ? (
                  <Image
                    src={form.image}
                    alt="Profile Image"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <UserIcon size={56} className="text-orange-300" />
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 cursor-pointer w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                />
              </label>
            </div>
            <h3 className="mt-4 text-lg font-semibold">{form.name || "Customer"}</h3>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                <User className="w-3 h-3" />
                {user.role}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{form.email}</p>
          </CardContent>
        </Card>

        {/* Form Card */}
        <Card className="xl:col-span-2 shadow-lg border-0 bg-white dark:bg-card overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Account Information
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>

          <CardContent className="pt-2 space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  className="h-12 rounded-xl border-2 border-border/50 focus:border-orange-400 focus:ring-orange-400/20 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="h-12 rounded-xl border-2 border-border/50 focus:border-orange-400 focus:ring-orange-400/20 transition-all"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button
                onClick={handleUpdate}
                disabled={updating || imageUploading}
                className="h-12 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all px-8"
              >
                <Save className="w-4 h-4 mr-2" />
                {updating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default CustomerProfileClient;