"use client";

import { adminService, UserData } from "@/services/admin.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User as UserIcon, Camera, Save, Shield } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Props {
  user: UserData | null;
}

const AdminProfileClient = ({ user }: Props) => {
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
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="w-6 h-6 text-orange-500" />
          Admin Profile
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your administrator account settings and profile information
        </p>
      </div>

      <Card className="shadow-lg border-0 bg-white dark:bg-card overflow-hidden">
        {/* Profile Image Section */}
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100 dark:border-orange-900/30 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 flex items-center justify-center shadow-inner">
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
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl">{form.name || "Admin User"}</CardTitle>
              <CardDescription className="flex items-center gap-2 justify-center sm:justify-start mt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium">
                  <Shield className="w-3 h-3" />
                  {user.role}
                </span>
                <span className="text-muted-foreground">{form.email}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your name"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                className="h-11"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleUpdate}
              disabled={updating || imageUploading}
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-6 h-11"
            >
              <Save className="w-4 h-4 mr-2" />
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminProfileClient;