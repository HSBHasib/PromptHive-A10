"use client";

import React, { useState } from "react";
import { LuSparkles, LuInfo } from "react-icons/lu";
import toast from "react-hot-toast";
import { uploadImageToImgBB } from "@/lib/core/ImageBB";
import { createPrompt } from "@/lib/action/prompts";
import PromptForm from "../../promptForm/PromptForm";

const AddPromptContent = ({ user }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User Id
  const userId = user?.id;

  console.log('user data is - ', user)

  // 💡 React Hook Form onSubmit handler
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
        userId,
      };

      const res = await createPrompt(finalData);
      if (res.insertedId) {
        // Clear Form Data & Previews
        setImageFile(null);
        setImagePreview(null);
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

      {/* Form */}
      <PromptForm 
        onSubmit={onFormSubmit}
        isSubmitting={isSubmitting}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};

export default AddPromptContent;

