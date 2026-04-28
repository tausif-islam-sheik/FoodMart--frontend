import UserListClient from "@/components/dashboard/adminPage/UserListClient";
import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";

const AllUsers = async () => {
  const { data: session } = await userService.getSession();
  const loggedInUser = session?.user;

  const { data: users, error } = await adminService.getAllUsers();

  return (
    <div className="max-w-6xl mx-auto p-4">

      {!loggedInUser && (
        <p className="text-red-600">You must be logged in to view users!</p>
      )}

      {error && (
        <p className="text-red-600">Error fetching users: {error.message}</p>
      )}

      {users?.length === 0 && <p className="text-gray-600">No users found!</p>}

      {users && loggedInUser && (
        <UserListClient users={users} loggedInUser={loggedInUser} />
      )}
    </div>
  );
};

export default AllUsers;