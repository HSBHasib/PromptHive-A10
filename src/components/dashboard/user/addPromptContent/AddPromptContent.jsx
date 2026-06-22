"use client";

import React, { useState } from "react";
import { LuSparkles, LuInfo } from "react-icons/lu";
import toast from "react-hot-toast";
import { uploadImageToImgBB } from "@/lib/core/ImageBB";
import { createPrompt } from "@/lib/action/prompts";
import PromptForm from "../../promptForm/PromptForm";
import { useRouter } from "next/navigation";

const AddPromptContent = ({ user, plan, currentPrompts }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  
  // User Id and Role
  const userId = user?.id;
  const role = user?.role || "user";

  // Implement Login
  const isPro = plan?.plan === "pro";
  const maxLimit = plan?.maxLimit || 3;
  const remaining = maxLimit - currentPrompts;
  const canAdd = isPro || currentPrompts < maxLimit;


  // 💡 React Hook Form onSubmit handler
  const onFormSubmit = async (formData) => {
    setIsSubmitting(true);

    if (!formData.category) {
      toast.error("Please select a category!");
      setIsSubmitting(false);
      return;
    }

    if (!formData.aiTool) {
      toast.error("Please select an AI Tool!");
      setIsSubmitting(false);
      return;
    }
    if (!imageFile) {
      toast.error("Please upload a thumbnail image!");
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
        rating: 0,
        status: "pending",
        userId,
      };

      const res = await createPrompt(finalData);
      if (res.insertedId) {
        // Clear Form Data & Previews
        setImageFile(null);
        setImagePreview(null);
        toast.success("Prompt submitted successful!");
        router.push(`/dashboard/${role}/my-prompts`)
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

  // return (
  //   <div className="w-full max-w-3xl mx-auto bg-[#F5EBEB]/60 border border-[#86707020] rounded-3xl p-6 lg:p-10 shadow-sm text-[#867070]">
  //     <div className="flex items-center gap-3 mb-8 border-b border-[#86707015] pb-4">
  //       <LuSparkles className="w-6 h-6 text-[#867070]" />
  //       <div>
  //         <h1 className="text-xl lg:text-2xl font-bold">Create New Prompt</h1>
  //         <p className="text-xs text-[#867070]/90 mt-0.5">
  //           Share your amazing AI prompt with the community.
  //         </p>
  //       </div>
  //     </div>

  //     <div className="mb-6 bg-[#86707010] border border-[#86707020] rounded-xl p-4 flex items-start gap-3 text-xs font-semibold text-[#867070]/80">
  //       <LuInfo className="w-4 h-4 shrink-0 mt-0.5 text-[#867070]" />
  //       <p>
  //         Note: All newly submitted prompts are automatically marked as{" "}
  //         <span className="text-[#6B5656] font-bold">Pending</span> and remain
  //         hidden from the marketplace until reviewed and approved by an admin.
  //       </p>
  //     </div>

  //     {/* Form */}
  //     <PromptForm 
  //       onSubmit={onFormSubmit}
  //       isSubmitting={isSubmitting}
  //       imagePreview={imagePreview}
  //       setImagePreview={setImagePreview}
  //       handleImageChange={handleImageChange}
  //     />
  //   </div>
  // );

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#F5EBEB]/60 border border-[#86707020] rounded-3xl p-6 lg:p-10 shadow-sm text-[#867070]">
      
      {/* Limit Tracker */}
      <div className="mb-6 bg-[#86707020] border border-[#86707020] rounded-xl p-4 flex items-center justify-between text-xs font-semibold text-[#867070]">
        <div className="flex items-center gap-2">
           <LuInfo className="w-4 h-4 animate-bounce" />
           {isPro ? (
             <p>You are on <span className="text-[#6B5656] font-bold">Pro Plan</span>: Unlimited prompts allowed!</p>
           ) : (
             <p className="font-bold">Used: {currentPrompts} / {maxLimit} | Remaining: <span className="text-[#6B5656] font-black">{remaining > 0 ? remaining : 0}</span></p>
           )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8 border-b border-[#86707015] pb-4">
        <LuSparkles className="w-6 h-6 text-[#867070]" />
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">Create New Prompt</h1>
          <p className="text-xs text-[#867070]/90 mt-0.5">Share your amazing AI prompt with the community.</p>
        </div>
      </div>

      {/* If Free User Reach their limit */}
      {!canAdd ? (
        <div className="text-center py-12 border-2 border-dashed border-[#86707030] rounded-2xl bg-white/50">
          <h2 className="text-xl font-bold mb-2">Limit Reached!</h2>
          <p className="mb-6">You have used up all your free prompts ({currentPrompts}/{maxLimit}). Upgrade to Pro for unlimited access.</p>
          <a href="/payments" className="bg-[#867070] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6B5656] transition">
            Upgrade to Pro
          </a>
        </div>
      ) : (
        <PromptForm 
          onSubmit={onFormSubmit}
          isSubmitting={isSubmitting}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          handleImageChange={handleImageChange}
        />
      )}
    </div>
  );


};

export default AddPromptContent;





















