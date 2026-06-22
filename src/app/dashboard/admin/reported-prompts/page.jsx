import ReportedPromptsContent from '@/components/dashboard/admin/reportedPromptsContent/ReportedPromptsContent'
import { getReports } from '@/lib/api/reports'
import { getUsers } from '@/lib/api/users';
import { getPrompts } from '@/lib/api/prompts';

const ReportedPrompts = async () => {
    const reports = await getReports();
    const { data: users } = await getUsers();
    const { data: prompts } = await getPrompts();

    const enrichedReports = reports.map(report => {
        const user = users.find(u => u._id === report.userId);
        const prompt = prompts.find(p => p._id === report.promptId);
        return {
            ...report,
            userName: user?.name || "Unknown",
            userEmail: user?.email || "N/A",
            userImage: user?.image || "",
            promptTitle: prompt?.title || "Deleted Prompt",
        };
    });

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-[#867070]">Reported Content</h2>
            
            {enrichedReports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {enrichedReports.map(report => (
                        <ReportedPromptsContent key={report._id} report={report} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-stone-200">
                    <h3 className="text-xl font-bold text-[#867070] mb-2">No reports found!</h3>
                    <p className="text-sm font-medium text-[#917C7C] mb-6">
                        Everything looks good. No user reports are pending at the moment.
                    </p>
                </div>
            )}
        </div>
    )
}

export default ReportedPrompts
