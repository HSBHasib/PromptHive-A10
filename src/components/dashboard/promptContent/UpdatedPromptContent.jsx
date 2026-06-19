"use client";

import React, { useState } from "react";
import { Modal, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { uploadImageToImgBB } from "@/lib/core/ImageBB";
import PromptForm from "../promptForm/PromptForm";
import { LuX } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";


const UpdatedPromptContent = ({ promptData, onUpdateSuccess, updatePrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Modal Open
  const handleOpen = () => {
    setImageFile(null);
    setImagePreview(null);
    setIsOpen(true);
  };

  // 💡 React Hook Form 
  const onUpdateSubmit = async (formData) => {
    setIsSubmitting(true);
    let finalImageUrl = promptData?.thumbnail; 

    try {
      // For New Image
      if (imageFile) {
        const uploadedImageUrl = await uploadImageToImgBB(imageFile);
        if (!uploadedImageUrl) {
          setIsSubmitting(false);
          return;
        }
        finalImageUrl = uploadedImageUrl;
      }

    //   Final Data
      const finalUpdatedData = {
        ...formData,
        thumbnail: finalImageUrl,
      };

      const res = await updatePrompt(promptData._id, finalUpdatedData);
      
      if (res) {
        toast.success("Prompt updated successfully!");
        // After SuccessFully Update Prompt Data Close Modal and Update UI
        setIsOpen(false);  
        if (onUpdateSuccess) onUpdateSuccess(); 
      }
    } catch (error) {
      toast.error("Something went wrong during update.");
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
    <>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        className="text-[#867070] hover:text-amber-600 hover:bg-amber-500/10 rounded-xl"
        onClick={handleOpen}
      >
        <BiEditAlt size={16} />
      </Button>

    {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="2xl" backdrop="blur">
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="bg-[#F5EBEB] border border-[#86707020] rounded-3xl max-h-[90vh] overflow-y-auto">
              
              <Modal.CloseTrigger className="text-[#867070] hover:bg-[#86707010] p-1 rounded-full top-4 right-4">
                <LuX className="w-5 h-5" />
              </Modal.CloseTrigger>
              
              {/* Header */}
              <Modal.Header className="flex flex-col gap-1 p-2 border-b border-[#86707015] text-left">
                <Modal.Heading className="text-xl font-bold text-[#867070]">
                  Edit Prompt Details
                </Modal.Heading>
                <p className="text-xs text-[#867070]/90 mt-0.5">
                  Update the information below to modify your prompt repository.
                </p>
              </Modal.Header>
              
              {/* Body */}
              <Modal.Body className="p-3">
                
                {/* Form */}
                <PromptForm
                  initialData={promptData}
                  onSubmit={onUpdateSubmit}
                  isSubmitting={isSubmitting}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  handleImageChange={handleImageChange}
                />
              </Modal.Body>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default UpdatedPromptContent;
