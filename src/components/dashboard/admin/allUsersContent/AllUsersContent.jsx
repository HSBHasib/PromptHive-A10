"use client";

import React from "react";
import {
  Table, Button, Chip, Avatar, Popover, PopoverTrigger, PopoverContent,
} from "@heroui/react";
import { LuTrash2, LuBan, LuChevronLeft, LuChevronRight, LuChevronDown } from "react-icons/lu";

const AllUsersContent = ({
  users,
  total,
  currentPage,
  limit,
  onPageChange,
  onRoleChange,
  currentUserId,
}) => {
  const roles = ["user", "creator", "admin"];
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Section */}
      <div className="w-full bg-[#f3e7e7] border border-[#867070]/30 rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <Table aria-label="Users Table" className="min-w-[950px] w-full">
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader={true} className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">USER DETAILS</Table.Column>
                <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">EMAIL ADDRESS</Table.Column>
                <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">SUBSCRIPTION</Table.Column>
                <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">STATUS</Table.Column>
                <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">ROLE LEVEL</Table.Column>
                <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider">REGISTERED DATE</Table.Column>
                <Table.Column className="bg-[#e6d8d8] text-[#867070] font-bold text-xs py-4 tracking-wider text-end">ACTIONS</Table.Column>
              </Table.Header>

              <Table.Body items={users || []} emptyContent={"No users found"}>
                {(user) => (
                  <Table.Row key={user?._id}>
                    <Table.Cell>
                      <div className="flex items-center gap-3 py-1">
                        <Avatar name={user?.name} size="sm" />
                        <span className="text-sm font-bold text-[#403535]">{user?.name}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-sm text-stone-600">{user?.email}</Table.Cell>
                    <Table.Cell><Chip size="sm" variant="flat">{user?.plan || "Free"}</Chip></Table.Cell>
                    <Table.Cell>
                      <Chip size="sm" color={user?.status === "active" ? "success" : "default"} variant="dot">
                        {user?.status || "Active"}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell>
                      <Popover placement="bottom" isDisabled={user?._id === currentUserId}>
                        <PopoverTrigger>
                          <Button size="sm" variant="flat" className="bg-[#e6d8d8]/50 text-[#867070] font-semibold capitalize">
                            {user?.role} <LuChevronDown size={14} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 min-w-[150px]">
                          <div className="flex flex-col gap-1 w-full">
                            {roles.map((role) => (
                              <button
                                key={role}
                                onClick={() => onRoleChange(user?._id, role)}
                                className={`w-full text-left px-3 py-2 text-sm rounded-lg capitalize transition-colors 
                                  ${user?.role === role ? "bg-[#867070]/20 text-[#403535] font-bold" : "hover:bg-stone-100 text-stone-600"}`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </Table.Cell>
                    <Table.Cell>{user?.createdAt ? new Date(user?.createdAt).toLocaleDateString() : "N/A"}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-end gap-1">
                        <Button isIconOnly size="sm" variant="light"><LuTrash2 size={16} /></Button>
                        <Button isIconOnly size="sm" variant="light"><LuBan size={16} /></Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {total > 0 && (
        <nav aria-label="Table pagination" className="w-full flex items-center justify-end mt-2">
          <div className="flex items-center gap-2 bg-[#f3e7e7] p-1 rounded-xl border border-[#867070]/25 shadow-sm">
            <button
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="text-xs text-stone-600 hover:bg-[#867070]/15 hover:text-stone-800 rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-30 flex items-center gap-1 font-semibold transition-all"
            >
              <LuChevronLeft size={14} /> Prev
            </button>
            <span className="text-xs font-bold px-3 text-[#867070] bg-[#e6d8d8] py-1 rounded-md">
              Page {currentPage}
            </span>
            <button
              aria-label="Next page"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="text-xs text-stone-600 hover:bg-[#867070]/15 hover:text-stone-800 rounded-lg px-3 py-1.5 cursor-pointer disabled:opacity-30 flex items-center gap-1 font-semibold transition-all"
            >
              Next <LuChevronRight size={14} />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default AllUsersContent;

