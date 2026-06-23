"use client";

import React, { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import {
  LuTerminal,
  LuChevronLeft,
  LuChevronRight,
  LuEye,
  LuEyeOff,
  LuCheck,
  LuX,
} from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import UpdatedPromptContainer from "./UpdatedPrompt";
import DeleteDialogContainer from "./DeleteDialog";
import toast from "react-hot-toast";
import { updatePrompt } from "@/lib/action/prompts";
import RejectedModal from "../admin/allUser/RejectedModal";
import PromptAnalyticsModal from "../user/promptAnalytics/PromptAnalyticsModal";
import { BsBarChartLineFill } from "react-icons/bs";

const statusColorMap = {
  pending: { className: "bg-amber-100/30 border-amber-300 text-amber-700" },
  approved: {
    className: "bg-emerald-100/80 border-emerald-300 text-emerald-700",
  },
  rejected: { className: "bg-rose-100/80 border-rose-300 text-rose-700" },
};

const PromptContent = ({
  users = [],
  prompts,
  totalPrompts,
  currentPage,
  isAdmin = false,
  userRole,
  reviews,
  totalReview
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);

  const router = useRouter();

  const getColumns = () => {
    const cols = [
      {
        id: "promptTitle",
        label: "PROMPT TITLE",
        defaultWidth: 300,
        minWidth: 200,
        isRowHeader: true,
      },
      ...(isAdmin
        ? [
            {
              id: "creator",
              label: "CREATOR",
              defaultWidth: 300,
              minWidth: 150,
              isRowHeader: false,
            },
          ]
        : []),
      {
        id: "category",
        label: "CATEGORY",
        defaultWidth: 130,
        minWidth: 100,
        isRowHeader: false,
      },
      {
        id: "aiTool",
        label: "AI TOOL",
        defaultWidth: 110,
        minWidth: 90,
        isRowHeader: false,
      },
      {
        id: "visibility",
        label: "VISIBILITY",
        defaultWidth: 110,
        minWidth: 90,
        isRowHeader: false,
      },
      {
        id: "status",
        label: "STATUS",
        defaultWidth: 110,
        minWidth: 90,
        isRowHeader: false,
      },
      {
        id: "action",
        label: "ACTIONS",
        defaultWidth: 200,
        minWidth: 150,
        isRowHeader: false,
      },
    ];
    return cols;
  };

  const columns = getColumns();

  const handlePageChange = (newPage) => router.push(`?page=${newPage}`);

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    return new Date(dateInput).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Approved
  const handleApprovedUpdate = async (promptId, newStatus) => {
    try {
      const result = await updatePrompt(promptId, { status: newStatus });

      if (result) {
        toast.success(`Prompt status updated to ${newStatus}`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Rejected Func
  const handleRejectSubmit = async () => {
    if (!rejectionReason) {
      toast.error("Please provide a rejection reason.");
      return;
    }

    await updatePrompt(selectedPrompt._id, {
      status: "rejected",
      rejectionReason: rejectionReason,
    });

    setIsRejectModalOpen(false);
    setRejectionReason("");
    router.refresh();
    toast.success("Prompt rejected with feedback.");
  };

  // Analytics
  const handleOpenAnalytics = (item) => {
    const promptReviews = reviews.filter((r) => r.promptId === item._id);

    const totalRating = promptReviews.reduce(
      (acc, curr) => acc + (curr.rating || 0),
      0,
    );
    const avgRating =
      promptReviews.length > 0
        ? (totalRating / promptReviews.length).toFixed(1)
        : 0;

    setAnalyticsData({
      totalCopies: item.copies || 0,
      bookmarks: item.bookmarks || 0,
      avgRating: avgRating,
      totalReview
    });

    setSelectedPrompt(item);
    setIsAnalyticsOpen(true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-[#f3e7e7] border border-[#867070]/30 rounded-2xl overflow-hidden shadow-sm [&_table]:!table-fixed">
        <Table.ResizableContainer className="w-full">
          <Table aria-label="Prompts Table" className="w-full">
            <Table.ScrollContainer className="w-full">
              <Table.Content columns={columns}>
                <Table.Header columns={columns}>
                  {(column) => (
                    <Table.Column
                      key={column.id}
                      id={column.id}
                      isRowHeader={column.isRowHeader}
                      defaultWidth={column.defaultWidth}
                      minWidth={column.minWidth}
                      className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider border-b border-[#867070]/20"
                    >
                      {column.label}
                      {column.id !== "action" && (
                        <Table.ColumnResizer className="bg-[#867070]/30" />
                      )}
                    </Table.Column>
                  )}
                </Table.Header>

                <Table.Body items={prompts?.data}>
                  {(item) => (
                    <Table.Row key={item._id}>
                      {/* Prompt Title */}
                      <Table.Cell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#e2e1e2] rounded-lg overflow-hidden shrink-0">
                            {item.thumbnail ? (
                              <Image
                                src={item.thumbnail}
                                alt="thumb"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <LuTerminal
                                size={16}
                                className="m-3 text-[#867070]"
                              />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-[#403535] truncate block max-w-[150px]">
                              {item?.title || "Untitled"}
                            </span>
                            <span className="text-[11px] text-[#867070] font-semibold">
                              {formatDate(item?.createdAt)}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Creator Data */}
                      {isAdmin && (
                        <Table.Cell>
                          {(() => {
                            const creator = users.find(
                              (u) => u._id === item?.userId,
                            );
                            return (
                              <div className="flex flex-col text-xs font-semibold text-[#403535]">
                                <span>{creator?.name || "Unknown"}</span>
                                <span className="text-[#867070] font-normal">
                                  {creator?.email || "N/A"}
                                </span>
                              </div>
                            );
                          })()}
                        </Table.Cell>
                      )}

                      {/* Categoirs */}
                      <Table.Cell className="text-[#403535] text-sm font-semibold capitalize">
                        {item?.category}
                      </Table.Cell>

                      {/* AI Tools */}
                      <Table.Cell className="text-stone-600 font-semibold">
                        {item?.aiTool || "ChatGPT"}
                      </Table.Cell>

                      {/* Visibility */}
                      <Table.Cell>
                        <div className="text-xs font-bold capitalize px-2 py-1 rounded-full border w-fit">
                          {item?.visibility}
                        </div>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="text-center">
                        <Chip
                          size="sm"
                          variant="flat"
                          className={`h-6 text-[10px] font-bold ${statusColorMap[item?.status?.toLowerCase()]?.className}`}
                        >
                          {item?.status}
                        </Chip>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              onClick={() =>
                                router.push(`/prompt/${item?._id}`)
                              }
                              className="text-[#867070] hover:text-sky-600 hover:bg-sky-100 bg-sky-50"
                            >
                              <FaRegEye size={16} />
                            </Button>
                          </div>
                          {isAdmin ? (
                            <>
                              <div>
                                {item.status !== "approved" && (
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className="text-emerald-600 hover:bg-emerald-500/10 bg-emerald-500/5"
                                    onClick={() =>
                                      handleApprovedUpdate(item._id, "approved")
                                    }
                                  >
                                    <LuCheck size={18} />
                                  </Button>
                                )}
                              </div>
                              <div>
                                {item.status !== "rejected" && (
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className="text-rose-600 hover:bg-rose-500/10 bg-rose-500/5"
                                    onClick={() => {
                                      setSelectedPrompt(item);
                                      setIsRejectModalOpen(true);
                                    }}
                                  >
                                    <LuX size={18} />
                                  </Button>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="bg-amber-500/10  rounded-xl">

                              <UpdatedPromptContainer
                                promptData={item}
                                onUpdateSuccess={() => router.refresh()}
                                />
                                </div>

                              {userRole == "user" && (
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  className="text-[#867070] hover:bg-gray-200/7AddPromptContent0 px-2.5 py-2 bg-gray-100 rounded-xl"
                                  onPress={() => handleOpenAnalytics(item)}
                                >
                                  <BsBarChartLineFill size={16} />
                                </Button>
                              )}
                            </>
                          )}
                          <div className="bg-rose-500/5 rounded-xl">
                            <DeleteDialogContainer
                              promptId={item?._id}
                              promptTitle={item?.title}
                              onDeleteSuccess={() => router.refresh()}
                            />
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Table.ResizableContainer>
      </div>
      {/* Pagination */}
      {totalPrompts > 0 && (
        <div className="w-full flex items-center justify-end mt-2">
          <div className="flex items-center gap-2 bg-[#f3e7e7] p-1 rounded-xl border border-[#867070]/25 shadow-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-xs text-stone-600 hover:bg-[#867070]/15 hover:text-stone-800 rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 font-semibold transition-all duration-200"
            >
              <LuChevronLeft size={14} /> Prev
            </button>
            <span className="text-xs font-bold px-3 text-[#867070] bg-[#e6d8d8] py-1 rounded-md border border-[#867070]/15">
              Page {currentPage}
            </span>
            <button
              disabled={prompts.length < 4}
              onClick={() => handlePageChange(currentPage + 1)}
              className="text-xs text-stone-600 hover:bg-[#867070]/15 hover:text-stone-800 rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 font-semibold transition-all duration-200"
            >
              Next <LuChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Rejected Modal */}
      <RejectedModal
        isRejectModalOpen={isRejectModalOpen}
        setIsRejectModalOpen={setIsRejectModalOpen}
        selectedPrompt={selectedPrompt}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        handleRejectSubmit={handleRejectSubmit}
      />

      {/* Prompt Anlytics Modal */}
      <PromptAnalyticsModal
        isOpen={isAnalyticsOpen}
        onOpenChange={setIsAnalyticsOpen}
        promptData={selectedPrompt}
        analytics={analyticsData}
      />
    </div>
  );
};

export default PromptContent;
