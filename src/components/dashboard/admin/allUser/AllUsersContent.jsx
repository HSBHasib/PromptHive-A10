"use client";

import { useState, useEffect } from "react";
import { getUsers } from "@/lib/api/users";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import AllUserTable from "./AllUserTable";
import { updateUser } from "@/lib/action/user";

const AllUsersContent = ({ user } ) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userId = user?.id;
  const userRole = user?.role;

  const page = parseInt(searchParams.get("page") || "1");
  const limit = 8;

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
      toast.success(`Role updated ${userRole} to ${newRole} successfully!`);
      fetchData();
    } else {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="p-4 w-full max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#867070]">User Role & Accounts Management</h1>
        <p className="text-sm text-[#917C7C] mt-1">
          Review accounts, modify role scopes, delete and ban users .
        </p>
      </div>

      {/* All User Table Data */}
      <AllUserTable
        users={usersData.data}
        total={usersData.total}
        currentPage={page}
        limit={limit}
        onPageChange={(p) => router.push(`${pathname}?page=${p}`)}
        onRoleChange={handleRoleUpdate}
        currentUserId={userId}
      />
    </div>
  );
};

export default AllUsersContent;

