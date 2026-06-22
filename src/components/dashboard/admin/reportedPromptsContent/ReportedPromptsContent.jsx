"use client";
import React, { act } from "react";
import { LuEye, LuShieldAlert, LuTrash2, LuBell } from "react-icons/lu";
import toast from "react-hot-toast";
import DeleteDialogContainer from "../../promptContent/DeleteDialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteReport } from "@/lib/action/reports";

const ReportedPromptsContent = ({ report }) => {
  const router = useRouter();

  // Dismiss nad warn
  const handleAction = async (id, actionType) => {
    const res = await deleteReport(id);
    if (res.deletedCount) {
      if (actionType !== "delete") {
        toast.success(`'${actionType}' performed successfully!`);
      }
    } else {
      toast.error(`Something went wrong during '${actionType}' process!`);
    }
    router.refresh();
  };

  return (
    <div className="bg-white/40 p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-[#867070]">{report.promptTitle}</h3>
          <p className="text-[10px] text-[#867070] font-bold uppercase">
            Reason: <span className="font-semibold">{report.reason}</span>
          </p>
        </div>
        <LuShieldAlert className="text-rose-500" size={20} />
      </div>

      <div className="text-xs text-stone-600 mb-4 bg-stone-50 p-3 rounded-lg border border-stone-100">
        <span className="font-bold">Report by:</span> {report.userName} (
        {report.userEmail}) <br />
        <span className="font-bold">Details:</span> {report.details}
      </div>

      <div className="flex flex-wrap justify-end gap-2 mt-4">
        <Link
          href={`/prompt/${report?.promptId}`}
          target="_blank"
          className="bg-sky-50 text-sky-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-sky-100"
        >
          <LuEye size={14} /> View
        </Link>
        <button
          onClick={() => handleAction(report?._id, "warn")}
          className="bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-amber-100"
        >
          <LuBell size={14} /> Warn
        </button>
        <button
          onClick={() => handleAction(report?._id, "dismiss")}
          className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs font-semibold hover:bg-emerald-100"
        >
          Dismiss
        </button>

        {/* Delete Dialog */}
        <div
          onClick={() => handleAction(report?._id, "delete")}
          className="bg-rose-100 rounded-lg"
        >
          <DeleteDialogContainer
            promptId={report.promptId}
            promptTitle={report.promptTitle}
            onDeleteSuccess={async () => {
              await deleteReport(report._id, "delete");
              router.refresh();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportedPromptsContent;

