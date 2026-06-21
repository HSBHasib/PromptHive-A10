"use client";

import React, { useState } from "react";
import { AlertDialog, Button, Modal } from "@heroui/react";
import toast from "react-hot-toast";
import { LuTrash2, LuX, LuTriangleAlert } from "react-icons/lu";

const DeleteDialogContent = ({
  id,
  title,
  onDeleteSuccess,
  deletePromptAction,
  typeName = "Item",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteSubmit = async () => {
    setIsDeleting(true);
    try {
      const res = await deletePromptAction(id);

      if (res) {
        toast.success(`${typeName} deleted successfully!`);

        setIsOpen(false);
        if (onDeleteSuccess) onDeleteSuccess();
      } else {
        toast.error(`Failed to delete the ${typeName.toLowerCase()}.`);
      }
    } catch (error) {
      toast.error(
        `Something went wrong during ${typeName.toLowerCase()} deletion.`,
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        title="Delete"
        className="text-[#867070] hover:text-rose-600 hover:bg-rose-500/10 rounded-xl w-8 h-8 min-w-0 transition-all duration-200"
        onClick={() => setIsOpen(true)}
      >
        <LuTrash2 size={15} />
      </Button>

      {/* Alert Dialog */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="md" backdrop="blur">
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="bg-[#F5EBEB] border border-rose-200/40 rounded-3xl overflow-hidden shadow-xl">
              {/* Close Button */}
              <Modal.CloseTrigger className="text-[#867070] bg-rose-500/5 hover:bg-rose-500/10 hover:text-rose-600 p-4 rounded-full top-4 right-4 transition-colors">
                <LuX className="w-5 h-5" />
              </Modal.CloseTrigger>

              {/* Header */}
              <Modal.Header className="flex flex-col gap-2 p-6 pb-2 text-left">
                <div className="flex items-center gap-2 text-rose-600 bg-rose-100/60 w-fit p-2 rounded-2xl border border-rose-200 shadow-sm">
                  <LuTriangleAlert size={20} />
                </div>
                <Modal.Heading className="text-xl font-bold text-[#403535]">
                  {typeName === "user" ? "Delete User" : "Delete Prompt"}
                </Modal.Heading>
              </Modal.Header>

              {/* Body */}
              <Modal.Body className="px-6">
                <p className="text-sm text-[#867070] font-medium leading-relaxed">
                  Are you sure you want to permanently delete{" "}
                  <span className="font-bold text-rose-700">
                    "{title || typeName}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </Modal.Body>

              {/* Buttons */}
              <Modal.Footer className="flex items-center justify-end gap-3 p-6 bg-[#EEEDEE]/40 border-t border-[#86707020]">
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-[#e6d8d8] text-[#867070] font-semibold rounded-xl px-4"
                  onClick={() => setIsOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  className="bg-rose-600/90 hover:bg-rose-700/90 text-white font-semibold rounded-xl px-5 shadow-sm shadow-rose-600/20"
                  isLoading={isDeleting}
                  onClick={handleDeleteSubmit}
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default DeleteDialogContent;
