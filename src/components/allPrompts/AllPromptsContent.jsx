"use client";

import React, { useState, useEffect } from "react";
import { Pagination, ListBox, Select } from "@heroui/react";
import { useRouter } from "next/navigation";
import FeaturedPromptCard from "../homePage/featuredPrompts/FeaturedPromptCard";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoRefreshOutline } from "react-icons/io5";

const AllPromptsContent = ({ prompts, users, isUserLoggedIn, filters }) => {
  const router = useRouter();
  
  const [searchInput, setSearchInput] = useState(filters.search || "");

  const itemsPerPage = 9;
  const promptsData = prompts?.prompts || [];
  const totalItems = prompts?.totalItems || 0;
  const totalPages = prompts?.totalPages || 1;

  const categories = [
    "Development & Coding",
    "Copywriting & Marketing",
    "Design & Art",
    "Productivity & Business",
    "SEO & Keyword Research",
    "Photography & Videography",
    "Data Analytics & Sheets",
    "Education & Learning",
    "Lifestyle & Creative Writing",
    "Customer Support & HR",
  ];
  const aiTools = ["ChatGPT", "Midjourney", "Claude", "Gemini"];
  const difficulties = ["Beginner", "Intermediate", "Pro"];

  useEffect(() => {
    setSearchInput(filters.search || "");
  }, [filters.search]);

  // Update Search Result
  const updateFilters = (updatedFields) => {
    const sp = new URLSearchParams();
    const currentFilters = { ...filters, ...updatedFields };

    if (currentFilters.search) sp.set("search", currentFilters.search);
    if (currentFilters.page > 1) sp.set("page", currentFilters.page);

    router.push(`?${sp.toString()}`);
  };

  // After Clicking Search
  const handleSearchSubmit = () => {
    updateFilters({ search: searchInput, page: 1 });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  // Reset Button
  const handleReset = () => {
    setSearchInput("");
    router.push("?");
  };

  const handlePageChange = (newPage) => {
    if (newPage === filters.page) return;
    updateFilters({ page: newPage });
  };

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (filters.page > 3) pages.push("ellipsis");
    const start = Math.max(2, filters.page - 1);
    const end = Math.min(totalPages - 1, filters.page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (filters.page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (filters.page - 1) * itemsPerPage + 1;
  const endItem = Math.min(filters.page * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        {/* Search Bar */}
        <div className="w-full flex items-center bg-[#EBE3E3] border border-[#86707015] rounded-2xl h-14 pl-5 pr-2 shadow-sm transition-all focus-within:ring-1 focus-within:ring-[#86707040]">
          <HiMagnifyingGlass className="text-[#86707070] text-xl flex-shrink-0" />

          <input
            type="text"
            placeholder="Search by title, tag or Ai tools...."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full ml-3 bg-transparent border-none outline-none text-sm font-medium text-[#5c4a4a] placeholder:text-[#86707060] focus:outline-none focus:ring-0 p-0"
          />

          <button
            onClick={handleSearchSubmit}
            className="px-8 h-10 bg-[#867070] hover:bg-[#735F5F] text-white text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center flex-shrink-0 ml-2"
          >
            Search
          </button>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-3 w-full">
          {/* Category Filter */}
          <Select
            className="w-full sm:w-auto sm:min-w-[180px]"
            placeholder="All Categories"
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-[#E4D5D5] hover:bg-[#DED0D0] border border-[#86707020] rounded-xl h-10 text-xs font-semibold text-[#635252] px-4 shadow-none transition-all cursor-pointer">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>

            <Select.Popover className="border border-[#86707015] bg-white rounded-xl shadow-xl overflow-hidden p-1 w-[var(--trigger-width)] sm:max-w-[280px]">
              <ListBox className="max-h-[240px] overflow-y-auto outline-none pr-1 scrollbar-thin scrollbar-thumb-[#86707040] scrollbar-track-transparent">
                <ListBox.Item
                  id="all"
                  textValue="All Categories"
                  className="text-xs font-bold text-[#635252] rounded-lg p-2.5 my-0.5 cursor-pointer hover:bg-[#86707015] focus:bg-[#86707015] outline-none transition-colors"
                >
                  All Categories
                </ListBox.Item>

                {categories.map((cat) => (
                  <ListBox.Item
                    key={cat}
                    id={cat}
                    textValue={cat}
                    className="text-xs font-medium text-[#867070] rounded-lg p-2.5 my-0.5 cursor-pointer hover:bg-[#86707010] focus:bg-[#86707010] outline-none transition-colors"
                  >
                    {cat}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* AI Tool Filter */}
          <Select
            className="w-auto min-w-[140px]"
            placeholder="All AI Tools"
          >
            <Select.Trigger className="bg-[#E4D5D5] hover:bg-[#DED0D0] border border-[#86707020] rounded-lg h-9 text-xs font-semibold text-[#635252] px-4 shadow-none transition-all">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="border border-[#86707015] bg-white rounded-xl shadow-xl overflow-hidden p-1">
              <ListBox>
                <ListBox.Item
                  id="all"
                  textValue="All AI Tools"
                  className="text-xs font-semibold text-[#867070] rounded-lg"
                >
                  All AI Tools
                </ListBox.Item>
                {aiTools.map((tool) => (
                  <ListBox.Item
                    key={tool}
                    id={tool}
                    textValue={tool}
                    className="text-xs text-[#867070] rounded-lg hover:bg-[#86707010]"
                  >
                    {tool}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Difficulty Filter */}
          <Select
            className="w-auto min-w-[140px]"
            placeholder="Difficulty Level"
          >
            <Select.Trigger className="bg-[#E4D5D5] hover:bg-[#DED0D0] border border-[#86707020] rounded-lg h-9 text-xs font-semibold text-[#635252] px-4 shadow-none transition-all">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="border border-[#86707015] bg-white rounded-xl shadow-xl overflow-hidden p-1">
              <ListBox>
                <ListBox.Item
                  id="all"
                  textValue="Difficulty Level"
                  className="text-xs font-semibold text-[#867070] rounded-lg"
                >
                  Difficulty Level
                </ListBox.Item>
                {difficulties.map((diff) => (
                  <ListBox.Item
                    key={diff}
                    id={diff}
                    textValue={diff}
                    className="text-xs text-[#867070] rounded-lg hover:bg-[#86707010]"
                  >
                    {diff}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Reset Button */}
          {filters.search && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 ml-2 text-xs font-semibold bg-[#86707010] px-3 py-2 rounded-lg cursor-pointer hover:bg-[#86707020] text-[#635252] hover:text-[#4A3B3B] transition-all duration-150"
            >
              <IoRefreshOutline className="text-sm stroke-[3]" />
              <span>Reset Search</span>
            </button>
          )}
        </div>
      </div>

      {/* Cards Section */}
      {promptsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promptsData.map((prompt, idx) => (
            <FeaturedPromptCard
              key={prompt._id}
              prompt={prompt}
              user={users}
              isUserLoggedIn={isUserLoggedIn}
              idx={idx}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#86707090] font-medium bg-white/20 rounded-3xl border border-dashed border-[#86707030]">
          No prompts found matching your criteria.
        </div>
      )}

      {/* Pagination */}
      {(
        <div className="flex justify-center mt-4 p-4 bg-[#86707005] border border-[#86707015] rounded-2xl">
          <Pagination className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[#867070]">
            <Pagination.Summary className="text-sm font-medium text-[#867070aa]">
              Showing <span className="font-bold text-[#867070]">{startItem}-{endItem}</span> of <span className="font-bold text-[#867070]">{totalItems}</span> results
            </Pagination.Summary>

            <Pagination.Content className="flex items-center gap-1 bg-white/40 backdrop-blur-sm p-1.5 rounded-xl border border-[#86707010]">
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={filters.page === 1}
                  onPress={() => handlePageChange(filters.page - 1)}
                  className="px-3 py-1.5 text-xs font-bold hover:bg-[#86707015] rounded-lg transition-all"
                >
                  <Pagination.PreviousIcon className="text-sm" />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis className="text-[#86707080]" />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === filters.page}
                      onPress={() => handlePageChange(p)}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all ${p === filters.page ? "bg-[#867070] text-white shadow-sm" : "hover:bg-[#86707015] text-[#867070]"}`}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={filters.page === totalPages}
                  onPress={() => handlePageChange(filters.page + 1)}
                  className="px-3 py-1.5 text-xs font-bold hover:bg-[#86707015] rounded-lg transition-all"
                >
                  <span>Next</span>
                  <Pagination.NextIcon className="text-sm" />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AllPromptsContent;
