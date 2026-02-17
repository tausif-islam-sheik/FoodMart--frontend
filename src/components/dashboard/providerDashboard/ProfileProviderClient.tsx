"use client";

import { adminService, UserData } from "@/services/admin.service";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  user: UserData | null;
}

const ProfileProviderClient = ({ user }: Props) => {
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h1 className="text-2xl font-bold text-center">Provider Profile</h1>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-orange-600 flex items-center justify-center bg-gray-100">
          {form.image ? (
            <Image
              src={form.image}
              alt="Profile Image"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <UserIcon size={48} className="text-gray-400" />
          )}
        </div>
        <label className="cursor-pointer px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 text-sm">
          {imageUploading ? "Uploading..." : "Change Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={imageUploading}
          />
        </label>
      </div>

      <div className="flex flex-col space-y-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full mt-1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="border rounded px-3 py-2 w-full mt-1"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground">
          Role: {user.role || "CUSTOMER"}
        </span>
        <button
          className={`px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 cursor-pointer ${
            updating ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleUpdate}
          disabled={updating || imageUploading}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileProviderClient;