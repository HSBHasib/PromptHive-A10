"use client";

import { useState } from "react";
import { Button, Skeleton, Avatar } from "@heroui/react";
import MobileMenuIcon from "./MobileMenuIcon";
import MobileResponsiveDropDown from "./MobileResponsiveDropDown";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  // User Session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isBlocked = user?.status === "block";

  // SignOur Func
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!", { duration: 1500 });
      router.refresh();
    } catch (err) {
      toast.error("Logout runtime error.");
    }
  };

  // Navigation Links
  const menuItems = [
    { link: "Home", href: "/" },
    { link: "All Prompts", href: "/all-prompts" },
  ];

  // Dashbaord Links based on role
  const dashboardLinks = {
    admin: "/dashboard/admin",
    user: "/dashboard/user",
    creator: "/dashboard/creator",
  };

  if (user?.email && !isBlocked) {
    menuItems.push({
      link: "Dashboard",
      href: dashboardLinks[user?.role || "user"],
    });
  }

  return (
    <div className="bg-[#F5EBEB] border-b border-[#86707020] px-6 relative">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
          >
            <h1 className="text-[#867070] hover:text-[#6B5656] font-bold text-xl">
              PromptHive
            </h1>
          </Link>
        </div>

        {/* Right Side: Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 h-full">
          <ul className="flex items-center gap-3">
            {isPending ? (
              <>
                <li className="text-sm text-[#867070] font-medium px-4 py-2">
                  Home
                </li>
                <li className="text-sm text-[#867070] font-medium px-4 py-2">
                  All Prompts
                </li>
                <li>
                  <Skeleton className="h-8 w-20 rounded-lg bg-[#86707020]" />
                </li>
              </>
            ) : (
              menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`text-sm text-[#867070] font-medium px-4 py-2 rounded-lg hover:bg-[#86707015] transition-all duration-200 ease-in ${
                      pathName === item.href && "bg-[#86707020] text-[#6B5656]"
                    }`}
                  >
                    {item.link}
                  </Link>
                </li>
              ))
            )}
          </ul>

          <div className="flex items-center gap-5">
            <span className="text-[#86707070] text-xl">|</span>

            {isPending ? (
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full bg-[#86707020]" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16 rounded bg-[#86707020]" />
                  <Skeleton className="h-2.5 w-10 rounded bg-[#86707020]" />
                </div>
                <Skeleton className="h-10 w-24 rounded-xl bg-[#86707020] ml-2" />
              </div>
            ) : user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10 border-2 border-[#867070] bg-[#E4D0D0] transition-all duration-300 cursor-pointer">
                      <Avatar.Image
                        className="object-cover"
                        alt={`${user?.name}-ProfileImg`}
                        src={user?.image}
                      />
                      <Avatar.Fallback className="text-[#867070] font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </Avatar.Fallback>
                    </Avatar>

                    {isBlocked && (
                      <span className="absolute bottom-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#867070] leading-tight">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                    {isBlocked ? (
                      <span className="text-[10px] text-red-700 font-bold uppercase tracking-wider mt-0.5">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                        {user?.role || "User"}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSignOut}
                  className="bg-[#867070] hover:bg-[#705C5C] text-white font-semibold text-sm px-5 h-10 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
                >
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Link
                  className="text-sm font-semibold text-[#867070] hover:text-[#6B5656] hover:underline transition-colors"
                  href="/auth/login"
                >
                  Login
                </Link>

                <Button className="bg-[#867070] hover:bg-[#705C5C] text-white font-semibold text-sm px-6 h-10 rounded-xl transition-all duration-200 active:scale-95 shadow-md">
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <MobileMenuIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>

      {/* Mobile Responsive Dropdown Menu */}
      <MobileResponsiveDropDown
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        menuItems={menuItems}
        pathName={pathName}
        isPending={isPending}
        user={user}
        isBlocked={isBlocked}
        handleSignOut={handleSignOut}
      />
    </div>
  );
};

export default Navbar;
