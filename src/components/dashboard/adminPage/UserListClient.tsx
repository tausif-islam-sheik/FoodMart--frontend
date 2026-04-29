"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminService, UserData } from "@/services/admin.service";
import { useState } from "react";
import { User, Mail, Edit2, Users } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  users: UserData[];
  loggedInUser: UserData;
}

const UserListClient = ({ users: initialUsers }: Props) => {
  const [users, setUsers] = useState(initialUsers);
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [updateLoadingId, setUpdateLoadingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<UserData>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  const ROLE_OPTIONS = ["ADMIN", "PROVIDER", "CUSTOMER"];
  const STATUS_OPTIONS = ["ACTIVE", "SUSPENDED"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const openEdit = (user: UserData) => {
    setEditUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const closeEdit = () => {
    setEditUser(null);
    setForm({});
    setImageFile(null);
  };

  const uploadImageToImgbb = async (
    file: File,
  ): Promise<string | undefined> => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      return data.data.url;
    } catch {
      toast.error("Failed to upload image!");
      return undefined;
    }
  };

  const handleUpdate = async () => {
    if (!editUser) return;
    setUpdateLoadingId(editUser.id!);

    let imageUrl: string | undefined = editUser.image ?? undefined;
    if (imageFile) {
      const uploadedUrl = await uploadImageToImgbb(imageFile);
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const payload: Partial<UserData> = { ...form, image: imageUrl };

    const res = await adminService.updateUser(editUser.id!, payload);
    setUpdateLoadingId(null);

    if (res.error) {
      toast.error(res.error.message || "Failed to update user");
      return;
    }

    toast.success("User updated successfully!");
    setUsers(users.map((u) => (u.id === editUser.id ? res.data! : u)));
    closeEdit();
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      ADMIN: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      PROVIDER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      CUSTOMER: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    };
    return styles[role as keyof typeof styles] || "bg-gray-100 text-gray-700";
  };

  const getStatusBadge = (status: string) => {
    return status === "ACTIVE"
      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-500" />
            User Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group hover:shadow-md transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-400" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(user.role || "CUSTOMER")}`}>
                        {user.role || "CUSTOMER"}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(user.status || "ACTIVE")}`}>
                        {user.status || "ACTIVE"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </p>
                  </div>

                  {/* Action */}
                  <Button
                    onClick={() => openEdit(user)}
                    variant="outline"
                    disabled={updateLoadingId === user.id}
                    className="h-9 px-4"
                  >
                    <Edit2 className="w-4 h-4 mr-1.5" />
                    {updateLoadingId === user.id ? "Processing..." : "Edit"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && closeEdit()}>
        <DialogContent className="max-w-md sm:max-w-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Edit User</DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Update user information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label className="mb-1">Name</Label>
              <Input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Email</Label>
              <Input
                name="email"
                value={form.email || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-1">Role</Label>
              <select
                name="role"
                value={form.role || ""}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1">Status</Label>
              <select
                name="status"
                value={form.status || ""}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-1">Profile Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
            <Button
              onClick={closeEdit}
              variant="outline"
              className="w-full sm:w-auto cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={updateLoadingId !== null}
              className="w-full sm:w-auto cursor-pointer bg-orange-600"
            >
              {updateLoadingId === editUser?.id ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default UserListClient;