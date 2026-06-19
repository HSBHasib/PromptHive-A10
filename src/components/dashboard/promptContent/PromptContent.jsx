"use client";

import React from "react";
import { Table, Chip, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import {
  LuTerminal,
  LuChevronLeft,
  LuChevronRight,
  LuEye,
  LuEyeOff,
  LuTrash2,
} from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import Image from "next/image";

const columns = [
  {
    id: "promptTitle",
    label: "PROMPT TITLE",
    defaultWidth: 260,
    minWidth: 180,
    isRowHeader: true,
  },
  { id: "category", label: "CATEGORY", defaultWidth: 130, minWidth: 100 },
  { id: "aiTool", label: "AI TOOL", defaultWidth: 110, minWidth: 90 },
  { id: "price", label: "PRICE", defaultWidth: 90, minWidth: 80 },
  { id: "visibility", label: "VISIBILITY", defaultWidth: 110, minWidth: 90 },
  { id: "status", label: "STATUS", defaultWidth: 110, minWidth: 90 },
  { id: "action", label: "ACTIONS", defaultWidth: 140, minWidth: 120 },
];

const statusColorMap = {
  pending: { className: "bg-amber-100/30 border-amber-300 text-amber-700" },
  approved: {
    className: "bg-emerald-100/80 border-emerald-300 text-emerald-700",
  },
  rejected: { className: "bg-rose-100/80 border-rose-300 text-rose-700" },
};

const PromptContent = ({ prompts, currentPage }) => {
  const router = useRouter();

  const handlePageChange = (newPage) => {
    router.push(`?page=${newPage}`);
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const date = new Date(dateInput);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className="w-full bg-[#f3e7e7] border border-[#867070]/30 rounded-2xl overflow-hidden shadow-sm 
  [&_.heroui-table-container]:!w-full [&_.heroui-table-container]:!max-w-none
  [&_table]:!w-full [&_table]:!table-fixed
  [&_tr]:!bg-[#EEEDEE] [&_tr]:border-b [&_tr]:border-[#867070]/15 [&_tr]:transition-colors [&_tr]:duration-150
  [&_td]:!bg-[#EEEDEE] [&_tr:hover_td]:!bg-[#e2e1e2] [&_td]:transition-colors [&_td]:duration-150"
      >
        <Table.ResizableContainer className="w-full">
          <Table aria-label="My Prompts Table" className="w-full">
            <Table.ScrollContainer className="w-full">
              <Table.Content className="w-full" columns={columns}>
                <Table.Header columns={columns}>
                  {(column) => (
                    <Table.Column
                      key={column.id}
                      id={column.id}
                      isRowHeader={column.isRowHeader}
                      defaultWidth={column.defaultWidth}
                      minWidth={column.minWidth}
                      className={`bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider border-b border-[#867070]/20 ${
                        column.id === "promptTitle"
                          ? "pl-6"
                          : column.id === "action" ||
                              column.id === "status" ||
                              column.id === "visibility"
                            ? "text-center"
                            : ""
                      }`}
                    >
                      {column.label}
                      {column.id !== "action" && (
                        <Table.ColumnResizer className="bg-[#867070]/30" />
                      )}
                    </Table.Column>
                  )}
                </Table.Header>

                <Table.Body
                  items={prompts}
                  emptyContent={
                    <div className="flex flex-col items-center justify-center p-16 gap-2 min-h-[250px] bg-[#EEEDEE] rounded-xl w-full">
                      <LuTerminal size={32} className="text-[#867070]/60" />
                      <p className="text-sm font-semibold text-[#867070]">
                        No prompts found on this page.
                      </p>
                    </div>
                  }
                >
                  {(item) => (
                    <Table.Row key={item._id}>
                      {/* Prompt Title & Image */}
                      <Table.Cell className="pl-6 py-4">
                        <div className="flex items-center gap-3 py-1">
                          <div className="w-15 h-10 bg-[#e2e1e2] border border-[#867070]/20 rounded-xl flex items-center justify-center text-stone-600 overflow-hidden shrink-0 shadow-sm">
                            {item.thumbnail ? (
                              <Image
                                src={item.thumbnail}
                                alt="thumb"
                                width="300"
                                height="300"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <LuTerminal
                                size={16}
                                className="text-[#867070]"
                              />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-[#403535] truncate max-w-[200px]">
                              {item?.title || "Untitled Prompt"}
                            </span>
                            <span className="text-[11px] text-[#867070] font-semibold">
                              {formatDate(item?.createdAt)}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Category */}
                      <Table.Cell className="text-[#403535] text-sm font-semibold capitalize py-4">
                        {item?.category || "N/A"}
                      </Table.Cell>

                      {/* AI Tool */}
                      <Table.Cell className="text-stone-600 text-xs font-semibold capitalize py-4">
                        <span className="px-2 py-1 bg-[#e2e1e2] border border-[#867070]/20 rounded-md text-[#403535] font-bold">
                          {item?.aiTool || "ChatGPT"}
                        </span>
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell className="text-[#403535] text-sm font-bold py-4">
                        {Number(item?.price) === 0 ? (
                          <span className="text-emerald-600 font-bold">
                            Free
                          </span>
                        ) : (
                          `$${item?.price}`
                        )}
                      </Table.Cell>

                      {/* Visibility */}
                      <Table.Cell className="py-4">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-medium capitalize">
                          {item?.visibility?.toLowerCase() === "private" ? (
                            <div className="flex items-center gap-1 text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-full border border-rose-300">
                              <LuEyeOff size={13} />
                              <span className="text-[11px] font-bold">
                                Private
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-100/50 px-2 py-0.5 rounded-full border border-emerald-300">
                              <LuEye size={13} />
                              <span className="text-[11px] font-bold">
                                Public
                              </span>
                            </div>
                          )}
                        </div>
                      </Table.Cell>

                      {/* Status Badge */}
                      <Table.Cell className="text-center py-4">
                        <Chip
                          size="sm"
                          variant="flat"
                          className={`h-6 text-[10px] font-bold tracking-wide capitalize border rounded-full px-1.5 ${statusColorMap[item?.status?.toLowerCase() || "pending"]?.className || ""}`}
                        >
                          {item?.status || "pending"}
                        </Chip>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="text-center py-4">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            title="Analytics"
                            className="text-[#867070] hover:text-sky-600 hover:bg-sky-500/10 rounded-xl w-8 h-8 min-w-0 transition-all duration-200"
                            onClick={() =>
                              router.push(
                                `/dashboard/my-prompts/analytics/${item?._id}`,
                              )
                            }
                          >
                            <FaRegEye  size={16} />
                          </Button>

                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            title="Edit / Update"
                            className="text-[#867070] hover:text-amber-600 hover:bg-amber-500/10 rounded-xl w-8 h-8 min-w-0 transition-all duration-200"
                            onClick={() =>
                              router.push(
                                `/dashboard/my-prompts/update/${item?._id}`,
                              )
                            }
                          >
                            <BiEditAlt size={18} />
                          </Button>

                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            title="Delete"
                            className="text-[#867070] hover:text-rose-600 hover:bg-rose-500/10 rounded-xl w-8 h-8 min-w-0 transition-all duration-200"
                            onClick={() =>
                              console.log("Delete trigger id:", item?._id)
                            }
                          >
                            <LuTrash2 size={15} />
                          </Button>
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
      {prompts.length > 0 && (
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
    </div>
  );
};

export default PromptContent;
