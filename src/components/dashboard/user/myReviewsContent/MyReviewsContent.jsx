"use client";
import React from "react";
import { Table, Button } from "@heroui/react";
import { LuEye } from "react-icons/lu";
import Link from "next/link";

const MyReviewsContent = ({ reviews }) => {
  return (
    <div className="w-full bg-[#f3e7e7] border border-[#867070]/30 rounded-2xl overflow-hidden shadow-sm">
      <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#e6d8d8] [&::-webkit-scrollbar-thumb]:bg-[#867070] [&::-webkit-scrollbar-thumb]:rounded-full">
        <Table aria-label="My Reviews Table" className="min-w-[1000px] w-full">
          <Table.Content>
            <Table.Header>
              {["TITLE", "AI TOOL", "RATING", "COMMENT", "DATE", "ACTION"].map(
                (h) => (
                  <Table.Column
                    key={h}
                    className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider"
                  >
                    {h}
                  </Table.Column>
                ),
              )}
            </Table.Header>

            <Table.Body items={reviews || []} emptyContent={"No reviews found"}>
              {(review) => (
                <Table.Row key={review._id}>
                  <Table.Cell className="font-semibold text-[#403535]">
                    {review.title}
                  </Table.Cell>
                  <Table.Cell className="text-stone-600">
                    {review.aiTool}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-amber-600">
                    {review.rating} ★
                  </Table.Cell>
                  <Table.Cell className="text-sm text-stone-600 italic">
                    "{review.comment}"
                  </Table.Cell>
                  <Table.Cell className="text-xs text-stone-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/prompt/${review.promptId}`}>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-[#867070] bg-sky-50 hover:bg-sky-100 transition-all duration-200 rounded-xl"
                      >
                        <LuEye size={18} />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table>
      </div>
    </div>
  );
};

export default MyReviewsContent;

