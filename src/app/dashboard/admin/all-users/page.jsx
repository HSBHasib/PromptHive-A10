"use client";

import { useState, useEffect } from "react";
import AllUsersContent from "@/components/dashboard/admin/allUsersContent/AllUsersContent";
import { getUsers } from "@/lib/api/users";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const AllUsers = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 4;
  const [usersData, setUsersData] = useState({ data: [], total: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsers(`?page=${page}&limit=${limit}`);
      setUsersData(result || { data: [], total: 0 });
    };
    fetchData();
  }, [page]);

  const handleRoleUpdate = async (userId, newRole) => {
    console.log(`Successfully identified role: ${newRole} for user: ${userId}`);
  };

  return (
    <AllUsersContent 
      users={usersData.data} 
      total={usersData.total} 
      currentPage={page} 
      limit={limit} 
      onPageChange={(p) => router.push(`${pathname}?page=${p}`)}
      onRoleChange={handleRoleUpdate}
      currentUserId="YOUR_ID"
    />
  );
};

export default AllUsers;

