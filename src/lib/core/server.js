import { redirect } from "next/navigation";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// Auth Header
export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
        authorization: `Bearer ${token}`,
    } : {};

  return header;
};

// Server Fetch
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
};

// Protected Fetch Data From DB
export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });

  return handleStatusCode(res);
};

// Server Mutation
export const serverMutation = async (path, data, method = "POST") => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
  };

  // Check Data is null or empty - (undefined)
  if (data !== null && data !== undefined) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${baseUrl}${path}`, options);
  return handleStatusCode(res);
};

// Error Handle
const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/forbidden");
  }

  return res.json();
};

