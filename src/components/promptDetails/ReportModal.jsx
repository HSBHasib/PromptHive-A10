"use client";

import { addReport } from "@/lib/action/reports";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ReportModal = ({ isOpen, onClose, promptId, userId }) => {
  const [reason, setReason] = useState("Inappropriate Content");
  const [details, setDetails] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      await addReport({ promptId, userId, reason, details });
      toast.success("Report submitted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to submit report");
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5EBEB] p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-stone-800 mb-4">Report Prompt Template</h2>
        <p className="text-stone-600 text-sm mb-6">
          Help us maintain community standards. If this prompt contains malicious instructions, plagiarized files, or spam content, report it below.
        </p>

        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Reason</label>
        <select 
          className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg text-stone-800 mb-4 focus:ring-1 focus:ring-[#867070] outline-none transition"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option>Inappropriate Content</option>
          <option>Spam</option>
          <option>Copyright Violation</option>
          <option>Other</option>
        </select>

        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Additional Description (Optional)</label>
        <textarea
          className="w-full bg-stone-50 border border-stone-200 p-3 rounded-lg text-stone-800 h-32 mb-6 focus:ring-1 focus:ring-[#867070] outline-none transition"
          placeholder="Provide details about the infraction..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button 
            onClick={onClose} 
            variant="ghost"
            className=" py-2 rounded-lg border text-stone-600 transition font-medium"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="py-2 rounded-lg bg-[#867070]/90 hover:bg-[#867070] text-white transition font-semibold"
          >
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
