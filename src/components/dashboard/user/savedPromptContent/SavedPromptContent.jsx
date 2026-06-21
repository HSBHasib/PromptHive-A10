"use client";

import React, { useState } from 'react';
import { LuTrash2, LuEye, LuBox } from "react-icons/lu";
import toast from 'react-hot-toast';
import { toggleBookmark } from '@/lib/action/bookMarks'; 
import { useRouter } from 'next/navigation';


const SavedPromptContent = ({ prompt, userId }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const router = useRouter()

    const handleDelete = async () => {
        try {
            const res = await toggleBookmark({ promptId: prompt._id, userId });
            
            if (res.status === "removed") {
                setIsDeleted(true);
                router.refresh();
                toast.success("Bookmark removed!");
            }
        } catch (error) {
            toast.error("Failed to remove bookmark");
        }
    };

    if (isDeleted) return null;

    return (
        <div className="bg-white/40 p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold uppercase bg-stone-100 py-1 rounded text-stone-600">{prompt.category}</span>
                <button onClick={handleDelete} className="text-rose-500 bg-rose-100 p-2 rounded-lg hover:bg-rose-200/70 cursor-pointer transition">
                    <LuTrash2 size={18} />
                </button>
            </div>
            
            <h3 className="font-bold text-stone-700 mb-1">{prompt.title}</h3>
            <p className="text-xs text-stone-500 mb-4 line-clamp-2">{prompt.description}</p>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-50">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                    <LuBox size={14} /> {prompt.aiTool}
                </div>
                <a href={`/prompt/${prompt._id}`} className="text-xs font-semibold bg-stone-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-stone-700 transition">
                    <LuEye size={14} /> View
                </a>
            </div>
        </div>
    );
}

export default SavedPromptContent;

