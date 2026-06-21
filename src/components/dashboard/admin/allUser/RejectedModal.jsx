"use client";

import React from "react";
import { Modal, Button, TextArea,  } from "@heroui/react";

const RejectedModal = ({
  isRejectModalOpen,
  setIsRejectModalOpen,
  selectedPrompt,
  rejectionReason,
  setRejectionReason,
  handleRejectSubmit,
}) => {
  if (!isRejectModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <Modal open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <div className="bg-white/95 p-6 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-black/80 font-bold text-lg border-b pb-2 mb-3 border-gray-200">Rejection Feedback</h2>
          
          <p className="text-[13px] text-stone-600 mb-4">
            Providing actionable feedback for "<span className="font-bold text-[#403535]">{selectedPrompt?.title}</span>" Providing actionable feedback for check 01 helps creators refine prompt templates.?
          </p>

          <p className="text-sm uppercase font-bold text-stone-600 mb-4">
            Feedback description*
          </p>

          <TextArea
            className="w-full mb-4"
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#867070] text-white font-semibold"
              onClick={handleRejectSubmit}
            >
              Submit Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RejectedModal;

