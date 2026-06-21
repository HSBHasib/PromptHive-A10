import SavedPromptContent from '@/components/dashboard/user/savedPromptContent/SavedPromptContent';
import { getBookmarks } from '@/lib/api/bookMarks';
import { getPrompts } from '@/lib/api/prompts';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';

const SavedPrompts = async () => {
    const user = await getUserSession();
    const { data: bookMarks } = await getBookmarks(user?.id);
    const { data: allPrompts } = await getPrompts(); 

    const bookmarkedIds = bookMarks.map(b => b.promptId);
    const savedPrompts = allPrompts.filter(p => bookmarkedIds.includes(p._id));

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-1 text-[#867070]">Saved Prompts Templates</h2>
            <p className="text-sm text-[#917C7C] mb-6">Browse your bookmarkd templates and parameters.</p>
            
            {savedPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {savedPrompts.map(prompt => (
                        <SavedPromptContent key={prompt._id} prompt={prompt} userId={user.id} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-stone-200">
                    <h3 className="text-xl font-bold text-[#867070] mb-2">No saved prompts yet!</h3>
                    <p className="text-sm font-medium text-[#917C7C] mb-6">Explore our library and bookmark your favorite templates.</p>
                    <Link 
                        href="/all-prompts" 
                        className="px-6 py-2 bg-[#867070] text-white rounded-lg font-medium hover:bg-[#6e5d5d] transition"
                    >
                        Browse All Prompts
                    </Link>
                </div>
            )}
        </div>
    );
}

export default SavedPrompts;