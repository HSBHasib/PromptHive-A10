"use client";

import React from "react";
import { Modal, Button } from "@heroui/react";
import { BsBarChartLineFill } from "react-icons/bs";

const PromptAnalyticsModal = ({
  isOpen,
  onOpenChange,
  promptData,
  analytics,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[400px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-amber-500/10 text-amber-600 rounded-xl">
                <BsBarChartLineFill className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Prompt Analytics</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p className="text-xs text-gray-500 mb-4">
                {" "}
                <span className="font-medium">Title:</span> {promptData?.title}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    Total Copies
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {analytics?.totalCopies || 0}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    Bookmarks
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {analytics?.bookmarks || 0}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    Avg Rating
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {analytics?.avgRating || 0}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-[10px] uppercase text-gray-500 font-bold">
                    Reviews
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {analytics?.totalReviews || 0}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="w-full bg-[#867070]/90 hover:bg-[#867070]"
                slot="close"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default PromptAnalyticsModal;
