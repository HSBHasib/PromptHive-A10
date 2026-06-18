import React from "react";
import Link from "next/link";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import { MdPerson4 } from "react-icons/md";


const Footer = () => {
  // Platform Links
  const platformLinks = [
    { label: "Home", href: "/" },
    { label: "All Prompts", href: "/all-prompts" },
    { label: "Login", href: "/auth/login" },
    { label: "Register", href: "/auth/register" },
  ];

  // Resources Links
  const resourcesLinks = [
    { label: "Stripe API Billing", href: "https://stripe.com/en-sg" },
    { label: "DevMeetsDevs Sync", href: "https://devmeetsdevs.com" },
    { label: "JWT Cookie Policy", href: "https://www.jwt.io/" },
    { label: "Prompt Moderation", href: "/moderation-rules" },
  ];

  // Socail Links
  const socialLinks = [
    {
      icon: RiLinkedinBoxFill,
      href: "https://www.linkedin.com/in/hasibur-rahman19",
      label: "Connect with us on LinkedIn",
    },
    {
      icon: MdPerson4,
      href: "https://hasib-portfolio-silk.vercel.app",
      label: "View Portfolio",
    },
    {
      icon: RiGithubFill,
      href: "https://github.com/HSBHasib",
      label: "Explore client repository on GitHub",
    },
  ];

  return (
    <footer className="bg-[#121214] text-[#F5EBEB] pt-16 pb-8 px-6 w-full select-none overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* TOP ROW SECTION: Grid Columns Distributing Brand Descriptors & Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
          {/* COLUMN 1: Brand Info Box Container */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-1.5 self-start">
              
              <h2 className="text-2xl font-bold tracking-tight text-white/90">
                PromptHive
              </h2>
            </Link>
            <p className="text-xs font-medium text-[#F5EBEB]/50 leading-relaxed max-w-sm">
              Discover, copy, and monetize elite production-ready AI prompts for
              ChatGPT, Midjourney, Claude, and Gemini. Build your optimization
              workflows securely.
            </p>
          </div>

          {/* COLUMN 2: Platform Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">
              Platform
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs font-medium text-[#F5EBEB]/50">
              {platformLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Resources Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs font-medium text-[#F5EBEB]/50">
              {resourcesLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Connect & Support Area */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">
              Connect
            </h3>

            {/* Standard Social Icon Grid using Remix / React Icons */}
            <div className="flex gap-2">
              {socialLinks.map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[#F5EBEB]/70 hover:text-white transition-all active:scale-95 flex items-center justify-center"
                  >
                    <IconComponent className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>

            {/* Production Support Contact Box */}
            <div className="flex flex-col gap-1 text-xs mt-2 font-medium">
              <span className="text-[#F5EBEB]/40">
                Questions? Help support at:
              </span>
              <a
                href="mailto:hasibhsb19@gmail.com"
                className="text-[#F5EBEB]/80 hover:text-white hover:underline transition-all text-[13px] font-semibold"
              >
                hasibhsb19@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW FOOTER MARKER: Copyright statement & developer signatures */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-[11px] font-semibold text-[#F5EBEB]/40 tracking-wide text-center w-full">
          <span>
            &copy; {new Date().getFullYear()} PromptHive. All rights reserved.
          </span>
          <span className="hidden sm:inline">|</span>
            <Link
              href="https://hasib-portfolio-silk.vercel.app"
              target="_black"
              className="flex items-center gap-1"
            >
              <span>Created by</span>
              <span className="hover:text-white/85 text-[#F5EBEB]/70 font-bold">
                Hasibur Rahman
              </span>
            </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
