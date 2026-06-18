"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import MobileMenuIcon from "./MobileMenuIcon";
import MobileResponsiveDropDown from "./MobileResponsiveDropDown";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const menuItems = [
    { link: "Home", href: "/" },
    { link: "All Prompts", href: "/all-prompts" },
  ];

  return (
    <div className="bg-[#F5EBEB] border-b border-[#86707020] px-6 relative">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
            <h1 className="text-[#867070] hover:text-[#6B5656] font-bold text-xl">PromptHive</h1>
          </Link>
        </div>

        {/* Right Side: Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 h-full">
          <ul className="flex items-center gap-3">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`text-sm text-[#867070] font-medium px-4 py-2 rounded-lg hover:bg-[#86707015] transition-all duration-200 ease-in ${
                    pathName === item.href && "bg-[#86707020]  text-[#6B5656]"
                  }`}
                >
                  {item.link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <span className="text-[#86707070] text-xl">|</span>
            <Link
              className="text-sm font-semibold text-[#867070] hover:text-[#6B5656] hover:underline transition-colors"
              href="/auth/signin"
            >
              Login
            </Link>

            <Button 
              as={Link}
              href="/auth/signup"
              className="bg-[#867070] hover:bg-[#705C5C] text-white font-semibold text-sm px-6 h-10 rounded-xl transition-all duration-200 active:scale-95 shadow-md"
            >
              Register
            </Button>
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
      />
    </div>
  );
};

export default Navbar;
