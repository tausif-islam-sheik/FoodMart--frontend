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
import { Label } from "@/components/ui/label";
import { adminService, UserData } from "@/services/admin.service";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";

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

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-md gap-2 sm:gap-0"
        >
          <div className="flex items-center gap-2">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaUser className="w-10 h-10 text-gray-400" />
            )}
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400">Role: {user.role}</p>
              <p className="text-sm text-gray-400">Status: {user.status}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            <Button
              onClick={() => openEdit(user)}
              variant="outline"
              disabled={updateLoadingId === user.id}
              className="w-full sm:w-auto text-orange-600 cursor-pointer"
            >
              {updateLoadingId === user.id ? "Processing..." : "Edit"}
            </Button>
          </div>
        </div>
      ))}

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && closeEdit()}>
        <DialogContent className="max-w-md sm:max-w-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Edit User</DialogTitle>
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
    </div>
  );
};

export default UserListClient;