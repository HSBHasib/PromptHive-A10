"use client";

import { useState, useEffect } from "react";
import { getUsers } from "@/lib/api/users";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/action/user";
import AllUserTable from "./AllUserTable";

const AllUsersContent = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log('user data is - ',user)
  const userId = user?.id;
  const userName = user?.name;
  const userRole = user?.role;
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 4;

  const [usersData, setUsersData] = useState({ data: [], total: 0 });

  const fetchData = async () => {
    const result = await getUsers(`?page=${page}&limit=${limit}`);
    setUsersData(result || { data: [], total: 0 });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // Role Update Login
  const handleRoleUpdate = async (userId, newRole) => {
    const res = await updateUser(userId, { role: newRole });
    if (res.modifiedCount) {
      toast.success(`${userName} Role updated ${userRole} to ${newRole} successfully!`);
      fetchData();
    } else {
      toast.error("Failed to update role");
    }
  };

  return (
    <AllUserTable
      users={usersData.data}
      total={usersData.total}
      currentPage={page}
      limit={limit}
      onPageChange={(p) => router.push(`${pathname}?page=${p}`)}
      onRoleChange={handleRoleUpdate}
      currentUserId={userId}
    />
  );
};

export default AllUsersContent;

