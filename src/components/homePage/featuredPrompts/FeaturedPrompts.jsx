import React from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import FeaturedPromptCard from "./FeaturedPromptCard";
import Link from "next/link";

const FeaturedPrompts = ({ isUserLoggedIn = false }) => {
  // Added dynamic thumbnail parameter link mapping to the dataset schema object safely
  const fakePromptsFromDB = [
    {
      _id: "p1",
      title: "Photorealistic Architectural Masterpiece",
      description:
        "Create stunning, hyper-realistic architectural visualizations with precise lighting and surface structures.",
      aiTool: "Midjourney",
      category: "Design & Arts",
      difficulty: "Pro",
      copyCount: 1200,
      rating: 4.8,
      visibility: "public",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726079247228-993af4c05db8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creator: { name: "AlexRender", avatar: "https://pravatar.cc" },
    },
    {
      _id: "p2",
      title: "SaaS Marketing Content Engine",
      description:
        "A comprehensive high-converting optimization framework engineered for landing copy blocks and product ads.",
      aiTool: "ChatGPT",
      category: "Copywriting",
      difficulty: "Intermediate",
      copyCount: 850,
      rating: 4.6,
      visibility: "premium",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726079247228-993af4c05db8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creator: { name: "CopyPro", avatar: "https://pravatar.cc" },
    },
    {
      _id: "p3",
      title: "Advanced Python Debugger Pro",
      description:
        "Systematic reasoning prompt for isolating complex asynchronous architectural execution bugs in massive codebases.",
      aiTool: "Claude 3",
      category: "Development",
      difficulty: "Pro",
      copyCount: 2400,
      rating: 4.9,
      visibility: "public",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726079247228-993af4c05db8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creator: { name: "DevGuru", avatar: "https://pravatar.cc" },
    },
    {
      _id: "p4",
      title: "Minimalist Vector Logo Creator",
      description:
        "Generate clean, modern geometric brand assets perfectly balanced for production grade modern startups Generate clean, modern geometric brand assets perfectly balanced for production grade modern startups Generate clean, modern geometric brand assets perfectly balanced for production grade modern startups.",
      aiTool: "DALL-E 3",
      category: "Graphics",
      difficulty: "Beginner",
      copyCount: 420,
      rating: 4.3,
      visibility: "public",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726079247228-993af4c05db8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creator: { name: "DesignWiz", avatar: "https://pravatar.cc" },
    },
    {
      _id: "p5",
      title: "Data Analysis & Visualization",
      description:
        "Transform raw matrix datasets into execution layer analytics blocks using modular markdown query tracking.",
      aiTool: "Gemini Ultra",
      category: "Analytics",
      difficulty: "Intermediate",
      copyCount: 1100,
      rating: 4.5,
      visibility: "premium",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726079247228-993af4c05db8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creator: { name: "DataScientist", avatar: "https://pravatar.cc" },
    },
    {
      _id: "p6",
      title: "Cinematic Sci-Fi Environment",
      description:
        "Create wide-angle epic structural atmospheric settings featuring industrial futuristic cyberpunk environments.",
      aiTool: "Midjourney",
      category: "Design & Arts",
      difficulty: "Pro",
      copyCount: 3100,
      rating: 5.0,
      visibility: "public",
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1726079247228-993af4c05db8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      creator: { name: "FutureArt", avatar: "https://pravatar.cc" },
    },
  ];

  return (
    <div className="bg-[#EFE2E2] my-13 py-12 px-6 w-full select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-row flex-wrap gap-2 items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-3xl font-bold text-[#867070] tracking-tight">
              Featured Prompts
            </h2>
            <p className="text-sm text-[#867070]">
              Hand-picked high-quality prompts from our creator community.
            </p>
          </div>
          <Link
            href="/all-prompts"
            className="group flex items-center gap-2 text-sm font-semibold px-4 py-1.5 text-[#867070] hover:text-[#6B5656] hover:bg-[#86707010] rounded-lg transition-all max-[580px]:border border-[#6B565640]"
          >
            View All
            <HiArrowUpRight className="text-base transition-transform duration-200 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Featured Data in form of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fakePromptsFromDB.map((prompt, idx) => (
            <FeaturedPromptCard
              key={prompt._id}
              prompt={prompt}
              idx={idx}
              isUserLoggedIn={isUserLoggedIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPrompts;
