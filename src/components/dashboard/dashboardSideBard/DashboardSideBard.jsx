"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, Skeleton, Button, Drawer } from "@heroui/react";

import {
  HiOutlineUser,
  HiOutlineDocumentPlus,
  HiOutlineTableCells,
  HiOutlineBookmark,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBars3,
} from "react-icons/hi2";
import { GoReport } from "react-icons/go";
import { MdOutlinePayments } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";


export default function DashboardSideBar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role || "user";
  const route = useRouter()

  // SignOur Func
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!", { duration: 1500 });
      window.location.reload(); 
    } catch (err) {
      toast.error("Logout runtime error.");
    }
  };

  const [activeTab, setActiveTab] = useState(`/dashboard/${role}/profile`);
  const pathName = usePathname();

  // Admin NavLinks
  const adminNavLinks = [
    {
      icon: HiOutlineUser,
      href: "/dashboard/admin/profile",
      label: "Profile",
    },
    {
      icon: TbBrandGoogleAnalytics,
      href: "/dashboard/admin/admin-analytics",
      label: "Admin Analytics",
    },
    { icon: FiUsers, href: "/dashboard/admin/users", label: "All Users" },
    {
      icon: HiOutlineDocumentPlus,
      href: "/dashboard/admin/prompts",
      label: "All Prompts",
    },
    {
      icon: MdOutlinePayments,
      href: "/dashboard/admin/payments",
      label: "All Payments",
    },
    {
      icon: GoReport,
      href: "/dashboard/admin/reported-prompts",
      label: "Reported Prompts",
    },
  ];

  //   Creator NavLinks
  const creatorNavLinks = [
    {
      icon: HiOutlineUser,
      href: "/dashboard/creator/profile",
      label: "Profile",
    },
    {
      icon: LuLayoutDashboard,
      href: "/dashboard/creator/settings",
      label: "Creator Home",
    },
    {
      icon: HiOutlineDocumentPlus,
      href: "/dashboard/creator/add-prompt",
      label: "Add Prompt",
    },
    {
      icon: HiOutlineTableCells,
      href: "/dashboard/creator/my-prompts",
      label: "My Prompts",
    },
  ];

  //   User NavLinks
  const userNavLinks = [
    { icon: HiOutlineUser, href: "/dashboard/user/profile", label: "Profile" },
    {
      icon: HiOutlineDocumentPlus,
      href: "/dashboard/user/add-prompt",
      label: "Add Prompt",
    },
    {
      icon: HiOutlineTableCells,
      href: "/dashboard/user/my-prompts",
      label: "My Prompts",
    },
    {
      icon: HiOutlineBookmark,
      href: "/dashboard/user/saved-prompts",
      label: "Saved Prompts",
    },
    {
      icon: HiOutlineChatBubbleLeftRight,
      href: "/dashboard/user/my-reviews",
      label: "My Reviews",
    },
  ];

  const navLinkMap = {
    admin: adminNavLinks,
    creator: creatorNavLinks,
    user: userNavLinks,
  };

  const navItems = navLinkMap[role];

  const sideBarContent = (
    <div className="flex flex-col h-full bg-[#EFE2E2] lg:p-5 w-full text-[#867070]">
      {/* Brand Header Logo */}
      <div className="hidden lg:block mb-6 px-2">
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <h2 className="text-xl font-bold tracking-tight text-[#867070]">
            PromptHive
          </h2>
        </Link>
      </div>

      {/* Profile */}
      {isPending ? (
        <div className="mb-7 px-2 flex flex-col items-start gap-3 border-b border-[#86707020] pb-6">
          <div className="flex items-center gap-3 w-full">
            <Skeleton className="flex rounded-full w-10 h-10 shrink-0 bg-[#86707015] before:!bg-[#86707010]" />
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-28 rounded-md bg-[#86707015] before:!bg-[#86707010]" />
              <Skeleton className="h-2 w-16 rounded-md bg-[#86707015] before:!bg-[#86707010]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-5 px-2 flex flex-col items-start gap-3 border-b border-[#86707020] pb-6 w-full">
          <div className="flex items-center gap-3 min-w-0 w-full">
            <Avatar className="shrink-0 border border-[#86707025] bg-[#86707010]">
              <Avatar.Image
                src={user?.image}
                alt={user?.name || "User Avatar Image"}
                className="object-cover"
              />
              <Avatar.Fallback className="text-[#867070] font-bold">
                {user?.name ? user.name.charAt(0) : "P"}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#867070] tracking-wide truncate">
                {user?.name || "Prompt User"}
              </span>
              <span className="text-[11px] text-[#86707095] font-semibold capitalize mt-0.5">
                {role} Account
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Navigation */}
      <nav className="flex flex-col gap-1.5 flex-1 w-full">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathName === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveTab(item.href)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 group relative ${
                isActive
                  ? "bg-[#867070] text-white shadow-sm"
                  : "text-[#867070]/75 hover:bg-[#86707010] hover:text-[#867070]"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComponent
                  className={`w-4 h-4 transition-colors ${isActive ? "text-white" : "text-[#86707090] group-hover:text-[#867070]"}`}
                />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <button onClick={handleSignOut} className="flex justify-center items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 gap-1.5 bg-[#867070]/90 text-white hover:bg-[#867070] cursor-pointer shadow-sm">
        <LuLogOut size={16} /> Logout
      </button>
    </div>
  );

  return (
    <>
      {/* --- DESKTOP VIEW --- */}
      <aside className="hidden lg:flex w-72 min-h-screen border-r border-t border-[#86707015] bg-[#F5EBEB] shrink-0 z-10">
        {sideBarContent}
      </aside>

      {/* --- MOBILE VIEW --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#F5EBEB] border-b border-[#86707015] flex items-center px-4 justify-between z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <Drawer>
            <Button
              isIconOnly
              variant="light"
              className="flex justify-center items-center bg-[#F5EBEB]/90 border border-[#86707025] text-[#867070] backdrop-blur-md rounded-xl drawer__trigger shadow-xs hover:bg-[#86707010]"
              aria-label="Toggle user mobile dashboard options drawer"
            >
              <HiOutlineBars3 size={20} />
            </Button>

            <Drawer.Backdrop className="drawer__backdrop fixed inset-0 bg-[#867070]/20 backdrop-blur-sm z-50" />

            <Drawer.Content
              placement="left"
              className="drawer__content fixed top-0 bottom-0 left-0 w-60 z-50 h-screen bg-[#F5EBEB] border-r border-[#86707015] outline-none"
            >
              <Drawer.Dialog className="drawer__dialog h-full w-full bg-[#F5EBEB] flex flex-col relative">
                <Drawer.CloseTrigger
                  className="drawer__close-trigger absolute top-4 right-4 text-[#86707075] hover:text-[#867070] z-50 focus:outline-none cursor-pointer"
                  aria-label="Close panel navigation"
                />
                <Drawer.Body className="drawer__body p-0 m-0 overflow-y-auto h-full w-full flex flex-col">
                  {sideBarContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer>

          <span className="text-sm font-bold text-[#867070] tracking-tight">
            PromptHive
          </span>
        </div>

        {/* Right content Image Avatar*/}
        <div className="flex items-center">
          {isPending ? (
            <Skeleton className="isPending && w-9 h-9 rounded-full bg-[#86707015]" />
          ) : (
            <Avatar className="shrink-0 border border-[#86707025] bg-[#86707010]">
              <Avatar.Image
                src={user?.image}
                alt={user?.name || "User Avatar Image"}
                className="object-cover"
              />
              <Avatar.Fallback className="text-[#867070] font-bold">
                {user?.name ? user.name.charAt(0) : "P"}
              </Avatar.Fallback>
            </Avatar>
          )}
        </div>
      </div>
    </>
  );
}
