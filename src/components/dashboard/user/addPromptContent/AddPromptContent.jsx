"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import { LuUpload, LuSparkles, LuInfo, LuChevronDown } from "react-icons/lu";
import toast from "react-hot-toast";
import { uploadImageToImgBB } from "@/lib/core/ImageBB";
import { createPrompt } from "@/lib/action/prompts";
import Image from "next/image";

const categories = [
  { key: "development", label: "Development & Coding" },
  { key: "copywriting", label: "Copywriting & Marketing" },
  { key: "design", label: "Design & Art" },
  { key: "productivity", label: "Productivity & Business" },
  { key: "seo-research", label: "SEO & Keyword Research" },
  { key: "photography-video", label: "Photography & Videography" },
  { key: "data-analytics", label: "Data Analytics & Sheets" },
  { key: "education-learning", label: "Education & Learning" },
  { key: "lifestyle-fun", label: "Lifestyle & Creative Writing" },
  { key: "customer-support", label: "Customer Support & HR" },
];

const aiTools = [
  { key: "chatgpt", label: "ChatGPT" },
  { key: "midjourney", label: "Midjourney" },
  { key: "claude", label: "Claude AI" },
  { key: "Gemini", label: "Gemini" },
];

const AddPromptContent = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      difficulty: "beginner",
      visibility: "public",
      price: "0",
    },
  });

  const currentDifficulty = watch("difficulty");
  const currentVisibility = watch("visibility");
  const currentCategory = watch("category");
  const currentAiTool = watch("aiTool");

  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);

  const catRef = useRef(null);
  const toolRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catRef.current && !catRef.current.contains(event.target))
        setIsCatOpen(false);
      if (toolRef.current && !toolRef.current.contains(event.target))
        setIsToolOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 💡 React Hook Form
  const onFormSubmit = async (formData) => {
    setIsSubmitting(true);

    if (!formData.category) {
      setIsSubmitting(false);
      return;
    }

    if (!formData.aiTool) {
      setIsSubmitting(false);
      return;
    }
    if (!imageFile) {
      setIsSubmitting(false);
      return;
    }

    try {
      const uploadedImageUrl = await uploadImageToImgBB(imageFile);

      if (!uploadedImageUrl) {
        toast.dismiss("upload");
        setIsSubmitting(false);
        return;
      }

      const finalData = {
        ...formData,
        thumbnail: uploadedImageUrl,
        copyCount: 0,
        status: "pending",
      };

      const res = await createPrompt(finalData);
      if (res.insertedId) {
        
        // Clear Form Data & [ Image Field Values - (set in future) ]
        reset();
        toast.success("Prompt submitted successful!");
      }
    } catch (error) {
      toast.error("Something went wrong during submission", {
        duration: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#F5EBEB]/60 border border-[#86707020] rounded-3xl p-6 lg:p-10 shadow-sm text-[#867070]">
      <div className="flex items-center gap-3 mb-8 border-b border-[#86707015] pb-4">
        <LuSparkles className="w-6 h-6 text-[#867070]" />
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Create New Prompt</h1>
          <p className="text-xs text-[#867070]/90 mt-0.5">
            Share your amazing AI prompt with the community.
          </p>
        </div>
      </div>

      <div className="mb-6 bg-[#86707010] border border-[#86707020] rounded-xl p-4 flex items-start gap-3 text-xs font-semibold text-[#867070]/80">
        <LuInfo className="w-4 h-4 shrink-0 mt-0.5 text-[#867070]" />
        <p>
          Note: All newly submitted prompts are automatically marked as{" "}
          <span className="text-[#6B5656] font-bold">Pending</span> and remain
          hidden from the marketplace until reviewed and approved by an admin.
        </p>
      </div>

      <form className="w-full space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
        <div className="space-y-6">
          {/*  Prompt Title */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="font-bold text-sm text-[#867070]">
              Prompt Title *
            </label>
            <input
              {...register("title", {
                required: "Title must be at least 5 characters",
                minLength: 5,
              })}
              placeholder="e.g., Ultimate SEO Blog Post Generator"
              className="w-full border border-[#86707030] rounded-xl h-11 px-3 bg-white/50 focus:border-[#867070] focus:bg-white outline-none text-sm transition-all"
            />
            {errors.title && (
              <p className="text-xs text-red-500 font-semibold mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Prompt Short Description */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="font-bold text-sm text-[#867070]">
              Prompt Description *
            </label>
            <textarea
              {...register("description", {
                required: "Description must be at least 20 characters",
                minLength: 20,
              })}
              placeholder="Briefly describe what this prompt does..."
              className="w-full border border-[#86707030] rounded-xl p-3 bg-white/50 focus:border-[#867070] focus:bg-white outline-none min-h-[80px] text-sm transition-all"
            />

            <p className="text-xs text-[#867070]/80 font-semibold ml-2">
              Description must be at least 20 characters
            </p>

            {errors.description && (
              <p className="text-xs text-red-500 font-semibold mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Prompt Content */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="font-bold text-sm text-[#867070]">
              Prompt Content *
            </label>
            <textarea
              {...register("content", {
                required: "Prompt content cannot be empty",
              })}
              placeholder="Paste your exact prompt here..."
              className="w-full border border-[#86707030] rounded-xl p-3 bg-white/50 focus:border-[#867070] focus:bg-white outline-none min-h-[140px] text-sm transition-all"
            />
            {errors.content && (
              <p className="text-xs text-red-500 font-semibold mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Category & AI Tool */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1.5 relative" ref={catRef}>
              <label className="font-bold text-sm text-[#867070]">
                Category *
              </label>
              <div
                onClick={() => setIsCatOpen(!isCatOpen)}
                className="w-full bg-white/50 border border-[#86707030] rounded-xl h-11 px-3 flex items-center justify-between cursor-pointer select-none text-sm font-medium transition-all hover:bg-white/80"
              >
                <span
                  className={
                    currentCategory ? "text-[#867070]" : "text-[#86707060]"
                  }
                >
                  {currentCategory
                    ? categories.find((c) => c.key === currentCategory)?.label
                    : "Select category"}
                </span>
                <LuChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isCatOpen ? "rotate-180" : ""}`}
                />
              </div>
              {isCatOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-white border border-[#86707020] rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto py-1">
                  {categories.map((cat) => (
                    <div
                      key={cat.key}
                      onClick={() => {
                        setValue("category", cat.key);
                        setIsCatOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${currentCategory === cat.key ? "bg-[#867070]/10 text-[#867070] font-semibold" : "text-[#86707090] hover:bg-[#867070]/5"}`}
                    >
                      {cat.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Tool */}
            <div className="flex flex-col gap-1.5 relative" ref={toolRef}>
              <label className="font-bold text-sm text-[#867070]">
                AI Tool *
              </label>
              <div
                onClick={() => setIsToolOpen(!isToolOpen)}
                className="w-full bg-white/50 border border-[#86707030] rounded-xl h-11 px-3 flex items-center justify-between cursor-pointer select-none text-sm font-medium transition-all hover:bg-white/80"
              >
                <span
                  className={
                    currentAiTool ? "text-[#867070]" : "text-[#86707060]"
                  }
                >
                  {currentAiTool
                    ? aiTools.find((t) => t.key === currentAiTool)?.label
                    : "Select AI Tool"}
                </span>
                <LuChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${isToolOpen ? "rotate-180" : ""}`}
                />
              </div>
              {isToolOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-white border border-[#86707020] rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto py-1">
                  {aiTools.map((tool) => (
                    <div
                      key={tool.key}
                      onClick={() => {
                        setValue("aiTool", tool.key);
                        setIsToolOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${currentAiTool === tool.key ? "bg-[#867070]/10 text-[#867070] font-semibold" : "text-[#86707090] hover:bg-[#867070]/5"}`}
                    >
                      {tool.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-[#867070]">Tags *</label>
              <input
                {...register("tags", { required: "Tags are required" })}
                placeholder="e.g., seo, blog, writing"
                className="w-full border border-[#86707030] rounded-xl h-11 px-3 bg-white/50 focus:border-[#867070] outline-none text-sm"
              />
              {errors.tags && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  {errors.tags.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-sm text-[#867070]">
                Price (USD) *
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                })}
                placeholder="0 for free prompts"
                className="w-full border border-[#86707030] rounded-xl h-11 px-3 bg-white/50 focus:border-[#867070] outline-none text-sm"
              />
              {errors.price && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Difficuly Level and Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/30 border border-[#86707010] p-5 rounded-2xl w-full">
            {/* Difficuly Level */}
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-sm text-[#867070]">
                Difficulty Level *
              </span>
              <div className="flex flex-col gap-2">
                {[
                  { key: "beginner", label: "Beginner" },
                  { key: "intermediate", label: "Intermediate" },
                  { key: "pro", label: "Pro" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setValue("difficulty", item.key)}
                    className={`w-full h-11 px-4 rounded-xl text-left text-sm font-medium border transition-all flex items-center justify-between ${
                      currentDifficulty === item.key
                        ? "bg-[#867070] text-white border-[#867070] shadow-sm"
                        : "bg-white/50 text-[#86707090] border-[#86707020] hover:bg-white"
                    }`}
                  >
                    {item.label}
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${currentDifficulty === item.key ? "border-white" : "border-[#86707040]"}`}
                    >
                      {currentDifficulty === item.key && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="flex flex-col gap-2.5">
              <span className="font-bold text-sm text-[#867070]">
                Visibility *
              </span>
              <div className="flex flex-col gap-2">
                {[
                  { key: "public", label: "Public" },
                  { key: "private", label: "Private" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setValue("visibility", item.key)}
                    className={`w-full h-11 px-4 rounded-xl text-left text-sm font-medium border transition-all flex items-center justify-between ${
                      currentVisibility === item.key
                        ? "bg-[#867070] text-white border-[#867070] shadow-sm"
                        : "bg-white/50 text-[#86707090] border-[#86707020] hover:bg-white"
                    }`}
                  >
                    {item.label}
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${currentVisibility === item.key ? "border-white" : "border-[#86707040]"}`}
                    >
                      {currentVisibility === item.key && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image Upload Filed */}
          <div className="space-y-2 w-full">
            <label className="block text-sm font-bold text-[#867070]">
              Thumbnail Image *
            </label>
            <div className="flex flex-col md:flex-row items-center gap-4 border-2 border-dashed border-[#86707030] rounded-2xl p-5 bg-white/20 hover:bg-white/40 transition-colors cursor-pointer relative w-full">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <div className="w-full md:w-40 h-24 rounded-xl overflow-hidden border border-[#86707020] shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    height="300"
                    width="300"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[#86707015] flex items-center justify-center text-[#867070] shrink-0">
                  <LuUpload className="w-5 h-5" />
                </div>
              )}
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold">
                  Click to upload image file
                </p>
                <p className="text-xs text-[#86707070] mt-0.5">
                  Supports PNG, JPG or WebP (Max 2MB)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full h-12 bg-[#867070] hover:bg-[#705C5C] text-white font-bold rounded-xl text-sm transition-colors shadow-md"
          >
            Submit Prompt for Approval
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPromptContent;
