import RegisterContent from "@/components/register/RegisterContent";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const Register = async ({ searchParams }) => {
  const user = await getUserSession();
  const srcParams = await searchParams;

  if (user) {
    redirect(`/`);
  }
  
  return (
    <div className="min-h-screen">
      <RegisterContent srcParams={srcParams} />
    </div>
  );
};

export default Register;
